(function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      });
    });
  }

  /* ---------- Scroll-triggered reveal ---------- */
  var revealTargets = document.querySelectorAll('.reveal, .process-item');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('form-success');
      form.hidden = true;
      if (success) success.classList.add('show');
    });
  }

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById('scroll-progress');
  var nav = document.querySelector('.site-nav');
  var ticking = false;
  function updateScrollState() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    var pct = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
    if (progressBar) progressBar.style.width = pct + '%';
    if (nav) nav.classList.toggle('is-scrolled', scrollTop > 8);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }, { passive: true });
  updateScrollState();

  /* ---------- Count-up numbers ---------- */
  function easeOutQuad(t) { return t * (2 - t); }
  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-count-to'));
    if (isNaN(to) || prefersReduced) return;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1100;
    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var progress = Math.min(1, (ts - start) / duration);
      var value = Math.round(easeOutQuad(progress) * to);
      el.textContent = prefix + value + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = prefix + to + suffix;
      }
    }
    requestAnimationFrame(frame);
  }
  var countTargets = document.querySelectorAll('[data-count-to]');
  if (countTargets.length) {
    if ('IntersectionObserver' in window && !prefersReduced) {
      var countIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            countUp(entry.target);
            countIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      countTargets.forEach(function (el) { countIo.observe(el); });
    }
  }

  /* ---------- Process timeline fill ---------- */
  var processList = document.getElementById('process-list');
  var processFill = document.getElementById('process-line-fill');
  if (processList && processFill) {
    var processTicking = false;
    function updateProcessFill() {
      var rect = processList.getBoundingClientRect();
      var viewportMid = window.innerHeight * 0.6;
      var progress = (viewportMid - rect.top) / rect.height;
      progress = Math.min(1, Math.max(0, progress));
      processFill.style.height = (progress * 100) + '%';
      processTicking = false;
    }
    window.addEventListener('scroll', function () {
      if (!processTicking) {
        window.requestAnimationFrame(updateProcessFill);
        processTicking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', updateProcessFill);
    updateProcessFill();
  }

  /* ---------- Smooth FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var summary = item.querySelector('summary');
    if (!summary) return;
    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (item.classList.contains('animating')) return;
      if (item.open) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  function contentHeight(item) {
    var summary = item.querySelector('summary');
    var body = item.querySelector('p');
    return summary.offsetHeight + (body ? body.offsetHeight : 0);
  }

  function openItem(item) {
    if (prefersReduced) { item.open = true; return; }
    item.style.height = item.querySelector('summary').offsetHeight + 'px';
    item.open = true;
    var target = contentHeight(item);
    requestAnimationFrame(function () {
      item.classList.add('animating');
      item.style.height = target + 'px';
    });
    item.addEventListener('transitionend', function onEnd(e) {
      if (e.propertyName !== 'height') return;
      item.classList.remove('animating');
      item.style.height = '';
      item.removeEventListener('transitionend', onEnd);
    });
  }

  function closeItem(item) {
    if (prefersReduced) { item.open = false; return; }
    item.style.height = contentHeight(item) + 'px';
    requestAnimationFrame(function () {
      item.classList.add('animating');
      item.style.height = item.querySelector('summary').offsetHeight + 'px';
    });
    item.addEventListener('transitionend', function onEnd(e) {
      if (e.propertyName !== 'height') return;
      item.classList.remove('animating');
      item.style.height = '';
      item.open = false;
      item.removeEventListener('transitionend', onEnd);
    });
  }

  /* ---------- Headline word-by-word reveal ---------- */
  var headline = document.querySelector('.hero h1');
  if (headline && !prefersReduced) {
    var delay = 260;
    var step = 70;
    Array.prototype.slice.call(headline.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var parts = node.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function (part) {
          if (part === '') return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            var span = document.createElement('span');
            span.className = 'text-reveal-word';
            span.style.animationDelay = delay + 'ms';
            span.textContent = part;
            frag.appendChild(span);
            delay += step;
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && node.tagName !== 'BR') {
        node.classList.add('text-reveal-word');
        node.style.animationDelay = delay + 'ms';
        delay += step;
      }
    });
  }

  /* ---------- Cursor-tracked hero glow ---------- */
  var hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(pointer: fine)').matches && !prefersReduced) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      var y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      hero.style.setProperty('--mx', x + '%');
      hero.style.setProperty('--my', y + '%');
    });
  }
})();
