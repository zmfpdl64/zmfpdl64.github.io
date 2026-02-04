# Portfolio Template - 판매용 패키지화 가이드

## 📦 패키지 유형

### 1. 소스 코드 패키지 (고급 사용자용)
- 전체 Hugo 프로젝트 포함
- 커스터마이징 가능
- 가격: 높음 (라이선스별)

### 2. 빌드 패키지 (일반 사용자용)
- 정적 HTML/CSS/JS만 포함
- 간단한 수정만 가능
- 가격: 낮음

## 🔐 소스 코드 보호 방법

### 빌드 프로세스
```bash
# 1. Hugo로 빌드
hugo --minify

# 2. JavaScript 난독화
npx uglify-js static/js/portfolio.js -o static/js/portfolio.min.js --compress --mangle

# 3. HTML 압축
# (Hugo --minify로 자동 처리)

# 4. 패키징
zip -r portfolio-template.zip public/ data/ layouts/ static/ assets/ -x "*.git*"
```

### 라이선스 시스템 구현
```javascript
// static/js/license.js
const LICENSE_KEY = "YOUR_LICENSE_KEY";

function validateLicense() {
    const userKey = localStorage.getItem("portfolio-license");
    if (!userKey || userKey !== LICENSE_KEY) {
        // 라이선스 없음: 기능 제한
        document.getElementById("private-portfolio").innerHTML = 
            "<p>라이선스를 구매해주세요.</p>";
        return false;
    }
    return true;
}
```

## 🚀 배포 전략

### 1. Gumroad/Teachable 등 플랫폼 사용
- 디지털 다운로드 판매
- 자동 라이선스 발급

### 2. GitHub Private Repo
- 구매자만 접근 가능
- 업데이트 제공

### 3. 웹 기반 커스터마이저
- 온라인에서 데이터 입력
- Hugo 빌드 자동화
- 완성된 ZIP 다운로드

## 💰 가격 전략

### 소스 코드 버전
- 기본: $49
- 프로: $99 (추가 템플릿, 지원 포함)

### 빌드 버전
- 개인: $19
- 상업: $49

## 📋 판매 시 포함 파일

### 필수
- `public/` 폴더 (빌드된 사이트)
- `setup.sh` (설치 스크립트)
- `README.md` (사용법)
- `LICENSE.txt` (라이선스)

### 옵션
- `data/portfolio-template.yaml` (샘플 데이터)
- `layouts/partials/portfolio/` (템플릿 파일들)

## 🔒 추가 보안

### 1. 워터마킹
- HTML에 구매자 정보 삽입
- CSS로 숨김

### 2. 난독화
- JavaScript 변수명 변경
- HTML 구조 복잡화

### 3. DRM
- 라이선스 키로 콘텐츠 잠금
- 정기 검증