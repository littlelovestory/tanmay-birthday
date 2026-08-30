const countdown = document.getElementById("countdown");
const quiz = document.getElementById("quiz");

let birthdayShown = false;

// Find the next August 31 at exactly midnight
function getBirthday() {
  const now = new Date();

  let birthday = new Date(
    now.getFullYear(),
    7,
    31,
    0,
    0,
    0,
    0
  );

  // If this year's birthday has already finished,
  // use next year's birthday.
  if (now >= new Date(now.getFullYear(), 7, 31, 23, 59, 59, 999)) {
    birthday = new Date(
      now.getFullYear() + 1,
      7,
      31,
      0,
      0,
      0,
      0
    );
  }

  return birthday;
}

let birthdayTime = getBirthday();

function updateCountdown() {
  const now = new Date();

  // Birthday day: show the birthday experience
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

  // New year after birthday: reset everything
  if (now >= birthdayTime) {
    birthdayTime = getBirthday();
    birthdayShown = false;
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


// 🎂 Birthday reveal
function showBirthday() {
  if (countdown) {
    countdown.style.display = "none";
  }

  if (quiz) {
    quiz.style.display = "none";
  }

  const oldBirthday = document.querySelector(".birthday-reveal");

  if (oldBirthday) return;

  const birthday = document.createElement("div");

  birthday.className = "birthday-reveal";

  birthday.innerHTML = `
    <div class="little-line">
      finally... it's your day ♡
    </div>

    <h1>
      HAPPY<br>
      BIRTHDAY
    </h1>

    <h2>
      MY BABYYYY ♡
    </h2>

    <p>
      Happyyy birthday, Tanmayyyyyy 🥹♡
    </p>

    <button onclick="startQuiz()">
      Enter your surprise →
    </button>
  `;

  document.querySelector("main").appendChild(birthday);

  createBirthdayHearts();
}


// 💗 Floating hearts
function createBirthdayHearts() {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");

      heart.className = "floating-heart";
      heart.textContent = "♡";

      heart.style.left =
        Math.random() * window.innerWidth + "px";

      heart.style.top =
        window.innerHeight + "px";

      heart.style.fontSize =
        15 + Math.random() * 25 + "px";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3000);

    }, i * 100);
  }
}


// Start the countdown
updateCountdown();

setInterval(updateCountdown, 1000);
