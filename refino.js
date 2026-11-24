'use strict';
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.header');
  // Só os links para seções desta página; os de outras páginas trazem aria-current fixo.
  const links = [...document.querySelectorAll('.desktop-nav a, .mobile-menu a')].filter(link => link.hash && link.pathname === location.pathname);
  const sections = [...document.querySelectorAll('main > section[id]')];
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const range = document.documentElement.scrollHeight - innerHeight;
    header.style.setProperty('--reading-progress', range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0);
    const marker = header.getBoundingClientRect().bottom + 100;
    let active = sections[0]?.id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) active = section.id;
    }
    links.forEach(link => {
      if (link.hash === '#' + active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  addEventListener('load', schedule);
  document.addEventListener('toggle', schedule, true);
  document.fonts?.ready.then(schedule);
  update();
  // Entrada discreta ao rolar. Só esconde o que ainda está abaixo da dobra (sem piscar o que já está na tela);
  // itens de listas entram em sequência curta. Com movimento reduzido, nada é escondido nem animado.
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (!isIntersecting) return;
        target.classList.remove('reveal-pending');
        target.classList.add('enter-view');
        observer.unobserve(target);
      });
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    const single = '.section-heading, .care-photo, .about-photo, .assessment-visual, .future-layout > div, .closing h2, .tools-teaser > div, .faq-list';
    const staggered = '.care-steps li, .tools-list li, .stories-grid figure, .location-card, .vision-notes article, .team-grid li, .tool-card, .pillar, .editorials article';
    document.querySelectorAll(single + ', ' + staggered).forEach(el => {
      if (el.matches(staggered)) el.style.setProperty('--i', Math.min([...el.parentElement.children].indexOf(el), 6));
      if (el.getBoundingClientRect().top > innerHeight) el.classList.add('reveal-pending');
      observer.observe(el);
    });
  }
})();
