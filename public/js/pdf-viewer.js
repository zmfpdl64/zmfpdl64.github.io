// PDF 슬라이드 뷰어
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let canvas, ctx;

// PDF.js 워커 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// PDF 뷰어 열기
function openPdfViewer(pdfUrl, title) {
  console.log('PDF 뷰어 열기:', pdfUrl, title);
  const modal = document.getElementById('pdf-modal');
  if (!modal) {
    console.error('pdf-modal 요소를 찾을 수 없습니다');
    alert('PDF 뷰어를 찾을 수 없습니다. 페이지를 새로고침해주세요.');
    return;
  }

  // canvas 초기화 (동적으로 추가된 모달 대응)
  canvas = document.getElementById('pdf-canvas');
  if (!canvas) {
    console.error('pdf-canvas 요소를 찾을 수 없습니다');
    alert('PDF 캔버스를 찾을 수 없습니다.');
    return;
  }
  ctx = canvas.getContext('2d');
  console.log('Canvas 초기화 완료:', canvas.width, canvas.height);

  modal.style.display = 'flex';
  document.getElementById('pdf-title').textContent = title;
  document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
  loadPdf(pdfUrl);
}

// PDF 로드
async function loadPdf(url) {
  try {
    // 로딩 표시
    document.getElementById('page-info').textContent = '로딩 중...';
    console.log('PDF 로드 시작:', url);

    const loadingTask = pdfjsLib.getDocument(url);
    pdfDoc = await loadingTask.promise;
    pageNum = 1;
    console.log('PDF 로드 완료, 총 페이지:', pdfDoc.numPages);

    // 페이지 정보 업데이트
    updatePageInfo();

    // 첫 페이지 렌더링
    renderPage(pageNum);
  } catch (error) {
    console.error('PDF 로드 오류:', error);
    console.error('오류 상세:', error.message);
    document.getElementById('page-info').textContent = 'PDF 로드 실패: ' + error.message;
  }
}

// 페이지 렌더링
function renderPage(num) {
  pageRendering = true;
  console.log('페이지 렌더링 시작:', num);

  pdfDoc.getPage(num).then(function(page) {
    // 캔버스 크기 계산 (반응형 - 더 크게)
    const container = document.querySelector('.pdf-viewer-container');
    const containerWidth = container ? container.clientWidth - 120 : 1200;
    const containerHeight = window.innerHeight * 0.85;

    const originalViewport = page.getViewport({ scale: 1 });
    const scaleWidth = containerWidth / originalViewport.width;
    const scaleHeight = containerHeight / originalViewport.height;
    const scale = Math.min(scaleWidth, scaleHeight, 2); // 최대 2배

    // 고해상도 디스플레이 지원 (모바일 화질 개선)
    // 최소 3배 해상도로 렌더링하여 선명도 향상
    const pixelRatio = Math.max(window.devicePixelRatio || 1, 3);
    const viewport = page.getViewport({ scale: scale * pixelRatio });
    console.log('Viewport 크기:', viewport.width, viewport.height, 'pixelRatio:', pixelRatio);

    // 실제 캔버스 크기는 pixelRatio 배
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // CSS 크기는 원래 크기로 유지 (표시 크기)
    canvas.style.width = (viewport.width / pixelRatio) + 'px';
    canvas.style.height = (viewport.height / pixelRatio) + 'px';

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    const renderTask = page.render(renderContext);

    renderTask.promise.then(function() {
      pageRendering = false;
      console.log('페이지 렌더링 완료:', num);
      updatePageInfo();

      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    }).catch(function(error) {
      console.error('렌더링 오류:', error);
      document.getElementById('page-info').textContent = '렌더링 실패';
    });
  }).catch(function(error) {
    console.error('페이지 로드 오류:', error);
    document.getElementById('page-info').textContent = '페이지 로드 실패';
  });
}

// 페이지 정보 업데이트
function updatePageInfo() {
  if (pdfDoc) {
    document.getElementById('page-info').textContent = `${pageNum} / ${pdfDoc.numPages}`;

    // 버튼 활성화/비활성화
    document.querySelector('.pdf-prev').disabled = pageNum <= 1;
    document.querySelector('.pdf-next').disabled = pageNum >= pdfDoc.numPages;
  }
}

// 페이지 큐잉 (렌더링 중일 때)
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

// 이전 페이지
function prevPage() {
  if (pageNum <= 1) return;
  pageNum--;
  queueRenderPage(pageNum);
}

// 다음 페이지
function nextPage() {
  if (!pdfDoc || pageNum >= pdfDoc.numPages) return;
  pageNum++;
  queueRenderPage(pageNum);
}

// 뷰어 닫기
function closePdfViewer() {
  const modal = document.getElementById('pdf-modal');
  modal.style.display = 'none';
  document.body.style.overflow = ''; // 스크롤 복원
  pdfDoc = null;
  pageNum = 1;

  // 캔버스 클리어
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// 모달 바깥 클릭시 닫기
function handleModalClick(event) {
  if (event.target.id === 'pdf-modal') {
    closePdfViewer();
  }
}

// 키보드 네비게이션
function handleKeyDown(event) {
  const modal = document.getElementById('pdf-modal');
  if (modal.style.display !== 'flex') return;

  switch(event.key) {
    case 'Escape':
      closePdfViewer();
      break;
    case 'ArrowLeft':
      prevPage();
      break;
    case 'ArrowRight':
      nextPage();
      break;
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
  canvas = document.getElementById('pdf-canvas');
  if (canvas) {
    ctx = canvas.getContext('2d');
  }

  // 키보드 이벤트
  document.addEventListener('keydown', handleKeyDown);

  // 모달 클릭 이벤트
  const modal = document.getElementById('pdf-modal');
  if (modal) {
    modal.addEventListener('click', handleModalClick);
  }
});
