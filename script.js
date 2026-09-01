(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cursor glow and global pointer coordinates
  document.addEventListener('pointermove', (e) => {
    root.style.setProperty('--mx', `${e.clientX}px`);
    root.style.setProperty('--my', `${e.clientY}px`);
  });

  // Animated star / data-node background
  const canvas = document.getElementById('spaceCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(130, Math.floor((innerWidth * innerHeight) / 11000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.2 + .25,
      v: Math.random() * .12 + .025,
      a: Math.random() * .55 + .12
    }));
  };
  const drawStars = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const s of stars) {
      s.y += s.v;
      if (s.y > innerHeight + 5) { s.y = -5; s.x = Math.random() * innerWidth; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(151,225,245,${s.a})`;
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(drawStars);
  };
  resizeCanvas();
  drawStars();
  addEventListener('resize', resizeCanvas);

  // Inline SVG avatar tracking: body remains fixed; head turns subtly and irises/pupils follow the cursor.
  const headRigSvg = document.getElementById('headRigSvg');
  const pupilsRigSvg = document.getElementById('pupilsRigSvg');
  const heroVisual = document.querySelector('.hero-visual');
  const avatarPointerEnabled = window.matchMedia('(min-width: 761px) and (pointer: fine)').matches;
  if (headRigSvg && pupilsRigSvg && heroVisual && !reduceMotion && avatarPointerEnabled) {
    const resetAvatar = () => {
      headRigSvg.style.transform = 'translate(0px, 0px) rotate(0deg) scaleX(1)';
      pupilsRigSvg.style.transform = 'translate(0px, 0px)';
    };

    const updateAvatar = (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.43;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width * 0.54)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height * 0.58)));

      const headX = nx * 7;
      const headY = ny * 2.8;
      const tilt = nx * 3.3;
      const squash = 1 - Math.abs(nx) * 0.018;
      headRigSvg.style.transform = `translate(${headX}px, ${headY}px) rotate(${tilt}deg) scaleX(${squash})`;

      const pupilX = nx * 7.5;
      const pupilY = ny * 4.2;
      pupilsRigSvg.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    };

    document.addEventListener('pointermove', updateAvatar);
    heroVisual.addEventListener('pointerleave', resetAvatar);
    resetAvatar();
  }

  // Type loop
  const typed = document.getElementById('typedRole');
  const roles = ['Undergraduate', 'Student Developer', 'Aspiring Cybersecurity Professional', 'Freelance Creator'];
  let roleIndex = 0, charIndex = roles[0].length, deleting = true;
  function typeLoop() {
    if (!typed || reduceMotion) return;
    const word = roles[roleIndex];
    if (deleting) {
      charIndex--;
      typed.textContent = word.slice(0, Math.max(0, charIndex));
      if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeLoop, 320); return; }
    } else {
      charIndex++;
      typed.textContent = roles[roleIndex].slice(0, charIndex);
      if (charIndex >= roles[roleIndex].length) { deleting = true; setTimeout(typeLoop, 1400); return; }
    }
    setTimeout(typeLoop, deleting ? 45 : 70);
  }
  const mobileRoleMode = window.matchMedia('(max-width: 760px)').matches;
  if (typed && mobileRoleMode) {
    typed.textContent = 'Student Developer';
  } else if (!reduceMotion) {
    setTimeout(typeLoop, 1450);
  }

  // Reveal animation
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .11 });
  reveals.forEach((el, i) => { el.style.transitionDelay = `${Math.min((i % 5) * 55, 220)}ms`; revealObserver.observe(el); });

  // Count up statistics
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      let start = 0;
      const duration = 900;
      const startTime = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - startTime) / duration);
        start = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = start;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: .5 });
  counters.forEach(c => countObserver.observe(c));

  // 3D tilt cards
  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });
  }

  // Magnetic buttons
  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.08}px, ${(e.clientY-r.top-r.height/2)*.11}px)`;
      });
      btn.addEventListener('pointerleave', () => btn.style.transform = '');
    });
  }

  // Project filtering
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project-card');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projects.forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !visible);
    });
  }));

  // Mobile navigation
  const menu = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
    document.body.classList.remove('nav-open');
  }));
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || menu.contains(e.target)) return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
    document.body.classList.remove('nav-open');
  });

  // Active nav and header state
  const topbar = document.getElementById('topbar');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = [...nav.querySelectorAll('a')];
  const onScroll = () => {
    topbar.classList.toggle('scrolled', scrollY > 40);
    let current = 'home';
    sections.forEach(sec => { if (scrollY >= sec.offsetTop - 180) current = sec.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  };
  addEventListener('scroll', onScroll, { passive:true });
  onScroll();
})();
