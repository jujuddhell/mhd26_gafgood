// interactions.js

document.addEventListener("DOMContentLoaded", () => {
  // FAQ раскрытие
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const isOpen = answer.style.display === "block";
      answer.style.display = isOpen ? "none" : "block";
    });
  });

  // Подсветка активной ссылки навигации по URL
  const navLinks = document.querySelectorAll(".main-nav .nav-link, .mag-nav .nav-link");
  const current = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });

  // --- ПЕРЕКЛЮЧЕНИЕ БЛОКОВ "ИСТОРИЯ" / "ГЛАВНАЯ ЗДЕСЬ" ---
  const subnavButtons = document.querySelectorAll(".subnav button");
  const sections = document.querySelectorAll(".history-block, .chief-block");

  subnavButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;

      // скрываем все блоки
      sections.forEach((sec) => sec.classList.add("hidden"));

      // показываем нужный
      const targetSection = document.querySelector(target);
      if (targetSection) targetSection.classList.remove("hidden");
    });
  });

  // --- РАСКРЫТИЕ КАРТОЧЕК УСЛУГ ---
  const cards = document.querySelectorAll(".service-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });

// --- ПЛАВНАЯ ПРОКРУТКА (улучшенная) ---
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (!element) return;

  const start = window.scrollY;
  const end = element.getBoundingClientRect().top + window.scrollY - 20;
  const duration = 700; // скорость (можно 900 для ещё мягче)
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = currentTime - startTime;

    // easeInOutCubic — мягкая, кинематографичная кривая
    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const timeFraction = Math.min(progress / duration, 1);
    const eased = ease(timeFraction);

    window.scrollTo(0, start + (end - start) * eased);

    if (progress < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

// --- ОБРАБОТЧИКИ КЛИКОВ ---
document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", () => {
    smoothScrollTo(el.dataset.scroll);
  });
});

/*Для меню прокрутка*/
document.querySelectorAll(".mag-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (!targetId.startsWith("#")) return;

    e.preventDefault();
    smoothScrollTo(targetId);
  });
});


});


