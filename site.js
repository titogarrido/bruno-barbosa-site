'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const menuButton = $('menu-button'), menu = $('mobile-menu');
  const main = document.querySelector('main'), footer = document.querySelector('footer');
  const mobile = matchMedia('(max-width: 900px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let previousFocus;
  menuButton.hidden = false;
  function setMenu(open, restoreFocus = false) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);
    main.inert = open;
    footer.inert = open;
    document.querySelector('.header .brand').inert = open;
    document.querySelector('.header-actions > a').inert = open;
    if (open) menu.querySelector('a').focus();
    else if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => setMenu(menu.hidden, true));
  menu.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    setMenu(false);
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({preventScroll:true}); }
  });
  document.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
    if (event.key === 'Tab') {
      const links = [menuButton, ...menu.querySelectorAll('a')];
      const first = links[0], last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobile.addEventListener('change', () => { if (!mobile.matches) setMenu(false); });

  // Deep links preservados; nenhuma informação de saúde entra na URL.
  const isHome = document.body.dataset.page === 'inicio';
  const toolRoutes = {
    imc:'percentual-gordura', gordura:'percentual-gordura',
    ger:'gasto-energetico', sono:'qualidade-sono',
    cardio:'saude-cardiometabolica', proteina:'proteina', futuro:'capacidade-funcional'
  };
  // Seções que saíram da home em 18/10/2026: links antigos seguem para a página nova
  // (Conteúdos, "Uma visão de saúde" e "Cuidado integrado" foram retirados do site na mesma data).
  const movedSections = {
    avaliacoes:'ferramentas/#avaliacoes', mapa:'ferramentas/#mapa',
    pilares:'acompanhamento/',
    equipe:'acompanhamento/#faq', faq:'acompanhamento/#faq',
    'faq-primeira':'acompanhamento/#faq-primeira', visao:'sobre/'
  };
  const scheduleHref = document.querySelector('.header-actions > a')?.getAttribute('href') || '#agendar';
  let openMapDialog = null;
  function revealAnchor() {
    const id = location.hash.slice(1);
    const target = document.getElementById(id);
    if (target?.tagName === 'DETAILS') target.open = true;
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.hash.slice(1));
    if (target?.tagName === 'DETAILS') target.open = true;
  });
  const params = new URLSearchParams(location.search);
  const requestedUnit = params.get('unidade'), requestedCity = params.get('cidade');
  document.querySelectorAll('.location-card').forEach(card => {
    card.classList.toggle('selected', requestedUnit ? card.id === requestedUnit : card.dataset.city === requestedCity);
  });
  if ($('year')) $('year').textContent = new Date().getFullYear();

  // Autorrelato educativo: a síntese descreve respostas, nunca risco ou diagnóstico.
  const dimensions = [
    {name:'Força e movimento', context:'Observe como o movimento participa da sua rotina e quais atividades você gostaria de manter.'},
    {name:'Energia', context:'Mudanças persistentes na disposição merecem ser entendidas no contexto da sua saúde e da sua rotina.'},
    {name:'Sono e recuperação', context:'Duração e sensação de descanso são pontos para conversar; não identificam, por si só, distúrbios do sono.'},
    {name:'Metabolismo', context:'Conhecer seus dados indica acompanhamento, não que eles estejam normais. A interpretação é individual.'},
    {name:'Clareza mental', context:'Atenção e percepção de estresse variam com o contexto. Compartilhe mudanças que afetem seu dia a dia.'},
    {name:'Hábitos', context:'Pense em mudanças possíveis na sua rotina, com orientação adequada ao seu momento de vida.'}
  ];
  const questions = [
    [0,'Consigo realizar minhas atividades habituais com a força e a mobilidade de que preciso.'],
    [0,'Incluo atividades de força e movimento na minha rotina.'],
    [1,'Tenho disposição para o dia a dia e para as atividades de que gosto.'],
    [1,'Consigo me recuperar do cansaço habitual da minha rotina.'],
    [2,'Minha rotina permite tempo suficiente e regular para dormir.'],
    [2,'Costumo acordar com a sensação de descanso.'],
    [3,'Conheço meus resultados recentes de pressão, glicemia e colesterol.'],
    [3,'Entendo, com orientação profissional, quais aspectos da minha saúde metabólica precisam de acompanhamento.'],
    [4,'Consigo manter a atenção nas atividades importantes para mim.'],
    [4,'Sinto que lido com o estresse do dia a dia de forma sustentável.'],
    [5,'Minha rotina de alimentação está alinhada ao cuidado que desejo ter comigo.'],
    [5,'Consigo manter hábitos de cuidado com a saúde de forma consistente.']
  ];
  const scale = ['Discordo totalmente','Discordo em parte','Nem concordo, nem discordo','Concordo em parte','Concordo totalmente'];
  // O Mapa de Capacidade vive na página de ferramentas desde 18/10/2026.
  const dialog = $('map-dialog'), form = $('map-form'), result = $('map-result');
  if (dialog) {
  let answers = Array(questions.length).fill(null), current = 0;
  function renderQuestion(focus = true) {
    const [dimension, text] = questions[current];
    $('map-progress').textContent = 'Pergunta ' + (current + 1) + ' de ' + questions.length;
    $('map-progress-bar').value = current + 1;
    $('map-dimension').textContent = dimensions[dimension].name;
    $('map-question').textContent = text;
    $('map-options').replaceChildren();
    scale.forEach((label, index) => {
      const row = document.createElement('label'); row.className = 'map-option';
      const radio = document.createElement('input');
      radio.type = 'radio'; radio.name = 'map-answer'; radio.value = String(index + 1);
      radio.required = true; radio.checked = answers[current] === index + 1;
      const text = document.createElement('span'); text.textContent = label;
      row.append(radio, text); $('map-options').append(row);
    });
    $('map-back').disabled = current === 0;
    $('map-next').textContent = current === questions.length - 1 ? 'Ver meu mapa →' : 'Próxima →';
    if (focus) $('map-question').focus({preventScroll:true});
    dialog.scrollTo({top:0,behavior:'instant'});
  }
  function openMap() {
    if (dialog.open) return;
    previousFocus = document.activeElement;
    answers.fill(null); current = 0; form.hidden = false; result.hidden = true;
    $('map-title').innerHTML = 'Um olhar sobre <em>você.</em>';
    renderQuestion(false);
    dialog.showModal(); document.body.style.overflow = 'hidden';
    $('map-question').focus({preventScroll:true});
  }
  $('open-map').hidden = false;
  $('open-map').addEventListener('click', openMap);
  $('close-map').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) { const rect = dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    document.body.classList.remove('print-map');
    if(location.hash === '#mapa') history.replaceState(null, '', location.pathname + location.search + '#avaliacoes');
    if(previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
  });
  $('map-options').addEventListener('change', event => { answers[current] = Number(event.target.value); });
  $('map-back').addEventListener('click', () => { if(current > 0) { current--; renderQuestion(); } });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity() || !answers[current]) return;
    if(current < questions.length - 1) { current++; renderQuestion(); }
    else if(answers.every(value => Number.isInteger(value) && value >= 1 && value <= 5)) showResult();
  });
  function showResult() {
    form.hidden = true; result.hidden = false;
    $('map-title').textContent = 'Seu Mapa de Capacidade';
    const scores = dimensions.map((_, dimension) => questions.reduce((sum, q, index) => q[0] === dimension ? sum + answers[index] : sum, 0) / 2);
    const labels = score => score < 3 ? 'Menos presente no seu relato' : score > 3 ? 'Mais presente no seu relato' : 'Percepção intermediária';
    result.innerHTML = '<p class="map-result-intro">Este mapa organiza o que você percebe sobre sua rotina. Ele não mede sua saúde nem estima seu risco de doença.</p><ul class="map-dimensions">' +
      dimensions.map((dimension, index) => '<li><h3>' + dimension.name + '</h3><span class="perception">' + labels(scores[index]) + '</span><p>' + dimension.context + '</p></li>').join('') +
      '</ul><p class="fine">Síntese das duas respostas de cada dimensão, sem nota global. Este questionário não é um instrumento clínico validado. Sintomas novos ou persistentes merecem avaliação independentemente das respostas.</p><div class="result-actions"><a class="button" id="map-schedule" href="' + scheduleHref + '">Conversar em consulta ↗</a><button class="text-link" id="map-print" type="button">Salvar / imprimir</button><button class="text-link" id="map-restart" type="button">Refazer</button></div>';
    $('map-title').tabIndex = -1; $('map-title').focus({preventScroll:true}); dialog.scrollTop = 0;
    $('map-schedule').addEventListener('click', () => dialog.close());
    $('map-restart').addEventListener('click', () => {
      answers.fill(null); current = 0; result.hidden = true; form.hidden = false;
      $('map-title').innerHTML = 'Um olhar sobre <em>você.</em>'; renderQuestion();
    });
    $('map-print').addEventListener('click', () => { document.body.classList.add('print-map'); window.print(); });
  }
  window.addEventListener('afterprint', () => document.body.classList.remove('print-map'));
  openMapDialog = openMap;
  }
  function route() {
    const id = location.hash.slice(1);
    if (isHome) {
      const key = id.replace('calc-', '');
      if(id.startsWith('calc-') && toolRoutes[key]) { location.replace('ferramentas/' + toolRoutes[key] + '.html'); return; }
      if(movedSections[id] && !document.getElementById(id)) { location.replace(movedSections[id]); return; }
    }
    if(id === 'mapa' && openMapDialog) openMapDialog();
    revealAnchor();
  }
  window.addEventListener('hashchange', route); route();
})();
