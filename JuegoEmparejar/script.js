const teams = ["FCB", "RM", "PSG", "MUN", "CHE", "JUV", "BVB", "LIV"];
let cards = [...teams, ...teams];
let board = document.getElementById("gameBoard");
let firstCard = null, secondCard = null;
let lockBoard = false, attempts = 0, matches = 0, time = 0, timer;
let messageEl = document.getElementById("message");
let restartButton = document.getElementById("restartButton");

function startTimer() {
    timer = setInterval(() => {
        document.getElementById("timer").textContent = ++time;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function showMessage(text) {
    messageEl.textContent = text;
    setTimeout(() => messageEl.textContent = "", 1500);
}

function createBoard() {
    board.innerHTML = "";
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(team => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.team = team;

        const frontImg = document.createElement("img");
        frontImg.src = `images/${team}.png`;
        frontImg.classList.add("front", "hidden");

        const backImg = document.createElement("img");
        backImg.src = "images/question.png";
        backImg.classList.add("back");

        card.appendChild(frontImg);
        card.appendChild(backImg);
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });

    attempts = matches = time = 0;
    document.getElementById("timer").textContent = time;
    document.getElementById("attempts").textContent = attempts;
    restartButton.classList.add("hidden");
    startTimer();
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    let front = this.querySelector(".front");
    let back = this.querySelector(".back");
    front.classList.remove("hidden");
    back.classList.add("hidden");
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    attempts++;
    document.getElementById("attempts").textContent = attempts;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.team === secondCard.dataset.team) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        matches++;

        if (matches === teams.length) {
            stopTimer();
            showMessage(`¡Ganaste! Tiempo: ${time}s | Intentos: ${attempts}`);
            restartButton.classList.remove("hidden");
        } else {
            showMessage(["Bien hecho!", "Sigue así!", "Ya casi!"][Math.floor(Math.random() * 3)]);
        }

        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.querySelector(".front").classList.add("hidden");
            firstCard.querySelector(".back").classList.remove("hidden");
            secondCard.querySelector(".front").classList.add("hidden");
            secondCard.querySelector(".back").classList.remove("hidden");
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

restartButton.addEventListener("click", createBoard);
createBoard();