---
title: "프로그래머스 길 찾기 게임 - 이진 트리 자료구조로 풀기"
date: 2023-05-13T17:56:49+09:00
draft: false
tags: ["Python", "알고리즘", "Tree", "프로그래머스"]
categories: ["코딩테스트"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "프로그래머스 길 찾기 게임 문제를 이진 트리 자료구조로 구현하여 전위/후위 순회로 해결하는 방법"
---

## 문제 링크

[프로그래머스 길 찾기 게임](https://school.programmers.co.kr/learn/courses/30/lessons/42892)

## 문제 설명

x, y 좌표로 이루어진 이진 트리의 맵에서 전위 순회, 후위 순회 방식으로 순회한 노드의 번호들을 반환하는 문제입니다.

![길 찾기 게임 문제](https://blog.kakaocdn.net/dna/b6B2J9/btsfe7qisKE/AAAAAAAAAAAAAAAAAAAAAJxJwMylcBU182-Xm8VDJwhzajFFPpnQ-n3WEEieO79L/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=uiVJGKaISMgVqwt7ou3bD%2BReJlA%3D)

## 문제 해결 방법

이 문제를 해결하기 위해서 트리 자료구조를 만들어서 문제를 해결했습니다.

## 트리 자료구조 만들기

```python
class Node:
    def __init__(self, x, y, value=None, left=None, right=None, parent=None):
        self.x = x
        self.y = y
        self.value = value
        self.left = left
        self.right = right
        self.parent = parent
```

필드 구성:
- x와 y 좌표
- 자식 노드를 저장할 `left`, `right`
- 부모 노드를 가리키는 `parent` 필드

## 노드를 추가하는 방식

노드 추가 방식은 양방향 링크드 리스트와 유사하게 작성했습니다.

![노드 삽입 방식](https://blog.kakaocdn.net/dna/bgI0Xf/btsffvSeeBH/AAAAAAAAAAAAAAAAAAAAAKXRmmWp9RQjhjqjACLPi09tvGiJ0_yeVRzoN2qfAoh6/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=XmAt%2B374ldbCmeSUu8hEzhy3CVs%3D)

1번, 2번이 연결되어 있는 상태에서 3번 노드가 추가되면:
- 3번 노드의 부모 노드와 1번 LEFT(자식 노드)를 연결시키고 기존의 연결은 끊어줍니다
- 3번 노드와 2번 노드도 동일하게 처리합니다

## Node 삽입 메소드

```python
def insert(self, node):
    if node.y < self.y:  # 1. 생성한 노드 y값이 비교할 노드 y값보다 작을 때
        if node.x < self.x:  # 1.1. x값이 작을 때 -> left
            if self.left is None:
                self.left = node
                node.parent = self
            else:
                self.left.insert(node)  # 자식이 존재할 때 자식노드를 향해 insert()
        else:  # 1.2. x값이 클 때 -> right
            if self.right is None:
                self.right = node
                node.parent = self
            else:
                self.right.insert(node)
    else:  # 2. 생성할 노드 y값이 비교할 노드 y값보다 클 때
        if node.x > self.x:  # 2.1. x값이 클 때
            node.left = self
            node.parent = self.parent
            self.parent = node
            if self.right is not None and self.right.x > node.x:
                node.right = self.right
                self.right.parent = node
                self.right = None
        else:  # 2.2. x값이 작을 때
            node.right = self
            node.parent = self.parent
            self.parent = node
            if self.left is not None and self.left.x < node.x:
                node.left = self.left
                self.left.parent = node
                self.left = None
    return
```

## 순회 메소드

### 전위 순회

```python
def preorder(self, node, res):
    res.append(node.value)
    if node.left is not None:
        node.preorder(node.left, res)
    if node.right is not None:
        node.preorder(node.right, res)
```

### 후위 순회

```python
def postorder(self, node, res):
    if node.left is not None:
        node.postorder(node.left, res)
    if node.right is not None:
        node.postorder(node.right, res)
    res.append(node.value)
```

## 실행 함수

```python
def solution(nodeinfo):
    pre = []
    post = []

    for i, value in enumerate(nodeinfo):
        nodeinfo[i] = [value[0], value[1], i + 1]
    nodeinfo.sort(key=lambda x: (-x[1], x[0]))  # y 내림차순, x 오름차순 정렬

    node1 = Node(nodeinfo[0][0], nodeinfo[0][1], nodeinfo[0][2])
    for i in range(1, len(nodeinfo)):
        x, y, v = nodeinfo[i]
        node1.insert(Node(x, y, v))

    node1.preorder(node1, pre)
    node1.postorder(node1, post)
    return [pre, post]
```

## 겪은 문제점

### 1. 입력값 정렬 및 인덱싱

트리 구조의 속성 중 하나는 root 노드는 한 개만 존재해야 한다는 점입니다. 최상위 부모 노드부터 최하위 자식 노드를 순서대로 정렬해서 노드를 추가할 필요가 있습니다.

### 2. 부모 노드 교체 시 자식 노드 x값 비교

노드를 삽입할 때 기존 자식 노드의 x값을 비교해서 적절한 위치에 재배치해야 합니다.

![부모 노드 교체](https://blog.kakaocdn.net/dna/bkMfuV/btsfdrCP8KO/AAAAAAAAAAAAAAAAAAAAAGDp7VSyBC7NI4ydtpxUZaGcEIdKnKddgbp4SkTwc3C6/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=Qstk%2FuiSe76YAkyg6EKtlqTztxQ%3D)

![자식 노드 재배치](https://blog.kakaocdn.net/dna/bmCzil/btsfdcy8aPd/AAAAAAAAAAAAAAAAAAAAAIM27-aTdhiN9Wt5K-YvYNYnTH2_aF5aVk-9tMXH_zEx/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=FuV3rQNcuEkXY8eGNtDSi%2FeS6kI%3D)

## 핵심 포인트

- 이진 트리 자료구조를 직접 구현
- y값 기준 내림차순 정렬 후 순서대로 삽입
- 부모-자식 관계를 양방향으로 관리
- 전위/후위 순회 재귀 함수 구현
