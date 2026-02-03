---
title: "프로그래머스 양궁대회 - 완전 탐색으로 최적의 화살 배치 찾기"
date: 2023-05-10T14:28:51+09:00
draft: false
tags: ["Python", "알고리즘", "완전탐색", "프로그래머스"]
categories: ["코딩테스트"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "프로그래머스 양궁대회 문제를 itertools.product를 활용한 완전 탐색으로 해결하는 방법"
---

## 양궁대회 문제 분석하기

해당 문제는 라이언과 어피치가 n개의 화살을 쏴서 라이언이 가장 큰 점수 차로 이긴 배열을 반환하는 문제입니다.

![양궁대회 문제](/images/posts/programmers-archery-competition/양궁대회-문제.png)

## 첫 번째 조건

라이언은 챔피언이라 어피치에게 핸디캡을 주고 시작합니다.

0~10점까지가 있는데 땅따먹기처럼 하나의 점수는 한 사람만 점수를 획득할 수 있습니다. 예를 들어 10점을 어피치와 라이언이 1발씩 맞춘다면 어피치가 10점을 가져가게 되는 것입니다.

그렇기에 점수를 획득하려면 **무조건 어피치 + 1의 화살**을 맞춰야 하는 것입니다.

## 두 번째 조건

가장 큰 점수 차가 2개 이상이라면 점수가 낮은 배열순으로 많이 맞춘 배열을 선택합니다.

## 의사 코드 작성하기

1. 라이언이 쏠 수 있는 모든 경우의 수 만들기 → `product`
   - 중복 O
   - 순서 O
2. 라이언이 n개 이하로 쏜 Case만 점수 계산하기
3. 라이언 점수 구하기
4. 어피치 점수 구하기
5. 라이언 - 어피치 > 최대 점수일 때 결과 저장

## 코드 작성

```python
from itertools import product

def solution(n, info):
    answer = [-1]
    info.reverse()
    maxi = 0

    for case in product([True, False], repeat=len(info)):  # 모든 경우의 수 만들기
        # 화살 갯수 확인하기
        lion_arrow = sum(info[i] + 1 for i in range(len(case)) if case[i])

        if lion_arrow <= n:
            # 라이언 점수 구하기
            lion_score = sum(i for i in range(len(case)) if case[i])
            # 어피치 점수 구하기
            apeach_score = sum(i for i in range(len(case)) if not case[i] and info[i])

            result = lion_score - apeach_score

            if result > maxi:
                maxi = result
                # 결과 저장
                answer = [info[i] + 1 if case[i] else 0 for i in range(len(case))]
                # 만약 화살 쏜 갯수가 n개보다 적으면 0점에 남은 화살 수 추가
                answer[0] += n - lion_arrow

    answer.reverse()
    return answer
```

## 핵심 포인트

- `itertools.product`를 사용하여 모든 경우의 수를 생성
- 각 점수대에서 "가져간다/안 가져간다"를 True/False로 표현
- 점수를 가져가려면 어피치보다 1발 더 많이 쏴야 함
- 남은 화살은 0점에 추가 (배열 reverse 활용)
- 가장 큰 점수 차를 갱신할 때만 결과 저장
