---
title: "프로그래머스 프렌즈 4블록 - 2x2 블록 제거 시뮬레이션"
date: 2023-05-15T14:34:08+09:00
draft: false
tags: ["Python", "알고리즘", "시뮬레이션", "프로그래머스"]
categories: ["코딩테스트"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "프로그래머스 프렌즈 4블록 문제를 2D 배열 시뮬레이션으로 해결하는 방법"
---

## 문제 정의

2x2 블록 안에 같은 문자열이 존재할 때 블록을 삭제하여 삭제된 모든 블록의 개수를 반환하는 문제입니다.

![프렌즈 4블록 문제](/images/posts/programmers-friends-4-block/프렌즈-4블록-문제.png)

중학교 때 애니팡을 많이 했었는데, 이 문제를 보니까 살짝 추억이 생각나네요. 과거에 했던 게임이라 그런지 문제를 이해하는 데 크게 어려움은 없었던 문제였습니다.

## 문제 해결 아이디어

- 4칸을 조회할 수 있는 배열 만들기
- x, y 좌표 완전 탐색
- 4칸 모두 일치하면 좌표 저장
- 중복되는 좌표 제거
- board의 좌표 제거
- 제거할 좌표가 존재하지 않을 때까지 위의 과정 반복

## 주의 사항

1. 우선 전부 탐색해서 삭제해야 할 좌표를 찾아서 **한 번에 삭제**해줘야 합니다
2. 중복되는 좌표 중복 제거하기

## 코드 작성

```python
sq = [[0, 0], [0, 1], [1, 0], [1, 1]]  # 이동 배열 만들기

def solution(m, n, board):
    answer = 0
    board = [list(i)[::-1] for i in zip(*board)]  # x축 y축 뒤집기

    while True:  # 제거할 좌표 없을 때까지 반복
        remove_list = set()
        for i in range(n - 1):
            for j in range(m - 1):  # board 완전 탐색
                try:
                    now = board[i][j]
                    for x, y in sq:  # 4칸 모두
                        if now != board[i + x][j + y]:
                            break
                    else:  # 모두 일치 시 제거할 좌표 추가
                        for x, y in sq:
                            remove_list.add((x + i, y + j))
                except:
                    pass

        if len(remove_list) == 0:
            break

        remove_list = list(remove_list)
        remove_list.sort(key=lambda x: -x[1])  # pop을 할 때 위에서부터 해야 원하는 idx를 제거할 수 있습니다

        for x, y in remove_list:
            answer += 1
            board[x].pop(y)

    return answer
```

## 핵심 포인트

- `set()`을 사용하여 중복 좌표 제거
- 배열을 transpose하여 x축/y축을 뒤집어 처리
- `pop()` 시 인덱스 문제를 해결하기 위해 y좌표 내림차순 정렬
- 삭제할 좌표를 모두 찾은 후 한 번에 삭제
