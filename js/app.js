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

      // The whole card is the link, so it holds no interactive children.
      return '' +
        '<a class="proj" href="' + p.url + '" target="_blank" rel="noopener"' +
          ' aria-label="Open ' + p.name + '">' +
          '<span class="proj-bar">' +
            '<span class="proj-path">~/projects/<b>' + p.slug + '</b></span>' +
            '<span class="proj-idx">' + idx + '</span>' +
          '</span>' +
          '<span class="proj-main">' +
            '<span class="proj-icon"><i class="fas ' + p.icon + '"></i></span>' +
            '<span>' +
              '<span class="proj-name">' + p.name + '</span>' +
              '<span class="proj-desc">' + p.desc + '</span>' +
            '</span>' +
          '</span>' +
          '<span class="proj-foot">' +
            '<span class="tags">' + tags + '</span>' +
          '</span>' +
        '</a>';
    }).join('');

    host.innerHTML = html;
  }

  /* -------------------------------------------------------------- filter -- */
  function wireFilter() {
    var grid  = document.getElementById('projGrid');
    var input = document.getElementById('projFilter');
    var bar   = document.getElementById('filterBar');
    var count = document.getElementById('filterCount');
    var empty = document.getElementById('filterEmpty');
    if (!grid || !input) return;

    var cards = [].slice.call(grid.querySelectorAll('.proj'));

    // Apostrophes are dropped on both sides so a title like "Steven’s" is
    // reachable by typing "stevens" or "steven's".
    function norm(v) {
      return v.toLowerCase().replace(/['’]/g, '');
    }

    // One normalised haystack per card, built once rather than per keystroke.
    var hay = (window.PROJECTS || []).map(function (p) {
      return norm(p.name + ' ' + p.slug + ' ' + p.desc + ' ' + p.tags.join(' '));
    });

    // .is-in carries animation-fill-mode: both, so leaving it on would pin
    // transform and kill the hover lift. Clear it on a timer rather than on
    // animationend, which never fires if the tab is hidden mid-animation.
    var MAX_DELAY = 130;
    var DURATION = 160;
    var sweep = null;

    function clearEntry() {
      cards.forEach(function (c) {
        c.classList.remove('is-in');
        c.style.animationDelay = '';
      });
    }

    function apply(animate) {
      var raw = input.value.trim();
      var q = norm(raw);
      var hits = 0;

      if (animate) {
        clearTimeout(sweep);
        clearEntry();
        void grid.offsetWidth; // one reflow, so every card restarts together
      }

      cards.forEach(function (card, i) {
        var hit = !q || hay[i].indexOf(q) !== -1;
        card.classList.toggle('is-out', !hit);

        if (hit && animate) {
          // Stagger, but cap it so a wide match still feels instant.
          card.style.animationDelay = Math.min(hits * 16, MAX_DELAY) + 'ms';
          card.classList.add('is-in');
        }
        if (hit) hits++;
      });

      if (animate) sweep = setTimeout(clearEntry, MAX_DELAY + DURATION + 60);

      bar.classList.toggle('has-q', raw !== '');

      count.textContent = '';
      var n = document.createElement('b');
      n.textContent = hits;
      count.appendChild(n);
      count.appendChild(document.createTextNode('/' + cards.length));

      if (empty) {
        empty.hidden = hits !== 0;
        if (!hits) {
          empty.textContent = 'grep: no projects match ';
          var b = document.createElement('b');
          b.textContent = "'" + raw + "'";
          empty.appendChild(b);
        }
      }
    }

    input.addEventListener('input', function () { apply(true); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        input.value = '';
        apply(true);
        input.blur();
      }
    });

    // "/" drops you into the filter, the way it does in a pager.
    document.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      var home = document.getElementById('view-home');
      if (!home || !home.classList.contains('active')) return;

      e.preventDefault();
      input.focus();
    });

    apply(false);
  }

  /* ------------------------------------------------------ contact links -- */
  /* Contact details are kept out of the markup so a crawler scraping the raw
     HTML finds no address or profile URL to harvest. Each .lk carries the
     value reversed then base64'd; hrefs are assembled here at runtime.

     The address goes a step further than the profile links: nothing is
     decoded until a real click, so a scraper that executes the page's JS
     still finds no mailto and no address anywhere in the DOM. Anchors
     carrying data-ph show that placeholder until someone reveals them. */
  function deob(v) {
    try {
      return atob(v).split('').reverse().join('');
    } catch (e) {
      return '';
    }
  }

  function strip(a) {
    delete a.dataset.x;
    delete a.dataset.t;
    delete a.dataset.as;
    delete a.dataset.ph;
  }

  function wireMail(a) {
    var ph = a.dataset.ph;

    if (ph) {
      // Looks and behaves like a button until it holds a real address.
      a.textContent = ph;
      a.classList.add('lk-veil');
      a.setAttribute('role', 'button');
      a.setAttribute('tabindex', '0');
      a.setAttribute('aria-label', 'Reveal email address');
    }

    function reveal(e) {
      if (e) e.preventDefault();

      var val = deob(a.dataset.x);
      if (!val) return;

      a.href = 'mailto:' + val;
      if (a.dataset.t) a.textContent = deob(a.dataset.t);
      strip(a);

      a.removeEventListener('click', reveal);
      a.removeEventListener('keydown', onKey);

      if (ph) {
        a.classList.remove('lk-veil');
        a.removeAttribute('role');
        a.removeAttribute('tabindex');
        a.setAttribute('aria-label', 'Email ' + val);
      } else {
        // These never showed a placeholder, so the click was meant for the
        // mail client -- honour it now that the href exists.
        window.location.href = a.href;
      }
    }

    function onKey(e) {
      if (e.key === 'Enter' || e.key === ' ') reveal(e);
    }

    a.addEventListener('click', reveal);
    a.addEventListener('keydown', onKey);
  }

  function wireLinks() {
    document.querySelectorAll('a.lk').forEach(function (a) {
      if (!a.dataset.x) return;

      if (a.dataset.as === 'mail') {
        wireMail(a);
        return;
      }

      // Profile links carry nothing worth gating behind a click.
      a.href = deob(a.dataset.x);
      if (a.dataset.t) a.textContent = deob(a.dataset.t);
      strip(a);
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
    'software architect',
    'agentic developer',
    'full stack developer',
    'product engineer',
    'rapid prototyper',
    'code reviewer',
    'game tinkerer',
    'pickleball enthusiast'
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

  /* ------------------------------------------------------------ boot text -- */
  var BOOT = [
    'sbdc-terminal v3.0.0 (' + new Date().getFullYear() + ')',
    'mounting /dev/portfolio ......... ok',
    'loading identity: steven.burrell . ok',
    'resolving projects [' + (window.PROJECTS || []).length + '] ......... ok',
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
    wireFilter();
    wireLinks();
    wireTabs();
    bootSequence(typeLoop);

    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

    // portfolio.json quotes the catalog size; read it rather than hardcode it.
    var pf = document.getElementById('pfCount');
    if (pf) pf.textContent = (window.PROJECTS || []).length;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
