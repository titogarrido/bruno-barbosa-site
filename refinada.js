'use strict';
// Versão refinada da home: cabeçalho que se adapta, régua do tempo no "aos 70" e frase que se acende.
// Sem JavaScript ou com movimento reduzido, tudo aparece completo e parado.
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.header');
  const navy = [...document.querySelectorAll('.future, .closing, .footer')];
  const list = document.querySelector('.future-list');
  const items = list ? [...list.children] : [];
  const statement = document.querySelector('.care-statement');
  const clamp = v => Math.min(1, Math.max(0, v));
  const words = [];

  // Nós da régua: decorativos, um por resposta.
  items.forEach(li => {
    const node = document.createElement('i');
    node.setAttribute('aria-hidden', 'true');
    li.append(node);
  });

  if (!reduced) {
    root.classList.add('js-ref');
    if (statement) {
      [...statement.childNodes].forEach(node => {
        if (node.nodeType !== Node.TEXT_NODE) return;
        const piece = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { piece.append(part); return; }
          const word = document.createElement('span');
          word.className = 'w';
          word.textContent = part;
          piece.append(word);
          words.push(word);
        });
        node.replaceWith(piece);
      });
    }
  }

  let scheduled = false;
  function update() {
    scheduled = false;
    const line = header.getBoundingClientRect().bottom - 1;
    const overNavy = navy.some(el => {
      const r = el.getBoundingClientRect();
      return r.top <= line && r.bottom > line;
    });
    header.classList.toggle('is-compact', scrollY > 24);
    header.classList.toggle('on-navy', overNavy);
    const vh = innerHeight;
    if (list && items.length > 1) {
      // A régua vai do primeiro ao último nó (centro de cada resposta).
      const rect = list.getBoundingClientRect();
      const centers = items.map(li => {
        const r = li.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      const first = centers[0], last = centers[centers.length - 1];
      list.style.setProperty('--r0', (first - rect.top).toFixed(1) + 'px');
      list.style.setProperty('--r1', (rect.bottom - last).toFixed(1) + 'px');
      if (!reduced) {
        const trigger = vh * .66;
        list.style.setProperty('--p', clamp((trigger - first) / (last - first)).toFixed(4));
        items.forEach((li, i) => li.classList.toggle('lit', centers[i] <= trigger));
      }
    }
    if (reduced) return;
    if (words.length) {
      const rect = statement.getBoundingClientRect();
      const start = vh * .92, end = vh * .56;
      const count = Math.round(clamp((start - rect.top) / (start - end)) * words.length);
      words.forEach((word, i) => word.classList.toggle('on', i < count));
    }
  }
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  addEventListener('load', schedule);
  document.fonts?.ready.then(schedule);
  update();

  // Entradas que o refino.js não cobre: texto do "sobre" e monograma do fechamento.
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (!isIntersecting) return;
        if (target.classList.contains('mono')) target.classList.add('is-in');
        else { target.classList.remove('reveal-pending'); target.classList.add('enter-view'); }
        observer.unobserve(target);
      });
    }, {threshold: .2, rootMargin: '0px 0px -6% 0px'});
    document.querySelectorAll('.about-text, .closing .mono').forEach(el => {
      if (!el.classList.contains('mono') && el.getBoundingClientRect().top > innerHeight) el.classList.add('reveal-pending');
      observer.observe(el);
    });
  }
})();
