const countdown = document.getElementById("countdown");
const quiz = document.getElementById("quiz");

const questions = [
  {
    question: "Before there was an 'us'… there was one particular September day when we first talked. Remember it? 👀",
    options: ["5 September", "6 September", "7 September", "8 September"],
    answer: "6 September",
    reaction: "hmm… you remember 👀 ♡"
  },

  {
    question: "Okayyy Mr. Romantic… remember the day you finally decided I was the one? 👀 When exactly was that little historic moment? 💌",
    options: ["6 September 2024", "7 September 2024", "8 September 2024", "7 September 2025"],
    answer: "7 September 2024",
    reaction: "okayyy, Mr. Memory 😭💗"
  },

  {
    question: "Date yaad hai… but do you remember the TIME you decided to make us official? 👀",
    options: ["7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM"],
    answer: "7:45 PM",
    reaction: "you better remember this one 🫣♡"
  },

  {
    question: "Our first meeting after becoming officially bf & gf… where did our little 'official us' actually happen? 😭",
    options: ["Petrol pump", "Auto", "Cinema hall", "Tuition"],
    answer: "Auto",
    reaction: "HOW could you forget this 😭♡"
  },

  {
    question: "Final boss 🎧 — before all the songs, conversations and everything else… which song did YOU suggest to me first?",
    options: ["CO2", "Heer", "Waqt Ki Baatein", "Kashish"],
    answer: "Waqt Ki Baatein",
    reaction: "I knew you'd remember this one ♡"
  }
];

let currentQuestion = 0;
let birthdayShown = false;


// 🎂 FIND NEXT AUGUST 31 MIDNIGHT

function getNextBirthday() {
  const now = new Date();

  let birthday = new Date(
    now.getFullYear(),
    7,
    31,
    0, 0, 0, 0
  );

  if (now >= birthday) {
    birthday = new Date(
      now.getFullYear() + 1,
      7,
      31,
      0, 0, 0, 0
    );
  }

  return birthday;
}

let birthdayTime = getNextBirthday();


// ⏳ COUNTDOWN

function updateCountdown() {

  const now = new Date();

  // Birthday day has arrived
  if (
    now.getMonth() === 7 &&
    now.getDate() === 31
  ) {
    if (!birthdayShown) {
      birthdayShown = true;
      showBirthday();
    }

    return;
  }

  const difference = birthdayTime - now;

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

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


// 💗 OPEN BIRTHDAY

function showBirthday() {

  birthdayShown = true;

  countdown.style.display = "none";

  const paragraphs =
    document.querySelectorAll(".container > p");

  if (paragraphs[0]) {
    paragraphs[0].textContent =
      "today is all about you ♡";
  }

  if (paragraphs[1]) {
    paragraphs[1].textContent =
      "I've been waiting to show you this...";
  }

  const title =
    document.querySelector(".container > h1");

  title.innerHTML =
    "HAPPY<br>BIRTHDAY<br>MY BABYYYY ♡";

  quiz.style.display = "block";

  quiz.innerHTML = `
    <div class="birthday-reveal">

      <p class="little-line">
        today is your special day ♡
      </p>

      <h2>
        Happyyy Birthdayyy<br>
        my babyyyyy 💗
      </h2>

      <p>
        I made this little world just for you.
      </p>

      <button onclick="startQuiz()">
        There's something else… →
      </button>

    </div>
  `;

  createBirthdayHearts();
}


// 🔐 START QUIZ

function startQuiz() {

  currentQuestion = 0;

  quiz.innerHTML = `
    <div id="question-number"></div>

    <h2 id="question"></h2>

    <div id="options"></div>

    <p id="quiz-message"></p>
  `;

  showQuestion();
}


// 📝 SHOW QUESTION

function showQuestion() {

  const questionNumber =
    document.getElementById("question-number");

  const question =
    document.getElementById("question");

  const options =
    document.getElementById("options");

  const message =
    document.getElementById("quiz-message");

  if (!question || !options) return;

  const q = questions[currentQuestion];

  questionNumber.textContent =
    `MEMORY ${currentQuestion + 1} / ${questions.length}`;

  question.textContent = q.question;

  message.textContent = "";

  options.innerHTML = "";

  q.options.forEach(option => {

    const button =
      document.createElement("button");

    button.textContent = option;

    button.onclick = () =>
      checkAnswer(option);

    options.appendChild(button);
  });
}


// 💗 CHECK ANSWER

function checkAnswer(selected) {

  const q = questions[currentQuestion];

  const message =
    document.getElementById("quiz-message");

  if (selected === q.answer) {

    message.textContent = q.reaction;

    currentQuestion++;

    if (currentQuestion < questions.length) {

      setTimeout(
        showQuestion,
        1000
      );

    } else {

      setTimeout(
        showFinalUnlock,
        1000
      );
    }

  } else {

    message.textContent =
      "Hmmmm… are you REALLY Tanmay? 👀 Try again, my memory-challenged boy 😭♡";
  }
}


// 🔓 ALL QUESTIONS COMPLETED

function showFinalUnlock() {

  quiz.innerHTML = `

    <div class="final-unlock">

      <div class="unlock-icon">♡</div>

      <h2>ACCESS GRANTED</h2>

      <p>
        Okay… you're officially allowed inside. 🥹
      </p>

      <p>
        5/5 memories remembered.
      </p>

      <button onclick="startSurprise()">
        But your actual surprise starts now… →
      </button>

    </div>
  `;

  createBirthdayHearts();
}


// 💌 SURPRISE

function startSurprise() {

  quiz.innerHTML = `

    <div class="love-message">

      <p>And now, finally...</p>

      <h2>
        I LOVEEEE YOUUU<br>
        SO MUCHHHH<br>
        TANMAYYYYY ♡
      </h2>

      <p>
        Happy Birthday to my favourite human. 💗
      </p>

    </div>
  `;

  createBirthdayHearts();
}


// ♡ FLOATING HEARTS

function createBirthdayHearts() {

  for (let i = 0; i < 25; i++) {

    setTimeout(() => {

      const heart =
        document.createElement("span");

      heart.className =
        "floating-heart";

      heart.textContent = "♡";

      heart.style.left =
        Math.random() *
        window.innerWidth +
        "px";

      heart.style.top =
        window.innerHeight +
        "px";

      heart.style.fontSize =
        15 +
        Math.random() * 25 +
        "px";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3000);

    }, i * 120);
  }
}


// 🚀 START

updateCountdown();

setInterval(
  updateCountdown,
  1000
);
