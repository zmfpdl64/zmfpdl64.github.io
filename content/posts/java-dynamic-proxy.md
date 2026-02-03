---
title: "Java 동적 프록시 (Dynamic Proxy) 이해하기"
date: 2023-11-28T15:38:26+09:00
draft: false
tags: ["Java", "Proxy", "AOP", "InvocationHandler"]
categories: ["Java"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "Java에서 동적 프록시를 사용하는 방법과 한계점"
---

## 프록시의 문제점

프록시는 기존 코드에 영향을 주지 않으면서 타깃의 기능을 확장하거나 접근 방법을 제어할 수 있는 유용한 방법입니다.

하지만 데코레이터 패턴을 활용해서 부가적인 기능을 하는 코드를 클래스마다 매번 정의해야 하고, 클래스도 매번 넣어야 했습니다. 여기서 오는 **코드의 중복**과 **다수의 클래스**가 생겨났습니다.

이러한 문제점들을 해결해주는 것이 바로 **동적 프록시**입니다.

![동적 프록시 개념](https://blog.kakaocdn.net/dna/cGUWfO/btsA8OvsIjH/AAAAAAAAAAAAAAAAAAAAAE_PLiaGZSo1Dzz8mbLY_gf6V22RnLv9MxBWphMrkAqW/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=c4fkhRklho8FfFWNm5JHDnyxfy0%3D)

## 자바에서 동적 프록시를 사용하기 위한 클래스

- `Proxy`
- `InvocationHandler`
- 서비스 로직 인터페이스
- 서비스 로직 구현체
- 부가 기능 구현체 (InvocationHandler를 구현한)

Proxy 클래스를 기반으로 동적 프록시가 생성되고, 필드에 `클래스 로더`, `서비스 로직 인터페이스`, `부가 기능 구현체`를 넣어주면 됩니다.

## 구현 예제

### Human 인터페이스

```java
public interface Human {
    @TargetAnotation
    void run();

    @TargetAnotation
    void walk();
}
```

### Person 구현체

```java
public class Person implements Human {
    @Override
    public void run() {
        System.out.println("달리고 있다.");
    }

    @Override
    public void walk() {
        System.out.println("걷고 있다.");
    }
}
```

### MyProxyHandler (부가 기능 구현체)

```java
public class MyProxyHandler implements InvocationHandler {
    private final Object target;

    public MyProxyHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object result = new Object();
        if (method.isAnnotationPresent(TargetAnotation.class)) {
            System.out.println("========측정 시작==========");
            long startTime = System.nanoTime();

            result = method.invoke(target, args);

            long endTime = System.nanoTime();
            long resultTime = endTime - startTime;
            System.out.println("로깅 :" + resultTime + " ns");
            System.out.println("===========측정 종료===========");
            return result;
        }
        return method.invoke(target, args);
    }
}
```

부가 기능 구현체에서는 얼마나 시간이 걸렸는지 로깅 로직을 작성했습니다. `TargetAnotation.class` 어노테이션이 붙은 메소드에만 부가 기능을 추가하도록 조건문을 작성했습니다.

부가 기능 구현체에서는 필드로 `Object`를 가지고 있습니다. 이는 **데코레이터 패턴**으로 서비스 로직을 담당하는 객체에 부가 기능을 추가하기 위해서입니다.

### 실행 클래스

```java
public class JavaReflection {
    public static void main(String[] args) throws Exception {
        Person p = new Person();

        Human person = (Human) Proxy.newProxyInstance(
                Human.class.getClassLoader(),
                new Class[]{Human.class},
                new MyProxyHandler(p));

        person.run();
        person.walk();
    }
}
```

Proxy를 생성하기 위해서 생성자에 `클래스 로더`, `서비스 로직 인터페이스`, `부가 기능 구현체`를 전달하여 동적 프록시를 생성합니다.

![Proxy 구조](https://blog.kakaocdn.net/dna/k6k1t/btsA2tzBi27/AAAAAAAAAAAAAAAAAAAAAGRjbw474Et3kU4Gq9gYieQoW_RByDVbDCgtZdD9aYpl/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=nBUW3yGp5KB5%2BeyCqrNixVvp080%3D)

### 실행 결과 (어노테이션 적용 시)

```
========측정 시작==========
달리고 있다.
로깅 :12345 ns
===========측정 종료===========
========측정 시작==========
걷고 있다.
로깅 :6789 ns
===========측정 종료===========
```

## 문제점

동적 프록시가 프록시의 단점들을 해결해주는 것은 맞습니다. 하지만:

1. **인터페이스 기반**으로 객체를 다루기 때문에, 특정 클래스의 특정 메소드만 로깅하고 싶을 때 부분적으로 걸어줄 수 없습니다.
2. 구현체로 받게 되면 `ClassCastException`이 발생합니다.

![동적 프록시의 한계](https://blog.kakaocdn.net/dna/dksxRo/btsA8rmFeq5/AAAAAAAAAAAAAAAAAAAAAB_3lSXNK9rGgRQnAqKjUUe9N6ReoyLaGZWZi26qo1KX/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=lGOmkFXca%2BKKR5dI6Q5aC1J139g%3D)

![CGLIB 해결책](https://blog.kakaocdn.net/dna/9njLJ/btsAWhT8EVB/AAAAAAAAAAAAAAAAAAAAABkLIvuNX5MGOC8JxS7ref8_RtbLqEW7hDugLmZhckdQ/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=vTjgM78ud%2Brwax%2BTiGktz59CcQI%3D)

그래서 이러한 문제점들 때문에 Spring에서는 **CGLIB**를 활용해서 클래스 기반의 동적 프록시를 생성하고 해결합니다.

## 결론

- Java 동적 프록시는 인터페이스 기반으로 동작합니다.
- `InvocationHandler`를 통해 부가 기능을 구현합니다.
- 클래스 기반 프록시가 필요하다면 CGLIB를 사용해야 합니다.
