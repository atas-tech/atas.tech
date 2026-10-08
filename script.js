/* ATAS.TECH — terminal interactivity (vanilla, no dependencies) */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Project registry (read from the DOM) ---------------- */
  const projects = $$('[data-slug]').map((el) => ({
    slug: el.dataset.slug,
    name: el.dataset.name || el.dataset.slug,
    url: el.dataset.url || '',
    status: el.dataset.status || 'online',
    desc: (el.querySelector('.project-description')?.textContent || '').trim().replace(/\s+/g, ' '),
    anchor: el.id ? `#${el.id}` : '',
  }));
  const byslug = (s) => projects.find((p) => p.slug === s);
  const online = projects.filter((p) => p.status === 'online').length;
  const pending = projects.filter((p) => p.status === 'pending').length;
  const omarchyPlugins = $$('[data-omarchy]').length;
  const listedPlugins = $$('[data-omarchy="listed"]').length;

  /* ---------------- Stats + totals kept in sync with the cards ---------------- */
  const setStat = (id, n) => { const el = $(id); if (el) { el.dataset.count = String(n); el.textContent = String(n); } };
  setStat('#stat-active', online);
  setStat('#stat-plugins', omarchyPlugins);
  setStat('#stat-listed', listedPlugins);
  const totals = $('#project-totals');
  if (totals) totals.textContent = `Total items: ${online} active, ${pending} pending.`;

  /* ---------------- Typewriter reveal (opt-in, so text never hides) ---------------- */
  if (!reduceMotion) $$('.hero .typewriter').forEach((el) => el.classList.add('typing'));

  /* ---------------- Clock (viewer's own time zone) ---------------- */
  const clock = $('#clock');
  if (clock) {
    // h23 rather than hour12:false: some locales resolve that to a 24:xx midnight.
    const timeFmt = new Intl.DateTimeFormat('en-GB', { hourCycle: 'h23', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // Viewer's own locale, so a US visitor gets EDT rather than GMT-4.
    const zoneFmt = (() => {
      try { return new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' }); } catch { return null; }
    })();
    const offsetLabel = (d) => {
      const off = -d.getTimezoneOffset();
      const h = Math.floor(Math.abs(off) / 60);
      const m = Math.abs(off) % 60;
      return `UTC${off < 0 ? '-' : '+'}${h}${m ? ':' + String(m).padStart(2, '0') : ''}`;
    };
    // Recomputed each tick so a daylight-saving change is picked up live.
    const zoneLabel = (d) => {
      if (zoneFmt) {
        const name = zoneFmt.formatToParts(d).find((part) => part.type === 'timeZoneName')?.value;
        // Latin-only, so a locale that names zones in another script cannot
        // print tofu boxes in the terminal font.
        if (name && /^[A-Za-z0-9:+-]{1,9}$/.test(name)) return name;
      }
      return offsetLabel(d);
    };
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (zone) clock.title = `Your local time · ${zone}`;
    } catch { /* no resolved zone available */ }
    const tick = () => {
      const now = new Date();
      clock.textContent = `${zoneLabel(now)} ${timeFmt.format(now)}`;
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------------- Boot overlay (once per session) ---------------- */
  let bootDone = Promise.resolve();
  const seenBoot = (() => { try { return sessionStorage.getItem('atas-boot') === '1'; } catch { return false; } })();
  if (!reduceMotion && !seenBoot) {
    try { sessionStorage.setItem('atas-boot', '1'); } catch { /* private mode */ }
    bootDone = new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'boot';
      overlay.setAttribute('aria-hidden', 'true');
      const skip = document.createElement('span'); skip.className = 'skip'; skip.textContent = 'CLICK / ANY KEY TO SKIP';
      const pre = document.createElement('pre');
      overlay.append(skip, pre);
      document.body.appendChild(overlay);

      const lines = [
        ['amber', 'ATAS BIOS v2018.0.1 — SG_LAB_01'],
        ['', '[ OK ] Phosphor warm-up'],
        ['', `[ OK ] Mounting /projects (${online} entries)`],
        ['', '[ OK ] Trust baseline pinned · omasafe-cli 0.3.3'],
        ['', `[ OK ] Loading omarchy plugins ×${omarchyPlugins}`],
        ['', '[ OK ] Connection encrypted'],
        ['amber', '> Starting atas.tech_'],
      ];
      let finished = false;
      const finish = () => {
        if (finished) return; finished = true;
        overlay.classList.add('done');
        setTimeout(() => overlay.remove(), 500);
        window.removeEventListener('keydown', finish);
        resolve();
      };
      overlay.addEventListener('click', finish);
      window.addEventListener('keydown', finish);
      (async () => {
        for (const [cls, text] of lines) {
          if (finished) return;
          const span = document.createElement('span');
          if (cls) span.className = cls;
          span.textContent = text + '\n';
          pre.appendChild(span);
          await sleep(110 + Math.random() * 90);
        }
        await sleep(260);
        finish();
      })();
    });
  }

  /* ---------------- Reveal on scroll + count-up ---------------- */
  const reveals = $$('.reveal');
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target) || reduceMotion) { el.textContent = el.dataset.count; return; }
    const start = performance.now(); const dur = 900;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        $$('.stat-n[data-count]', e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---------------- Active nav link ---------------- */
  const navLinks = $$('.nav-links a[data-nav]');
  if ('IntersectionObserver' in window && navLinks.length) {
    const map = new Map(navLinks.map((a) => [a.dataset.nav, a]));
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.remove('active'));
        map.get(e.target.id)?.classList.add('active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['home', 'featured', 'omarchy', 'agents'].forEach((id) => { const s = document.getElementById(id); if (s) navIO.observe(s); });
  }

  /* ---------------- Copy buttons ---------------- */
  $$('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const code = btn.closest('.cmdbox')?.querySelector('code');
      const text = (code?.textContent || '').trim();
      if (!text) return;
      let ok = false;
      try { await navigator.clipboard.writeText(text); ok = true; }
      catch {
        const ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { ok = document.execCommand('copy'); } catch { ok = false; }
        ta.remove();
      }
      const prev = btn.textContent;
      btn.textContent = ok ? '[ copied ]' : '[ failed ]';
      btn.classList.toggle('done', ok);
      setTimeout(() => { btn.textContent = prev; btn.classList.remove('done'); }, 1500);
    });
  });

  /* ---------------- Live terminal ---------------- */
  const out = $('#term-out');
  const form = $('#term-form');
  const input = $('#term-input');
  if (!out || !form || !input) return;

  const PROMPT = 'atas@sg-lab-01:~$ ';
  const line = (kind, text) => {
    const div = document.createElement('div');
    div.className = `term-line ${kind}`;
    if (kind === 'cmd') {
      const p = document.createElement('span'); p.className = 'prompt'; p.textContent = PROMPT;
      const t = document.createElement('span'); t.className = 'text'; t.textContent = text;
      div.append(p, t);
    } else {
      div.textContent = text;
    }
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
    return div;
  };
  const print = (lines, kind = 'out') => lines.forEach((l) => line(kind, l));

  const columns = (items, cols = 3) => {
    const w = Math.max(...items.map((s) => s.length)) + 2;
    const rows = [];
    for (let i = 0; i < items.length; i += cols) rows.push(items.slice(i, i + cols).map((s) => s.padEnd(w)).join('').trimEnd());
    return rows;
  };

  const pluginRows = [
    'io.github.tuthan.dropdown-terminal       2.3.0   enabled',
    'io.github.tuthan.omasafe                 0.5.1   enabled',
    'io.github.hvo.omarchy-unraid             1.0.1   enabled',
    'io.github.tuthan.omarchy-lunar-calendar  1.1.0   enabled',
    'io.github.tuthan.steamoscompanion        0.5.14  enabled',
  ];

  const commands = {
    help: () => print([
      'available commands:',
      '  help                 this list',
      '  ls                   list projects',
      '  cat <project>        describe a project',
      '  open <project>       launch a project in a new tab',
      '  plugins              omarchy plugin list',
      '  whoami · uptime · date · pwd · clear',
    ]),
    ls: () => print(columns(projects.map((p) => p.slug + (p.status === 'pending' ? '~' : '/')))),
    cat: (arg) => {
      const p = byslug(arg);
      if (!arg) return print(['usage: cat <project>'], 'err');
      if (!p) return print([`cat: ${arg}: No such file or directory`], 'err');
      print([`# ${p.name}`], 'title');
      print([p.desc || '(no description)']);
      print([p.url ? `url: ${p.url}` : 'url: access pending'], p.url ? 'ok' : 'hint');
    },
    open: (arg) => {
      const p = byslug(arg);
      if (!arg) return print(['usage: open <project>'], 'err');
      if (!p) return print([`open: ${arg}: not found — try 'ls'`], 'err');
      if (!p.url) return print([`open: ${p.name}: access pending`], 'hint');
      print([`opening ${p.url} ...`], 'ok');
      window.open(p.url, '_blank', 'noopener');
    },
    plugins: () => print(pluginRows),
    whoami: () => print(['atas.tech — boutique AI research lab · Singapore (SG_LAB_01)']),
    uptime: () => {
      const years = new Date().getFullYear() - 2018;
      print([`up ${years} years since 2018, ${online} projects online, load average: high`]);
    },
    date: () => print([new Date().toString()]),
    pwd: () => print(['/home/atas/projects']),
    clear: () => { out.replaceChildren(); },
    sudo: () => print(['atas is not in the sudoers file. This incident will be reported.'], 'err'),
    exit: () => print(['logout — just kidding, this is a website. Scroll on.'], 'hint'),
    neofetch: () => print([
      '   /\\        atas@sg-lab-01',
      '  /  \\  /\\   ----------------',
      ' / /\\ \\/  \\  OS: atas.tech (est. 2018)',
      '/_/  \\/____\\ Shell: bash · Theme: amber phosphor',
      `             Projects: ${online} online · ${pending} pending`,
      `             Plugins: ${listedPlugins} listed on plugins.omarchy.org`,
    ], 'ok'),
  };
  commands.atasfetch = commands.neofetch;
  commands['?'] = commands.help;

  const run = (raw) => {
    const value = raw.trim();
    line('cmd', value);
    if (!value) return;
    const [cmd, ...rest] = value.split(/\s+/);
    const fn = commands[cmd.toLowerCase()];
    if (fn) fn(rest.join(' ').replace(/[/~]+$/, ''));
    else print([`bash: ${cmd}: command not found — try 'help'`], 'err');
  };

  const history = []; let hIndex = 0;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value;
    if (v.trim()) { history.push(v); hIndex = history.length; }
    input.value = '';
    run(v);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); if (hIndex > 0) input.value = history[--hIndex] || ''; }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (hIndex < history.length) input.value = history[++hIndex] || ''; }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); commands.clear(); }
  });
  out.addEventListener('click', () => { if (!form.hidden) input.focus({ preventScroll: true }); });

  const typeCommand = async (text) => {
    const div = line('cmd', '');
    const t = div.querySelector('.text');
    const cur = document.createElement('span'); cur.className = 'term-cursor'; div.appendChild(cur);
    for (const ch of text) { t.textContent += ch; await sleep(reduceMotion ? 0 : 18 + Math.random() * 30); }
    await sleep(reduceMotion ? 0 : 220);
    cur.remove();
  };

  const scripted = [
    { cmd: 'whoami', out: ['atas.tech — boutique AI research lab · Singapore (SG_LAB_01)'] },
    { cmd: 'ls /projects', out: columns(projects.map((p) => p.slug + (p.status === 'pending' ? '~' : '/'))) },
    { cmd: 'omarchy plugin list --mine', out: pluginRows },
    { cmd: 'cat /etc/motd', out: ['Know what your system can do. Catch what quietly changed.'] },
  ];

  (async () => {
    await bootDone;
    out.querySelectorAll('noscript').forEach((n) => n.remove());
    await sleep(reduceMotion ? 0 : 400);
    for (const step of scripted) {
      await typeCommand(step.cmd);
      for (const l of step.out) { line('out', l); await sleep(reduceMotion ? 0 : 45); }
      await sleep(reduceMotion ? 0 : 380);
    }
    line('hint', "type 'help' to explore · 'open blindpass' launches a project");
    form.hidden = false;
  })();
})();
