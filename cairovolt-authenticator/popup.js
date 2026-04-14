/* ══════════════════════════════════════════════════════
   CairoVolt Authenticator — Chrome Extension Popup JS
   
   Core Logic:
   1. Validate serial number format (13 chars, CV-1XXXXXm313 pattern)
   2. Open cairovolt.com/verify with serial + UTM params in new tab
   3. All verification done server-side — extension is a "smart portal"
   ══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── DOM References ─────────────────────────────────
  const serialInput = document.getElementById('serial-input');
  const verifyBtn = document.getElementById('verify-btn');
  const inputStatus = document.getElementById('input-status');
  const securityNotice = document.getElementById('security-notice');
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');

  // ── Constants ──────────────────────────────────────
  const SERIAL_LENGTH = 13;
  const VERIFY_BASE_URL = 'https://cairovolt.com/verify';
  const UTM_PARAMS = {
    utm_source: 'chrome_extension',
    utm_medium: 'extension',
    utm_campaign: 'c2pa_authenticator',
    utm_content: 'popup_verify_btn'
  };

  // ── Serial Format Validation ───────────────────────
  // Accepts: CV-1XXXXXm313 (case-insensitive)
  // Pattern: CV- (prefix) + 1 (digit) + 5 alphanumeric + m313 (suffix)
  function isValidSerialFormat(serial) {
    if (!serial || serial.length !== SERIAL_LENGTH) return false;
    // Relaxed regex: CV- prefix, then 1, then 5 alphanumeric, then m313
    const pattern = /^[Cc][Vv]-1[A-Za-z0-9]{5}[Mm]313$/;
    return pattern.test(serial);
  }

  // ── Build Verification URL ─────────────────────────
  function buildVerifyURL(serial) {
    const url = new URL(VERIFY_BASE_URL);
    url.searchParams.set('s', serial.trim());
    
    // Add UTM tracking parameters
    Object.entries(UTM_PARAMS).forEach(function (entry) {
      url.searchParams.set(entry[0], entry[1]);
    });
    
    // Add timestamp for cache-busting and analytics
    url.searchParams.set('ext_ts', Date.now().toString());
    
    return url.toString();
  }

  // ── UI State Management ────────────────────────────
  function setInputState(state) {
    // state: 'neutral' | 'typing' | 'valid' | 'invalid'
    serialInput.classList.remove('valid', 'invalid');
    inputStatus.classList.remove('show', 'valid', 'invalid');
    
    switch (state) {
      case 'valid':
        serialInput.classList.add('valid');
        inputStatus.classList.add('show', 'valid');
        verifyBtn.disabled = false;
        hideError();
        showNotice();
        break;
      case 'invalid':
        serialInput.classList.add('invalid');
        inputStatus.classList.add('show', 'invalid');
        verifyBtn.disabled = true;
        hideNotice();
        break;
      case 'typing':
        verifyBtn.disabled = true;
        hideError();
        hideNotice();
        break;
      default:
        verifyBtn.disabled = true;
        hideError();
        hideNotice();
    }
  }

  function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
    securityNotice.style.display = 'none';
  }

  function hideError() {
    errorMessage.style.display = 'none';
  }

  function showNotice() {
    securityNotice.style.display = 'flex';
  }

  function hideNotice() {
    securityNotice.style.display = 'none';
  }

  // ── Input Handler ──────────────────────────────────
  serialInput.addEventListener('input', function () {
    var value = serialInput.value;
    
    if (value.length === 0) {
      setInputState('neutral');
      return;
    }
    
    if (value.length < SERIAL_LENGTH) {
      setInputState('typing');
      return;
    }
    
    if (value.length === SERIAL_LENGTH) {
      if (isValidSerialFormat(value)) {
        setInputState('valid');
      } else {
        setInputState('invalid');
        showError('Invalid format. Expected: CV-1XXXXXm313');
      }
    }
  });

  // Prevent typing beyond max length
  serialInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !verifyBtn.disabled) {
      e.preventDefault();
      handleVerify();
    }
  });

  // ── Verify Button Handler ──────────────────────────
  function handleVerify() {
    var serial = serialInput.value.trim();
    
    if (!isValidSerialFormat(serial)) {
      showError('Please enter a valid 13-character serial number');
      return;
    }
    
    var url = buildVerifyURL(serial);
    
    // Open verification page in new tab using native Chrome API
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: url });
    } else {
      window.open(url, '_blank');
    }
    
    // Visual feedback
    verifyBtn.textContent = '✓ Opening verification...';
    verifyBtn.disabled = true;
    
    // Reset button after 2 seconds
    setTimeout(function () {
      verifyBtn.innerHTML = 
        '<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' +
        '</svg><span>Verify Now</span>';
      verifyBtn.disabled = false;
    }, 2000);
  }

  verifyBtn.addEventListener('click', handleVerify);

  // ── External Link Tracking ─────────────────────────
  // Track which links users click (appends UTM to cairovolt.com links)
  document.querySelectorAll('a[href*="cairovolt.com"]').forEach(function (link) {
    var originalHref = link.getAttribute('href');
    try {
      var url = new URL(originalHref);
      url.searchParams.set('utm_source', 'chrome_extension');
      url.searchParams.set('utm_medium', 'extension');
      url.searchParams.set('utm_campaign', 'c2pa_authenticator');
      link.setAttribute('href', url.toString());
    } catch (e) {
      // Invalid URL, skip
    }
  });

  // ── Auto-focus input on popup open ─────────────────
  setTimeout(function () {
    serialInput.focus();
  }, 100);

})();
