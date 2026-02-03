const crypto = require("crypto");

const privateContent = `
    <!-- 경력 & 교육 -->
    <section class="portfolio-section">
      <h2>🎓 경력 & 교육</h2>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-date">2024.12 ~ 2025.12</div>
          <div class="timeline-content">
            <h4>엔피코어 연구기획실</h4>
            <p>풀스택 개발</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2023.06 ~ 2023.11</div>
          <div class="timeline-content">
            <h4>슈퍼코딩 부트캠프</h4>
            <p>백엔드 과정 수료</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2017.02 ~ 2023.08</div>
          <div class="timeline-content">
            <h4>성결대학교</h4>
            <p>정보통신과 졸업</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 수상 경력 -->
    <section class="portfolio-section">
      <h2>🏅 수상 경력</h2>
      <div class="cert-grid">
        <div class="cert-card">
          <span class="cert-icon">🏆</span>
          <div class="cert-info">
            <h4>슈퍼코딩 베스트 프로젝트상</h4>
            <p>3차 프로젝트 (2023.10.20)</p>
          </div>
        </div>
        <div class="cert-card">
          <span class="cert-icon">🥈</span>
          <div class="cert-info">
            <h4>라인트레이서 대회 2위</h4>
            <p>성결대학교 (2회 수상)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 상세 프로젝트 -->
    <section class="portfolio-section">
      <h2>💼 프로젝트 상세</h2>
      <div class="project-list">
        <!-- Project 1 -->
        <div class="project-detail-card">
          <div class="project-header">
            <span class="project-icon">✈️</span>
            <div>
              <h3>항공기 복합 위협 회피 경로 및 전략 추천 시스템</h3>
              <span class="project-period">2025.03 ~ 2025.12 | 한국연구재단</span>
            </div>
          </div>
          <p class="project-desc">F-16 회피기동 강화학습 분석 풀스택 플랫폼</p>
          <ul class="project-features">
            <li>Kafka, Elasticsearch 기반 데이터 수집 및 ETL 처리 파이프라인 설계</li>
            <li>FastAPI 기반 API 개발</li>
            <li>Docker-Compose 기반 인프라 구축</li>
            <li>React, Three.js 시뮬레이션 분석 페이지 구현</li>
            <li>Socket Server, Client 기반 AutoPilot 기능 구현</li>
            <li>룰기반 회피기동 전략 개발</li>
            <li>비행 통계 시스템 개발</li>
          </ul>
          <div class="project-tech">
            <span>Python</span>
            <span>FastAPI</span>
            <span>Kafka</span>
            <span>Elasticsearch</span>
            <span>React</span>
            <span>Three.js</span>
            <span>Docker</span>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-detail-card">
          <div class="project-header">
            <span class="project-icon">📚</span>
            <div>
              <h3>KBookmark</h3>
              <span class="project-period">2024.10.10 ~ 2024.11.03 | 1인 개발</span>
            </div>
          </div>
          <p class="project-desc">북마크 수집 플랫폼 | <a href="https://kbookmark.co.kr" target="_blank">🌐 kbookmark.co.kr</a></p>
          <ul class="project-features">
            <li>Google OAuth 2.0 기반 로그인 기능</li>
            <li>북마크 및 카테고리 CRUD API 구현</li>
            <li>API 성능 개선 및 Swagger 문서화</li>
            <li>Next.js 기반 웹 UI 개발</li>
          </ul>
          <div class="project-tech">
            <span>Java</span>
            <span>Spring Boot</span>
            <span>Next.js</span>
            <span>MySQL</span>
            <span>OAuth 2.0</span>
          </div>
          <a href="https://github.com/zmfpdl64/BookMark" target="_blank" class="project-link">GitHub →</a>
        </div>

        <!-- Project 3 -->
        <div class="project-detail-card">
          <div class="project-header">
            <span class="project-icon">☕</span>
            <div>
              <h3>커피 E-Commerce (MSA 구조)</h3>
              <span class="project-period">2024.04.05 ~ | 슈퍼코딩 | 4인 (포인트 파트)</span>
            </div>
          </div>
          <p class="project-desc">B2C 커피 전문 E-Commerce MSA 플랫폼</p>
          <ul class="project-features">
            <li>Redisson을 통한 분산 락 처리 및 정확한 포인트 적립</li>
            <li>Sequence Diagram 작성 및 Git PR 기반 협업</li>
            <li>아키텍처 및 ERD 설계</li>
            <li>Toss 테스트 결제 API 연동</li>
            <li>Jacoco 기반 테스트 커버리지 80% 달성</li>
          </ul>
          <div class="project-tech">
            <span>Spring Boot</span>
            <span>Kafka</span>
            <span>Redis</span>
            <span>Docker</span>
            <span>QueryDSL</span>
          </div>
          <a href="https://github.com/Team-Koreano/Koreano" target="_blank" class="project-link">GitHub →</a>
        </div>

        <!-- Project 4 -->
        <div class="project-detail-card">
          <div class="project-header">
            <span class="project-icon">🍜</span>
            <div>
              <h3>배달 E-Commerce (Han-Yip-Man)</h3>
              <span class="project-period">2023.08.28 ~ 2023.09.23 | 슈퍼코딩 | 8인 (주문 파트)</span>
            </div>
          </div>
          <p class="project-desc">B2C 배달 전문 E-Commerce 플랫폼</p>
          <ul class="project-features">
            <li>SSE를 이용한 배달자 실시간 위치 전송</li>
            <li>2천만 건 이상 데이터 페이징 및 조건 검색 최적화 (22초 → 0.5초)</li>
            <li>JdbcTemplate 기반 변경으로 데이터 입력 속도 100배 향상</li>
          </ul>
          <div class="project-tech">
            <span>Spring Boot</span>
            <span>JPA</span>
            <span>MySQL</span>
            <span>AWS</span>
            <span>SSE</span>
          </div>
          <a href="https://github.com/zmfpdl64/Han-Yip-Man-back" target="_blank" class="project-link">GitHub →</a>
        </div>

        <!-- Project 5 -->
        <div class="project-detail-card">
          <div class="project-header">
            <span class="project-icon">🛒</span>
            <div>
              <h3>보드게임 E-Commerce</h3>
              <span class="project-period">2023.08.14 ~ 2023.08.25 | 슈퍼코딩 | 9인 (회원/인증/인프라)</span>
            </div>
          </div>
          <p class="project-desc">보드게임 이커머스 백엔드 시스템</p>
          <ul class="project-features">
            <li>CoolSMS 인증코드 유효시간 및 캐싱 문제 해결</li>
            <li>Kakao OAuth 2.0 로그인 + JWT 인증 처리</li>
            <li>HTTPS 환경 구성 (Nginx + OpenSSL)</li>
            <li>GitHub Flow 기반 협업 + 문서화 정리</li>
          </ul>
          <div class="project-tech">
            <span>Spring Boot</span>
            <span>Nginx</span>
            <span>OAuth 2.0</span>
            <span>JWT</span>
          </div>
          <a href="https://github.com/zmfpdl64/shopping-mall-back-end" target="_blank" class="project-link">GitHub →</a>
        </div>

        <!-- Project 6 -->
        <div class="project-detail-card">
          <div class="project-header">
            <span class="project-icon">☕</span>
            <div>
              <h3>무인카페 시스템 (STANDER)</h3>
              <span class="project-period">2022.03 ~ 2022.08 | 성결대학교 | 3인</span>
            </div>
          </div>
          <p class="project-desc">무인카페 통합 관리 시스템</p>
          <ul class="project-features">
            <li>QR 인증을 통한 입장 시스템 + 서보모터 제어</li>
            <li>세션 인증 처리, 스케줄링 및 멀티스레드 관리</li>
            <li>IoT 하드웨어 연동 및 인프라 구성</li>
          </ul>
          <div class="project-tech">
            <span>Spring Boot</span>
            <span>Thymeleaf</span>
            <span>Python</span>
            <span>Docker</span>
            <span>MySQL</span>
          </div>
        </div>
      </div>
    </section>
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
