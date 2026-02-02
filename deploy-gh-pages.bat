@echo off
REM Hugo 정적 사이트 gh-pages 브랜치로 배포 스크립트
setlocal enabledelayedexpansion

set "REPO_ROOT=%CD%"
set "DEPLOY_DIR=%TEMP%\hugo-deploy-%RANDOM%"

echo ========================================
echo Hugo 블로그 배포 시작
echo ========================================

REM 1. Hugo 빌드
echo [1/5] Hugo 빌드 중...
"C:\Users\이우진\AppData\Local\Microsoft\WinGet\Packages\Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe\hugo.exe" --minify
IF ERRORLEVEL 1 (
  echo Hugo 빌드 실패!
  exit /b 1
)

REM 2. public 폴더를 임시 위치로 복사
echo [2/5] public 폴더 복사 중...
if exist "%DEPLOY_DIR%" rmdir /s /q "%DEPLOY_DIR%"
mkdir "%DEPLOY_DIR%"
xcopy "%REPO_ROOT%\public\*.*" "%DEPLOY_DIR%\" /E /H /C /Y /Q >nul
echo. > "%DEPLOY_DIR%\.nojekyll"

REM 3. gh-pages 브랜치 준비
echo [3/5] gh-pages 브랜치 준비 중...
git branch -D gh-pages >nul 2>&1
git checkout --orphan gh-pages >nul 2>&1
git reset --hard >nul 2>&1
git clean -fd >nul 2>&1

REM 4. 모든 파일 삭제하고 임시 폴더에서 복사
echo [4/5] 빌드 파일 복사 중...
for /f "delims=" %%i in ('dir /b /a "%REPO_ROOT%"') do (
  if not "%%i"==".git" (
    if exist "%REPO_ROOT%\%%i\" (
      rmdir /s /q "%REPO_ROOT%\%%i" >nul 2>&1
    ) else (
      del /q "%REPO_ROOT%\%%i" >nul 2>&1
    )
  )
)
xcopy "%DEPLOY_DIR%\*.*" "%REPO_ROOT%\" /E /H /C /Y /Q >nul

REM 5. 커밋 및 푸시
echo [5/5] GitHub에 배포 중...
git add .
git commit -m "deploy: hugo build %date% %time%"
git push -f origin gh-pages

REM main으로 복귀
git checkout main

REM 임시 폴더 정리
rmdir /s /q "%DEPLOY_DIR%" >nul 2>&1

echo.
echo ========================================
echo 배포 완료! https://zmfpdl64.github.io/
echo ========================================

endlocal
