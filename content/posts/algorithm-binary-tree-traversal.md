---
title: "이진트리의 전위, 중위, 후위 순회 알아보기"
date: 2023-05-11T19:28:14+09:00
draft: false
tags: ["알고리즘", "Tree", "Python", "순회"]
categories: ["알고리즘"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "이진트리의 세 가지 순회 방법(전위, 중위, 후위)의 원리와 구현"
---

## 이진트리란?

이진 트리는 루트(Root) 노드에서 시작하여 각 노드는 왼쪽 서브트리(Left Subtree)와 오른쪽 서브트리(Right Subtree)로 이루어져 있습니다. 각 노드의 자식 노드는 **최대 두 개**이기 때문에, 이진 트리는 가장 단순한 형태의 트리 중 하나입니다.

![이진트리 구조](https://blog.kakaocdn.net/dna/T5moS/btseK3pFNsu/AAAAAAAAAAAAAAAAAAAAAHu7fK4Mo4lyX0_0dR-LypvPDpBJjLAsN0zxJVbcSxUM/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=Mp0S8x3QIe00NI5kZ8%2FIt12v2X0%3D)

## 이진트리의 활용 분야

- **데이터베이스:** 색인(Index)을 만드는 데 사용
- **정렬 알고리즘:** 이진 탐색 트리(Binary Search Tree)
- **압축 알고리즘:** 허프만 코딩(Huffman Coding)
- **인공지능:** 의사결정나무(Decision Tree)

## 이진트리의 장단점

### 장점

- 검색 속도가 빠릅니다
- 데이터를 효율적으로 저장합니다
- 구현이 간단합니다

### 단점

- 균형이 맞지 않을 경우 성능이 저하됩니다
- 트리의 높이가 너무 높아질 수 있습니다
- 메모리 사용량이 많을 수 있습니다

## 이진트리의 순회 방법

```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

### 전위 순회 (Preorder)

![전위 순회](https://blog.kakaocdn.net/dna/cSxn0z/btse8illdfV/AAAAAAAAAAAAAAAAAAAAAPG8aAgRbdAntLd01UY-RkkPv0BBi9CXhaa3CZMoZyjb/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=tI7vsLsIkZSUpMFw4l3GM5IFd8A%3D)

**순서:** 중앙 → 왼쪽 → 오른쪽

**결과:** 1 → 2 → 4 → 5 → 3 → 6 → 7

```python
def pre_order(node):
    print(node.data, end=' ')  # 먼저 출력
    if node.left_node is not None:
        pre_order(tree[node.left_node])
    if node.right_node is not None:
        pre_order(tree[node.right_node])
```

전위는 **print가 가장 먼저** 나오기 때문에 전위

### 중위 순회 (Inorder)

![중위 순회](https://blog.kakaocdn.net/dna/bgOH8a/btseQkjVyNW/AAAAAAAAAAAAAAAAAAAAANrBRRCRhWOLDjQ4JykvjXoy0xhs3RL2_h-M4DpXr-Pc/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=1a8X3fQUyCtk4fiQZ%2FM5fmI%2Farg%3D)

**순서:** 왼쪽 → 중앙 → 오른쪽

**결과:** 4 → 2 → 5 → 1 → 6 → 3 → 7

```python
def in_order(node):
    if node.left_node is not None:
        in_order(tree[node.left_node])
    print(node.data, end=' ')  # 중간에 출력
    if node.right_node is not None:
        in_order(tree[node.right_node])
```

중위는 **print가 중간에** 나오기 때문에 중위

### 후위 순회 (Postorder)

![후위 순회](https://blog.kakaocdn.net/dna/c9CRwa/btseQSHcl8o/AAAAAAAAAAAAAAAAAAAAAN1G7n_46lpnR_2zA5rVVq0PT-6pob2gY2c1PRf1veOp/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=yEtQSo%2BbelE6uon%2B86Lz3gwgaA8%3D)

**순서:** 왼쪽 → 오른쪽 → 중앙

**결과:** 4 → 5 → 2 → 6 → 7 → 3 → 1

```python
def post_order(node):
    if node.left_node is not None:
        post_order(tree[node.left_node])
    if node.right_node is not None:
        post_order(tree[node.right_node])
    print(node.data, end=' ')  # 마지막에 출력
```

후위는 **print가 마지막에** 나오기 때문에 후위

## 전체 코드

```python
tree = {}

class Node:
    def __init__(self, data, left_node, right_node):
        self.data = data
        self.left_node = left_node
        self.right_node = right_node

def pre_order(node):
    print(node.data, end=' ')
    if node.left_node is not None:
        pre_order(tree[node.left_node])
    if node.right_node is not None:
        pre_order(tree[node.right_node])

def in_order(node):
    if node.left_node is not None:
        in_order(tree[node.left_node])
    print(node.data, end=' ')
    if node.right_node is not None:
        in_order(tree[node.right_node])

def post_order(node):
    if node.left_node is not None:
        post_order(tree[node.left_node])
    if node.right_node is not None:
        post_order(tree[node.right_node])
    print(node.data, end=' ')

def solution(input):
    for i in input:
        cur, left, right = i
        tree[cur] = Node(cur, left, right)

    print('전위순회:', end=' ')
    pre_order(tree[1])
    print()

    print('중위순회:', end=' ')
    in_order(tree[1])
    print()

    print('후위순회:', end=' ')
    post_order(tree[1])
    print()

# 실행
solution([
    [1, 2, 3],
    [2, 4, 5],
    [3, 6, 7],
    [4, None, None],
    [5, None, None],
    [6, None, None],
    [7, None, None]
])
```

### 출력 결과

```
전위순회: 1 2 4 5 3 6 7
중위순회: 4 2 5 1 6 3 7
후위순회: 4 5 2 6 7 3 1
```

## 핵심 정리

| 순회 방식 | 순서 | 외우는 방법 |
|-----------|------|-------------|
| 전위 순회 | 중앙 → 왼쪽 → 오른쪽 | print가 가장 먼저 |
| 중위 순회 | 왼쪽 → 중앙 → 오른쪽 | print가 중간에 |
| 후위 순회 | 왼쪽 → 오른쪽 → 중앙 | print가 마지막에 |
