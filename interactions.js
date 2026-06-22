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


/* === ПАЗЛЫ — несколько полей + общий набор === */

const boards = document.querySelectorAll(".puzzle-board");
const piecesContainer = document.querySelector(".puzzle-pieces");
const pieces = Array.from(document.querySelectorAll(".puzzle-piece"));

let draggedElement = null;

// --- ПЕРЕМЕШИВАЕМ ДЕТАЛИ ---
shuffleArray(pieces);
pieces.forEach(p => piecesContainer.appendChild(p));

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// --- DRAG START ---
pieces.forEach(piece => {
  piece.addEventListener("dragstart", dragStart);
});

function dragStart(e) {
  draggedElement = e.target;
  e.dataTransfer.setData("text/plain", "");
}

// --- DRAG OVER ДЛЯ ВСЕХ ПОЛЕЙ ---
boards.forEach(board => {
  board.addEventListener("dragover", e => e.preventDefault());
});

// --- DROP НА ЛЮБОЕ ПОЛЕ ---
boards.forEach(board => {
  board.addEventListener("drop", e => {
    e.preventDefault();

    const rect = board.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellSize = draggedElement.offsetWidth;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    const left = col * cellSize;
    const top = row * cellSize;

    draggedElement.style.position = "absolute";
    draggedElement.style.left = left + "px";
    draggedElement.style.top = top + "px";

    board.appendChild(draggedElement);
  });
});

// --- ВОЗВРАТ В ОБЩИЙ НАБОР ---
piecesContainer.addEventListener("dragover", e => e.preventDefault());

piecesContainer.addEventListener("drop", e => {
  e.preventDefault();

  draggedElement.style.position = "relative";
  draggedElement.style.left = "0px";
  draggedElement.style.top = "0px";

  piecesContainer.appendChild(draggedElement);
});

});



