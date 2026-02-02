---
title: "[SpringBoot] 스프링 배치란?"
date: 2023-12-16T16:38:00+09:00
draft: false
tags: ["SpringBoot", "SpringBatch", "배치", "대용량처리"]
categories: ["SpringBoot"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "Spring Batch의 개념과 주요 용어, 장점 정리"
---

## Spring Batch란

일괄처리를 위한 오픈 소스 프레임워크입니다.

SpringBatch는 **로깅/추적, 트랜잭션 관리, 작업 처리 통계를 포함하여 대용량 레코드 처리에 필수적인 재사용 가능한 기능**을 제공합니다.

- Job 다시 시작, 건너뛰기, 리소스 관리
- 최적화 및 분할 기술을 통한 대용량 및 고성능 배치 작업 지원

## Spring Batch 용어

### Job

배치처리 과정을 하나의 단위로 만들어 놓은 객체이며, 배치처리 계층의 최상단에 위치합니다.

### JobInstance

Job 실행의 단위를 나타냅니다. 예를 들어 1월 1일 실행과 1월 2일 실행은 각각의 JobInstance가 생성됩니다.

### JobParameters

JobInstance를 구별하는 역할을 하며, JobInstance에 전달되는 매개변수입니다.

**지원 타입:** String, Double, Long, Date (4가지만 지원)

### JobExecution

JobInstance 실행 시도에 대한 객체로, 상태, 시작시간, 종료시간 등의 정보를 담고 있습니다.

### Step

Job의 배치처리를 정의하고 순차적 단계를 캡슐화합니다. Job은 최소 1개 이상의 Step을 가져야 합니다.

**두 가지 방식:**

| 방식 | 설명 |
|------|------|
| Tasklet | 하나의 작업을 반복 수행하는 방식 |
| Chunk | Reader-Processor-Writer 묶음으로 여러 작업을 처리하는 방식 |

### StepExecution

Step 실행 시도에 대한 객체로, read 수, write 수, commit 수, skip 수 등의 정보를 저장합니다.

### ExecutionContext

Job에서 데이터를 공유할 수 있는 저장소로, JobExecutionContext와 StepExecutionContext 2가지가 있습니다.

### JobRepository

모든 배치 처리 정보를 담고 있는 메커니즘입니다.

### JobLauncher

Job과 JobParameters를 사용하여 Job을 실행하는 객체입니다.

### ItemReader / ItemProcessor / ItemWriter

| 컴포넌트 | 역할 |
|----------|------|
| ItemReader | Step에서 Item을 읽어오는 인터페이스 |
| ItemProcessor | Reader에서 읽어온 Item을 데이터로 처리 |
| ItemWriter | 처리된 Data를 Write |

## 장점

1. **대용량 데이터 처리에 최적화**되어 고성능 제공
2. 로깅, 통계처리, 트랜잭션 관리 등 **재사용 가능한 필수 기능** 지원
3. **자동화된 처리**로 수동 작업 제거
4. **예외 사항 및 비정상 동작에 대한 방어 기능** 존재
5. 프로세스 구조 이해 후 **비즈니스 로직에만 집중** 가능

## 사용 예시

- 데이터베이스, 파일, 대기열에서 많은 수의 레코드를 읽고 처리
- 동시 및 대규모 병렬 처리
- 단계별, 엔터프라이즈 메시지 중심 처리 서비스
- 종속 단계의 순차 처리
- 일괄 거래
- 예약 및 반복 처리
