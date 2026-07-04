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

    cards.forEach((card, index) => {
      const el = document.createElement("div");
      el.className = "memory3-card";
      el.dataset.type = card.type;
      el.dataset.setId = card.setId;
      el.dataset.index = index;

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

  let opened = [];

  board.addEventListener("click", (e) => {
    const card = e.target.closest(".memory3-card");
    if (!card) return;

    if (card.classList.contains("open") || card.classList.contains("matched")) return;

    card.classList.add("open");
    opened.push(card);

    if (opened.length === 3) {
      const [c1, c2, c3] = opened;

      const correct =
        c1.dataset.type === "character" &&
        c2.dataset.type === "color" &&
        c3.dataset.type === "activity" &&
        c1.dataset.setId === c2.dataset.setId &&
        c2.dataset.setId === c3.dataset.setId;

      if (correct) {
        opened.forEach(c => c.classList.add("matched"));
      } else {
        setTimeout(() => {
          opened.forEach(c => c.classList.remove("open"));
        }, 700);
      }

      opened = [];
    }
  });

  resetBtn.addEventListener("click", () => {
    generateCards();
    opened = [];
  });
});
