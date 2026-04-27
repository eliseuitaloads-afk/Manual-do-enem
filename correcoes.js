/* ============================================================
   CORREÇÕES AUTOMÁTICAS — Manual Pro do ENEM
   ============================================================ */

(function () {

  /* ── 1. TIMER COM LOCALSTORAGE (não reseta a cada visita) ── */
  const TIMER_KEY   = 'enem_timer_end';
  const TIMER_HORAS = 24; // duração em horas

  function iniciarTimer() {
    let fim = localStorage.getItem(TIMER_KEY);
    if (!fim || Date.now() > Number(fim)) {
      fim = Date.now() + TIMER_HORAS * 60 * 60 * 1000;
      localStorage.setItem(TIMER_KEY, fim);
    }

    const el = document.querySelector('.timer-display, [class*="timer"], #timer');
    if (!el) return;

    function tick() {
      const diff = Number(fim) - Date.now();
      if (diff <= 0) {
        el.textContent = '00:00:00';
        return;
      }
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      el.textContent = h + ':' + m + ':' + s;
      setTimeout(tick, 1000);
    }
    tick();
  }

  /* ── 2. CONTADOR "X PESSOAS COMPRANDO AGORA" ── */
  function iniciarContador() {
    const base = [2, 3, 4, 5, 6, 7];
    function pick() { return base[Math.floor(Math.random() * base.length)]; }

    // busca qualquer elemento que contenha o texto do contador
    const all = document.querySelectorAll('*');
    let el = null;
    for (const node of all) {
      if (node.children.length === 0 && node.textContent.includes('pessoas comprando')) {
        el = node; break;
      }
    }
    if (!el) return;

    function atualizar() {
      const n = pick();
      el.textContent = el.textContent.replace(/\d+\s+pessoas/, n + ' pessoas');
      setTimeout(atualizar, (20 + Math.random() * 20) * 1000); // a cada 20-40s
    }
    atualizar();
  }

  /* ── 3. COPYRIGHT COM ANO AUTOMÁTICO ── */
  function corrigirCopyright() {
    const all = document.querySelectorAll('*');
    for (const node of all) {
      if (node.children.length === 0 && node.textContent.match(/©\s*20\d\d/)) {
        node.textContent = node.textContent.replace(/20\d\d/, new Date().getFullYear());
      }
    }
  }

  /* ── 4. BOTÃO CTA PRINCIPAL — aviso se ainda for "#" ── */
  function verificarCTA() {
    const LINK_REAL = 'SEU_LINK_AQUI'; // ← SUBSTITUA pelo link real do Kiwify/Hotmart

    document.querySelectorAll('a[href="#"], a[href=""]').forEach(function (btn) {
      const txt = btn.textContent.toLowerCase();
      if (txt.includes('garantir') || txt.includes('começar') || txt.includes('acesso')) {
        if (LINK_REAL !== 'SEU_LINK_AQUI') {
          btn.href = LINK_REAL;
          btn.target = '_blank';
          btn.rel = 'noopener';
        } else {
          // destaca o botão em vermelho para lembrar de configurar
          btn.style.outline = '3px solid red';
          btn.title = '⚠️ Configure o link real neste botão (correcoes.js > LINK_REAL)';
        }
      }
    });
  }

  /* ── 5. ÂNCORA #oferta — garante que está no lugar certo ── */
  function fixarAncora() {
    // Se não existir um elemento com id="oferta", cria um antes da seção de preço
    if (!document.getElementById('oferta')) {
      const secoes = document.querySelectorAll('section, .section, [class*="preco"], [class*="oferta"], [class*="price"]');
      if (secoes.length > 0) {
        const alvo = secoes[secoes.length - 1];
        alvo.id = 'oferta';
      }
    }
  }

  /* ── INICIALIZAR TUDO ── */
  document.addEventListener('DOMContentLoaded', function () {
    iniciarTimer();
    iniciarContador();
    corrigirCopyright();
    verificarCTA();
    fixarAncora();
  });

})();
