---
title: "프레임워크와 라이브러리의 차이"
date: 2023-07-19T15:20:48+09:00
draft: false
tags: ["Java", "프레임워크", "라이브러리", "CS"]
categories: ["Tech"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "프레임워크와 라이브러리의 개념과 차이점을 코드 예제와 함께 이해하기"
---

## 라이브러리란?

라이브러리는 특정 기능을 수행하는 코드의 집합입니다. 개발자가 필요할 때 호출하여 사용합니다.

### 실행 함수

```java
public static void main(String[] args) {
    double library_time = System.nanoTime();
    double library = round(20.555d, 2);
    double library_endTime = System.nanoTime();

    double custom_time = System.nanoTime();
    double custom = notUseLibrary(20.555d, 2);
    double custom_endtime = System.nanoTime();

    System.out.println("라이브러리: " + library + " 걸린시간: " + (library_endTime-library_time));
    System.out.println("커스텀: " + custom + " 걸린시간: " + (custom_endtime - custom_time));
}
```

### 직접 구현 코드

구현 시간: 약 10분

```java
public static <T> double notUseLibrary(T value, int decimalPoint) { // 15줄
    double dValue = Double.valueOf(String.valueOf(value));
    // Math.pow() 와 같은 행위
    double pow = 1;
    for (int i = 0; i <= decimalPoint; i++) {
        pow *= 10;
    }
    dValue *= pow;
    // Math.round() 와 같은 행위
    double mod = dValue % 10;
    if (mod >= 5) {
        return (dValue + -mod + 10) / pow;
    }
    return (dValue - mod) / pow;
}
```

### 라이브러리 이용한 코드

구현 시간: 약 3분

```java
public static <T> double round(T value, int decimalPoint) { // 5줄
    Float aFloat = Float.valueOf(String.valueOf(value));
    double pow = Math.pow(10, decimalPoint);
    return Math.round(pow * aFloat) / pow;
}
```

### 장점

직접 반올림 기능을 구현한 것과 라이브러리를 비교해봤습니다. 라이브러리를 사용하면:
- 코드 라인 수 감소 (15줄 → 5줄)
- 구현 시간 단축 (10분 → 3분)
- 검증된 코드 사용

## 프레임워크란?

원하는 기능 구현에 집중하여 개발할 수 있도록 **일정한 형태와 필요한 기능을 갖추고 있는 골격, 뼈대**를 의미합니다.

### 프레임워크가 나오게 된 계기

반복적인 코드 작성을 줄이고, 일관된 구조로 개발하기 위해 등장했습니다.

### 프레임워크 규칙

프레임워크는 **제어의 역전(IoC)**이 핵심입니다. 개발자가 아닌 프레임워크가 흐름을 제어합니다.

```java
public interface FrameworkInterface {
    // 의존성 주입
    default void 시작() {
        System.out.println("프레임워크 시작!!");
        System.out.println("세팅을 시작합니다!!");
    }

    void 서비스로직(); // 개발자가 구현해야 할 부분

    default void 끝() {
        System.out.println("자원을 반납합니다.");
        System.out.println("프로그램 종료!!");
    }

    default void run() {
        시작();
        서비스로직();
        끝();
    }
}
```

### 프레임워크에서 우리가 구현해야 할 부분

`서비스로직()` 메소드처럼 핵심 비즈니스 로직만 구현하면 됩니다.

### 프레임워크의 장점

- 일관된 코드 구조
- 개발 시간 단축
- 검증된 아키텍처 사용

## 핵심 차이점

| 구분 | 라이브러리 | 프레임워크 |
|------|-----------|-----------|
| 제어 흐름 | 개발자가 제어 | 프레임워크가 제어 |
| 호출 방식 | 개발자가 라이브러리 호출 | 프레임워크가 개발자 코드 호출 |
| 사용 범위 | 특정 기능만 | 전체 애플리케이션 구조 |

## 결론

- **라이브러리**: 내가 필요할 때 가져다 쓴다 (I call you)
- **프레임워크**: 프레임워크가 내 코드를 호출한다 (Don't call us, we'll call you)
