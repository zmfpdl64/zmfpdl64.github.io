const crypto = require("crypto");

const privateContent = `
  <!-- 이력서 & 포트폴리오 PDF -->
  <section class="portfolio-section private-content">
    <h2>📄 이력서 & 포트폴리오</h2>
    <p class="section-hint">클릭하여 문서 확인</p>
    <div class="document-grid">
      <div class="document-card" data-pdf-url="/certificates/%EC%9D%B4%EB%A0%A5%EC%84%9C_20251218.pdf" data-title="이력서">
        <span class="document-icon">📝</span>
        <div class="document-info">
          <h4>이력서</h4>
          <p>Resume / CV</p>
        </div>
      </div>
      <div class="document-card" data-pdf-url="/certificates/%EC%9D%B4%EC%9A%B0%EC%A7%84_%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4_2025_11%20(3).pdf" data-title="포트폴리오">
        <span class="document-icon">📂</span>
        <div class="document-info">
          <h4>포트폴리오</h4>
          <p>Portfolio Document</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 프로젝트 상세 -->
  <section
    class="portfolio-section private-content"
    id="project-details-section"
  >
    <h2>📋 프로젝트 상세</h2>
    <div class="project-cards">
      <!-- 항공기 복합 위협 회피 경로 및 전략 추천 시스템 -->
      <div class="project-card-detail">
        <div class="project-header">
          <div class="project-icon-wrapper">
            <span class="project-icon">✈️</span>
          </div>
          <div class="project-title-area">
            <h3>항공기 복합 위협 회피 경로 및 전략 추천 시스템</h3>
            <span class="project-period">2025.03 ~ 2025.12 | 한국연구재단</span>
          </div>
          <span class="project-badge work">한국연구재단</span>
        </div>
        <p class="project-summary">F-16 회피기동 강화학습 분석 풀스택 플랫폼</p>
        <div class="project-role">
          <span class="role-label">담당</span>
          <span class="role-value">풀스택 개발</span>
        </div>
        <ul class="project-highlights">
          <li>
            Kafka, Elasticsearch 기반 데이터 수집 및 ETL 처리 파이프라인 설계
          </li>
          <li>FastAPI 기반 API 개발</li>
          <li>Docker-Compose 기반 인프라 구축</li>
          <li>React, Three.js 시뮬레이션 분석 페이지 구현</li>
          <li>Socket Server, Client 기반 AutoPilot 기능 구현</li>
          <li>룰기반 회피기동 전략 개발</li>
          <li>비행 통계 시스템 개발</li>
        </ul>
        <div class="project-tech-stack">
          <span class="tech python">Python</span>
          <span class="tech fastapi">FastAPI</span>
          <span class="tech kafka">Kafka</span>
          <span class="tech">Elasticsearch</span>
          <span class="tech react">React</span>
          <span class="tech">Three.js</span>
          <span class="tech docker">Docker</span>
        </div>
        <div class="project-links">
          <a
            href="https://youtu.be/RKgOutqHnVE"
            target="_blank"
            class="project-link live-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
            </svg>
            Demo
          </a>
          <a
            href="https://github.com/zmfpdl64/StudyCafe-AWS"
            target="_blank"
            class="project-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <!-- KBookmark -->
      <div class="project-card-detail">
        <div class="project-header">
          <div class="project-icon-wrapper">
            <span class="project-icon">📚</span>
          </div>
          <div class="project-title-area">
            <h3>KBookmark</h3>
            <span class="project-period"
              >2024.10.10 ~ 2024.11.03 | 1인 개발</span
            >
          </div>
          <span class="project-badge live">개인 프로젝트</span>
        </div>
        <p class="project-summary">북마크 수집 플랫폼 | kbookmark.co.kr</p>
        <div class="project-role">
          <span class="role-label">담당</span>
          <span class="role-value">풀스택 개발</span>
        </div>
        <ul class="project-highlights">
          <li>Google OAuth 2.0 기반 로그인 기능</li>
          <li>북마크 및 카테고리 CRUD API 구현</li>
          <li>API 성능 개선 및 Swagger 문서화</li>
          <li>Next.js 기반 웹 UI 개발</li>
        </ul>
        <div class="project-tech-stack">
          <span class="tech java">Java</span>
          <span class="tech spring">Spring Boot</span>
          <span class="tech">Next.js</span>
          <span class="tech mysql">MySQL</span>
          <span class="tech">OAuth 2.0</span>
        </div>
        <div class="project-links">
          <a
            href="https://kbookmark.co.kr"
            target="_blank"
            class="project-link live-link"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path
                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              />
            </svg>
            kbookmark.co.kr
          </a>
          <a
            href="https://github.com/zmfpdl64/BookMark"
            target="_blank"
            class="project-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <!-- 커피 E-Commerce -->
      <div class="project-card-detail">
        <div class="project-header">
          <div class="project-icon-wrapper">
            <span class="project-icon">☕</span>
          </div>
          <div class="project-title-area">
            <h3>커피 E-Commerce (MSA 구조)</h3>
            <span class="project-period"
              >2024.04.05 ~ | 슈퍼코딩 | 4인 (포인트 파트)</span
            >
          </div>
          <span class="project-badge team">팀 프로젝트</span>
        </div>
        <p class="project-summary">B2C 커피 전문 E-Commerce MSA 플랫폼</p>
        <div class="project-role">
          <span class="role-label">담당</span>
          <span class="role-value">포인트/결제 서비스</span>
        </div>
        <ul class="project-highlights">
          <li>Redisson을 통한 분산 락 처리 및 정확한 포인트 적립</li>
          <li>Sequence Diagram 작성 및 Git PR 기반 협업</li>
          <li>아키텍처 및 ERD 설계</li>
          <li>Toss 테스트 결제 API 연동</li>
          <li>Jacoco 기반 테스트 커버리지 80% 달성</li>
        </ul>
        <div class="project-tech-stack">
          <span class="tech spring">Spring Boot</span>
          <span class="tech kafka">Kafka</span>
          <span class="tech redis">Redis</span>
          <span class="tech docker">Docker</span>
          <span class="tech">QueryDSL</span>
        </div>
        <div class="project-links">
          <a
            href="https://github.com/Team-Koreano/Koreano"
            target="_blank"
            class="project-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <!-- 배달 E-Commerce -->
      <div class="project-card-detail">
        <div class="project-header">
          <div class="project-icon-wrapper">
            <span class="project-icon">🍜</span>
          </div>
          <div class="project-title-area">
            <h3>배달 E-Commerce (Han-Yip-Man)</h3>
            <span class="project-period"
              >2023.08.28 ~ 2023.09.23 | 슈퍼코딩 | 8인 (주문 파트)</span
            >
          </div>
          <span class="project-badge team">팀 프로젝트</span>
        </div>
        <p class="project-summary">B2C 배달 전문 E-Commerce 플랫폼</p>
        <div class="project-role">
          <span class="role-label">담당</span>
          <span class="role-value">주문 서비스</span>
        </div>
        <ul class="project-highlights">
          <li>SSE를 이용한 배달자 실시간 위치 전송</li>
          <li>
            2천만 건 이상 데이터 페이징 및 조건 검색 최적화 (22초 → 0.5초)
          </li>
          <li>JdbcTemplate 기반 변경으로 데이터 입력 속도 100배 향상</li>
        </ul>
        <div class="project-tech-stack">
          <span class="tech spring">Spring Boot</span>
          <span class="tech">JPA</span>
          <span class="tech mysql">MySQL</span>
          <span class="tech aws">AWS</span>
          <span class="tech">SSE</span>
        </div>
        <div class="project-links">
          <a
            href="https://github.com/zmfpdl64/Han-Yip-Man"
            target="_blank"
            class="project-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <!-- 보드게임 E-Commerce -->
      <div class="project-card-detail">
        <div class="project-header">
          <div class="project-icon-wrapper">
            <span class="project-icon">🛒</span>
          </div>
          <div class="project-title-area">
            <h3>보드게임 E-Commerce</h3>
            <span class="project-period"
              >2023.08.14 ~ 2023.08.25 | 슈퍼코딩 | 9인 (회원/인증/인프라)</span
            >
          </div>
          <span class="project-badge team">팀 프로젝트</span>
        </div>
        <p class="project-summary">보드게임 이커머스 백엔드 시스템</p>
        <div class="project-role">
          <span class="role-label">담당</span>
          <span class="role-value">회원/인증/인프라</span>
        </div>
        <ul class="project-highlights">
          <li>CoolSMS 인증코드 유효시간 및 캐싱 문제 해결</li>
          <li>Kakao OAuth 2.0 로그인 + JWT 인증 처리</li>
          <li>HTTPS 환경 구성 (Nginx + OpenSSL)</li>
          <li>GitHub Flow 기반 협업 + 문서화 정리</li>
        </ul>
        <div class="project-tech-stack">
          <span class="tech spring">Spring Boot</span>
          <span class="tech">Nginx</span>
          <span class="tech">OAuth 2.0</span>
          <span class="tech">JWT</span>
        </div>
        <div class="project-links">
          <a
            href="https://youtu.be/AHehYZt-6kM"
            target="_blank"
            class="project-link live-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
            </svg>
            Demo
          </a>
          <a
            href="https://github.com/zmfpdl64/shopping-mall-back-end"
            target="_blank"
            class="project-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <!-- 무인카페 시스템 -->
      <div class="project-card-detail">
        <div class="project-header">
          <div class="project-icon-wrapper">
            <span class="project-icon">☕</span>
          </div>
          <div class="project-title-area">
            <h3>무인카페 시스템 (STANDER)</h3>
            <span class="project-period"
              >2022.03 ~ 2022.08 | 성결대학교 | 3인</span
            >
          </div>
          <span class="project-badge team">팀 프로젝트</span>
        </div>
        <p class="project-summary">무인카페 통합 관리 시스템</p>
        <div class="project-role">
          <span class="role-label">담당</span>
          <span class="role-value">백엔드 & IoT 연동</span>
        </div>
        <ul class="project-highlights">
          <li>QR 인증을 통한 입장 시스템 + 서보모터 제어</li>
          <li>세션 인증 처리, 스케줄링 및 멀티스레드 관리</li>
          <li>IoT 하드웨어 연동 및 인프라 구성</li>
        </ul>
        <div class="project-tech-stack">
          <span class="tech spring">Spring Boot</span>
          <span class="tech">Thymeleaf</span>
          <span class="tech python">Python</span>
          <span class="tech docker">Docker</span>
          <span class="tech mysql">MySQL</span>
        </div>
        <div class="project-links">
          <a
            href="https://github.com/zmfpdl64/StudyCafe-AWS"
            target="_blank"
            class="project-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- PDF 슬라이드 뷰어 모달 -->
  <div id="pdf-modal" class="pdf-modal">
    <div class="pdf-modal-content">
      <div class="pdf-header">
        <h3 id="pdf-title">자격증</h3>
        <button class="pdf-close" onclick="closePdfViewer()">&times;</button>
      </div>
      <div class="pdf-viewer-container">
        <!-- 로딩 인디케이터 추가 -->
        <div id="pdf-loader" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1001;">
          <div class="spinner"></div>
        </div>

        <button class="pdf-nav pdf-prev" onclick="prevPage()" title="이전 페이지 (←)">&#10094;</button>
        <canvas id="pdf-canvas"></canvas>
        <button class="pdf-nav pdf-next" onclick="nextPage()" title="다음 페이지 (→)">&#10095;</button>
      </div>
      <div class="pdf-footer">
        <span id="page-info">1 / 1</span>
        <p class="pdf-hint">ESC: 닫기 | ←→: 페이지 이동</p>
      </div>
    </div>
  </div>
`;

// 환경변수에서 비밀번호 읽기 (PORTFOLIO_PASSWORD)
const password = process.env.PORTFOLIO_PASSWORD;
if (!password) {
  console.error("❌ 오류: PORTFOLIO_PASSWORD 환경변수를 설정해주세요.");
  console.error("   예시: PORTFOLIO_PASSWORD=yourpassword node encrypt.js");
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);

const fs = require("fs");
const path = require("path");

crypto.pbkdf2(password, salt, 100000, 32, "sha256", (err, key) => {
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(privateContent, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const authTag = cipher.getAuthTag();
  const combined = Buffer.concat([salt, iv, encrypted, authTag]);
  const encryptedBase64 = combined.toString("base64");

  // portfolio.html 파일 업데이트
  const portfolioPath = path.join(
    __dirname,
    "layouts",
    "_default",
    "portfolio.html",
  );
  let portfolioHtml = fs.readFileSync(portfolioPath, "utf8");

  // ENCRYPTED_CONTENT 값 교체 (여러 줄에 걸친 형식도 처리)
  portfolioHtml = portfolioHtml.replace(
    /const ENCRYPTED_CONTENT\s*=\s*[\s\S]*?";/,
    `const ENCRYPTED_CONTENT = "${encryptedBase64}";`,
  );

  fs.writeFileSync(portfolioPath, portfolioHtml);
  console.log("✅ portfolio.html 암호화 콘텐츠 업데이트 완료");
  console.log(`📝 암호화된 데이터 길이: ${encryptedBase64.length} 문자`);
});
