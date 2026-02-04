# Portfolio Template

Hugo 기반의 모던한 포트폴리오 웹사이트 템플릿입니다.

## ✨ 특징

- 🎨 모던한 디자인 (PaperMod 테마 기반)
- 🔐 비공개 콘텐츠 보호 (AES-GCM 암호화)
- 📱 반응형 디자인
- 🚀 빠른 로딩 (정적 사이트)
- 🎯 SEO 최적화
- 📊 PDF 뷰어 내장
- 💾 localStorage 자동 로그인

## 🚀 빠른 시작

### 요구사항

- [Hugo](https://gohugo.io/getting-started/installing/) (Extended 버전)
- Git

### 설치

1. **리포지토리 클론**

   ```bash
   git clone https://github.com/yourusername/portfolio-template.git
   cd portfolio-template
   ```

2. **설정 스크립트 실행**

   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **개인정보 수정**
   - `data/portfolio.yaml` 파일을 열어 본인의 정보로 수정
   - 이름, 기술 스택, 프로젝트, 자격증 등

4. **로컬 서버 실행**

   ```bash
   hugo server
   ```

5. **브라우저에서 확인**
   - http://localhost:1313/portfolio/

## 📁 프로젝트 구조

```
portfolio-template/
├── data/
│   └── portfolio.yaml          # 개인 데이터
├── layouts/
│   ├── _default/
│   │   └── portfolio.html      # 메인 템플릿
│   └── partials/
│       └── portfolio/          # 섹션별 템플릿
├── static/
│   ├── js/
│   │   └── portfolio.js        # JavaScript 로직
│   └── css/
├── assets/
│   └── css/
│       └── portfolio.scss      # 스타일시트
├── content/
├── public/                     # 빌드 결과물
├── setup.sh                    # 초기 설정 스크립트
└── README.md
```

## 🎨 커스터마이징

### 데이터 수정

`data/portfolio.yaml`에서 다음을 수정:

```yaml
hero:
  title: "👋 Hi, I'm Your Name"
  subtitle: "Your Title"
  description: "Your description"

tech_stack:
  - category: "Backend"
    tags:
      - name: "Java"
        class: "java"

certifications:
  - title: "Your Certificate"
    description: "Description"
    icon: "📜"
    pdf: "/certificates/your-cert.pdf"
```

### 섹션 추가/수정

`layouts/partials/portfolio/` 폴더의 HTML 파일들을 수정

### 스타일 변경

`assets/css/portfolio.scss` 파일 수정

## 🔐 비공개 콘텐츠

포트폴리오의 상세 정보는 암호화되어 보호됩니다.

### 암호화 방법

1. `encrypt.js` 스크립트로 콘텐츠 암호화
2. 암호화된 데이터가 `layouts/_default/portfolio.html`에 삽입
3. 방문자가 비밀번호 입력 시 복호화

### 암호화 실행

```bash
node encrypt.js
```

## 📦 빌드 및 배포

### 프로덕션 빌드

```bash
hugo --minify
```

### GitHub Pages 배포

```bash
# 1. 빌드
hugo --minify

# 2. public 폴더를 gh-pages 브랜치로 푸시
# (자동화 스크립트 사용 권장)
```

## 🛠️ 개발

### 로컬 서버

```bash
hugo server -D
```

### 새 콘텐츠 추가

```bash
hugo new posts/my-post.md
```

## 📄 라이선스

이 템플릿은 MIT 라이선스로 배포됩니다.

## 🤝 기여

PR과 이슈 환영합니다!

## 📞 지원

문제가 있으시면 이슈를 남겨주세요.
