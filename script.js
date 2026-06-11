/* =========================================
   script.js - Agro Forte, Futuro Sustentável
   Projeto Agrinho 2026
   - Menu mobile
   - Link ativo conforme rolagem
   - Reveal on scroll
   - Contadores e barras animadas
   - Quiz interativo
   ========================================= */

(function () {
  'use strict';

  // ============================================
  // 1) MENU MOBILE
  // ============================================
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================
  // 2) LINK ATIVO CONFORME SEÇÃO VISÍVEL
  // ============================================
  var secoes = document.querySelectorAll('main section[id]');
  var linksNav = document.querySelectorAll('.site-nav a');

  function atualizarLinkAtivo() {
    var posicao = window.scrollY + 120;
    var atual = '';
    secoes.forEach(function (sec) {
      if (sec.offsetTop <= posicao) {
        atual = sec.id;
      }
    });
    linksNav.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + atual) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', atualizarLinkAtivo, { passive: true });
  atualizarLinkAtivo();

  // ============================================
  // 3) REVEAL ON SCROLL
  // ============================================
  var alvosReveal = document.querySelectorAll(
    '.pillar-card, .stat-card, .practice, .timeline li, .content-grid article'
  );
  alvosReveal.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var ioReveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          ioReveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    alvosReveal.forEach(function (el) { ioReveal.observe(el); });
  } else {
    alvosReveal.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ============================================
  // 4) CONTADORES ANIMADOS (seção Dados)
  // ============================================
  function animarContador(el) {
    var alvo = parseInt(el.getAttribute('data-target'), 10) || 0;
    var sufixo = el.getAttribute('data-suffix') || '';
    var span = el.querySelector('.counter');
    if (!span) return;

    var duracao = 1500;
    var inicio = null;
    function passo(timestamp) {
      if (!inicio) inicio = timestamp;
      var progresso = Math.min((timestamp - inicio) / duracao, 1);
      var eased = 1 - Math.pow(1 - progresso, 3); // easeOutCubic
      var valor = Math.floor(eased * alvo);
      span.textContent = valor + sufixo;
      if (progresso < 1) requestAnimationFrame(passo);
      else span.textContent = alvo + sufixo;
    }
    requestAnimationFrame(passo);
  }

  // ============================================
  // 5) BARRAS COMPARATIVAS ANIMADAS
  // ============================================
  function animarBarra(barra) {
    var largura = parseInt(barra.getAttribute('data-width'), 10) || 0;
    setTimeout(function () { barra.style.width = largura + '%'; }, 100);
  }

  if ('IntersectionObserver' in window) {
    var ioDados = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.classList.contains('stat-card')) animarContador(el);
        else if (el.classList.contains('bar')) animarBarra(el);
        ioDados.unobserve(el);
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.stat-card').forEach(function (c) { ioDados.observe(c); });
    document.querySelectorAll('.bar').forEach(function (b) { ioDados.observe(b); });
  } else {
    document.querySelectorAll('.stat-card').forEach(animarContador);
    document.querySelectorAll('.bar').forEach(animarBarra);
  }

  // ============================================
  // 6) QUIZ INTERATIVO
  // ============================================
  var perguntas = [
    {
      q: 'O que é o "plantio direto"?',
      opcoes: [
        'Plantar usando apenas as mãos, sem máquinas.',
        'Plantar sobre a palha da safra anterior, sem arar o solo.',
        'Plantar em estufa com luz artificial.',
        'Plantar a mesma cultura no mesmo lugar por anos.'
      ],
      certa: 1,
      explica: 'O plantio direto deixa a palha cobrindo o solo, reduzindo erosão em até 90% e preservando umidade.'
    },
    {
      q: 'O que significa a sigla ILPF?',
      opcoes: [
        'Indústria, Logística, Plantio e Floresta.',
        'Irrigação, Lavoura, Plantio e Fertilizante.',
        'Integração Lavoura-Pecuária-Floresta.',
        'Instituto de Lavoura e Pesquisa Florestal.'
      ],
      certa: 2,
      explica: 'ILPF integra lavoura, gado e árvores no mesmo espaço — produz mais sem desmatar.'
    },
    {
      q: 'Aproximadamente quanto do território brasileiro ainda é coberto por vegetação preservada?',
      opcoes: ['10%', '30%', '50%', '66%'],
      certa: 3,
      explica: 'Cerca de 66% do território nacional segue com cobertura vegetal — um dos maiores índices do mundo.'
    },
    {
      q: 'O que são bioinsumos?',
      opcoes: [
        'Fertilizantes feitos de plástico reciclado.',
        'Insumos biológicos (fungos, bactérias, insetos) usados no lugar de químicos.',
        'Sementes geneticamente modificadas.',
        'Pesticidas de origem mineral.'
      ],
      certa: 1,
      explica: 'Bioinsumos usam organismos vivos para fertilizar e proteger as plantas, reduzindo o uso de químicos.'
    },
    {
      q: 'Qual destas práticas economiza mais água na lavoura?',
      opcoes: [
        'Irrigação por inundação.',
        'Irrigação por gotejamento controlado por sensores.',
        'Regar manualmente com baldes.',
        'Plantar somente na época de seca.'
      ],
      certa: 1,
      explica: 'A irrigação inteligente por gotejamento pode reduzir o consumo de água em até 50%.'
    },
    {
      q: 'O que é a "agricultura de precisão"?',
      opcoes: [
        'Usar régua para alinhar as plantas no canteiro.',
        'Plantar exatamente no mesmo dia todos os anos.',
        'Usar sensores, drones e satélites para aplicar insumos só onde é necessário.',
        'Colher manualmente cada planta no ponto certo.'
      ],
      certa: 2,
      explica: 'Tecnologia identifica o local exato que precisa de água, adubo ou cuidado — menos desperdício.'
    },
    {
      q: 'Qual frase resume melhor o tema "Agro forte, futuro sustentável"?',
      opcoes: [
        'Produzir o máximo, sem se preocupar com o meio ambiente.',
        'Preservar tudo e parar de produzir alimentos.',
        'Produzir alimentos preservando o solo, a água e a floresta.',
        'Substituir todo o agro por importação.'
      ],
      certa: 2,
      explica: 'Sustentabilidade no agro é produzir hoje sem comprometer a capacidade de produzir amanhã.'
    }
  ];

  var quizApp = document.getElementById('quiz-app');
  var indice = 0;
  var acertos = 0;
  var respondida = false;

  function escapar(texto) {
    var d = document.createElement('div');
    d.textContent = texto;
    return d.innerHTML;
  }

  function renderizarPergunta() {
    respondida = false;
    var p = perguntas[indice];
    var progresso = (indice / perguntas.length) * 100;

    var html = '';
    html += '<div class="quiz-progress">';
    html += '  <span>Pergunta ' + (indice + 1) + ' de ' + perguntas.length + '</span>';
    html += '  <span>Acertos: ' + acertos + '</span>';
    html += '</div>';
    html += '<div class="quiz-bar"><div class="quiz-bar-fill" style="width:' + progresso + '%"></div></div>';
    html += '<h3 class="quiz-question">' + escapar(p.q) + '</h3>';
    html += '<div class="quiz-options">';
    for (var i = 0; i < p.opcoes.length; i++) {
      html += '<button class="quiz-option" data-index="' + i + '">' + escapar(p.opcoes[i]) + '</button>';
    }
    html += '</div>';
    html += '<div class="quiz-feedback" hidden></div>';
    html += '<div class="quiz-actions"><button class="btn btn-primary" id="proxima" hidden>Próxima →</button></div>';

    quizApp.innerHTML = html;

    quizApp.querySelectorAll('.quiz-option').forEach(function (b) {
      b.addEventListener('click', function () { responder(parseInt(b.getAttribute('data-index'), 10)); });
    });
    quizApp.querySelector('#proxima').addEventListener('click', avancar);
  }

  function responder(escolhida) {
    if (respondida) return;
    respondida = true;
    var p = perguntas[indice];
    var botoes = quizApp.querySelectorAll('.quiz-option');
    botoes.forEach(function (b, i) {
      b.disabled = true;
      if (i === p.certa) b.classList.add('correct');
      if (i === escolhida && i !== p.certa) b.classList.add('wrong');
    });

    var feedback = quizApp.querySelector('.quiz-feedback');
    if (escolhida === p.certa) {
      acertos++;
      feedback.className = 'quiz-feedback ok';
      feedback.innerHTML = '<strong>Correto!</strong> ' + escapar(p.explica);
    } else {
      feedback.className = 'quiz-feedback no';
      feedback.innerHTML = '<strong>Quase!</strong> ' + escapar(p.explica);
    }
    feedback.hidden = false;

    var proxima = quizApp.querySelector('#proxima');
    proxima.hidden = false;
    proxima.textContent = indice === perguntas.length - 1 ? 'Ver resultado →' : 'Próxima →';
    proxima.focus();
  }

  function avancar() {
    indice++;
    if (indice >= perguntas.length) renderizarResultado();
    else renderizarPergunta();
  }

  function renderizarResultado() {
    var total = perguntas.length;
    var pct = Math.round((acertos / total) * 100);
    var mensagem;
    if (pct === 100) mensagem = 'Perfeito! Você é um(a) verdadeiro(a) embaixador(a) do agro sustentável.';
    else if (pct >= 70) mensagem = 'Muito bem! Você entende o equilíbrio entre produção e meio ambiente.';
    else if (pct >= 40) mensagem = 'No caminho certo. Que tal revisar as práticas sustentáveis?';
    else mensagem = 'Sem problema! Releia as seções acima e tente de novo.';

    var html = '';
    html += '<div class="quiz-result">';
    html += '  <p class="eyebrow">Resultado</p>';
    html += '  <h3>Você acertou</h3>';
    html += '  <p class="quiz-score">' + acertos + ' / ' + total + '</p>';
    html += '  <p class="quiz-message">' + mensagem + '</p>';
    html += '  <button class="btn btn-primary" id="reiniciar">Refazer o quiz</button>';
    html += '</div>';
    quizApp.innerHTML = html;
    quizApp.querySelector('#reiniciar').addEventListener('click', function () {
      indice = 0; acertos = 0; renderizarPergunta();
    });
  }

  if (quizApp) renderizarPergunta();
})();
