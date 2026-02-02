---
title: "[SpringBoot] Spring Batch 이용권 만료"
date: 2023-12-17T19:56:00+09:00
draft: false
tags: ["SpringBoot", "SpringBatch", "배치", "이용권"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "Spring Batch를 활용한 이용권 만료 처리 구현"
---

## 스프링 Batch 구조

Spring Batch는 **Job, Step, Reader, Processor, Writer** 구조로 이루어져 있습니다.

## Step 처리 방식

Step은 ItemReader를 사용해 각 아이템을 개별적으로 읽은 후 ItemProcessor에 전달하여 필요한 처리를 수행합니다. 청크 사이즈에 도달할 때까지 반복하고, 완성된 청크를 ItemWriter로 전달합니다.

## ItemReader

**ItemReader를 통해 스프링 배치가 아이템 리더에 리드 메소드를 호출하여 해당 메소드는 스텝 내에서 처리할 아이템 한 개를 반환**합니다.

대량 데이터 처리 시 메모리 문제를 피하기 위해 두 가지 방식을 사용합니다:
- **Cursor ItemReader:** 단일 연결 유지 (장시간 작업 시 연결 끊김 위험)
- **Paging ItemReader:** 청크 크기 단위로 페이지를 가져옴 (안정성 우수)

## ItemWriter

**아이템 Writer는 데이터를 쓰는데 사용하며, 개별 아이템이 아닌 Chunk 단위로 씁니다.**

## 이용권 만료 배치 코드

### Step 구성

```java
@Bean
public Step expirePassesStep() {
    return this.stepBuilderFactory.get("expirePassesStep")
        .<PassEntity, PassEntity>chunk(CHUNK_SIZE)
        .reader(expirePassesItemReader())
        .processor(expirePassesItemProcessor())
        .writer(expirePassesItemWriter())
        .build();
}
```

### Job 구성

```java
@Bean
public Job expirePassesJob() {
    return this.jobBuilderFactory.get("expirePassesJob")
        .start(expirePassesStep())
        .build();
}
```

### ItemReader 선택 이유

**Cursor 기반 방식**을 사용했습니다. 이유는 Paging 사용 시 status 변경 중 offset 기반 조회로 인해 데이터가 누락되는 현상이 발생하기 때문입니다.

### ItemProcessor

비즈니스 로직을 수행하며, 만료된 이용권을 EXPIRED 상태로 변경합니다.

### ItemWriter

EntityManager를 래핑한 Wrapper 역할을 수행합니다.

## 테스트 코드

```java
@Slf4j
@SpringBootTest
@SpringBatchTest
@ActiveProfiles("test")
@ContextConfiguration(classes = {ExpirePassesJobConfig.class, TestBatchConfig.class})
public class ExpirePassesJobConfigTest {
    @Autowired
    private JobLauncherTestUtils jobLauncherTestUtils;

    @Autowired
    private PassRepository passRepository;

    @Test
    public void test_expirePassesStep() throws Exception {
        // given
        addPassEntities(10);

        // when
        JobExecution jobExecution = jobLauncherTestUtils.launchJob();
        JobInstance jobInstance = jobExecution.getJobInstance();
        List<PassEntity> all = passRepository.findAll();

        // then
        assertEquals(ExitStatus.COMPLETED, jobExecution.getExitStatus());
        assertEquals("expirePassesJob", jobInstance.getJobName());
        assertEquals(all.size(), 10);
        assertTrue(isNotExpirePass(all));
    }
}
```

### 검증 항목

- 배치 실행 완료 여부
- Job 이름 확인
- 처리된 행 개수 확인
- 이용권 만료 상태 변경 확인

> **핵심**: Cursor vs Paging 선택 시 데이터 변경 여부를 고려해야 합니다.
