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

![Git 저장소 구조](https://blog.kakaocdn.net/dna/duiBqx/btszi4oEnVW/AAAAAAAAAAAAAAAAAAAAAAPSAeJrZ0MhJ0taEL3TS1p7wL79kkfRyChzb--4ed-h/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=NiQAnKvk4xuCa8WyqE%2Fxz3cDJdU%3D)

## 회사 원격 저장소 Fork 하기

![Fork 설정](https://blog.kakaocdn.net/dna/SCtIs/btszjEQOuvm/AAAAAAAAAAAAAAAAAAAAAFnMSvUWprJ0SSxC9n2e8geYxhGMuMceMtUsVJMPYqGN/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=hLK7zmiG%2FAOePfdollE3GLBnFmo%3D)

check 표시를 해제해 줘야 main 브랜치 뿐 아니라 다른 브랜치를 가져옵니다.

## Sync fork를 통한 최신상태 동기화

![Sync Fork](https://blog.kakaocdn.net/dna/wXPA9/btszlvyxmmd/AAAAAAAAAAAAAAAAAAAAAFBrqiq4daFontgn1HFwAA4xbRRYyxF7YqZJmDfQTcM_/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=gUaNoc4mv%2F63ET2b59EBvlEkWTc%3D)

회사 원격저장소 → 개인 원격저장소 충돌을 방지하기 위한 작업

## 로컬 Git에 최신상태 동기화

![Fetch Origin](https://blog.kakaocdn.net/dna/bCpxAm/btszllpkrHA/AAAAAAAAAAAAAAAAAAAAAH0xRIUia04BmtPzGFboFH5RdLsoR8tq06XWhNl-6iR5/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=U6zjVFQXiGlMZ0sRj2QfgmsgCwA%3D)

본인의 원격저장소를 최신화 시켰다면 로컬 저장소도 fetch origin을 통해 동기화 해주세요.

## 작업을 시작할 때는 기능을 나타내는 branch로 변경해주세요

![브랜치 생성](https://blog.kakaocdn.net/dna/k9fxN/btszqfuShL7/AAAAAAAAAAAAAAAAAAAAAMl70yhY7g70Ul_uN3mt2Z6_4i43KRCJulnYhK7TjG7r/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=sbD0S20IkdDNxpdC7Rhp6UFn0vg%3D)

**예시**: `feature/장바구니담기`

큰 기능목록으로 이름을 지어주시면 좋습니다.

## 커밋은 이렇게 남겨주세요

![커밋 메시지](https://blog.kakaocdn.net/dna/SwVE9/btszj6Gu2YD/AAAAAAAAAAAAAAAAAAAAAHRTflwX9Jhoz050iJw3ghOw7M2TI1m30WjLz_aqdkaa/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=QOQ7hjBFVs1MWN3oX%2FnJ3unJlfA%3D)

- **Summary**: `feat: 핵심이 되는 주제`
- **description**: 핵심이 되는 기능 또는 왜 그렇게 작성했는지 (간략하게 작성)
- 간단한 커밋은 description 생략 가능

## 개인 저장소에 push

![Push to Origin](https://blog.kakaocdn.net/dna/wpCEs/btszjFCauHS/AAAAAAAAAAAAAAAAAAAAAINRbjYFk370dmlcdcznMhFQSS4J3ANKT8ZPahFzb_OM/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=RWJL5OYDQFK%2B6rKhJNgHD7njPVo%3D)

push를 통해 개인 저장소에 업로드 해주세요.

## PR 생성하기

![PR 생성](https://blog.kakaocdn.net/dna/cNY4GL/btszjHfJExu/AAAAAAAAAAAAAAAAAAAAAHXlrBKXrbswjHuEbnGj5PTIb0l8mRJH5kFc5IgIBTus/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=%2FBfFXHC1PCj%2FxQ62grYQPKA2M40%3D)

**PR은 정상적으로 빌드, 실행되는 코드만 요청해주세요.**

작업하신 branch에서 회사 저장소의 dev branch에 PR을 전송해주세요.

## PR 컨벤션

![PR 작성 양식](https://blog.kakaocdn.net/dna/bxbdYo/btszlmV3W0n/AAAAAAAAAAAAAAAAAAAAAIykxPIIOy_p-ApRjxu13UfmuXwVlbTW36p8Pmcv-xZp/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=avE2652VbdFH3L3P5DDRuZqRJ3w%3D)

## 회사 원격저장소에서 merge를 진행해주세요

![Merge](https://blog.kakaocdn.net/dna/bNaMrf/btszrKOXkQh/AAAAAAAAAAAAAAAAAAAAAOwtLCr37Z6b7xb1FeFH8appXMPxYUQ2zhYulJ6YxP5W/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=JUnyH%2BKlEkb8WvcymKw4x4fzumc%3D)

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
