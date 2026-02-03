#!/usr/bin/env python3
"""
CDN 이미지를 로컬로 다운로드하고 마크다운 파일의 경로를 업데이트하는 스크립트
"""

import os
import re
import hashlib
import requests
from pathlib import Path
from urllib.parse import urlparse, unquote

# 설정
CONTENT_DIR = Path(__file__).parent.parent / "content" / "posts"
STATIC_IMAGES_DIR = Path(__file__).parent.parent / "static" / "images" / "posts"

# 이미지 URL 패턴 (마크다운 이미지 문법)
IMAGE_PATTERN = re.compile(r'!\[([^\]]*)\]\((https?://[^)]+)\)')

# CDN 도메인 목록
CDN_DOMAINS = [
    'blog.kakaocdn.net',
    'i.imgur.com',
    'velog.velcdn.com',
]


def get_image_extension(url: str, content_type: str = None) -> str:
    """URL 또는 Content-Type에서 이미지 확장자 추출"""
    # URL에서 확장자 추출 시도
    parsed = urlparse(url)
    path = unquote(parsed.path)

    # 확장자 매핑
    ext_map = {
        'image/png': '.png',
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/gif': '.gif',
        'image/webp': '.webp',
    }

    # URL 경로에서 확장자 확인
    for ext in ['.png', '.jpg', '.jpeg', '.gif', '.webp']:
        if ext in path.lower():
            return ext if ext != '.jpeg' else '.jpg'

    # Content-Type에서 확장자 추출
    if content_type:
        for ct, ext in ext_map.items():
            if ct in content_type.lower():
                return ext

    return '.png'  # 기본값


def generate_filename(url: str, alt_text: str, index: int) -> str:
    """이미지 파일명 생성"""
    # alt 텍스트가 있으면 사용, 없으면 인덱스 사용
    if alt_text and len(alt_text) > 0:
        # 한글, 영문, 숫자만 유지하고 공백은 하이픈으로
        safe_name = re.sub(r'[^\w가-힣\s-]', '', alt_text)
        safe_name = re.sub(r'\s+', '-', safe_name.strip())
        safe_name = safe_name[:50]  # 최대 50자
        if safe_name:
            return safe_name

    # URL 해시 기반 파일명
    url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
    return f"image-{index}-{url_hash}"


def download_image(url: str, save_path: Path) -> bool:
    """이미지 다운로드"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()

        with open(save_path, 'wb') as f:
            f.write(response.content)

        print(f"  ✓ 다운로드 완료: {save_path.name}")
        return True
    except Exception as e:
        print(f"  ✗ 다운로드 실패: {url}")
        print(f"    오류: {e}")
        return False


def is_cdn_url(url: str) -> bool:
    """CDN URL인지 확인"""
    return any(domain in url for domain in CDN_DOMAINS)


def process_markdown_file(md_path: Path) -> dict:
    """마크다운 파일 처리"""
    post_name = md_path.stem  # 파일명 (확장자 제외)
    post_images_dir = STATIC_IMAGES_DIR / post_name

    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 이미지 URL 찾기
    matches = IMAGE_PATTERN.findall(content)
    cdn_images = [(alt, url) for alt, url in matches if is_cdn_url(url)]

    if not cdn_images:
        return {'file': post_name, 'count': 0, 'downloaded': 0}

    print(f"\n📄 {post_name}.md - {len(cdn_images)}개 CDN 이미지 발견")

    # 이미지 폴더 생성
    post_images_dir.mkdir(parents=True, exist_ok=True)

    downloaded = 0
    new_content = content

    for idx, (alt_text, url) in enumerate(cdn_images, 1):
        # 파일명 생성
        ext = get_image_extension(url)
        filename = generate_filename(url, alt_text, idx) + ext
        save_path = post_images_dir / filename

        # 다운로드
        if save_path.exists():
            print(f"  - 이미 존재: {filename}")
            downloaded += 1
        elif download_image(url, save_path):
            downloaded += 1
        else:
            continue

        # 마크다운에서 URL 교체
        local_path = f"/images/posts/{post_name}/{filename}"
        old_pattern = f"![{alt_text}]({url})"
        new_pattern = f"![{alt_text}]({local_path})"
        new_content = new_content.replace(old_pattern, new_pattern)

    # 파일 저장
    if new_content != content:
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  📝 마크다운 파일 업데이트 완료")

    return {'file': post_name, 'count': len(cdn_images), 'downloaded': downloaded}


def main():
    print("=" * 60)
    print("CDN 이미지 로컬 다운로드 스크립트")
    print("=" * 60)

    # 디렉토리 확인
    if not CONTENT_DIR.exists():
        print(f"오류: content/posts 디렉토리를 찾을 수 없습니다: {CONTENT_DIR}")
        return

    # static/images/posts 디렉토리 생성
    STATIC_IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    # 모든 마크다운 파일 처리
    md_files = list(CONTENT_DIR.glob("*.md"))
    print(f"\n총 {len(md_files)}개 마크다운 파일 발견")

    results = []
    for md_path in sorted(md_files):
        result = process_markdown_file(md_path)
        if result['count'] > 0:
            results.append(result)

    # 결과 요약
    print("\n" + "=" * 60)
    print("처리 결과 요약")
    print("=" * 60)

    total_images = sum(r['count'] for r in results)
    total_downloaded = sum(r['downloaded'] for r in results)

    print(f"처리된 파일: {len(results)}개")
    print(f"총 CDN 이미지: {total_images}개")
    print(f"다운로드 완료: {total_downloaded}개")

    if total_images > total_downloaded:
        print(f"다운로드 실패: {total_images - total_downloaded}개")

    print("\n✅ 완료!")
    print(f"이미지 저장 위치: {STATIC_IMAGES_DIR}")


if __name__ == "__main__":
    main()
