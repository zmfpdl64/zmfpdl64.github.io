---
title: "Java GC (Garbage Collection) 이해하기"
date: 2023-11-09T13:32:17+09:00
draft: false
tags: ["Java", "GC", "JVM", "메모리"]
categories: ["Java"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "Java GC의 동작 원리와 다양한 GC 방식 소개"
---

## GC란?

프로그램이 동적으로 할당했던 (heap 영역) 메모리 영역 중 필요 없게 된 영역을 여러 알고리즘을 통해 해제하는 것입니다.

### 장점

- 메모리 누수 방지
- 해제된 메모리에 접근 방지
- 해제한 메모리 또 해제 방지

### 단점

- GC 작업은 순수 오버헤드
- 개발자는 언제 GC가 메모리를 해제하는지 모릅니다

## GC 알고리즘

### Reference Counting

객체에 접근할 수 있는 카운팅 넘버를 통해 현재 참조 중인지 확인하는 알고리즘

**문제점**: 힙 객체가 서로 참조하고 있으면 순환 참조로 GC 제거 대상에서 제외됨

### Mark And Sweep

root로부터 연결되어 있다면 **reachable**, 연결되어 있지 않다면 **unreachable**

![Mark And Sweep 알고리즘](/images/posts/java-gc-garbage-collection/Mark-And-Sweep-알고리즘.png)

**단점**:
- 의도적으로 GC를 실행시켜야 함
- 어플리케이션 실행과 GC 실행이 병행됨

## Root Space의 위치

- Stack의 로컬 변수
- Method Area의 static 변수
- Native Method Stack의 JNI 참조

## Heap 영역 구조

![Heap 영역 구조](/images/posts/java-gc-garbage-collection/Heap-영역-구조.png)

```
Young Generation          Old Generation
┌─────┬─────┬─────┐      ┌────────────────┐
│Eden │ S0  │ S1  │      │                │
└─────┴─────┴─────┘      └────────────────┘
```

처음 생성된 객체들은 **Eden**에 저장되고, 살아남을 때마다 **Survival0**, **Survival1**으로 이동하며 몇 번 Minor GC로부터 살아남았는지 카운팅합니다. 일정 횟수 이상 살아남았다면 **Old Generation**으로 객체를 이동시킵니다.

### Stop the World

Old Generation의 객체를 정리할 때 발생합니다. 프로그램을 멈추고 메모리를 정리하는 데 사용됩니다.

## GC 방식

### Serial GC

- 싱글 스레드로 동작하는 가장 간단한 GC
- 실행 시 모든 스레드의 STW 발생
- 클라이언트 앱 또는 일시 중지 시간에 대한 제한이 없는 경우에 대부분 선택하는 GC

### Parallel GC

- Serial GC와 다르게 힙 영역 관리를 위해 멀티 스레드를 활용하는 GC
- 하지만 GC 수행 시에는 똑같이 다른 앱 스레드도 정지 (STW)
- 여러 개의 쓰레드로 GC를 실행
- 멀티코어 환경에서 사용
- **Java 8의 default GC 방식**

### CMS GC

- CMS (Concurrent Mark Sweep)은 멀티 GC 스레드를 활용한 GC
- Stop the World 최소화를 위해 고안
- GC 작업을 어플리케이션과 동시에 실행
- G1 GC 등장에 따라 Deprecated

### G1 GC

- 힙을 동일한 크기의 영역(Region)으로 분할하여 관리
- Garbage First (G1) - 가비지가 가장 많은 영역부터 정리
- Heap을 Region으로 나누어 사용
- **Java 9부터 기본 GC 알고리즘**

![G1 GC 동작 방식](/images/posts/java-gc-garbage-collection/G1-GC-동작-방식.png)

![GC 종류 비교](/images/posts/java-gc-garbage-collection/GC-종류-비교.png)

## 참조

- [테코톡 조엘의 GC](https://www.youtube.com/watch?v=FMUpVA0Vvjw)
