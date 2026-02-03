---
title: "Transaction 커밋과 flush 타이밍 이해하기"
date: 2023-04-20T00:00:00+09:00
draft: false
tags: ["SpringBoot", "JPA", "Transaction", "flush"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "JPA에서 save()와 saveAndFlush()의 차이점과 트랜잭션 커밋 시점 이해"
---

## 문제 상황

게시글을 수정하는 단계에서 `updated_at` 수정 필드가 업데이트가 되지 않아서 찾아보게 됐습니다.

```java
@Transactional
public Post modify(String title, String body, String username, Integer postId) {
    // 포스트 찾기
    log.info("포스트 찾기");
    PostEntity postEntity = postRepository.findById(postId).orElseThrow(() ->
        new SnsException(Errorcode.NOT_EXISTS_POST, String.format("게시글 ID: %d", postId)));

    // 생성자, 수정자 일치 확인
    log.info("생성자 수정자 일치");

    if (!Objects.equals(postEntity.getMember().getName(), username)){
        throw new SnsException(Errorcode.INVALID_PERMISSION,
            String.format("생성자: %s \n 수정자: %s", postEntity.getMember().getName(), username));
    }

    postEntity.setTitle(title);
    postEntity.setBody(body);
    PostEntity save = postRepository.save(postEntity);

    return Post.fromEntity(save);
}
```

## save VS saveAndFlush

### save() 메소드

`save()` 메소드의 특징은 영속성 컨텍스트를 저장하고 **Transaction 커밋이 끝나야지만 DB에 flush()가 됩니다.**

### saveAndFlush() 메소드

`saveAndFlush()` 메소드는 영속성 컨텍스트를 저장하고 **바로 DB에 flush()** 합니다.

### flush()란?

`flush()`는 영속성 컨텍스트에 있는 데이터를 DB에 적용하는 과정을 의미합니다.

### flush()가 발생하는 시점

만약 `save` 메소드를 이용한다면 아래와 같은 상황에서 `flush()`가 발생합니다:

1. **트랜잭션 커밋 시**
2. **JPQL 쿼리 실행 시**
3. **flush() 메소드 직접 호출**

## 문제점 발견

```java
PostEntity save = postRepository.save(postEntity);
return Post.fromEntity(save);
```

문제가 발생하는 부분입니다.

해당 메소드가 끝나기 전에 `PostEntity` → `Post`(DTO)로 변환하기 때문에, 아직 `updated_at`이 적용되지 않은 `PostEntity`의 `updated_at` 값이 `Post`에 전달된 것입니다.

## 해결 방법

문제점을 해결하기 위해서는:

1. **flush() 메소드를 사용하거나**
2. **saveAndFlush() 메소드를 사용**

하여 해결할 수 있습니다.

문제를 확인할 때 아래와 같은 현상이 발생합니다.

![save 후 null 반환 현상](https://i.imgur.com/TCyZ5kB.png)

이 문제는 saveAndFlush() 또는 flush()를 사용하면 해결할 수 있습니다.

![saveAndFlush 사용 예시](https://i.imgur.com/Vs10nVm.png)

## 결론

JPA의 영속성 컨텍스트는 트랜잭션 커밋 시점에 DB에 반영됩니다. 따라서 트랜잭션 내에서 엔티티를 수정한 후 바로 DB에 반영된 값(예: `@UpdateTimestamp`로 자동 설정되는 값)을 사용해야 할 경우, `saveAndFlush()`를 사용하거나 명시적으로 `flush()`를 호출해야 합니다.
