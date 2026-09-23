(() => {
  const PHONE = "5534997749793";
  const MSG = {
    geral: "Olá, Cláudio! Vi o site e quero saber mais sobre o curso de mega hair.",
    nano: "Olá, Cláudio! Tenho interesse no curso de Nano Link. Quais são os valores e as próximas datas?",
    slim: "Olá, Cláudio! Tenho interesse no curso de Fita Invisível Slim. Quais são os valores e as próximas datas?",
    vagas: "Olá, Cláudio! Quero ver as próximas datas disponíveis para o curso de mega hair.",
  };

  // Links do WhatsApp com mensagem por contexto (data-wa="nano", "slim"...)
  document.querySelectorAll("[data-wa]").forEach((a) => {
    const text = MSG[a.dataset.wa] || MSG.geral;
    a.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Cabeçalho ganha fundo depois do hero começar a sair
  const head = document.querySelector(".head");
  const onScroll = () => head.classList.toggle("is-solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menu mobile
  const burger = document.querySelector(".burger");
  const menu = document.getElementById("menu");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    head.classList.toggle("is-solid", open || window.scrollY > 40);
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => e.matches && setMenu(false));

  // Ano do rodapé
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ---------- Animações (só quando html.motion está ativo) ----------
  const root = document.documentElement;
  window.__ready = true;
  if (!root.classList.contains("motion")) return;

  // Título do hero: palavras sobem de dentro de uma máscara
  const h1 = document.querySelector(".hero h1");
  if (h1) {
    const text = h1.textContent.trim();
    h1.setAttribute("aria-label", text);
    h1.innerHTML = text.split(/\s+/).map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(" ");
    h1.classList.add("is-split");
  }

  // Revelar ao entrar na tela: fita, arcos da galeria e contadores
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const count = (el) => {
    const end = +el.dataset.count, pre = el.dataset.prefix || "", t0 = performance.now(), dur = 1400;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = pre + Math.round(end * ease(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = pre + "0";
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e, k) => {
      const el = e.target;
      el.style.setProperty("--i", k);
      el.classList.add("is-in");
      if (el.dataset.count) count(el);
      io.unobserve(el);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll(".fita, .shot, [data-count]").forEach((el) => io.observe(el));

  // Parallax leve do hero (desktop) e linha do tempo que acompanha a rolagem
  const heroPic = document.querySelector(".hero__media picture");
  const list = document.querySelector(".day__list");
  const items = list ? [...list.children] : [];
  const wide = window.matchMedia("(min-width: 960px)");
  let ticking = false;
  const frame = () => {
    ticking = false;
    const y = window.scrollY, vh = window.innerHeight;
    if (heroPic && wide.matches && y < vh * 1.2) heroPic.style.transform = `translate3d(0, ${(y * 0.14).toFixed(1)}px, 0)`;
    if (list) {
      const r = list.getBoundingClientRect(), mid = vh * 0.62;
      list.style.setProperty("--p", Math.min(1, Math.max(0, (mid - r.top) / r.height)).toFixed(3));
      items.forEach((li) => li.classList.toggle("is-on", li.getBoundingClientRect().top < mid));
    }
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  frame();
})();
