document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("memory3-board");
  const resetBtn = document.getElementById("memory3-reset");
  if (!board) return;

  const sets = [
    {
      id: "red",
      characterImg: "assets/memory3/char-red.png",
      colorImg: "assets/memory3/color-red.png",
      activityImg: "assets/memory3/activity-main.png"
    },
    {
      id: "gold",
      characterImg: "assets/memory3/char-gold.png",
      colorImg: "assets/memory3/color-gold.png",
      activityImg: "assets/memory3/activity-finance.png"
    },
    {
      id: "green",
      characterImg: "assets/memory3/char-green.png",
      colorImg: "assets/memory3/color-green.png",
      activityImg: "assets/memory3/activity-law.png"
    },
    {
      id: "pink",
      characterImg: "assets/memory3/char-pink.png",
      colorImg: "assets/memory3/color-pink.png",
      activityImg: "assets/memory3/activity-blackmail.png"
    },
    {
      id: "mint",
      characterImg: "assets/memory3/char-mint.png",
      colorImg: "assets/memory3/color-mint.png",
      activityImg: "assets/memory3/activity-archive.png"
    },
    {
      id: "white",
      characterImg: "assets/memory3/char-white.png",
      colorImg: "assets/memory3/color-white.png",
      activityImg: "assets/memory3/activity-clients.png"
    }
  ];

  function generateCards() {
    board.innerHTML = "";

    let cards = [];
    sets.forEach(set => {
      cards.push({ type: "character", img: set.characterImg, setId: set.id });
      cards.push({ type: "color", img: set.colorImg, setId: set.id });
      cards.push({ type: "activity", img: set.activityImg, setId: set.id });
    });

    cards = cards.sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      const el = document.createElement("div");
      el.className = "memory3-card";
      el.dataset.type = card.type;
      el.dataset.setId = card.setId;

      el.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <img src="${card.img}" alt="">
          </div>
          <div class="card-back">
            <img src="assets/memory3/card-back.png" alt="">
          </div>
        </div>
      `;

      board.appendChild(el);
    });
  }

  generateCards();

  board.addEventListener("click", (e) => {
    const card = e.target.closest(".memory3-card");
    if (!card) return;

    // уже собрана — не трогаем
    if (card.classList.contains("matched")) return;

    // уже открыта — не даём открыть повторно
    if (card.classList.contains("open")) return;

    // открываем карточку
    card.classList.add("open");

    // смотрим, сколько открытых карточек сейчас есть
    const openedCards = Array.from(
      board.querySelectorAll(".memory3-card.open:not(.matched)")
    );

    if (openedCards.length === 3) {
      const [c1, c2, c3] = openedCards;

      const sameSet =
        c1.dataset.setId === c2.dataset.setId &&
        c2.dataset.setId === c3.dataset.setId;

      const types = [c1.dataset.type, c2.dataset.type, c3.dataset.type];
      const hasCharacter = types.includes("character");
      const hasColor = types.includes("color");
      const hasActivity = types.includes("activity");

      const correct = sameSet && hasCharacter && hasColor && hasActivity;

      if (correct) {
        openedCards.forEach(c => {
          c.classList.remove("open");
          c.classList.add("matched");
        });
      } else {
        setTimeout(() => {
          openedCards.forEach(c => c.classList.remove("open"));
        }, 600);
      }
    }
  });

  resetBtn.addEventListener("click", () => {
    generateCards();
  });
});

