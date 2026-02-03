---
title: "TreeSet의 구조와 Comparator 주의사항"
date: 2024-02-29T21:01:26+09:00
draft: false
tags: ["Java", "TreeSet", "자료구조", "Comparator"]
categories: ["Java"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "TreeSet과 HashSet의 동등성 비교 방식 차이와 주의사항"
---

## TreeSet 구조

TreeSet은 필드로 `NavigableMap` 인터페이스를 가지고 있으며, `TreeMap` 클래스가 해당 인터페이스를 구현하는 구조를 가지고 있습니다.

![TreeSet 클래스 구조](/images/posts/java-treeset-comparator/TreeSet-클래스-구조.png)

TreeSet 생성자가 호출되면 `m` 필드에 `TreeMap` 클래스가 할당됩니다.

![TreeSet 생성자](/images/posts/java-treeset-comparator/TreeSet-생성자.png)

## 문제점 발견

TreeSet을 사용하면서 예상한 결과값과 다르게 결과가 나와서 원인을 찾아보기로 했습니다.

### 예시: x만 비교할 때

```java
Comparator<Point> comparator = Comparator.comparingInt(p -> p.x);
TreeSet<Point> treeSet = new TreeSet<>(comparator);
treeSet.add(new Point(1, 1));
treeSet.add(new Point(1, 2));
System.out.println(treeSet.size()); // 결과: 1
```

x만 비교하여 TreeSet 자료구조를 사용했을 때는 1개의 요소밖에 존재하지 않았습니다. HashSet이라면 객체의 `hashCode()`와 `equals()`를 비교하여 2라는 결과가 나왔을 텐데...

![x만 비교 시 결과](/images/posts/java-treeset-comparator/x만-비교-시-결과.png)

### 예시: x와 y 모두 비교할 때

```java
Comparator<Point> comparator = Comparator.comparingInt((Point p) -> p.x)
    .thenComparingInt(p -> p.y);
TreeSet<Point> treeSet = new TreeSet<>(comparator);
treeSet.add(new Point(1, 1));
treeSet.add(new Point(1, 2));
System.out.println(treeSet.size()); // 결과: 2
```

x와 y 모두 비교하는 코드를 작성했더니 원하는 결과가 나왔습니다.

![x, y 모두 비교 시 결과](/images/posts/java-treeset-comparator/x-y-모두-비교-시-결과.png)

## 원인 분석

### TreeMap Put() 메소드

TreeSet 자료구조는 필드로 `TreeMap`을 가지고 있으며, 저장하는 객체를 `key: value`로 TreeMap에 저장하는 방식을 갖고 있습니다.

실제 객체를 추가할 때는 key 값으로 객체의 필드 값을 받아오고, **사용자가 정의한 compare 함수를 통해 비교**합니다. 값이 동일하다면 동일한 객체로 인식하고 현재 노드에 업캐스팅한 Object를 저장하는 방식입니다.

![TreeMap put 메소드](/images/posts/java-treeset-comparator/TreeMap-put-메소드.png)

![TreeMap compare 로직](/images/posts/java-treeset-comparator/TreeMap-compare-로직.png)

![TreeMap 노드 저장](/images/posts/java-treeset-comparator/TreeMap-노드-저장.png)

## HashSet vs TreeSet

### HashSet

동일한 객체인지 비교할 때 `hashCode()`와 `equals()`를 기반으로 동일한지 비교하기 때문에, **논리적 동치성**을 비교하기 위해서는 `hashCode()`와 `equals()`의 재정의가 필요합니다.

### TreeSet

동일한 객체인지는 **사용자가 직접 정의**하기 때문에, 논리적으로 어디까지 같다고 할 것인지 `Comparator`를 정의해줘야 합니다.

## 결론

- TreeSet은 `Comparator`를 통해 동등성을 판단합니다.
- `Comparator`에서 비교하지 않는 필드는 동등성 판단에 포함되지 않습니다.
- 모든 필드를 기반으로 동등성을 판단해야 한다면 HashSet을 사용하거나, Comparator에 모든 필드를 포함해야 합니다.
