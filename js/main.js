// SOFIA ISOBEL — site behaviour
// Kept deliberately small: a nav toggle for mobile, a lightbox for the
// photographs page, and the footer year. No frameworks, no build step.

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

});
