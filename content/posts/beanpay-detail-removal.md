---
title: "BeanPay Detail 삭제 이유"
date: 2024-06-03T01:16:00+09:00
draft: false
tags: ["SpringBoot", "Database", "리팩토링", "Koreano"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "BeanPayDetail 테이블 제거 및 PaymentDetail로 통합한 이유"
---

## 변경 전 테이블 구조

기존에는 BeanPayDetail과 PaymentDetail이 분리되어 있었습니다.

![변경 전 테이블 구조](https://i.imgur.com/d5fz4ie.png)

## BeanPayDetail 역할

BeanPayDetail은 **기존의 빈페이의 변경 내역에 관한 정보를 담고 있었습니다.** 4가지 상태값으로 구분되었습니다:

1. 충전
2. 지출
3. 입금
4. 출금

## PaymentDetail 역할

PaymentDetail은 세부 결제 내역 정보를 저장하며 PaymentStatus로 상태를 관리합니다:

1. 결제
2. 환불

## 중복 문제 발견

PaymentDetail과 BeanPayDetail의 ProcessStatus 값이 중복 사용되고 있었습니다.

## 변경 이유

- PaymentDetail과 BeanPayDetail의 ProcessStatus 값이 중복 사용됨
- BeanPayDetail의 추가 행 생성 제거 가능
- **로직이 하나의 Depth가 줄어들고 유지보수성이 높아졌습니다**
- 복잡한 연관관계 감소

BeanPayDetail의 증감 역할을 PaymentDetail로 통합 가능하다고 판단했습니다.

## 변경 후 테이블 구조

![변경 후 테이블 구조](https://blog.kakaocdn.net/dna/nNPOT/btsHNz6nAAg/AAAAAAAAAAAAAAAAAAAAAKmEp3-1UGJEWHSxzzE9CuPYDC4YUSQTqP9GW5hqlpcv/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=hPsmNIZ0LPvYwgk%2FQOO3AYiHDfg%3D)

BeanPayDetail 테이블을 제거하고 PaymentDetail로 통합했으며, 토스 API 충전 데이터는 ChargeInfo 테이블로 분리했습니다.

![통합된 구조](https://i.imgur.com/xUMIrWC.png)

> **결론**: 중복된 데이터와 로직을 제거하여 유지보수성을 높이고, 테이블 간 관계를 단순화했습니다.
