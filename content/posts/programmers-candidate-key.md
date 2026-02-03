---
title: "프로그래머스 후보키 - 조합과 부분집합으로 해결하기"
date: 2023-05-07T18:22:03+09:00
draft: false
tags: ["Python", "알고리즘", "프로그래머스", "Database"]
categories: ["코딩테스트"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "프로그래머스 후보키 문제를 유일성과 최소성 조건으로 해결하는 방법"
---

## 문제 링크

[프로그래머스 후보키](https://school.programmers.co.kr/learn/courses/30/lessons/42890)

## 문제 설명

이 문제는 데이터베이스에서 관계형 데이터의 후보키(candidate key)를 찾는 문제입니다.

데이터베이스에서는 후보키(candidate key)라는 개념을 사용하여 테이블에서 튜플을 유일하게 식별할 수 있는 속성 또는 속성의 집합을 의미합니다.

![후보키 개념](/images/posts/programmers-candidate-key/후보키-개념.png)

## 후보키의 조건

후보키는 다음 조건들을 만족해야 합니다:

### 1. 유일성

유일성은 데이터베이스의 모든 ROW 중에 유일하게 존재해서 식별이 가능한 값을 의미합니다.

### 2. 최소성

최소성은 후보키로 선택된 속성(Attribute) 집합에서 어떤 속성 하나를 제외하거나 두 개 이상의 속성을 합쳐서도 여전히 유일성이 보장되는 속성 집합을 말합니다.

## 예시

**[학번, 이름]** 조합은 학번 자체로도 유일성을 유지할 수 있기 때문에 최소성을 충족하지 못해 후보키로 사용할 수 없습니다.

**[학번, 전공]** 조합은 학번, 전공 단일은 유일성이 유지될 수 없지만 2개 이상 같이 사용하면 유일성 유지가 가능합니다.

## 코드 작성

```python
from itertools import combinations

def solution(relation):
    col_size = len(relation[0])
    nums = range(col_size)
    candidates = []

    # 모든 후보키 조합 구하기
    for key_size in nums:
        for combination in combinations(nums, key_size+1):
            candidates.append(combination)

    # 각 조합에서 row들이 중복되는지 확인(유일성 확인)
    unique = []
    for candidate in candidates:
        lists = []
        for row in relation:
            rows = []
            for col in candidate:
                rows.append(row[col])
            lists.append(tuple(rows))
        if len(set(lists)) == len(relation):
            unique.append(candidate)

    # 유일성을 만족한 조합에서 부분집합이 있는지 확인(최소성 확인)
    answer = set(unique)
    for i in range(len(unique)):
        for j in range(i+1, len(unique)):
            if set(unique[i]).issubset(set(unique[j])):
                answer.discard(unique[j])
    return len(answer)
```

## 핵심 포인트

1. **조합 생성**: `itertools.combinations`를 사용하여 모든 컬럼 조합 생성
2. **유일성 검사**: 각 조합으로 만든 튜플이 모든 행에서 유일한지 확인
3. **최소성 검사**: 유일성을 만족하는 조합 중 부분집합 관계인 것 제거

## 결론

후보키 문제는 유일성과 최소성 두 가지 조건을 모두 만족해야 합니다. 조합을 이용해 모든 경우를 생성하고, 부분집합 관계를 확인하여 최소성을 검증합니다.
