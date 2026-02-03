---
title: "해시(Hash) 자료구조와 충돌 회피 기법"
date: 2024-02-05T18:42:14+09:00
draft: false
tags: ["자료구조", "Hash", "알고리즘", "Java"]
categories: ["자료구조"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "해시 자료구조의 원리, 충돌 회피 방법(Chaining, Open Addressing), 해시 함수 구현"
---

해시 자료구조는 16자리의 번호의 일부분을 index로 사용하는 자료구조입니다.

![해시 테이블 구조](/images/posts/data-structure-hash/해시-테이블-구조.png)

## 해시 함수란?

임의 길이의 데이터를 **고정된 길이의 데이터**로 대응시키는 함수

## 왜 일부분만 사용하는가?

모든 해시를 배열로 가지고 있으면 10^16의 배열이 필요합니다. 이는 40페타 바이트를 차지하게 됩니다. 그렇기에 모든 hash 값을 사용하는 게 아닌 **일부분만의 값을 사용**하여 해시 테이블을 생성합니다.

## 충돌 회피 방법

### 1. Chaining

![Chaining 방식](/images/posts/data-structure-hash/Chaining-방식.png)

Key가 중복된 노드를 **LinkedList로 연결**하여 관리합니다. Java의 STL 자료구조는 Chaining 방식을 사용합니다.

**주의사항:** 충돌이 빈번할수록 성능이 안 좋아지고, 해시 충돌이 한 곳으로 몰렸다면 O(N)의 시간 복잡도를 가질 수 있습니다.

### 2. Open Addressing

![Open Addressing 방식](/images/posts/data-structure-hash/Open-Addressing-방식.png)

해시 충돌이 발생하면 **다음 배열에 비어있는 곳에 저장**하는 방식입니다.

**주의사항:** 값을 삭제하고 나면 더미값을 채워넣거나 제거된 상태라고 명시해 줄 필요가 있습니다.

#### Linear Probing

![Linear Probing](/images/posts/data-structure-hash/Linear-Probing.png)

충돌 발생 시 오른쪽으로 **1칸씩** 이동하는 방식

- **장점:** Cache hit rate가 높다
- **단점:** Clustering이 생겨 성능에 영향을 줄 수 있다

#### Quadratic Probing

![Quadratic Probing](/images/posts/data-structure-hash/Quadratic-Probing.png)

충돌 발생 시 오른쪽으로 **1, 4, 9... 칸씩 제곱으로** 이동하는 방식

- **장점:** Clustering을 어느 정도 회피할 수 있다
- **단점:** 해시 값이 같을 경우 여전히 Clustering이 발생한다

#### Double Hashing

충돌 발생 시 이동할 칸의 수를 **새로운 해시 함수로 계산**하는 방식

- **장점:** Clustering을 효과적으로 회피할 수 있다
- **단점:** Cache hit rate가 극악으로 안 좋아진다

### Cache hit rate란?

메모리의 **공간 지역성**과 관련이 있습니다. 공간 지역성은 특정 데이터와 가까운 주소가 순서대로 접근되는 경우를 말합니다. 한 메모리의 주소뿐만 아니라 해당 블록을 전부 캐시에 가져옴으로써 Cache hit rate를 높입니다.

## Load Factor

```
Load Factor = 원소의 개수 / 테이블의 크기
```

삽입이 많아질수록 테이블이 커야 합니다.

- **Chaining:** Load Factor 1 이하로 유지
- **Open Addressing:** Load Factor 0.75 이하로 유지

## 해시 함수 구현

### 기본 해시 함수

```java
int M = 1_000_003;
int my_hash(int x) {
    return (M + x % M) % M;
}
```

음수를 모듈러 연산하면 음수가 나올 수 있으므로, 테이블 사이즈를 한 번 더 더해줌으로써 음수/양수를 모두 처리합니다.

### 문자열 해시 함수 (기본)

```java
int M = 1_000_003;
int my_hash(String s) {
    int h = 0;
    for (int c : s.toCharArray()) {
        h += c;
    }
    return h % M;
}
```

**문제점:** 최대 100자의 문자열을 받는다고 가정하면 12800까지밖에 범위가 안 늘어나서 해시 충돌이 발생할 확률이 높아집니다.

### 진법을 통한 해시 함수 (롤링 해시)

```java
int M = 1_000_003;
int a = 10;
int my_hash(String s) {
    int h = 0;
    for (int c : s.toCharArray()) {
        h = (h * a + c);
    }
    return h % M;
}
```

문자열의 순서를 진법으로 계산하는 방식으로 해시 충돌을 피할 수 있지만, **오버플로우를 조심**해야 합니다.

## Java에서 hashCode()

```java
Integer a = new Integer(10);
Integer b = new Integer(10);

System.out.println(a == b);           // false (주소 비교)
System.out.println(a.hashCode() == b.hashCode());  // true (값 비교)
```

`==` 연산은 객체의 주소를 비교하여 생성된 객체는 서로 다른 주소를 가져 `false`가 반환됩니다. `Integer` 객체는 내부적으로 int 원시 타입 value를 가지고 있고, `hashCode()` 함수를 사용하면 원시 값을 반환하기 때문에 `true`가 반환됩니다.

## 참조

- [해시 함수 강의](https://blog.encrypted.gg/1009)
