document.addEventListener("DOMContentLoaded", () => {

  const startScreen = document.getElementById("startScreen");
  const quizScreen = document.getElementById("quizScreen");
  const mailScreen = document.getElementById("mailScreen");

  const openMailboxBtn = document.getElementById("openMailboxBtn");

  const quizQuestionEl = document.getElementById("quizQuestion");
  const quizAnswersEl = document.getElementById("quizAnswers");
  const errorCountEl = document.getElementById("errorCount");

  let errorCount = 0;

  /* === Банк вопросов === */
  const questions = [
    {
      q: "Что было раньше: огонь или феникс",
      a: ["Круг не имеет начала", "Курица", "Яйцо", "Дракон"],
      correct: 0
    },
    {
      q: "Какое из перечисленных существ реально существует",
      a: ["Морщерогий кизляк", "Дромарог", "Вездешмыг", "Растопырник"],
      correct: 1
    },
    {
      q: "Любимый цвет Гилдероя Локхарта",
      a: ["Лиловый", "Лавандовый", "Сиреневый", "Барвинковый"],
      correct: 2
    },
    {
      q: "Серебрянный или медный?",
      a: ["Серебрянный", "Медный", "Розовый", "Бронзовый"],
      correct: 3
    },
    {
      q: "Орёл или ворон?",
      a: ["Голубь", "Попугай", "Орёл", "Ворон"],
      correct: 2
    },
    {
      q: "Отражением влюблённости в человеке являются:",
      a: ["Пухошмыги", "Влюбекрылы", "Вскружиголы", "Лунопухи"],
      correct: 3
    }
  ];

  /* === Переход к квизу === */
  openMailboxBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    generateQuestion();
  });

  /* === Генерация вопроса === */
  function generateQuestion() {
    const random = questions[Math.floor(Math.random() * questions.length)];

    quizQuestionEl.textContent = random.q;
    quizAnswersEl.innerHTML = "";

    random.a.forEach((answer, index) => {
      const btn = document.createElement("button");
      btn.textContent = answer;

      btn.addEventListener("click", () => {
        if (index === random.correct) {
          quizScreen.classList.add("hidden");
          mailScreen.classList.remove("hidden");
        } else {
          errorCount++;
          errorCountEl.textContent = errorCount;
          generateQuestion();
        }
      });

      quizAnswersEl.appendChild(btn);
    });
  }

/* === Открытие письма === */
const openLetterBtn = document.getElementById("openLetterBtn");
const letterModal = document.getElementById("letterModal");
const closeLetterBtn = document.getElementById("closeLetterBtn");

openLetterBtn.addEventListener("click", () => {
  letterModal.classList.remove("hidden");
});

closeLetterBtn.addEventListener("click", () => {
  letterModal.classList.add("hidden");
});

/* Закрытие по клику вне окна */
letterModal.addEventListener("click", (e) => {
  if (e.target === letterModal) {
    letterModal.classList.add("hidden");
  }
});

});
