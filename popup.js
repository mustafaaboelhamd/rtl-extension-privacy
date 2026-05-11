// popup.js

const enableToggle = document.getElementById('enableToggle');
const rescanBtn    = document.getElementById('rescanBtn');
const statusDot    = document.getElementById('statusDot');
const statusText   = document.getElementById('statusText');
const pageLabel    = document.getElementById('pageLabel');
const fixedCount   = document.getElementById('fixedCount');
const pageCount    = document.getElementById('pageCount');

// ── Privacy link ────────────────────────────────────────────────
document.getElementById('privacyLink').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: chrome.runtime.getURL('privacy.html') });
});

// ── Load saved state ────────────────────────────────────────────
chrome.storage.local.get(['enabled', 'fixedTotal', 'pageTotal'], (data) => {
  const enabled = data.enabled !== false; // default true
  enableToggle.checked = enabled;
  fixedCount.textContent = data.fixedTotal || 0;
  pageCount.textContent  = data.pageTotal  || 0;
  updateStatus(enabled);
});

// ── Check active tab ────────────────────────────────────────────
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0]?.url || '';
  if (url.includes('claude.ai') || url.includes('artifacts.claude.ai')) {
    pageLabel.textContent = '✅ claude.ai';
  } else {
    pageLabel.textContent = '⚠️ ليس على claude.ai';
    statusText.textContent = 'افتح claude.ai لتفعيل الإضافة';
    statusDot.classList.add('off');
  }
});

// ── Toggle ──────────────────────────────────────────────────────
enableToggle.addEventListener('change', () => {
  const enabled = enableToggle.checked;
  chrome.storage.local.set({ enabled });
  updateStatus(enabled);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    chrome.tabs.sendMessage(tabs[0].id, { action: 'rescan', enabled });
  });
});

// ── Rescan button ───────────────────────────────────────────────
rescanBtn.addEventListener('click', () => {
  rescanBtn.textContent = '⏳ جارٍ المسح...';
  rescanBtn.disabled = true;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    chrome.tabs.sendMessage(tabs[0].id, { action: 'rescan', enabled: enableToggle.checked }, (resp) => {
      setTimeout(() => {
        rescanBtn.textContent = '🔄 إعادة المسح الآن';
        rescanBtn.disabled = false;

        // Bump counters for feedback
        chrome.storage.local.get(['fixedTotal','pageTotal'], (data) => {
          const newFixed = (data.fixedTotal || 0) + 1;
          const newPages = (data.pageTotal  || 0) + 1;
          chrome.storage.local.set({ fixedTotal: newFixed, pageTotal: newPages });
          fixedCount.textContent = newFixed;
          pageCount.textContent  = newPages;
        });
      }, 800);
    });
  });
});

// ── UI helpers ──────────────────────────────────────────────────
function updateStatus(enabled) {
  if (enabled) {
    statusText.textContent = 'الإضافة مفعّلة';
    statusDot.classList.remove('off');
  } else {
    statusText.textContent = 'الإضافة متوقفة';
    statusDot.classList.add('off');
  }
}
