---
title: "[SpringBoot] ThreadLocal을 활용한 인증관리"
date: 2024-06-20T19:26:00+09:00
draft: false
tags: ["SpringBoot", "ThreadLocal", "인증", "메모리관리"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "Spring Boot에서 ThreadLocal을 사용한 인증 관리와 주의사항"
---

## 개요

Spring Boot는 스레드 풀을 통해 요청에 맞는 스레드를 할당합니다. 인증된 사용자의 ID를 ThreadLocal에 저장하여 전역적으로 접근 가능하게 하려고 했습니다.

![ThreadLocal 개념](/images/posts/springboot-threadlocal-authentication/ThreadLocal-개념.png)

## 문제점

**ThreadLocal에 저장되고 초기화 하지 않았을 때 다음 사용자가 인증에 실패해도 전에 사용자의 정보가 남아있어 비즈니스 로직이 실행되는 문제**가 발생했습니다.

![ThreadLocal 문제](/images/posts/springboot-threadlocal-authentication/ThreadLocal-문제.png)

### 시나리오

1. 사용자 1이 ID "1"로 인증 성공 후 ThreadLocal에 저장
2. 사용자 2가 토큰 없이 요청 (인증 실패)
3. 사용자 2가 사용자 1의 정보로 비즈니스 로직 실행

## 해결방안

![ThreadLocal 초기화](/images/posts/springboot-threadlocal-authentication/ThreadLocal-초기화.png)

Filter 종료 후 ThreadLocal 값을 초기화(null 처리)하여 문제 해결

```java
public class AuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) {
        try {
            // 인증 로직
            String token = extractToken(request);
            if (token != null && validateToken(token)) {
                Long userId = getUserIdFromToken(token);
                UserContext.setCurrentUserId(userId);
            }

            filterChain.doFilter(request, response);
        } finally {
            // ThreadLocal 초기화 - 중요!
            UserContext.clear();
        }
    }
}
```

## 실제 사례

![실제 문제 상황](/images/posts/springboot-threadlocal-authentication/실제-문제-상황.png)

토큰 없이 요청했음에도 이전에 조회했던 사용자 정보가 반환되는 현상 확인 후, ThreadLocal 초기화 코드 추가로 해결했습니다.

![해결 후 결과](/images/posts/springboot-threadlocal-authentication/해결-후-결과.png)

> **핵심**: ThreadLocal 사용 시 반드시 `finally` 블록에서 초기화해야 합니다.
