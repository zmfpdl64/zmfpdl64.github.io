---
title: "Spring Boot Redis 캐싱 서버 적용하기"
date: 2023-05-01T13:11:15+09:00
draft: false
tags: ["SpringBoot", "Redis", "캐싱", "InMemory"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "Spring Boot 프로젝트에 Redis 캐싱 서버를 적용하는 방법"
---

## Redis란 무엇인가?

Redis(Remote Dictionary Server)로 오픈 소스 기반의 인 메모리 데이터 저장소입니다.

## Redis의 특징

- 인메모리 기반 데이터 저장
- Key-Value 구조
- 다양한 데이터 타입 지원

## Redis 사용 용도

일반적으로는 캐싱, 세션 관리, 풀링, 메시지 브로커, 게임 랭킹 등 다양한 영역에서 사용됩니다.

## Redis의 장점

- 빠른 읽기/쓰기 성능
- 다양한 데이터 구조 지원
- 영속성 옵션 제공

## Redis의 단점

- 메모리 기반이므로 용량 제한
- 데이터 휘발성 (설정에 따라 다름)

## Redis 캐싱 서버 적용하기

### 주의 사항

Member 클래스를 자주 업데이트하는 상황이 발생하면 Update가 될 때마다 업데이트된 유저의 데이터를 Redis에 적용해 주어야 합니다.

### Redis build.gradle

```groovy
implementation 'org.springframework.boot:spring-boot-starter-data-redis'
```

data-redis 의존성을 추가해줍니다.

### Redis Configuration 빈 등록하기

```java
@Configuration
public class RedisConfig {

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory();
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory());
        return template;
    }
}
```

redisConnectionFactory는 스프링과 Redis가 동작할 수 있게 연결해주는 설정들입니다.

![Redis Configuration](https://blog.kakaocdn.net/dna/qb81p/btsdgUfS5BF/AAAAAAAAAAAAAAAAAAAAAEFL6nrmN6tY9cPxBz3C2G4W2DGfkFX99PYHtpqBZL8H/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=iaCLiwlFWFiCBkkQ%2FZUxmKsiHnc%3D)

### Member Cache DAO 생성하기

```java
@Repository
@RequiredArgsConstructor
public class MemberCacheRepository {

    private final RedisTemplate<String, Member> redisTemplate;

    public void setMember(Member member) {
        String key = getKey(member.getUsername());
        redisTemplate.opsForValue().set(key, member);
    }

    public Optional<Member> getMember(String username) {
        String key = getKey(username);
        Member member = redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(member);
    }

    private String getKey(String username) {
        return "MEMBER:" + username;
    }
}
```

Redis에서 getMember 메소드와 setMember 메소드를 만들었습니다.

![Member Cache DAO](https://blog.kakaocdn.net/dna/LdwZ3/btsdlKDIIND/AAAAAAAAAAAAAAAAAAAAAL34zlo40bsouINjk0ioqx_4SunAdleg2b38mvqmH2Y-/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=xuy2BoYQJMgMWJFYWdmbHZu71lc%3D)

### Member 서비스단에서 Caching OR DB조회

```java
public Member loadMember(String username) {
    return memberCacheRepository.getMember(username)
        .orElseGet(() -> {
            Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Member not found"));
            memberCacheRepository.setMember(member);
            return member;
        });
}
```

캐시 서버에 Member의 관한 정보가 없으면 DB를 조회하는 코드입니다.

### 로그인 시 Redis에 캐싱

```java
public void login(String username) {
    Member member = memberRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Member not found"));
    memberCacheRepository.setMember(member);
}
```

로그인을 할 때 Member의 정보를 캐싱해주는 로직입니다.

## 결론

Redis를 사용하면 자주 조회되는 데이터를 메모리에 캐싱하여 데이터베이스 부하를 줄이고 응답 속도를 향상시킬 수 있습니다.
