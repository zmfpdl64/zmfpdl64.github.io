---
title: "Reflection 메소드 매개변수 필드명이 arg0, arg1로 나오는 문제 해결"
date: 2024-04-28T00:33:43+09:00
draft: false
tags: ["Java", "Reflection", "AOP", "컴파일러"]
categories: ["Java"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "Java Reflection에서 메소드 매개변수 이름이 arg0, arg1로 나오는 원인과 해결 방법"
---

## 메소드 필드명이 필요했던 이유

AOP를 이용해 다양한 곳에서 유연하고 범용성 있게 사용하기 위해 메소드의 매개변수 필드명이 필요했습니다.

## 문제 상황

원하는 출력 값은 `lockName`과 `userId`의 값이었지만, 예상했던 것과는 다르게 `arg0`, `arg1`과 같은 변수명을 가져왔습니다.

![원하는 출력 vs 실제 출력](https://i.imgur.com/dYhqEWd.png)

![arg0, arg1 반환](https://i.imgur.com/i8Z6zVF.png)

## Parameter.getName() 분석

### 클래스 구조도

`Method` 클래스는 `Executable` 클래스를 상속하고 있고 `getParameters`는 `Executable` 클래스에서 구현되어 있었습니다.

![클래스 구조도](https://i.imgur.com/4JnZV7B.png)

### Executable 클래스 분석

#### getParameters 메소드 (시작)

`getParameters()` 메소드에서 시작해서 내부 구현을 추적했습니다.

![getParameters 메소드](https://i.imgur.com/IgxK6HV.png)

#### privateGetParameters 메소드

`tmp`가 초기화되는 로직은 이 로직에서만 이루어집니다. 그래서 처음에는 `synthesizeAllParams()` 메소드를 타게 됩니다.

![privateGetParameters 메소드](https://i.imgur.com/5l7sSXx.png)

#### synthesizeAllParams 메소드

이전에 `parameters`를 초기화해주는 곳이 없어서 발생하는 문제입니다. 무조건 `synthesizeAllParams()` 메소드를 통해 `arg0`, `arg1`로 초기화되는 것입니다.

![synthesizeAllParams 메소드](https://i.imgur.com/PYYR16j.png)

## 해결 방법

컴파일 단계에서 옵션을 추가해주면 위와 같은 문제를 해결할 수 있습니다. 그렇게 되면 컴파일이 동작할 때 class 파일에 변수명이 저장되기 때문에 null이 아닌 실제 값이 존재해서 `synthesizeAllParams` 메소드가 아니라 `verifyParameters` 메소드를 타게 되어 실제 변수명을 가져올 수 있습니다.

### IntelliJ 설정

IntelliJ로 실행을 한다면:
1. **설정** → **빌드, 실행, 배포** → **컴파일러** → **Java 컴파일러**
2. **추가 매개변수**에 `-parameters` 추가

![IntelliJ 설정](https://i.imgur.com/zdH3two.png)

### Gradle 컴파일 옵션 추가

만약 Gradle로 실행한다면 `build.gradle`에 아래 코드를 추가합니다:

```groovy
tasks.withType(JavaCompile) {
    options.compilerArgs << '-parameters'
}
```

![Gradle 설정](https://i.imgur.com/e0SK9S2.png)

## 결론

Java Reflection에서 메소드 매개변수 이름을 가져올 때 `arg0`, `arg1`이 반환되는 것은 컴파일 시 `-parameters` 옵션이 없어서 발생하는 문제입니다. 해당 옵션을 추가하면 실제 매개변수 이름을 가져올 수 있습니다.
