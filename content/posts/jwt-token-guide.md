---
title: "[인증/인가] JWT토큰 생성 과정과 원리에 대해서"
date: 2023-07-05T14:26:00+09:00
draft: false
tags: ["JWT", "인증", "HS256", "SHA256", "암호화"]
categories: ["Security"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "JWT 토큰의 생성 과정과 HS256 암호화 원리 설명"
---

## JWT토큰이란?

**JWT(JSON WEB TOKEN)은 당사자 간에 정보를 JSON 개체로 안전하게 전송하기 위한 간결하고 독립적인 방법을 정의하는 개방형 표준**입니다.

![JWT 토큰 구조](https://blog.kakaocdn.net/dna/Kqkkv/btsmtc526RV/AAAAAAAAAAAAAAAAAAAAAAI2WgHxpZTdoLfkSEGnOTuSoWGVrQWR34M8Fo_cRWhR/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=huTJHdoE14wATxR07eyjIO5H928%3D)

토큰은 기본적으로 서버에게 본인 확인을 증명하는 수단으로 이해할 수 있습니다.

## JWT토큰 HS 기반 설명

HS256은 HMAC SHA 256의 약자로, 헤더, 페이로드, 비밀키를 SHA256으로 암호화하는 방식입니다.

![JWT 인증 흐름](https://blog.kakaocdn.net/dna/dTWl3S/btsmrB6XisC/AAAAAAAAAAAAAAAAAAAAAG3e4OYSsxvYtHT3GiDWVPCfRp215LLLScgAGRrdyTZT/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=pso%2FxbNlGbKMssl2fSf4JOX8xzY%3D)

## 1. 클라이언트 로그인

사용자가 아이디와 비밀번호를 입력하여 서버에 전송합니다.

## 2. 서버 인증

```java
@PostMapping("/login")
public Response<MemberLoginResponse> login(@RequestBody MemberJoinRequest request) {
    String token = memberService.login(request.getUsername(), request.getPassword());
    return Response.success(new MemberLoginResponse(token));
}
```

서버는 데이터베이스에서 사용자 존재 여부를 확인합니다.

**성공 응답:**

```json
{
    "resultCode": "SUCCESS",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNjg4NTI4Mzk4LCJleHAiOjE2OTExMjAzOTh9.nKespnex3zaEd_TOK5kTfJ3J9vkKNJaR98NRUiyHaQk"
    }
}
```

## 3. JWT 토큰 생성

```
Base64UrlEncode(헤더) + "." + Base64UrlEncode(페이로드) + "." +
HS256(Base64UrlEncode(헤더) + "." + Base64UrlEncode(페이로드), 비밀 키)
```

## 4. JWT 토큰 암호화

- 헤더와 페이로드는 **Base64로 인코딩** (복호화 가능)
- 서명은 **비밀키를 이용한 SHA256 단방향 암호화**

## 5. JWT 토큰 검증

**SHA256 방식은 단방향이지만 동일한 input값을 암호화 한다면 결과값은 동일한 output이 나온다**는 원리를 활용합니다.

1. 서버가 헤더와 페이로드를 디코딩
2. 비밀키로 서명을 재생성
3. 전달받은 서명과 비교

## 6. JWT 서버에서 토큰 전송

토큰은 응답 본문에 포함되어 클라이언트로 전송되며, 클라이언트는 LocalStorage나 Cookie에 저장합니다.

```javascript
localStorage.setItem('token', res.data.result.token);
```

## 7. 클라이언트 요청

```javascript
axios({
  url: '/api/v1/posts?size=5&sort=id&page=' + pageNum,
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
```

## Bearer 토큰

Bearer 토큰은 토큰 소유자에게 액세스 권한을 부여하는 토큰입니다. Authorization 헤더에 'Bearer' 접두사로 시작하는 약속된 형식입니다.

> **핵심**: JWT는 서명을 통해 토큰의 무결성을 검증하며, 비밀키는 절대 노출되어서는 안 됩니다.
