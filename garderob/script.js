const cases = [
    "Общение с подозреваемыми",
    "Общение со свидетелями",
    "Интервью для колонки сплетен",
    "Активное думание возле детективной доски",
    "Выход на место преступления (законный)",
    "Выход на место преступления (не законный)",
    "Работа под прикрытием в булочной",
    "Работа под прикрытием в библиотеке",
    "Сбор улик на улицах Криминальска",
    "Встреча с клиентом",
];

document.getElementById("random-case-btn").onclick = function() {
    const text = cases[Math.floor(Math.random() * cases.length)];
    document.getElementById("random-case-text").textContent = text;
};
