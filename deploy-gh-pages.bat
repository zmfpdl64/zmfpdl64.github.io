@echo off
REM Hugo 정적 사이트 gh-pages 브랜치로 수동 배포 스크립트

REM 1. 빌드
"C:\Users\이우진\AppData\Local\Microsoft\WinGet\Packages\Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe\hugo.exe" --minify
IF ERRORLEVEL 1 (
  echo Hugo build failed!
  exit /b 1
)

REM 2. gh-pages 브랜치로 체크아웃 (없으면 생성)
git checkout --orphan gh-pages

REM 3. 기존 파일 삭제
git rm -rf . >nul 2>&1

REM 4. public 폴더 내용 복사
xcopy public\*.* . /E /H /C /Y
IF EXIST public\.nojekyll copy public\.nojekyll .

REM 5. 커밋 & 푸시
git add .
git commit -m "deploy: hugo build"
git push -f origin gh-pages

REM 6. main 브랜치로 복귀
git checkout main

echo 배포 완료!
