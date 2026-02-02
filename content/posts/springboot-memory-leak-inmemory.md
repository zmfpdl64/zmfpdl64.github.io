---
title: "[SpringBoot] In-Memory 환경 Memory Leak"
date: 2024-06-20T19:20:00+09:00
draft: false
tags: ["SpringBoot", "메모리누수", "InMemory", "스케줄링"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "In-Memory 인증번호 관리 시 발생하는 메모리 누수 문제와 해결 방법"
---

## InMemory 인증번호 관리

회원가입 시 휴대폰 번호로 인증번호를 전송하고 인증번호를 통해 회원을 검증하는 방식을 구현했습니다.

### 인증번호 발행

랜덤 번호를 생성하여 휴대폰으로 전송하고 Map에 번호를 저장합니다.

### 인증번호 검증

현재 인증시간의 유효성을 확인하고 인증번호를 검증합니다. 일치하면 Map에서 key를 제거하지만, 불일치 시 메모리에 계속 남아있게 됩니다.

## 메모리 누수 문제

**key를 요청하고 검증을 하지 않았을 때 계속해서 데이터가 Map에 참조하고 있어 GC가 메모리를 수거하지 않습니다.**

### 문제 시나리오

1. 사용자가 인증번호 요청
2. Map에 `{phoneNumber: authCode}` 저장
3. 사용자가 인증을 완료하지 않음
4. Map에 데이터가 계속 남아있음
5. 반복 시 메모리 누수 발생

## 해결방법

스케줄링을 활용하여 일정 시간마다 만료된 키를 제거:

```java
@TimeTrace
@Scheduled(cron = "0 10 * * * *")
public void clearAuthenticationMap() {
    authenticationMap.entrySet().forEach((set) -> {
        AuthAndTime authAndTime = getAuthAndTime(set.getKey());
        if(!isBefore(authAndTime)) {
            authenticationMap.remove(set.getKey());
        }
    });
}
```

## 핵심 포인트

- `@Scheduled` 어노테이션으로 주기적 정리 작업 실행
- 만료 시간이 지난 데이터만 선택적 제거
- GC가 메모리를 정상적으로 수거할 수 있도록 참조 해제

> **결론**: In-Memory 데이터 저장 시 반드시 만료/정리 로직을 함께 구현해야 합니다.
