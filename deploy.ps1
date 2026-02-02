# ============================================
# Hugo 블로그 배포 스크립트
# 사용법: .\deploy.ps1
# ============================================

$HUGO_PATH = 'C:\Users\이우진\AppData\Local\Microsoft\WinGet\Packages\Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe\hugo.exe'

Write-Host "🚀 Hugo 블로그 배포 시작..." -ForegroundColor Cyan

# 1. public 폴더 삭제 (깨끗하게 빌드)
Write-Host "`n📁 public 폴더 정리 중..." -ForegroundColor Yellow
if (Test-Path "public") {
    Remove-Item -Recurse -Force "public"
    Write-Host "   ✓ public 폴더 삭제 완료" -ForegroundColor Green
}

# 2. Hugo 빌드
Write-Host "`n🔨 Hugo 빌드 중..." -ForegroundColor Yellow
& $HUGO_PATH --minify
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ✗ 빌드 실패!" -ForegroundColor Red
    exit 1
}
Write-Host "   ✓ 빌드 완료" -ForegroundColor Green

# 3. .nojekyll 파일 생성
Write-Host "`n📄 .nojekyll 파일 생성 중..." -ForegroundColor Yellow
New-Item -ItemType File -Path 'public/.nojekyll' -Force | Out-Null
Write-Host "   ✓ .nojekyll 생성 완료" -ForegroundColor Green

# 4. Git 커밋
Write-Host "`n📝 Git 커밋 중..." -ForegroundColor Yellow
git add public -f
$commitMessage = "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git commit -m $commitMessage
Write-Host "   ✓ 커밋 완료: $commitMessage" -ForegroundColor Green

# 5. gh-pages 브랜치로 배포
Write-Host "`n🚀 gh-pages 브랜치로 배포 중..." -ForegroundColor Yellow
$subtreeSha = git subtree split --prefix public
git push origin "${subtreeSha}:gh-pages" --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ✗ 배포 실패!" -ForegroundColor Red
    exit 1
}
Write-Host "   ✓ 배포 완료" -ForegroundColor Green

Write-Host "`n✅ 배포 성공!" -ForegroundColor Cyan
Write-Host "🔗 https://zmfpdl64.github.io/" -ForegroundColor Blue
Write-Host "`n⏰ 1-2분 후 사이트에서 확인하세요." -ForegroundColor Gray
