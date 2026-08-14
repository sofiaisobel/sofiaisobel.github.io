// SOFIA ISOBEL — site behaviour
// Kept deliberately small: a nav toggle for mobile, a lightbox for the
// photographs page, and the footer year. No frameworks, no build step.

// Tracks whether the YouTube IFrame API has *fully* finished loading.
// window.YT can exist for a moment before window.YT.Player is actually a
// constructor, so probing `typeof window.YT.Player === 'function'` alone is
// not reliable — the only safe signal is this callback, which YouTube's
// script calls once initialisation is complete.
var youTubeApiReady = false;
window.onYouTubeIframeAPIReady = function () {
  youTubeApiReady = true;
};

document.addEventListener('DOMContentLoaded', function () {


  // ---- mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- veil ---------
  var veil = document.querySelector('.page-veil');
  if (veil) {
    var FADE_MS = 380;
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      var isInternalPage = href &&
        href.charAt(0) !== '#' &&
        href.indexOf('mailto:') !== 0 &&
        href.indexOf('tel:') !== 0 &&
        href.indexOf('http') !== 0 &&
        link.target !== '_blank';
      if (!isInternalPage) return;
      link.addEventListener('click', function (e) {
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        veil.classList.add('is-active');
        window.setTimeout(function () { window.location.href = href; }, FADE_MS);
      });
    });
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) veil.classList.remove('is-active');
    });
  }

  // ---- footer year ----
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- lightbox (photographs page) ----
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbTag = lightbox.querySelector('.tag');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.photo-grid .frame').forEach(function (frame) {
      frame.addEventListener('click', function () {
        var label = frame.querySelector('.tag');
        if (lbTag && label) { lbTag.textContent = label.textContent; }
        lightbox.classList.add('is-open');
        closeBtn.focus();
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-open');
    }
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }
// ---- video embed setup ----
  const videoWrappers = document.querySelectorAll('.video-embed-wrapper');

  videoWrappers.forEach(wrapper => {
    const overlay = wrapper.querySelector('.video-overlay');
    const targetDiv = wrapper.querySelector('.youtube-target');
    const videoId = wrapper.getAttribute('data-video-id');

    // 1. Fetch and set the thumbnail immediately on DOM load
    if (videoId && overlay) {
      // Swapped to hqdefault.jpg to prevent 404 errors on older/lower-res videos
      overlay.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg')`;
    }

    // 2. Attach the click listener immediately
    if (overlay && targetDiv) {
      overlay.addEventListener('click', function() {
        if (!videoId) {
          console.error('No video ID provided for this card.');
          return;
        }

        // Hide overlay on click
        overlay.style.display = 'none';

        // 3. Only use the API once it has confirmed it's actually ready —
        // window.YT can exist while YT.Player is still not a real
        // constructor yet, which used to throw here and leave the overlay
        // hidden with nothing behind it (a blank card).
        var usedApi = false;
        if (youTubeApiReady && window.YT && typeof window.YT.Player === 'function') {
          try {
            new YT.Player(targetDiv, {
              height: '100%',
              width: '100%',
              videoId: videoId,
              playerVars: {
                'autoplay': 1,
                'playsinline': 1,
                'rel': 0
              }
            });
            usedApi = true;
          } catch (err) {
            console.error('YT.Player failed to initialize, falling back to iframe:', err);
          }
        }

        if (!usedApi) {
          // 4. Fallback: covers the API being blocked (e.g. uBlock Origin),
          // too slow, or not ready yet — inject a standard iframe so the
          // video still works regardless of API state.
          targetDiv.innerHTML = `
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>`;
        }
      });
    }
  });
});

// Load the YouTube IFrame Player API script dynamically.
// window.onYouTubeIframeAPIReady (defined above) is what actually tells us
// when it's safe to call `new YT.Player(...)`.
(function loadYouTubeAPI() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();
