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
})();
