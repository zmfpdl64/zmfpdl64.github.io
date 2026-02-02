#!/bin/bash
# ============================================
# Hugo 블로그 배포 스크립트 (Git Bash용)
# 사용법: ./deploy.sh
# ============================================

HUGO_PATH="/c/Users/이우진/AppData/Local/Microsoft/WinGet/Packages/Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe/hugo.exe"

echo "🚀 Hugo 블로그 배포 시작..."

# 1. public 폴더 삭제 (깨끗하게 빌드)
echo ""
echo "📁 public 폴더 정리 중..."
rm -rf public
echo "   ✓ public 폴더 삭제 완료"

# 2. Hugo 빌드
echo ""
echo "🔨 Hugo 빌드 중..."
"$HUGO_PATH" --minify
if [ $? -ne 0 ]; then
    echo "   ✗ 빌드 실패!"
    exit 1
fi
echo "   ✓ 빌드 완료"

# 3. .nojekyll 파일 생성
echo ""
echo "📄 .nojekyll 파일 생성 중..."
touch public/.nojekyll
echo "   ✓ .nojekyll 생성 완료"

# 4. Git 커밋
echo ""
echo "📝 Git 커밋 중..."
git add public -f
COMMIT_MSG="deploy: $(date '+%Y-%m-%d %H:%M')"
git commit -m "$COMMIT_MSG"
echo "   ✓ 커밋 완료: $COMMIT_MSG"

# 5. gh-pages 브랜치로 배포
echo ""
echo "🚀 gh-pages 브랜치로 배포 중..."
git push origin $(git subtree split --prefix public):gh-pages --force
if [ $? -ne 0 ]; then
    echo "   ✗ 배포 실패!"
    exit 1
fi
echo "   ✓ 배포 완료"

echo ""
echo "✅ 배포 성공!"
echo "🔗 https://zmfpdl64.github.io/"
echo ""
echo "⏰ 1-2분 후 사이트에서 확인하세요."
