/**
 * Claude Arabic RTL Fix - Content Script
 * Automatically detects Arabic text and applies RTL formatting
 */

(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────────
  const ARABIC_THRESHOLD = 0.3; // 30% Arabic chars → RTL
  const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;
  const HEBREW_REGEX = /[\u0590-\u05FF]/g;

  // Selectors covering messages, artifacts, and saved pages
  const CONTENT_SELECTORS = [
    // Main chat messages
    '[data-testid="user-message"]',
    '[data-testid="assistant-message"]',
    '.font-claude-message',
    // Prose containers
    '.prose',
    '.prose p',
    '.prose li',
    '.prose h1,.prose h2,.prose h3,.prose h4,.prose h5,.prose h6',
    '.prose blockquote',
    '.prose td,.prose th',
    // Artifact / preview panels
    '[data-testid="artifact-content"]',
    '.artifact-content',
    // Saved artifact pages (artifacts.claude.ai)
    'main p',
    'main li',
    'main h1,main h2,main h3,main h4',
    'main blockquote',
    // Generic fallback
    'p','li','h1','h2','h3','h4','h5','h6','td','th','blockquote','label','span'
  ];

  // ── Language Detection ──────────────────────────────────────────
  function detectScript(text) {
    if (!text || text.trim().length < 2) return 'neutral';
    const letters = text.replace(/[\s\d\W]/g, '');
    if (!letters.length) return 'neutral';
    const arabicCount = (text.match(ARABIC_REGEX) || []).length;
    const hebrewCount = (text.match(HEBREW_REGEX) || []).length;
    const ratio = (arabicCount + hebrewCount) / letters.length;
    if (ratio >= ARABIC_THRESHOLD) {
      return arabicCount >= hebrewCount ? 'arabic' : 'hebrew';
    }
    return 'ltr';
  }

  // ── Apply RTL to a single element ──────────────────────────────
  function applyRTL(el) {
    if (el.hasAttribute('data-rtl-processed')) return;

    // Skip code blocks entirely
    if (el.closest('pre, code, [class*="code"]')) return;

    const text = el.innerText || el.textContent || '';
    const script = detectScript(text);

    if (script === 'arabic' || script === 'hebrew') {
      el.setAttribute('dir', 'rtl');
      el.setAttribute('lang', script === 'arabic' ? 'ar' : 'he');
      el.classList.add('rtl-fixed');
      if (script === 'arabic') el.classList.add('rtl-arabic');
      if (script === 'hebrew') el.classList.add('rtl-hebrew');
    } else if (script === 'ltr') {
      el.setAttribute('dir', 'ltr');
      el.classList.add('rtl-ltr-fixed');
    }
    // Mixed / short text: leave browser default but still mark processed
    el.setAttribute('data-rtl-processed', '1');
  }

  // Handle a container: apply to itself and scan children
  function processContainer(container) {
    if (!container || !container.querySelectorAll) return;

    // Apply to the container if it is a leaf-ish element
    if (['P','LI','H1','H2','H3','H4','H5','H6','TD','TH','BLOCKQUOTE','LABEL','SPAN'].includes(container.tagName)) {
      applyRTL(container);
    }

    // Apply to matching children
    CONTENT_SELECTORS.forEach(sel => {
      try {
        container.querySelectorAll(sel).forEach(applyRTL);
      } catch (_) {}
    });
  }

  // ── Full-page scan ──────────────────────────────────────────────
  function scanPage() {
    CONTENT_SELECTORS.forEach(sel => {
      try {
        document.querySelectorAll(sel).forEach(applyRTL);
      } catch (_) {}
    });
  }

  // ── MutationObserver: watch for new content ─────────────────────
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return; // elements only
        processContainer(node);
      });
      // Also re-check changed character data (streaming text)
      if (m.type === 'characterData' && m.target.parentElement) {
        applyRTL(m.target.parentElement);
      }
    });
  });

  function startObserver() {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  // ── Init ────────────────────────────────────────────────────────
  function init() {
    scanPage();
    startObserver();

    // Re-scan after SPA navigations
    let lastUrl = location.href;
    new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setTimeout(scanPage, 500);
      }
    }).observe(document, { subtree: true, childList: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Message bridge for popup ────────────────────────────────────
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.action === 'rescan') {
      // Remove processed flags so everything is re-evaluated
      document.querySelectorAll('[data-rtl-processed]').forEach(el => {
        el.removeAttribute('data-rtl-processed');
        el.removeAttribute('dir');
        el.removeAttribute('lang');
        el.classList.remove('rtl-fixed','rtl-arabic','rtl-hebrew','rtl-ltr-fixed');
      });
      if (msg.enabled) scanPage();
      sendResponse({ ok: true });
    }
    return true;
  });

})();
