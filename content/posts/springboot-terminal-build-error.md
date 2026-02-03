---
title: "스프링부트 터미널 build 실행 오류 (JDK 17)"
date: 2023-04-04T19:06:45+09:00
draft: false
tags: ["SpringBoot", "Java", "JDK", "Gradle"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "터미널에서 gradlew build 실행 시 JDK 17 버전 호환 문제 해결 방법"
---

## 문제: JAVA 17 버전을 호환하지 못함

터미널로 `gradlew build`를 실행했지만 classpath를 찾지 못할 뿐더러 jdk 17버전이 아니라는 경고가 발생한다.

### 주의 사항

- 스프링부트 2.6.x 버전 이상부터 사용이 가능하다.
- build.gradle에서 17버전인지 확인!

### 인텔리제이 빌드, 실행, 테스트 설정하기

- jdk 17버전을 다운받는다.

[Oracle JDK 17 다운로드](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

- 설정 - build - gradle - 17ver 설정

![Gradle JDK 설정](https://velog.velcdn.com/images/zmfpdl64/post/c0c819c1-962d-4ca3-aef2-e83361f450eb/image.png)

- 프로젝트 구조 - SDK - 17ver 생성
- 프로젝트 구조 - 프로젝트
- 프로젝트 구조 - 모듈 - 17ver 설정

![프로젝트 구조 설정](https://velog.velcdn.com/images/zmfpdl64/post/00d9107e-1d0f-4388-8b0b-b14e052fa804/image.png)

위의 방식들은 인텔리제이에서 빌드, 실행할 때 필요한 설정들이다.

## 터미널 환경에서 빌드, 실행, 테스트 설정하기

### 환경변수 설정

![환경변수 설정](https://velog.velcdn.com/images/zmfpdl64/post/0c28a664-d74f-4ec1-aaa6-9d55188f6621/image.png)

### 환경 변수 저장

![환경 변수 저장](https://velog.velcdn.com/images/zmfpdl64/post/5e6db5d8-ff1c-4eb6-939e-f36fa326f435/image.png)

jdk 17 폴더의 위치를 환경변수에 추가한다.

### gradlew 파일 변경

`ctrl + R` 문자열을 교체해주는 단축키

![gradlew 파일 수정](https://velog.velcdn.com/images/zmfpdl64/post/e52186eb-ac22-4858-a640-9300f84adc00/image.png)

`$JAVA_HOME` 환경변수를 `$JAVA_17`로 변경한다.

java_home 환경변수가 jdk를 연결해주고 있었는데 이것을 새로 정의한 java_17 환경변수로 대체해 주는 것이다.

### ./gradlew build 실행

![빌드 성공](https://velog.velcdn.com/images/zmfpdl64/post/b319872c-448a-4828-96e9-465314c5ffa8/image.png)

## 결론

터미널에서 Gradle 빌드를 실행할 때 JDK 버전 문제가 발생하면:

1. 환경변수에 새로운 JDK 경로 추가
2. gradlew 파일에서 `$JAVA_HOME`을 새 환경변수로 변경
3. 빌드 재실행
