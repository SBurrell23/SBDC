/* stevenburrell.com — tabs, project rendering, and the terminal flavor. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------ projects -- */
  function renderProjects() {
    var host = document.getElementById('projGrid');
    if (!host || !window.PROJECTS) return;

    var html = window.PROJECTS.map(function (p, i) {
      var idx = String(i + 1).padStart(2, '0');
      var tags = p.tags.map(function (t) {
        return '<span class="tag">' + t + '</span>';
      }).join('');

      return '' +
        '<article class="proj">' +
          '<div class="proj-bar">' +
            '<span class="proj-path">~/projects/<b>' + p.slug + '</b></span>' +
            '<span class="proj-idx">' + idx + '</span>' +
          '</div>' +
          '<a class="proj-main" href="' + p.url + '" target="_blank" rel="noopener"' +
            ' aria-label="Play ' + p.name + '">' +
            '<span class="proj-icon"><i class="fas ' + p.icon + '"></i></span>' +
            '<span>' +
              '<span class="proj-name">' + p.name + '</span>' +
              '<span class="proj-desc">' + p.desc + '</span>' +
            '</span>' +
          '</a>' +
          '<div class="proj-foot">' +
            '<div class="tags">' + tags + '</div>' +
            '<div class="tags">' +
              '<a class="proj-src" href="' + p.repo + '" target="_blank" rel="noopener"' +
                ' title="Source on GitHub"><i class="fab fa-github"></i></a>' +
              '<a class="proj-run" href="' + p.url + '" target="_blank" rel="noopener">' +
                'run<i class="fas fa-caret-right"></i></a>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');

    host.innerHTML = html;
  }

  /* ------------------------------------------------------ contact links -- */
  /* Contact details are kept out of the markup so a crawler scraping the raw
     HTML finds no address or profile URL to harvest. Each .lk carries the
     value reversed then base64'd; hrefs are assembled here at runtime. */
  function deob(v) {
    try {
      return atob(v).split('').reverse().join('');
    } catch (e) {
      return '';
    }
  }

  function wireLinks() {
    document.querySelectorAll('a.lk').forEach(function (a) {
      var val = deob(a.dataset.x);
      if (!val) return;

      a.href = a.dataset.as === 'mail' ? 'mailto:' + val : val;
      if (a.dataset.t) a.textContent = deob(a.dataset.t);

      // strip the payload once it has been used
      delete a.dataset.x;
      delete a.dataset.t;
      delete a.dataset.as;
    });
  }

  /* ---------------------------------------------------------------- tabs -- */
  var TABS = ['home', 'about', 'experience', 'portfolio'];

  function showTab(id, pushHash) {
    if (TABS.indexOf(id) === -1) id = 'home';

    TABS.forEach(function (t) {
      var btn = document.querySelector('.tab[data-tab="' + t + '"]');
      var view = document.getElementById('view-' + t);
      if (btn) btn.classList.toggle('active', t === id);
      if (view) view.classList.toggle('active', t === id);
    });

    var vp = document.querySelector('.viewport');
    if (vp) vp.scrollTop = 0;

    if (pushHash && location.hash !== '#' + id) {
      history.replaceState(null, '', '#' + id);
    }
  }

  function wireTabs() {
    document.querySelectorAll('.tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showTab(btn.dataset.tab, true);
      });
    });

    window.addEventListener('hashchange', function () {
      showTab(location.hash.replace('#', ''), false);
    });

    // 1-4 jump straight to a tab, when not typing in a field.
    document.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= TABS.length) showTab(TABS[n - 1], true);
    });

    showTab(location.hash.replace('#', '') || 'home', false);
  }

  /* --------------------------------------------------------- role typing -- */
  var ROLES = [
    'full stack developer',
    'frontend engineer',
    'API architect',
    'web app designer',
    'game tinkerer',
    'running enthusiast'
  ];

  function typeLoop() {
    var out = document.getElementById('roleText');
    if (!out) return;

    if (reduceMotion) {
      out.textContent = ROLES[0];
      return;
    }

    var r = 0, c = 0, erasing = false;

    (function tick() {
      var word = ROLES[r];
      out.textContent = word.slice(0, c);

      var delay;
      if (!erasing) {
        c++;
        delay = 62;
        if (c > word.length) { erasing = true; delay = 1500; }
      } else {
        c--;
        delay = 32;
        if (c === 0) { erasing = false; r = (r + 1) % ROLES.length; delay = 320; }
      }
      setTimeout(tick, delay);
    })();
  }

  /* ---------------------------------------------------------- matrix rain -- */
  function matrixRain() {
    var cv = document.getElementById('matrix');
    if (!cv || reduceMotion) return;

    var ctx = cv.getContext('2d');
    var glyphs = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ01</>{}[]$#*+=;:_'.split('');
    var size = 15;
    var cols = 0;
    var drops = [];

    function resize() {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      cols = Math.ceil(cv.width / size);
      drops = new Array(cols);
      for (var i = 0; i < cols; i++) {
        drops[i] = Math.random() * -50;
      }
    }

    function draw() {
      ctx.fillStyle = 'rgba(4, 7, 6, 0.08)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = size + 'px monospace';

      for (var i = 0; i < cols; i++) {
        var ch = glyphs[(Math.random() * glyphs.length) | 0];
        var y = drops[i] * size;

        ctx.fillStyle = Math.random() > 0.985 ? '#eafff5' : '#0f8f5e';
        ctx.fillText(ch, i * size, y);

        if (y > cv.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    resize();
    window.addEventListener('resize', resize);

    var last = 0;
    (function frame(ts) {
      if (ts - last > 55) { draw(); last = ts; }
      requestAnimationFrame(frame);
    })(0);
  }

  /* ------------------------------------------------------------ boot text -- */
  var BOOT = [
    'sbdc-terminal v3.0.0 (' + new Date().getFullYear() + ')',
    'mounting /dev/portfolio ......... ok',
    'loading identity: steven.burrell . ok',
    'resolving projects [12] ......... ok',
    'starting ui ..................... ok',
    '',
    '> launch'
  ];

  function bootSequence(done) {
    var el = document.getElementById('boot');
    if (!el || reduceMotion) {
      if (el) el.parentNode.removeChild(el);
      done();
      return;
    }

    var i = 0;
    (function next() {
      if (i >= BOOT.length) {
        setTimeout(function () {
          el.classList.add('done');
          setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
          }, 500);
        }, 220);
        done();
        return;
      }
      el.textContent += BOOT[i] + '\n';
      i++;
      setTimeout(next, 110);
    })();
  }

  /* ---------------------------------------------------------------- init -- */
  function init() {
    renderProjects();
    wireLinks();
    wireTabs();
    matrixRain();
    bootSequence(typeLoop);

    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
