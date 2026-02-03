---
title: "Github Desktop으로 PR 전송하기까지 절차"
date: 2023-10-29T21:32:56+09:00
draft: false
tags: ["Git", "Github", "PR", "협업"]
categories: ["Tech"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "Github Desktop을 사용하여 Fork부터 PR까지 전체 워크플로우"
---

## 깃 저장소의 전체 구조

![Git 저장소 구조](/images/posts/github-desktop-pr-guide/Git-저장소-구조.png)

## 회사 원격 저장소 Fork 하기

![Fork 설정](/images/posts/github-desktop-pr-guide/Fork-설정.png)

check 표시를 해제해 줘야 main 브랜치 뿐 아니라 다른 브랜치를 가져옵니다.

## Sync fork를 통한 최신상태 동기화

![Sync Fork](/images/posts/github-desktop-pr-guide/Sync-Fork.png)

회사 원격저장소 → 개인 원격저장소 충돌을 방지하기 위한 작업

## 로컬 Git에 최신상태 동기화

![Fetch Origin](/images/posts/github-desktop-pr-guide/Fetch-Origin.png)

본인의 원격저장소를 최신화 시켰다면 로컬 저장소도 fetch origin을 통해 동기화 해주세요.

## 작업을 시작할 때는 기능을 나타내는 branch로 변경해주세요

![브랜치 생성](/images/posts/github-desktop-pr-guide/브랜치-생성.png)

**예시**: `feature/장바구니담기`

큰 기능목록으로 이름을 지어주시면 좋습니다.

## 커밋은 이렇게 남겨주세요

![커밋 메시지](/images/posts/github-desktop-pr-guide/커밋-메시지.png)

- **Summary**: `feat: 핵심이 되는 주제`
- **description**: 핵심이 되는 기능 또는 왜 그렇게 작성했는지 (간략하게 작성)
- 간단한 커밋은 description 생략 가능

## 개인 저장소에 push

![Push to Origin](/images/posts/github-desktop-pr-guide/Push-to-Origin.png)

push를 통해 개인 저장소에 업로드 해주세요.

## PR 생성하기

![PR 생성](/images/posts/github-desktop-pr-guide/PR-생성.png)

**PR은 정상적으로 빌드, 실행되는 코드만 요청해주세요.**

작업하신 branch에서 회사 저장소의 dev branch에 PR을 전송해주세요.

## PR 컨벤션

![PR 작성 양식](/images/posts/github-desktop-pr-guide/PR-작성-양식.png)

## 회사 원격저장소에서 merge를 진행해주세요

![Merge](/images/posts/github-desktop-pr-guide/Merge.png)

## 주의사항

회사 원격저장소에 PR을 날리고 난 Branch는 삭제하거나 사용하지 않고, 새로운 Dev에서 베이스로 둔 Branch를 생성하여 사용해주세요.

## 전체 워크플로우 요약

1. 회사 저장소 Fork
2. Sync fork로 최신 상태 동기화
3. 로컬 저장소 fetch origin
4. 기능 브랜치 생성 (feature/기능명)
5. 작업 후 커밋
6. 개인 저장소에 push
7. 회사 저장소에 PR 생성
8. 코드 리뷰 후 merge
9. 사용한 브랜치 삭제
