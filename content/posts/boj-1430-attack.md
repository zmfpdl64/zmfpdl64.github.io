---
title: "백준 1430번: 공격 - BFS로 네트워크 에너지 전달 문제 풀이"
date: 2023-09-16T20:38:12+09:00
draft: false
tags: ["Python", "알고리즘", "BFS", "백준"]
categories: ["코딩테스트"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "백준 1430번 공격 문제를 BFS와 heapq를 활용하여 해결하는 방법"
---

## 문제 링크

[백준 1430번 공격](https://www.acmicpc.net/problem/1430)

## 문제 설명

해당 문제는 적이 존재하고 타워에서 사정거리 안에 든 적에게 에너지를 모두 담아 공격합니다. 만약 사정거리에 닿지 않는다면 근처 타워에게 에너지를 전달하고, 전달하는 과정에서 에너지가 반으로 줄어듭니다.

![백준 1430 공격 문제](/images/posts/boj-1430-attack/백준-1430-공격-문제.png)

## 문제 조건

- 탑 갯수: 1 <= n <= 50
- 좌표: 0 <= x, y <= 1000
- 에너지 d: 1 <= d <= 100
- 사정거리 r: 1 <= r <= 500
- 재분배 가능
- r보다 작다면 제한 내의 에너지 공유 가능
- 에너지 공유 시 절반만 전달
- 적과 거리는 r보다 작아야 함
- 공격 시 모든 에너지를 쏨

## 문제 해결 아이디어

해당 문제는 네트워크 문제와 비슷합니다. 적으로부터 연결된 타워를 방문할 때마다 에너지를 추가하는 방식을 떠올렸습니다.

## 의사 코드

1. 일정 거리 안에 있는 타워, 적 그래프를 양방향으로 만듭니다.
2. 적의 위치부터 시작해서 인접 타워로 이동하며 에너지를 더합니다.
3. 에너지의 총점을 더합니다. 단 정수형일 때 소수점 1째자리까지 출력합니다.

## 코드 작성

```python
import heapq
import sys
import math

input = sys.stdin.readline
n, r, d, x, y = map(int, input().split())
tower = [[x, y]]  # 적 위치
graph = {i: [] for i in range(n + 1)}  # 연결 관계
vi_map = [False] * (n + 1)  # 방문 확인
total = 0

# 타워 입력받기
for i in range(n):
    tower.append(list(map(int, input().split())))

# 1. 일정 거리 안에 있는 타워, 적 양방향으로 만들기
for i in range(len(tower)):
    for j in range(i + 1, len(tower)):
        x1, y1 = tower[i]
        x2, y2 = tower[j]
        dis = math.sqrt(abs(x1 - x2) ** 2 + abs(y1 - y2) ** 2)
        if dis <= r:
            graph[i].append([dis, j])
            graph[j].append([dis, i])

# 2. 적의 위치부터 시작해서 인접 타워로 이동하며 에너지를 더하기
def bfs():
    global total
    queue = [[0, 0, 0]]
    vi_map[0] = True
    while queue:
        # t: 적으로부터 움직인 횟수
        # dis: 적과의 거리
        # id: tower 식별값
        t, dis, id = heapq.heappop(queue)
        for _dis, _nex in graph[id]:
            if not vi_map[_nex]:
                vi_map[_nex] = True
                total += d * (2 ** -t)
                heapq.heappush(queue, [t + 1, _dis, _nex])

bfs()

if isinstance(total, int):
    print(f'{total:.1f}')
else:
    print(total)
```

## 핵심 포인트

- 다른 BFS 문제와 유사하지만, 거리를 계산해서 서로 연결되어 있는지 확인
- 적으로부터 시작해서 에너지를 계산한다는 아이디어
- `heapq`를 이용해서 타워를 방문한 횟수, 거리를 queue에 오름차순으로 넣는 것이 중요
