---
title: "락 선택 이유와 성능 테스트"
date: 2024-04-30T18:23:00+09:00
draft: false
tags: ["SpringBoot", "동시성", "Lock", "Redisson", "분산락"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "트랜잭션, Beta Lock, Redisson 분산락의 성능 비교 테스트"
---

## 개요

이 포스트는 세 가지 동시성 제어 방식의 성능을 비교합니다: **락 없는 트랜잭션, Beta Lock, Redisson 분산락**

## 테스트 환경

- DB: H2 (MariaDB 모드)
- 환경: 로컬
- Redis: Embedded
- 스레드 수: 32
- 요청 횟수: 각 1회

## 1. 트랜잭션만 사용한 결과

```java
@Transactional
public void notUseLockTest(String lockName, Integer userId) {
    BeanPay beanPay = getBeanPay(1, Role.USER);

    final BeanPayDetail beanPayDetail = BeanPayDetail.ofCreate(
       beanPay, 1, 5000
    );
    final BeanPayDetail createBeanPayDetail =
       beanPayDetailRepository.save(beanPayDetail);
    beanPay.chargeBeanPayDetail(createBeanPayDetail.getAmount());
}
```

### 결과

트랜잭션만 사용하면 MySQL의 기본 격리 수준(Repeatable Read)에서 **Lost Update 문제가 발생**하여 데이터 정합성이 낮아집니다.

## 2. Beta Lock 사용

```java
@Transactional
public void betaLockTest(String lockName, Integer userId) {
    BeanPay beanPay =
       beanPayRepository.findBeanPayByUserIdAndRoleUseBetaLock(1, Role.USER);

    final BeanPayDetail beanPayDetail = BeanPayDetail.ofCreate(
       beanPay, 1, 5000
    );
    final BeanPayDetail createBeanPayDetail =
       beanPayDetailRepository.save(beanPayDetail);
    beanPay.chargeBeanPayDetail(createBeanPayDetail.getAmount());
}
```

### 특징

- 높은 정합성 보장
- **단일 서버 환경에서 최적화**
- Lock 진행 중 읽기 차단으로 조회 성능 저하 가능
- 우수한 사용성

## 3. Redisson 분산락

```java
@DistributedLock(key = "#lockName.concat('-').concat(#userId)")
public void useDistributeLock(String lockName, Integer userId) {
    BeanPay beanPay = getBeanPay(1, Role.USER);

    final BeanPayDetail beanPayDetail = BeanPayDetail.ofCreate(
       beanPay, 1, 5000
    );
    final BeanPayDetail createBeanPayDetail =
       beanPayDetailRepository.save(beanPayDetail);
    beanPay.chargeBeanPayDetail(createBeanPayDetail.getAmount());
}
```

### 특징

- **높은 정합성 보장**
- 분산 환경에 적합
- Lock과 DB 분리로 조회 가능
- 우수한 확장성

## 비교 요약

| 방식 | 정합성 | 성능 | 환경 | 특징 |
|------|--------|------|------|------|
| Repeatable Read | ✗ | 빠름 | 모든 환경 | 데이터 무결성 미보장 |
| Beta Lock | ✓ | 매우 빠름 | 단일 서버 | 읽기 제한 |
| Redisson | ✓ | 빠름 | 분산 환경 | 확장성 우수 |

## 실제 환경 테스트

In-Memory 환경과 달리 실제 데이터베이스 환경에서는 Beta Lock과 Redisson 성능 차이가 감소하는 것으로 나타났습니다.

> **결론**: 단일 서버면 Beta Lock, 분산 환경이면 Redisson 분산락을 선택하세요.
