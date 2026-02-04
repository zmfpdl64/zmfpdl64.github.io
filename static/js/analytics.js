/**
 * 사용자 행동 분석 SDK
 * @file static/js/analytics.js
 * @description 블로그 사용자 행동을 수집하여 서버로 전송
 */
(function(window) {
  'use strict';

  // ============================================
  // 1. 설정 및 상수
  // ============================================
  const CONFIG = {
    endpoint: '', // 초기화 시 설정
    batchSize: 10,
    flushInterval: 30000, // 30초
    sessionTimeout: 30 * 60 * 1000, // 30분
    maxRetries: 3,
    debug: false
  };

  const SESSION_KEY = 'wa_session_id';
  const SESSION_TS_KEY = 'wa_session_ts';
  const OPTOUT_KEY = 'wa_optout';

  // ============================================
  // 2. 유틸리티 함수
  // ============================================

  function generateUUID() {
    if (crypto && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function getOrCreateSessionId() {
    const now = Date.now();
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    let lastActivity = parseInt(sessionStorage.getItem(SESSION_TS_KEY) || '0');

    if (!sessionId || (now - lastActivity) > CONFIG.sessionTimeout) {
      sessionId = generateUUID();
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    sessionStorage.setItem(SESSION_TS_KEY, now.toString());
    return sessionId;
  }

  function log(...args) {
    if (CONFIG.debug) {
      console.log('[Analytics]', ...args);
    }
  }

  // ============================================
  // 3. 이벤트 큐 및 배치 전송
  // ============================================
  const eventQueue = [];
  let flushTimer = null;
  let isInitialized = false;

  function queueEvent(eventData) {
    eventQueue.push(eventData);
    log('Event queued:', eventData.event_name, eventData.payload);

    if (eventQueue.length >= CONFIG.batchSize) {
      flush();
    }
  }

  async function flush() {
    if (eventQueue.length === 0 || !CONFIG.endpoint) return;

    const events = eventQueue.splice(0, CONFIG.batchSize);
    log('Flushing', events.length, 'events');

    try {
      const response = await fetch(CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ events }),
        keepalive: true
      });

      if (!response.ok) {
        log('Flush failed:', response.status);
        eventQueue.unshift(...events);
      } else {
        log('Flush successful');
      }
    } catch (error) {
      log('Flush error:', error);
      eventQueue.unshift(...events);
    }
  }

  function startFlushTimer() {
    if (flushTimer) clearInterval(flushTimer);
    flushTimer = setInterval(flush, CONFIG.flushInterval);
  }

  // ============================================
  // 4. 기본 이벤트 데이터 수집
  // ============================================
  function getBaseEventData() {
    return {
      event_id: generateUUID(),
      session_id: getOrCreateSessionId(),
      ts_client: Date.now(),
      path: window.location.pathname,
      full_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      language: navigator.language,
      screen_width: window.screen.width,
      screen_height: window.screen.height
    };
  }

  // ============================================
  // 5. 자동 추적 기능
  // ============================================

  function trackPageView() {
    Analytics.track('page_view', {
      title: document.title
    });
  }

  function trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const tracked = new Set();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            Analytics.track('scroll', { depth: milestone });
          }
        });
      }
    };

    let scrollTimer;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScroll, 100);
    }, { passive: true });
  }

  function trackTimeOnPage() {
    const startTime = Date.now();
    const intervals = [30, 60, 120, 300];
    const tracked = new Set();

    setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);

      intervals.forEach(interval => {
        if (elapsed >= interval && !tracked.has(interval)) {
          tracked.add(interval);
          Analytics.track('time_on_page', { seconds: interval });
        }
      });
    }, 5000);
  }

  function trackClicks() {
    document.addEventListener('click', (e) => {
      // data-track 속성이 있는 요소
      const trackElement = e.target.closest('[data-track]');
      if (trackElement) {
        const trackName = trackElement.dataset.track;
        const trackData = trackElement.dataset.trackData;

        Analytics.track('click', {
          element: trackName,
          data: trackData ? JSON.parse(trackData) : null
        });
      }

      // 외부 링크 자동 추적
      const link = e.target.closest('a[href]');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
          Analytics.track('external_link', {
            url: href,
            text: link.textContent?.trim()?.substring(0, 100)
          });
        }
      }
    });
  }

  function setupAutoTracking() {
    trackPageView();
    trackScrollDepth();
    trackTimeOnPage();
    trackClicks();
  }

  // ============================================
  // 6. 공개 API
  // ============================================
  const Analytics = {
    init: function(options = {}) {
      if (localStorage.getItem(OPTOUT_KEY) === 'true') {
        log('Opted out - disabled');
        return;
      }

      if (!options.endpoint) {
        console.warn('[Analytics] endpoint is required');
        return;
      }

      Object.assign(CONFIG, options);
      isInitialized = true;

      startFlushTimer();
      setupAutoTracking();

      window.addEventListener('beforeunload', () => flush());
      window.addEventListener('pagehide', () => flush());
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          flush();
        }
      });

      log('Initialized with endpoint:', CONFIG.endpoint);
    },

    track: function(eventName, payload = {}) {
      if (!isInitialized) return;

      const eventData = {
        ...getBaseEventData(),
        event_name: eventName,
        payload: payload
      };

      queueEvent(eventData);
    },

    flush: flush,

    optOut: function() {
      localStorage.setItem(OPTOUT_KEY, 'true');
      isInitialized = false;
      if (flushTimer) clearInterval(flushTimer);
      eventQueue.length = 0;
      log('Opted out');
    },

    optIn: function() {
      localStorage.removeItem(OPTOUT_KEY);
      log('Opted in - please reload page');
    },

    isOptedOut: function() {
      return localStorage.getItem(OPTOUT_KEY) === 'true';
    }
  };

  window.WA = Analytics;

})(window);
