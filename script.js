// ===============================
// TANMAY'S LITTLE BIRTHDAY SURPRISE ♡
// ===============================

// 🎂 Birthday countdown
const birthday = new Date("2026-08-31T00:00:00+05:30").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = birthday - now;

  if (difference <= 0) {
    document.body.classList.add("birthday-time");
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (difference % (1000 * 60)) / 1000
  );

  const countdown = document.getElementById("countdown");

  if (countdown) {
    countdown.innerHTML = `
      <div class="time-box">
        <span>${String(days).padStart(2, "0")}</span>
        <small>DAYS</small>
      </div>

      <div class="time-box">
        <span>${String(hours).padStart(2, "0")}</span>
        <small>HOURS</small>
      </div>

      <div class="time-box">
        <span>${String(minutes).padStart(2, "0")}</span>
        <small>MINUTES</small>
      </div>

      <div class="time-box">
        <span>${String(seconds).padStart(2, "0")}</span>
        <small>SECONDS</small>
      </div>
    `;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===============================
// 🔐 PRIVATE LITTLE QUIZ
// ===============================

// We'll put the real questions here later.
// Replace the placeholder answers with your actual answers.

const questions = [
  {
    question: "Question 1",
    answer: "answer1"
  },
  {
    question: "Question 2",
    answer: "answer2"
  },
  {
    question: "Question 3",
    answer: "answer3"
  },
  {
    question: "Question 4",
    answer: "answer4"
  },
  {
    question: "Question 5",
    answer: "answer5"
  },
  {
    question: "Question 6",
    answer: "answer6"
  }
];

let currentQuestion = 0;

function startQuiz() {
  currentQuestion = 0;
  showQuestion();
}

function showQuestion() {
  const quiz = document.getElementById("quiz");

  if (!quiz) return;

  const q = questions[currentQuestion];

  quiz.innerHTML = `
    <p class="question-number">
      ${currentQuestion + 1} / ${questions.length}
    </p>

    <h2>${q.question}</h2>

    <input
      id="answer"
      type="text"
      placeholder="Your answer..."
      autocomplete="off"
    >

    <button onclick="checkAnswer()">
      Continue ♡
    </button>

    <p id="wrong-answer"></p>
  `;
}

function checkAnswer() {
  const input = document.getElementById("answer");
  const message = document.getElementById("wrong-answer");

  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestion].answer
    .trim()
    .toLowerCase();

  if (userAnswer === correctAnswer) {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
      unlockSurprise();
    } else {
      showQuestion();
    }
  } else {
    message.textContent = "Hmmmm... try again 👀♡";
    input.value = "";
  }
}


// ===============================
// 💗 UNLOCK
// ===============================

function unlockSurprise() {
  const quiz = document.getElementById("quiz");

  if (!quiz) return;

  quiz.innerHTML = `
    <div class="unlock">
      <div class="unlock-heart">♡</div>
      <h2>Okayyy...</h2>
      <p>
        You really do know us. 🥹
      </p>
      <p>
        I think you're ready for your surprise.
      </p>

      <button onclick="openSurprise()">
        Open it ♡
      </button>
    </div>
  `;
}


// ===============================
// ✨ SURPRISE
// ===============================

function openSurprise() {
  document.body.classList.add("surprise-open");

  const container = document.querySelector(".container");

  if (container) {
    container.innerHTML = `
      <p class="little-line">for the one who somehow became</p>

      <h1>
        my<br>
        everything ♡
      </h1>

      <p>
        Happy Birthday, Tanmay.
      </p>

      <button onclick="createHeart(event)">
        tap me ♡
      </button>
    `;
  }

  createManyHearts();
}


// ===============================
// 💕 HEART ANIMATION
// ===============================

function createHeart(event) {
  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = "♡";

  heart.style.left = event.clientX + "px";
  heart.style.top = event.clientY + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2500);
}

function createManyHearts() {
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");

      heart.className = "floating-heart";
      heart.textContent = "♡";

      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight + "px";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3000);
    }, i * 120);
  }
          }
