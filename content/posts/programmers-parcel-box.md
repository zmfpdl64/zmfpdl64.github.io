---
title: "프로그래머스 택배상자 - Stack 활용 문제 풀이"
date: 2023-06-29T14:09:43+09:00
draft: false
tags: ["Python", "알고리즘", "Stack", "프로그래머스"]
categories: ["코딩테스트"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "프로그래머스 택배상자 문제를 스택 자료구조로 해결하는 방법"
---

## 문제 링크

[프로그래머스 택배상자](https://school.programmers.co.kr/learn/courses/30/lessons/131704)

## 간단한 문제 설명

메인 컨테이너 벨트를 타고 상자들이 순서대로 전달됩니다. 이 상자들을 서브 컨테이너 벨트를 사용하여 트럭에 전달하는 문제입니다.

![택배상자 문제](https://blog.kakaocdn.net/dna/Nz907/btslRmgNLOO/AAAAAAAAAAAAAAAAAAAAAOEHKhjSpz_inYCt2X-toQd6RkVw-EU-tA4A_FOcas55/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=n%2B1C%2BlkJbs9ovFd96aOYRlwmUK8%3D)

- 메인 컨테이너 벨트로 상자들이 1, 2, 3, 4, 5 순서로 전달됩니다
- 트럭에서 상자를 쌓고 싶은 순서는 다릅니다
- 서브 컨테이너 벨트에 stack 방식으로 상자를 보관할 수 있습니다
- 상자들은 마지막에 넣은 것을 가져와 트럭에 실을 수 있습니다

## 간단한 예시

트럭에 실어야 하는 순서가 `[2, 4, 5, 3, 1]`이라고 한다면:

1. 서브 컨테이너에 1, 2 박스를 실습니다
2. 트럭으로 2번 박스를 전달합니다. `sub_container = [1]`, `truck = [2]`
3. 서브 컨테이너에 3, 4 박스를 실습니다
4. 트럭으로 4번 박스를 전달합니다. `sub_container = [1, 3]`, `truck = [2, 4]`
5. 서브 컨테이너에 5 박스를 싣고 트럭으로 옮깁니다. `sub_container = [1, 3]`, `truck = [2, 4, 5]`
6. 모든 박스를 서브 컨테이너로 옮겼기 때문에 서브 컨테이너에서 트럭으로 옮겨줍니다
7. `truck = [2, 4, 5, 3, 1]`

## 의사 코드 작성

1. 트럭에 올려야 할 박스가 보일 때까지 박스를 서브 컨테이너로 전달한다
2. 트럭에 올려야 할 박스를 서브 컨테이너에서 찾았다면 트럭으로 옮긴다
3. 이것을 모든 박스를 서브 컨테이너에 옮길 때까지 반복한다
4. 서브 컨테이너에 남겨진 박스를 트럭에 옮긴다

## 코드 작성

```python
from collections import deque

def solution(order):
    answer = 1
    order = deque(order)
    stack = []
    result = []
    size = len(order)

    for i in range(1, size + 1):
        stack.append(i)  # 박스를 서브 컨테이너에 옮긴다
        while stack:
            if order and stack[-1] == order[0]:  # 서브 컨테이너에서 트럭으로 옮긴다
                num = stack.pop()
                order.popleft()
                result.append(num)
            else:  # 만약 트럭으로 옮기는 순서가 잘못 됐다면 중지한다
                break

    return len(result)  # 트럭에 실은 박스 갯수를 반환한다
```

## 핵심 포인트

- Stack(LIFO) 자료구조의 특성을 활용
- 서브 컨테이너의 top과 트럭에 실어야 할 순서를 비교
- 순서가 맞지 않으면 더 이상 진행할 수 없음
