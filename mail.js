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
      q: "Какой факультет славится умом и мудростью?",
      a: ["Гриффиндор", "Пуффендуй", "Когтевран", "Слизерин"],
      correct: 2
    },
    {
      q: "Какое заклинание открывает двери?",
      a: ["Lumos", "Alohomora", "Expelliarmus", "Revelio"],
      correct: 1
    },
    {
      q: "Как зовут директора Хогвартса?",
      a: ["Северус Снегг", "Минерва Макгонагалл", "Альбус Дамблдор", "Филиус Флитвик"],
      correct: 2
    },
    {
      q: "Какой предмет отвечает за защиту от тёмных искусств?",
      a: ["Зельеварение", "Трансфигурация", "Защита от тёмных искусств", "Полёты"],
      correct: 2
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

  const letter = document.getElementById("blueLetter");
  const openBtn = document.getElementById("openLetterBtn");
  const opened = letter.querySelector(".letter-opened");

  openBtn.addEventListener("click", () => {
    opened.classList.remove("hidden");
    openBtn.style.display = "none";
  });
});
