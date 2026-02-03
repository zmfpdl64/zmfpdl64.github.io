import os
import re
import requests
from urllib.parse import urlparse


# imgur 업로드 함수 (로컬 저장 후 imgur 업로드, 링크로 대체)
def upload_to_imgur(image_path, client_id):
    url = "https://api.imgur.com/3/image"
    headers = {"Authorization": f"Client-ID {client_id}"}
    with open(image_path, "rb") as imgf:
        files = {"image": imgf}
        response = requests.post(url, headers=headers, files=files)
    if response.status_code == 200:
        return response.json()["data"]["link"]
    else:
        print(f"Imgur upload failed for {image_path}: {response.status_code} {response.text}")
        return None


def download_and_upload_images_and_update_md(md_path, image_dir="images", client_id=None):
    os.makedirs(image_dir, exist_ok=True)

    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()

    img_tags = re.findall(r'<img[^>]+src=["\"](.*?)["\"]', content)
    url_to_imgur = {}
    failed_urls = set()

    for idx, url in enumerate(img_tags):
        parsed = urlparse(url)
        ext = os.path.splitext(parsed.path)[1] or ".jpg"
        local_filename = f"img_{idx+1}{ext}"
        local_path = os.path.join(image_dir, local_filename)
        try:
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
            resp = requests.get(url, timeout=10, headers=headers)
            resp.raise_for_status()
            with open(local_path, "wb") as imgf:
                imgf.write(resp.content)
            print(f"Downloaded {url} -> {local_path}")
            if client_id:
                imgur_url = upload_to_imgur(local_path, client_id)
                if imgur_url:
                    url_to_imgur[url] = imgur_url
                else:
                    url_to_imgur[url] = local_path.replace("\\", "/")
            else:
                url_to_imgur[url] = local_path.replace("\\", "/")
        except Exception as e:
            print(f"Failed to download {url}: {e}")
            failed_urls.add(url)

    # Replace URLs in markdown
    for url, new_url in url_to_imgur.items():
        content = content.replace(url, new_url)

    # 다운로드 실패한 이미지는 <img ...> 태그 전체를 안내문으로 대체
    for url in failed_urls:
        content = re.sub(r'<img[^>]+src=["\"]' + re.escape(url) + r'["\"][^>]*>', '<div style="color:red;font-weight:bold">[이미지 없음]</div>', content)

    with open(md_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Markdown updated with imgur or local image paths. (Failed images marked)")

if __name__ == "__main__":
    import glob
    IMGUR_CLIENT_ID = "be76c0ff174355d"
    md_files = glob.glob('content/posts/*.md')
    for md_file in md_files:
        print(f"Processing {md_file}")
        download_and_upload_images_and_update_md(md_file, client_id=IMGUR_CLIENT_ID)
    print("All markdown files processed.")
