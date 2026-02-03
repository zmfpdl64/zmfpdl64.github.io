---
title: "Github Actions와 AWS CodeDeploy를 활용한 CI/CD 구축"
date: 2024-04-19T16:45:28+09:00
draft: false
tags: ["AWS", "CI/CD", "Github Actions", "CodeDeploy", "SpringBoot"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "Github Actions와 AWS S3, CodeDeploy를 사용하여 Spring Boot 애플리케이션 CI/CD 파이프라인 구축하기"
---

## 해야할 일

1. S3 버킷 생성
2. S3 접근 키 생성
3. EC2 생성
4. EC2 규칙 생성 (보안그룹)
5. EC2가 S3, CodeDeploy에 접근하기 위한 역할 적용
6. EC2 내에 서버를 실행할 수 있게 프로그램 설치
7. CodeDeploy IAM 권한 설정

## S3 버킷 생성

![S3 버킷 생성](https://i.imgur.com/rjsDZWv.png)

버킷을 생성할 지역을 선정해 주고 생성합니다.

## S3 접근 키 생성

![S3 접근 키](https://i.imgur.com/yhc2RSt.png)

**비밀 엑세스키는 생성 시에 보관해 두어야 합니다.**

## EC2 생성

![EC2 생성](https://i.imgur.com/7mDhgMB.png)

## EC2 규칙 생성 (보안그룹)

![보안그룹 설정](https://i.imgur.com/o2yTeXA.png)

80번 포트와 8080번 포트로 접근하는 요청은 모든 아이피를 허용하겠다는 규칙입니다.

## EC2가 S3, CodeDeploy에 접근하기 위한 역할 적용

![IAM 역할 설정](https://i.imgur.com/ueko0pf.png)

S3와 CodeDeploy에 접근할 수 있는 권한을 설정해 주었습니다.

EC2 보안 IAM 역할 수정 페이지에서 적용해주면 됩니다.

## EC2 내에 서버를 실행할 수 있게 프로그램 설치

![EC2 프로그램 설치](https://i.imgur.com/h6KSzbS.png)

### AWS Corretto JDK 17 설치

```bash
# aws corretto 다운로드
sudo wget https://corretto.aws/downloads/latest/amazon-corretto-17-x64-linux-jdk.rpm -O java17.rpm

# jdk 17 설치
sudo apt-get install localinstall jdk17.rpm

# java version 확인
java --version
```

### CodeDeploy Agent 설치

```bash
# ruby 설치
sudo apt-get install ruby

# 서울 리전의 codedeploy 리소스 키트 파일 다운로드
cd /home/ec2-user
wget https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install

# 실행권한 부여
chmod +x ./install

# 에이전트 설치
sudo ./install auto

# 에이전트 상태 확인
sudo service codedeploy.agent status
```

## CodeDeploy IAM 권한 설정

![CodeDeploy IAM](https://i.imgur.com/VCt3W8G.png)

EC2/온프레미스 환경으로 설정해야 합니다.

## 설정 코드 작성 방법

### 파일 구조

```
project/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── appspec.yml
└── scripts/
    └── deploy.sh
```

### deploy.yml 작성

![Github Actions Workflow](https://i.imgur.com/P7DRMHd.png)

```yaml
name: Build and Deploy Spring Boot to AWS EC2

on:
  push:
    branches: [ master ]

env:
  PROJECT_NAME: CICD
  BUCKET_NAME: cicdtestasdfasd
  CODE_DEPLOY_APP_NAME: CICD_TEST
  DEPLOYMENT_GROUP_NAME: DEPLOY_GROUP

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Grant execute permission for gradlew
        run: chmod +x ./gradlew
        shell: bash

      - name: Build with Gradle
        run: ./gradlew build
        shell: bash

      # 파일 압축
      - name: Make Zip File
        run: zip -qq -r ./$GITHUB_SHA.zip .
        shell: bash

      # 권한 부여
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2

      # S3에 zip 저장
      - name: Upload to S3
        run: aws s3 cp --region ap-northeast-2 ./$GITHUB_SHA.zip s3://$BUCKET_NAME/$PROJECT_NAME/$GITHUB_SHA.zip

      # CodeDeploy 실행
      - name: Code Deploy
        run: aws deploy create-deployment --application-name $CODE_DEPLOY_APP_NAME --deployment-config-name CodeDeployDefault.OneAtATime --deployment-group-name $DEPLOYMENT_GROUP_NAME --s3-location bucket=$BUCKET_NAME,bundleType=zip,key=$PROJECT_NAME/$GITHUB_SHA.zip
```

### appspec.yml 작성

![appspec.yml](https://i.imgur.com/cJkSj6r.png)

```yaml
version: 0.0
os: linux

files:
  - source: /
    destination: /home/ubuntu/CICD

permissions:
  - object: /home/ubuntu/CICD/
    owner: ubuntu
    group: ubuntu

hooks:
  AfterInstall:
    - location: scripts/deploy.sh
      timeout: 60
      runas: ubuntu
```

**주의사항:**
- `files.source`: CodeDeploy agent가 다운로드 받은 코드에서 어느 경로를 다운받을지 결정
- 경로가 있는지 확인해야 하며 접근하는 유저의 이름도 ubuntu로 기본 이름으로 지정해줘야 함

### deploy.sh 코드 작성

![deploy.sh](https://i.imgur.com/xKIivgO.png)

```bash
#!/usr/bin/env bash

MY_ENV='/home/ubuntu/my-env.sh'  # 환경변수 적용
REPOSITORY=/home/ubuntu/CICD     # EC2 프로젝트 경로

cd $REPOSITORY
source $MY_ENV  # 환경변수 우분투 서버에 적용

APP_NAME=CICD
JAR_NAME=$(ls $REPOSITORY/build/libs/ | grep 'SNAPSHOT.jar' | tail -n 1)
JAR_PATH=$REPOSITORY/build/libs/$JAR_NAME

CURRENT_PID=$(pgrep -f $APP_NAME)  # Spring 프로세스 ID 찾기

if [ -z $CURRENT_PID ]
then
  echo "> 실행 중인 애플리케이션이 없습니다."
else
  echo "> kill -9 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

echo "> Deploy - $JAR_PATH"
nohup java -jar $JAR_PATH > /dev/null 2>&1 &
```

빌드된 jar 파일을 실행하는데 만약 실행이 이미 되어있다면 해당 이름의 프로세스를 kill하고 새 버전의 서버 프로세스를 실행시켜줍니다.

## 실행 구조 요약

1. Github에 push → Github Actions 트리거
2. Gradle 빌드 → JAR 파일 생성
3. ZIP 압축 후 S3 업로드
4. CodeDeploy 배포 시작
5. EC2에서 appspec.yml 읽고 deploy.sh 실행
6. 기존 프로세스 종료 → 새 JAR 실행

## 참고

- AWS CodeDeploy는 EC2/온프레미스 환경으로 설정
- Github Secrets에 AWS 접근 키 등록 필요
- EC2 보안그룹에서 필요한 포트 오픈 필수
