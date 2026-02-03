---
title: "IP 프로토콜의 이해 - IPv4, 클래스, DHCP, NAT"
date: 2023-11-02T21:51:41+09:00
draft: false
tags: ["Network", "IP", "DHCP", "NAT", "CS"]
categories: ["Network"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "IP 프로토콜의 기본 개념과 주소 체계, DHCP, NAT 설명"
---

IP(Internet Protocol)은 송신 호스트와 수신 호스트가 패킷 교환 네트워크에서 정보를 주고받는데 사용하는 정보의 규약이며, OSI 네트워크 계층에서 호스트의 주소지정과 패킷 분할 및 조립 기능을 담당합니다.

### IP 주소 체계

IPv4와 IPv6로 나뉩니다.

IPv4는 32비트를 8비트 단위로 점을 찍어 표기하며, 123.45.67.89 같은 방식으로 IP를 나타내고

IPv6는 64비트를 16비트 단위로 점을 찍어 나타냅니다. 1001:db::ff00:42:8329

#### 클래스 기반 할당 방식

IP 주소 체계는 A, B, C, D, E 다섯 개의 클래스로 구분하는 클래스 기반 할당 방식이며 네트워크 주소와 호스트 주소의 크기로 클래스를 나눕니다.

![IP 클래스 구조](https://blog.kakaocdn.net/dna/T1XGF/btszDRBz1AR/AAAAAAAAAAAAAAAAAAAAAJd5zNuMra3q2ItMaMOPSiVDYU-iPmsdwtxPG1Uq8xYF/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=3CdxI%2FjYHBl%2F0vdgxeLCW4K%2FeZY%3D)

- A 클래스

  0.0.0.0 ~ 127.255.255.255

0000 0000 0000 0000 ~ 0111 1111 1111 1111

- B 클래스

  128.0.0.0 ~ 191.255.255.255

1000 0000 0000 0000 ~ 1011 1111 1111 1111

- C 클래스

  192.0.0.0 ~ 223.255.255.255

1100 0000 0000 0000 ~ 1101 1111 1111 1111

![IP 주소 예시](https://blog.kakaocdn.net/dna/dydEBW/btszHtzK7mI/AAAAAAAAAAAAAAAAAAAAAPpOkgYtHiH-l1CWLsK0bi5_aHpqWJH8JFW51QP1h2oi/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=Lh0OGiMFl4n%2BcsYX%2FRge%2BllR%2FY0%3D)

위의 글림 예시를 보면 12.0.0.0 의 A클래스 기반의 네트워크 구별 주소가 주어졌고 12.255.255.255는 브로드 캐스트 주소를 제외한 주소들을 컴퓨터에 부여할 수 있는 호스트 주소입니다.

A 클래스 방식은 사용하는 주소보다 버리는 주소가 많은 단점이 있었고 이를 해소하기 위해 DHCP와 IPv6, NAT이 나왔습니다.

### DHCP란

DHCP(Dynamic Host Configuration Protocol)은 IP 주소 및 기타 통신 매개변수를 자동으로 할당하기 위한 네트워크 프로토콜입니다. 네트워크 장치의 IP 주소를 수동으로 설정할 필요 없이 인터넷에 접속할 때마다 자동으로 IP 주소를 할당할 수 있습니다.

### NAT란

NAT(Network Address Translation)은 패킷이 라우팅 장치를 통해 전송되는 동안 패킷의 IP 주소 정보를 수정하여 IP 주소를 다른 주소로 매핑하는 방법입니다. IPv4 주소 체계만으로는 많은 주소들을 모두 감당하지 못하는 단점이 있는데, 이를 해결하기 위해 NAT로 공인 IP와 사설 IP로 나눠서 많은 주소를 처리합니다. NAT을 가능하게 하는 소프트웨어는 ICS, RRAS, Netfilter 등이 있습니다.

장점:

- 하나의 공인 IP로 여러개의 가상 IP로 분산할 수 있기 때문에 IP의 절약이 가능합니다.
- IP 주소와 외부에 드러나는 IP주소를 다르게 유지할 수 있기 때문에 내부 네트워크에 대한 어느 정도의 보안이 가능해집니다.

단점:

- 하나의 공인 IP를 여러기기가 같이 사용하기 때문에 많은 접속으로 인한 속도가 저하될 수 있습니다.
- 만약 신뢰하지 않는 공인 IP를 사용한다면 개인정보 유출할 수 있습니다.
