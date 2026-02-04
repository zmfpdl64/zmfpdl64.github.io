# Lee WooJin | Developer Blog

Hugo + PaperMod 테마를 사용한 개인 블로그입니다.

🔗 **블로그 주소**: https://zmfpdl64.github.io/

---

## 📋 명령어 정리

### 로컬 개발 서버 실행

```powershell
# PowerShell에서 실행
& 'C:\Users\이우진\AppData\Local\Microsoft\WinGet\Packages\Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe\hugo.exe' server -D
```

또는 Hugo가 PATH에 있다면:

```bash
hugo server -D
```

- `-D`: 드래프트 글도 표시
- 기본 주소: http://localhost:1313/
- 파일 변경 시 자동 새로고침

### 새 글 작성

```powershell
& 'C:\Users\이우진\AppData\Local\Microsoft\WinGet\Packages\Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe\hugo.exe' new posts/my-new-post.md
```

또는 직접 `content/posts/` 폴더에 마크다운 파일 생성

### 블로그 빌드

```powershell
& 'C:\Users\이우진\AppData\Local\Microsoft\WinGet\Packages\Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe\hugo.exe' --minify
```

- 결과물: `public/` 폴더

### GitHub Pages 배포 (gh-pages 브랜치)

```powershell
# 1. 빌드
& 'C:\Users\이우진\AppData\Local\Microsoft\WinGet\Packages\Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe\hugo.exe' --minify

# 2. .nojekyll 파일 생성
New-Item -ItemType File -Path 'public/.nojekyll' -Force

# 3. public 폴더 커밋
git add public -f
git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

# 4. gh-pages 브랜치로 배포
git push origin $(git subtree split --prefix public):gh-pages --force
```

---

## 📁 폴더 구조

```
zmfpdl64.github.io/
├── content/           # 블로그 콘텐츠
│   ├── posts/         # 블로그 글
│   ├── archives.md    # 아카이브 페이지
│   └── search.md      # 검색 페이지
├── assets/
│   └── css/extended/  # 커스텀 CSS
├── static/            # 정적 파일 (ads.txt 등)
├── themes/PaperMod/   # 테마 (git submodule)
├── hugo.toml          # Hugo 설정
└── public/            # 빌드 결과물
```

---

## 🎨 테마 설정

- **기본 테마**: 라이트 모드
- **다크 모드**: 헤더의 해/달 아이콘으로 토글
- **커스텀 CSS**: `assets/css/extended/custom.css`

---

## ⚙️ GitHub Pages 설정

1. Repository Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `gh-pages` / `/ (root)`
4. Save

---

## 📝 글 작성 템플릿

```markdown
---
title: "글 제목"
date: 2026-02-02T12:00:00+09:00
draft: false
tags: ["태그1", "태그2"]
categories: ["카테고리"]
author: "Lee WooJin"
description: "글 요약"
showToc: true
---

본문 내용...
```

### version

- v1 pakage

```bash
git reset --hard bd8b278faf8c77b1a3e1133dc26da8d5fadd5955
```
