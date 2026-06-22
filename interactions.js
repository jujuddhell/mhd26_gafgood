// interactions.js

document.addEventListener("DOMContentLoaded", () => {

  /* === FAQ раскрытие === */
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const isOpen = answer.style.display === "block";
      answer.style.display = isOpen ? "none" : "block";
    });
  });


  /* === Подсветка активной ссылки навигации === */
  const navLinks = document.querySelectorAll(".main-nav .nav-link, .mag-nav .nav-link");
  const current = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });


  /* === Переключение блоков "История" / "Главная здесь" === */
  const subnavButtons = document.querySelectorAll(".subnav button");
  const sections = document.querySelectorAll(".history-block, .chief-block");

  subnavButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;

      sections.forEach((sec) => sec.classList.add("hidden"));

      const targetSection = document.querySelector(target);
      if (targetSection) targetSection.classList.remove("hidden");
    });
  });


  /* === Раскрытие карточек услуг === */
  const cards = document.querySelectorAll(".service-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });


  /* === Плавная прокрутка === */
  function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (!element) return;

    const start = window.scrollY;
    const end = element.getBoundingClientRect().top + window.scrollY - 20;
    const duration = 700;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;

      const ease = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const timeFraction = Math.min(progress / duration, 1);
      const eased = ease(timeFraction);

      window.scrollTo(0, start + (end - start) * eased);

      if (progress < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", () => {
      smoothScrollTo(el.dataset.scroll);
    });
  });

  document.querySelectorAll(".mag-nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId.startsWith("#")) return;

      e.preventDefault();
      smoothScrollTo(targetId);
    });
  });


  /* === Увеличение картинок по клику === */
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("zoomable")) {
      const overlay = document.createElement("div");
      overlay.className = "zoom-overlay";
      overlay.innerHTML = `<img src="${e.target.src}">`;
      document.body.appendChild(overlay);

      overlay.style.display = "flex";

      overlay.addEventListener("click", () => overlay.remove());
    }
  });


/* === ПАЗЛЫ === */

const pieces = document.querySelectorAll(".puzzle-piece");
const board = document.getElementById("puzzleBoard");

let draggedElement = null;

// --- 1. Перетаскивание исходных деталей ---
pieces.forEach(piece => {
  piece.addEventListener("dragstart", dragStart);
});

function dragStart(e) {
  draggedElement = e.target;
  e.dataTransfer.setData("text/plain", "");
}

// --- 2. Разрешаем бросать в поле ---
board.addEventListener("dragover", (e) => {
  e.preventDefault();
});

// --- 3. Обработка drop ---
board.addEventListener("drop", (e) => {
  e.preventDefault();

  // Если деталь уже в поле — просто перемещаем
  if (draggedElement.parentElement === board) {
    draggedElement.style.left = e.offsetX - draggedElement.width / 2 + "px";
    draggedElement.style.top = e.offsetY - draggedElement.height / 2 + "px";
    return;
  }

  // Если деталь из боковой панели — создаём новую
  const clone = draggedElement.cloneNode(true);
  clone.style.position = "absolute";
  clone.style.left = e.offsetX - clone.width / 2 + "px";
  clone.style.top = e.offsetY - clone.height / 2 + "px";
  clone.draggable = true;

  // Делаем её тоже перетаскиваемой
  clone.addEventListener("dragstart", dragStart);

  board.appendChild(clone);
});



});



