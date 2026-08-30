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
        I LOVEEEE YOUUUU<br>
        SO MUCHHHH<br>
        <span class="tanmay-name" onclick="heartExplosion()">
          TANMAYYYYY ♡
        </span>
      </h2>

      <p>
        Tap your name, babyyyy ♡
      </p>

      <button onclick="showBirthdayLetter()">
        I have something to tell you… →
      </button>

    </div>
  `;

  createBirthdayHearts();
}


function heartExplosion() {

  for (let i = 0; i < 60; i++) {

    setTimeout(() => {

      const heart = document.createElement("span");

      heart.className = "floating-heart";

      heart.textContent =
        ["♡", "♥", "💗", "💕"][
          Math.floor(Math.random() * 4)
        ];

      heart.style.left =
        Math.random() * window.innerWidth + "px";

      heart.style.top =
        window.innerHeight * 0.45 + "px";

      heart.style.fontSize =
        18 + Math.random() * 35 + "px";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3000);

    }, i * 35);
  }
}
  

// 💌 BIRTHDAY LETTER

function showBirthdayLetter() {

  quiz.innerHTML = `

    <div class="love-letter">

      <p class="little-line">
        💌 Today, I want to celebrate YOU.
      </p>

      <h2>
        Today is simply about YOUUU ♡
      </h2>

      <div class="letter-text">

        <p>
          I don't think I can give youu one particular reason why I loveee
          youuu… because honestlyyy, there isn't just one reason.
          It's just <strong>YOUUU</strong>. 🥹💗
        </p>

        <p>
          The way you talkkk, your voiceee, your eyesss, especiallyyy when
          you look at me… idkk how to explain that feelinggg.
          There are just some things about youuu which I can't even put
          into words properlyyy. 😭
        </p>

        <p>
          And todayyy isn't about usss.<br>
          It's not about our storyyy, how we mettt, or anything elseee.
        </p>

        <p>
          <strong>Aaj bas tumhare baare mein hai. YOUUU. ♡</strong>
        </p>

        <p>
          The person you areee.<br>
          The heart you haveee.<br>
          The little things that make you uniquelyyy youuu. 🫶🏻
        </p>

        <p>
          Youu deserveee the worlddd Tanmayyyyy.
          Youu deserveee everythinggggg good in thiss worlddd. 😭💗
        </p>

        <p>
          May Goddd just giveee you all the happinesssss you deserveee,
          all the successss, all the peaceee and all the beautifullll
          thingsss you've ever wished forrr. 🥹🫶🏻
        </p>

        <p>
          I hope this yearrr brings youuu sooo manyyy reasons to smileee.
          Keep believinggg in yourselfhh and neverrrrr forget how capable
          you areee. ♡
        </p>

        <p>
          And no matter how old you gettt…
        </p>

        <p>
          <strong>you'll alwaysss be my little babyyyyy. 😭🫶🏻</strong>
        </p>

        <p>
          So todayyy, no “us”.<br>
          No our storyyy.<br>
          No memories.<br>
          No anythinggg.
        </p>

        <p>
          <strong>
            Just youuu.<br>
            Your birthdayyy.<br>
            Your dayyyy. 🎂💗
          </strong>
        </p>

        <h3>
          Happyyyyyyyy Birthdayyyyyy<br>
          myyy babyyyyyyhhh ♡
        </h3>

        <p>
          I justttt prayyy that life gives youuu sooo muchhh happinessss
          that you neverrrr run out of reasonsss to smileee. 🥹💗
        </p>

        <p>
          Happy Birthdayyy once againnn, my babyyyy. ♡
        </p>

      </div>

      <button onclick="showDarkScreen()">
        There's more waiting for you… ♡ →
      </button>

    </div>
  `;

  createBirthdayHearts();
}


// 🌑 DRAMATIC DARK SCREEN

function showDarkScreen() {

  quiz.innerHTML = `
    <div class="dark-screen cinematic-dark">

      <div class="dramatic-glow"></div>

      <p class="dramatic-text">
        Wait...
      </p>

      <p class="dramatic-text second">
        I told you there was more.
      </p>

      <p class="dramatic-text third">
        Close your eyes for a second... ♡
      </p>

      <button class="dramatic-button" onclick="showCake()">
        Okay... I'm ready →
      </button>

    </div>
  `;

}


// 🎂 CINEMATIC CAKE SURPRISE

function showCake() {

  quiz.innerHTML = `
    <div class="cake-screen cinematic-cake">

      <div class="cake-intro">
        <p class="little-line">
          🎂 A little birthday moment...
        </p>

        <h2>
          Make a wish,<br>
          my babyyyyy ♡
        </h2>
      </div>

      <div class="cake-wrapper">

        <div class="cake-glow"></div>

        <div class="cake-real">

          <div class="cake-top">
            <span class="cake-decoration">♡</span>
            <span class="cake-decoration">♡</span>
            <span class="cake-decoration">♡</span>
          </div>

          <div class="cake-layer top-layer"></div>
          <div class="cake-layer middle-layer"></div>
          <div class="cake-layer bottom-layer"></div>

        </div>

        <div class="candles">

          <div class="candle-real" onclick="blowCandle(this)">
            <div class="flame"></div>
            <div class="wick"></div>
            <div class="candle-stick"></div>
          </div>

          <div class="candle-real small-candle">
            <div class="flame"></div>
            <div class="wick"></div>
            <div class="candle-stick"></div>
          </div>

          <div class="candle-real small-candle">
            <div class="flame"></div>
            <div class="wick"></div>
            <div class="candle-stick"></div>
          </div>

        </div>

      </div>

      <p id="candle-message" class="candle-hint">
        Tap a candle to make a wish... 🕯️
      </p>

      <div id="birthday-celebration"></div>

    </div>
  `;

}


// 🕯️ BLOW / TAP CANDLE

function blowCandle(clickedCandle) {

  if (clickedCandle.classList.contains("blown")) return;

  const candles =
    document.querySelectorAll(".candle-real");

  candles.forEach(candle => {
    candle.classList.add("blown");
  });

  const message =
    document.getElementById("candle-message");

  message.innerHTML =
    "Happy Birthdayyy, my babyyyyy... 🥹💗";

  // 🎤 YOUR HAPPY BIRTHDAY VOICE WILL PLAY HERE LATER

  createBirthdayHearts();

  createConfetti();

  setTimeout(() => {

    const celebration =
      document.getElementById("birthday-celebration");

    celebration.innerHTML = `
      <div class="celebration-text">
        <span>✨</span>
        <strong>HAPPY BIRTHDAYYYY</strong>
        <span>💗</span>
      </div>

      <p>
        I wish I could see your face right now. 🥹
      </p>
    `;

  }, 700);

  setTimeout(() => {
    showGift();
  }, 5000);

}


// 🎉 CONFETTI

function createConfetti() {

  for (let i = 0; i < 45; i++) {

    setTimeout(() => {

      const piece =
        document.createElement("span");

      piece.className = "confetti-piece";

      piece.textContent =
        ["✦", "♡", "•", "✧"][
          Math.floor(Math.random() * 4)
        ];

      piece.style.left =
        Math.random() * window.innerWidth + "px";

      piece.style.top =
        "-20px";

      piece.style.fontSize =
        12 + Math.random() * 18 + "px";

      piece.style.animationDuration =
        2 + Math.random() * 2 + "s";

      document.body.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 4500);

    }, i * 35);

  }

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
// 🎁 DRAMATIC GIFT SURPRISE

function showGift() {

  quiz.innerHTML = `
    <div class="gift-screen cinematic-gift">

      <div class="gift-sparkles">
        ✦　♡　✦　♡　✦
      </div>

      <p class="little-line">
        🎁 Wait... there's actually one more thing.
      </p>

      <h2>
        I saved something<br>
        special for youuu ♡
      </h2>

      <div class="big-gift" onclick="openGift()">

        <div class="gift-lid">
          <div class="gift-ribbon-horizontal"></div>
        </div>

        <div class="gift-body">
          <div class="gift-ribbon-vertical"></div>
        </div>

        <div class="gift-bow">
          <span></span>
          <span></span>
        </div>

      </div>

      <p id="gift-message" class="gift-hint">
        Tap the gift... 🎁
      </p>

    </div>
  `;

}
// 🎁 OPEN GIFT
function openGift() {

  const gift =
    document.querySelector(".big-gift");

  const message =
    document.getElementById("gift-message");

  if (!gift || gift.classList.contains("opened")) return;

  gift.classList.add("opened");

  message.innerHTML =
    "Waittt... you actually opened it. 🥹💗";

  createBirthdayHearts();

  setTimeout(() => {

    message.innerHTML =
      "Okay... now look inside. ♡";

  }, 1200);

  setTimeout(() => {

    showFinalSurprise();

  }, 3000);

}
// 🎶 FINAL SURPRISE
function showFinalSurprise() {

  quiz.innerHTML = `
    <div class="final-surprise cinematic-final">

      <div class="final-stars">✦ ♡ ✦</div>

      <p class="little-line">
        you made it all the way here... 🥹
      </p>

      <h2>
        And now...<br>
        the last little surprise.
      </h2>

      <div class="final-heart">
        ♡
      </div>

      <p class="final-message">
        There are some things<br>
        I wanted you to hear from me.
      </p>

      <button onclick="playFinalMessage()">
        Open my last surprise ♡
      </button>

    </div>
  `;

}
// 🎶 FINAL SURPRISE
function playFinalMessage() {

  quiz.innerHTML = `
    <div class="audio-screen">

      <p class="little-line">
        💗 One last thing...
      </p>

      <h2>
        Just for youuu ♡
      </h2>

      <p>
        Some things are better left as words. 🥹💗
      </p>

      <button onclick="showEndMessage()">
        Read my last message ♡
      </button>

    </div>
  `;

}
// 💗 FINAL EMOTIONAL MESSAGE

function showEndMessage() {

  quiz.innerHTML = `

    <div class="end-message-screen cinematic-ending">

      <div class="ending-stars">✦</div>

      <p class="ending-whisper">
        before you leave...
      </p>

      <h2>
        I just want you<br>
        to remember one thing.
      </h2>

      <div class="ending-line"></div>

      <div class="ending-text">

        <p>
          Someday, maybe years from now,
          you'll look back at this little corner
          of the internet...
        </p>

        <p>
          and I hope you smile.
        </p>

        <p>
          I hope you remember this day,
          this little birthday surprise,
          and most importantly...
        </p>

        <p class="highlight">
          how loved you were.
        </p>

        <p>
          And if someday you have one of those days
          when you feel like you're not important...
          when you feel like you're not enough...
        </p>

        <p>
          come back here.
        </p>

        <p>
          Read these words again.
          Slowly.
        </p>

        <p>
          And remember that somewhere,
          there is someone who believes in you,
          is proud of you,
          and will always want to see you happy.
        </p>

        <p class="highlight">
          You matter.
        </p>

        <p>
          More than you probably realise.
        </p>

      </div>

      <div class="ending-heart">
        ♡
      </div>

      <h3>
        Happy Birthday,<br>
        Tanmay.
      </h3>

      <p class="last-line">
        Keep this little place safe.<br>
        You can come back whenever you need to. ♡
      </p>

    </div>

  `;

  createBirthdayHearts();

}
// 🚀 START

updateCountdown();

setInterval(
  updateCountdown,
  1000
);
