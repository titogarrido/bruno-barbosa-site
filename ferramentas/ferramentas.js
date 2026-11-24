(function () {
  'use strict';
  const numeric = (value, min, max, name) => {
    const parsed = Number(String(value == null ? '' : value).trim().replace(',', '.'));
    if (String(value == null ? '' : value).trim() === '' || !Number.isFinite(parsed) || parsed < min || parsed > max) throw new Error('Confira ' + name + ': informe um valor entre ' + min + ' e ' + max + '.');
    return parsed;
  };
  const sexValue = (value) => { if (!['m', 'f'].includes(value)) throw new Error('Selecione a referência de sexo usada pela equação.'); return value; };
  const model = {
    fat(values) {
      numeric(values.age, 20, 85, 'a idade');
      const h = numeric(values.height, 120, 230, 'a altura em centímetros');
      const w = numeric(values.waist, 45, 200, 'a cintura em centímetros');
      const result = 64 - 20 * (h / w) + (sexValue(values.sex) === 'f' ? 12 : 0);
      if (result <= 0 || result >= 70) throw new Error('Essa combinação de medidas produz uma estimativa fora do intervalo exibido por esta ferramenta. Confira as medidas; se estiverem corretas, prefira avaliação de composição corporal com um profissional.');
      return result;
    },
    energy(values) {
      const age = numeric(values.age, 19, 78, 'a idade');
      const weight = numeric(values.weight, 30, 250, 'o peso em quilogramas');
      const height = numeric(values.height, 120, 230, 'a altura em centímetros');
      return 10 * weight + 6.25 * height - 5 * age + (sexValue(values.sex) === 'm' ? 5 : -161);
    },
    protein(values) {
      const weight = numeric(values.weight, 30, 250, 'o peso em quilogramas');
      if (!['adult', 'older'].includes(values.age) || !['general', 'exercise'].includes(values.activity)) throw new Error('Selecione sua faixa de idade e rotina de exercício.');
      let low = 0.83, high = 0.83, basis = 'Referência populacional EFSA para adultos saudáveis';
      if (values.age === 'older') { low = 1; high = 1.2; basis = 'Faixa discutida pela ESPEN para pessoas idosas saudáveis'; }
      if (values.activity === 'exercise') { low = 1.4; high = 2; basis = 'Faixa ISSN para adultos saudáveis que treinam regularmente'; }
      return { low, high, dailyLow: weight * low, dailyHigh: weight * high, basis };
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  if (typeof document === 'undefined') return;

  // ---------- Interface interativa (18/10/2026): resultado ao vivo ou uma pergunta por vez ----------
  const form = document.querySelector('[data-tool]');
  if (!form) return;
  const tool = form.dataset.tool;
  const steps = form.dataset.mode === 'steps';
  const output = document.getElementById('resultado');
  const live = document.getElementById('result-live');
  const panel = document.querySelector('.result-panel');
  const resetButton = document.querySelector('.result-reset');
  const peek = document.querySelector('.result-peek');
  const emptyHTML = output.innerHTML;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  class Pending extends Error {}

  const fmt = (value, digits = 0) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  const range = (low, high, digits = 0) => low === high ? fmt(low, digits) : fmt(low, digits) + '–' + fmt(high, digits);
  const num = (value, digits = 0) => '<span class="num" data-to="' + value + '" data-digits="' + digits + '">' + fmt(value, digits) + '</span>';
  const cta = '<a class="action-link" href="../#agendar">Conversar sobre meu contexto →</a>';
  const clinicalContext = { html: '<p class="result-label">Seu contexto pede avaliação individual</p><p class="result-big-text">Aqui, a conta não basta.</p><p>Gestação, amamentação, doença renal, tratamento clínico ou mudança importante de peso pedem outro método e outra leitura. Por isso, esta ferramenta não calcula uma referência para esse contexto.</p>' + cta, peek: 'Seu contexto pede avaliação individual' };
  const selected = (data, name) => { const value = data.get(name); if (!value) throw new Pending(); return value; };
  let meals = 3;
  let peekText = '', panelVisible = true;

  function render(data) {
    const values = Object.fromEntries(data.entries());
    switch (tool) {
      case 'fat': {
        if (selected(data, 'context') === 'yes') return clinicalContext;
        selected(data, 'sex');
        const value = model.fat(values);
        const pos = Math.min(100, Math.max(0, value / 60 * 100));
        return { peek: fmt(value, 1) + '% · estimativa de gordura', html: '<p class="result-label">Sua estimativa de gordura corporal</p><p class="number">' + num(value, 1) + '<small>%</small></p><div class="scale" aria-hidden="true"><div class="scale-track"><span class="scale-marker" data-pos="' + pos + '"></span></div><div class="scale-ticks"><span>0</span><span>15</span><span>30</span><span>45</span><span>60%</span></div></div><p>Aproximação pelo método RFM, a partir de altura e cintura. Não mede músculo nem separa tipos de gordura.</p><p class="notice">Sem rótulo de “saudável” ou não: idade, sexo e histórico mudam a leitura. Para acompanhar, meça sempre do mesmo jeito.</p>' + cta };
      }
      case 'energy': {
        if (selected(data, 'context') === 'yes') return clinicalContext;
        selected(data, 'sex');
        const kcal = Math.round(model.energy(values) / 10) * 10;
        return { peek: fmt(kcal) + ' kcal por dia em repouso', html: '<p class="result-label">Seu gasto estimado em repouso</p><p class="number">' + num(kcal) + '<small>kcal por dia</small></p><p class="fact"><strong>≈ ' + num(Math.round(kcal / 24)) + ' kcal por hora</strong> só para manter o corpo funcionando, antes de qualquer movimento, treino ou digestão.</p><p class="notice">Não é meta alimentar nem medição do seu metabolismo: é uma estimativa populacional (Mifflin–St Jeor), com erro individual.</p>' + cta };
      }
      case 'protein': {
        if (selected(data, 'context') === 'yes') return clinicalContext;
        selected(data, 'age'); selected(data, 'activity');
        const p = model.protein(values);
        const low = Math.round(p.dailyLow), high = Math.round(p.dailyHigh);
        const total = low === high ? num(low) : '<span class="num-range">' + num(low) + '–' + num(high) + '</span>';
        const plate = '<li><span class="plate"><b>' + range(p.dailyLow / meals, p.dailyHigh / meals) + '</b><i>g</i></span></li>';
        return { peek: range(low, high) + ' g de proteína por dia', html: '<p class="result-label">Sua referência de proteína</p><p class="number">' + total + '<small>g de proteína por dia</small></p><p class="badge">' + range(p.low, p.high, 2) + ' g por kg/dia</p><p>' + p.basis + '.</p><div class="meals"><div class="meal-toggle" role="group" aria-label="Dividir em refeições"><button type="button" data-meals="3" aria-pressed="' + (meals === 3) + '">3 refeições</button><button type="button" data-meals="4" aria-pressed="' + (meals === 4) + '">4 refeições</button></div><ul class="plates" aria-label="Exemplo de divisão por refeição">' + plate.repeat(meals) + '</ul></div><p class="notice">São gramas de proteína, não do alimento. A divisão é só um exemplo; obesidade, edema ou baixo peso pedem outra base de cálculo.</p>' + cta };
      }
      case 'sleep': {
        const age = numeric(values.age, 18, 100, 'a idade');
        const hours = numeric(values.hours, 0, 16, 'as horas de sono');
        const regularity = selected(data, 'regularity'), recovery = selected(data, 'recovery'), breathing = selected(data, 'breathing'), sleepiness = selected(data, 'sleepiness');
        const reference = age >= 65 ? '7 a 8 horas por dia' : age >= 61 ? '7 a 9 horas por dia' : 'ao menos 7 horas por dia';
        const duration = hours < 7 ? 'Abaixo da referência geral para adultos. Sua rotina oferece tempo para dormir?' : (age >= 65 && hours > 8 || age >= 61 && age < 65 && hours > 9) ? 'Acima da faixa para sua idade. Se é novo ou vem com cansaço, vale investigar.' : 'Alcança a referência mínima. Horas, sozinhas, não garantem sono reparador.';
        return { peek: fmt(hours, 1) + ' h de sono por noite', html: '<p class="result-label">Seu sono, por dimensões</p><p class="number">' + num(hours, 1) + '<small>horas por noite</small></p><p class="badge">Referência para sua idade: ' + reference + '</p><dl class="dims"><div><dt>Duração</dt><dd>' + duration + '</dd></div><div><dt>Regularidade</dt><dd>' + (regularity === 'regular' ? 'Horários constantes. Preserve essa rotina.' : 'Horários variáveis. Anote por uma semana quando dorme e acorda.') + '</dd></div><div><dt>Recuperação</dt><dd>' + (recovery === 'rested' ? 'Você acorda descansado. Observe também a disposição ao longo do dia.' : 'Acordar cansado com frequência merece conversa em consulta.') + '</dd></div></dl>' + (breathing === 'yes' ? '<p class="notice">Ronco intenso, engasgos ou pausas na respiração merecem avaliação. Este roteiro não identifica apneia.</p>' : breathing === 'unknown' ? '<p>Não saber se há pausas na respiração não confirma nem exclui distúrbios do sono.</p>' : '') + (sleepiness === 'yes' ? '<p class="notice">Sonolência que atrapalha o dia merece avaliação. Se estiver sonolento, não dirija nem opere máquinas.</p>' : '') + '<p class="fine-note">Roteiro de observação, sem nota: não é um questionário diagnóstico validado.</p>' + cta };
      }
      case 'cardio': {
        const checked = data.getAll('topics');
        if (!checked.length) throw new Pending();
        const messages = {
          pressure: ['Pressão arterial', 'Leve medidas feitas com técnica adequada e informações sobre tratamentos. Uma medida isolada não define diagnóstico.'],
          glucose: ['Glicemia', 'Resultados de glicose e hemoglobina glicada precisam ser lidos com seu histórico e os medicamentos em uso.'],
          lipids: ['Colesterol e triglicerídeos', 'Leve exames anteriores. As metas variam conforme o risco cardiovascular de cada pessoa.'],
          waist: ['Composição corporal', 'Cintura, massa muscular e mudanças de peso acrescentam contexto ao peso na balança.'],
          nicotine: ['Tabaco e nicotina', 'Converse sobre recursos de apoio para parar. Registre também cigarros eletrônicos e exposição frequente à fumaça.'],
          movement: ['Movimento', 'Descreva sua rotina real de atividade e as barreiras que encontra para se movimentar.'],
          sleep: ['Sono', 'Conte sobre duração, qualidade percebida, ronco e sonolência durante o dia.'],
          family: ['História familiar', 'Se souber, anote quem teve a condição cardiovascular e com que idade ela ocorreu.'],
          unknown: ['Informações que faltam', 'Combine quais medidas e exames fazem sentido no seu contexto. Não existe uma lista universal de check-up.']
        };
        const items = checked.filter(key => messages[key]);
        return { peek: items.length + (items.length === 1 ? ' tema' : ' temas') + ' no seu roteiro', html: '<p class="result-label">Seu roteiro para a consulta</p><p class="number">' + num(items.length) + '<small>' + (items.length === 1 ? 'tema para levar' : 'temas para levar') + '</small></p><ol class="script">' + items.map(key => '<li><b>' + messages[key][0] + '</b><span>' + messages[key][1] + '</span></li>').join('') + '</ol><p class="notice">Este roteiro não estima risco de infarto, AVC ou diabetes. Avaliar risco exige dados clínicos e um escore escolhido pelo profissional.</p><button type="button" class="print-link" data-print>Salvar ou imprimir o roteiro</button>' + cta };
      }
      case 'function': {
        const tasks = [['chair', 'Levantar de uma cadeira'], ['stairs', 'Subir escadas'], ['walk', 'Caminhar na rotina'], ['carry', 'Carregar objetos do dia a dia']];
        const labels = { ok: 'Sem dificuldade', difficult: 'Com dificuldade', unknown: 'Não sei ou não faço' };
        const answers = tasks.map(([name, label]) => [label, selected(data, name)]);
        const falls = selected(data, 'falls');
        const difficult = answers.some(([, answer]) => answer === 'difficult');
        return { peek: 'Seu retrato de autonomia', html: '<p class="result-label">Um olhar para sua autonomia</p><p class="result-big-text">Seu dia a dia, em quatro tarefas.</p><ul class="task-recap">' + answers.map(([label, answer]) => '<li data-state="' + answer + '"><span>' + label + '</span><b>' + labels[answer] + '</b></li>').join('') + '</ul><p>' + (difficult ? 'Leve esses exemplos à consulta: dor, força, equilíbrio e fôlego pedem avaliações diferentes.' : 'Você não relatou dificuldade. Isso descreve sua percepção; não mede força, equilíbrio ou fôlego.') + '</p>' + (falls === 'yes' ? '<p class="notice">Queda recente, instabilidade ou medo de cair merecem atenção clínica. Evite testar seu equilíbrio sozinho.</p>' : '') + '<p class="fine-note">Sem idade biológica, prognóstico ou pontuação validada.</p>' + cta };
      }
      default: throw new Error('Esta ferramenta não está disponível.');
    }
  }

  // ---------- Números que contam até o valor e marcador que desliza ----------
  const previous = [];
  let previousPos = null;
  function animate() {
    output.querySelectorAll('.num[data-to]').forEach((el, index) => {
      const to = Number(el.dataset.to), digits = Number(el.dataset.digits || 0);
      const from = previous[index] == null ? 0 : previous[index];
      previous[index] = to;
      if (reduced.matches || from === to) { el.textContent = fmt(to, digits); return; }
      const start = performance.now(), duration = previous.started ? 380 : 700;
      const tick = now => {
        const progress = Math.min(1, (now - start) / duration), eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = fmt(from + (to - from) * eased, digits);
        if (progress < 1 && el.isConnected) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    previous.started = true;
    const marker = output.querySelector('.scale-marker');
    if (marker) {
      const pos = Number(marker.dataset.pos);
      marker.style.left = (previousPos == null || reduced.matches ? pos : previousPos) + '%';
      requestAnimationFrame(() => requestAnimationFrame(() => { marker.style.left = pos + '%'; }));
      previousPos = pos;
    }
  }

  let announce;
  let freshTimer;
  function show(result, fresh = !panel.classList.contains('has-result')) {
    output.innerHTML = result.html;
    panel.classList.add('has-result');
    if (fresh) { panel.classList.add('is-new'); clearTimeout(freshTimer); freshTimer = setTimeout(() => panel.classList.remove('is-new'), 700); }
    resetButton.hidden = false;
    animate();
    peekText = result.peek;
    clearTimeout(announce);
    announce = setTimeout(() => { live.textContent = result.peek; }, 700);
    updatePeek();
  }
  function showEmpty(message) {
    output.innerHTML = message ? '<p class="error">' + message + '</p>' : emptyHTML;
    panel.classList.remove('has-result');
    previous.length = 0; previous.started = false; previousPos = null;
    peekText = '';
    updatePeek();
  }
  function update() {
    try { show(render(new FormData(form))); }
    catch (error) { if (error instanceof Pending) showEmpty(); else showEmpty(error.message); }
  }

  // ---------- Controles deslizantes ligados ao número digitável ----------
  const sliders = [...form.querySelectorAll('input[type="range"]')];
  const paint = rangeInput => rangeInput.style.setProperty('--fill', ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100) + '%');
  sliders.forEach(rangeInput => {
    const number = form.querySelector('.slider-num[data-for="' + rangeInput.id + '"]');
    paint(rangeInput);
    rangeInput.addEventListener('input', () => { number.value = rangeInput.value; paint(rangeInput); });
    number.addEventListener('input', () => {
      const value = Number(number.value.replace(',', '.'));
      if (number.value !== '' && value >= Number(rangeInput.min) && value <= Number(rangeInput.max)) { rangeInput.value = value; paint(rangeInput); form.dispatchEvent(new Event('input')); }
    });
    number.addEventListener('blur', () => { number.value = rangeInput.value; });
  });

  // ---------- Resultado ao vivo ----------
  if (!steps) {
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', event => event.preventDefault());
  }

  // ---------- Uma pergunta por vez ----------
  let stepIndex = 0, items = [], count, bar, back, next;
  function showStep(index, focus = true) {
    stepIndex = index;
    items.forEach((item, i) => { item.hidden = i !== index; item.classList.toggle('step-current', i === index); });
    count.textContent = 'Pergunta ' + (index + 1) + ' de ' + items.length;
    bar.style.setProperty('--p', ((index + 1) / items.length * 100) + '%');
    back.disabled = index === 0;
    const isSlider = items[index].classList.contains('slider');
    next.hidden = !isSlider;
    next.textContent = index === items.length - 1 ? 'Ver resultado →' : 'Próxima →';
    if (focus) (items[index].querySelector('legend, label') || items[index]).focus?.({ preventScroll: true });
  }
  function advance() {
    if (stepIndex < items.length - 1) { showStep(stepIndex + 1); return; }
    finish();
  }
  function finish() {
    update();
    form.classList.add('steps-done');
    items.forEach(item => { item.hidden = true; });
    count.textContent = 'Pronto: ' + items.length + ' de ' + items.length;
    bar.style.setProperty('--p', '100%');
    next.hidden = true;
    back.hidden = true;
    form.querySelector('.steps-review').hidden = false;
    if (matchMedia('(max-width: 900px)').matches) panel.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
    output.focus({ preventScroll: true });
  }
  if (steps) {
    items = [...form.querySelectorAll(':scope > .field, :scope > fieldset')];
    items.forEach(item => { const label = item.querySelector('legend, .slider-head label'); if (label) label.tabIndex = -1; });
    const headEl = document.createElement('div');
    headEl.className = 'steps-head';
    headEl.innerHTML = '<span class="steps-count" aria-live="polite"></span><span class="steps-bar" aria-hidden="true"><i></i></span>';
    form.prepend(headEl);
    count = headEl.querySelector('.steps-count'); bar = headEl.querySelector('.steps-bar');
    const nav = document.createElement('div');
    nav.className = 'steps-nav';
    nav.innerHTML = '<button type="button" class="text-link steps-back">← Voltar</button><button type="button" class="button steps-next">Próxima →</button><button type="button" class="text-link steps-review" hidden>Revisar respostas</button>';
    form.append(nav);
    back = nav.querySelector('.steps-back'); next = nav.querySelector('.steps-next');
    back.addEventListener('click', () => { if (stepIndex > 0) showStep(stepIndex - 1); });
    next.addEventListener('click', advance);
    nav.querySelector('.steps-review').addEventListener('click', () => { form.classList.remove('steps-done'); nav.querySelector('.steps-review').hidden = true; back.hidden = false; showStep(0); });
    form.addEventListener('change', event => {
      if (event.target.type !== 'radio') return;
      if (form.classList.contains('steps-done')) return;
      setTimeout(advance, reduced.matches ? 0 : 260);
    });
    form.addEventListener('submit', event => { event.preventDefault(); advance(); });
    showStep(0, false);
  }

  // ---------- Ações dentro do resultado ----------
  output.addEventListener('click', event => {
    const mealButton = event.target.closest('[data-meals]');
    if (mealButton) { meals = Number(mealButton.dataset.meals); try { show(render(new FormData(form)), true); } catch (error) { update(); } output.querySelector('[data-meals="' + meals + '"]').focus(); return; }
    if (event.target.closest('[data-print]')) { document.body.classList.add('print-result'); window.print(); }
  });
  window.addEventListener('afterprint', () => document.body.classList.remove('print-result'));
  resetButton.addEventListener('click', () => {
    form.reset();
    sliders.forEach(rangeInput => { form.querySelector('.slider-num[data-for="' + rangeInput.id + '"]').value = rangeInput.value; paint(rangeInput); });
    meals = 3;
    showEmpty();
    resetButton.hidden = true;
    if (steps) { form.classList.remove('steps-done'); form.querySelector('.steps-review').hidden = true; back.hidden = false; showStep(0); }
    form.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
  });

  // ---------- Atalho fixo no celular quando o resultado está fora da tela ----------
  function updatePeek() {
    if (!peek) return;
    peek.querySelector('.peek-text').textContent = peekText;
    peek.hidden = !peekText || panelVisible || steps;
  }
  if (peek && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { panelVisible = entry.isIntersecting; updatePeek(); }, { threshold: 0.25 }).observe(panel);
    peek.addEventListener('click', () => panel.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' }));
  }
}());
