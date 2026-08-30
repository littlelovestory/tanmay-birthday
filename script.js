// 🎂 BIRTHDAY COUNTDOWN + YEARLY RESET

function getNextBirthday() {
  const now = new Date();

  let birthday = new Date(
    now.getFullYear(),
    7, // August
    31,
    0, 0, 0, 0
  );

  // If this year's birthday has already passed,
  // use next year's birthday.
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

let birthdayDate = getNextBirthday();

function updateCountdown() {
  const now = new Date();
  const difference = birthdayDate - now;

  // 🎂 MIDNIGHT HAS ARRIVED
  if (difference <= 0) {
    showBirthday();

    // Prepare next year's countdown
    birthdayDate = new Date(
      now.getFullYear() + 1,
      7,
      31,
      0, 0, 0, 0
    );

    return;
  }

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


// 🎉 Birthday reveal
function showBirthday() {
  const container = document.querySelector(".container");

  if (!container) return;

  container.innerHTML = `
    <div class="birthday-reveal">

      <p class="little-line">
        finally... it's your day ♡
      </p>

      <h1>
        HAPPY<br>
        BIRTHDAY
      </h1>

      <h2>
        MY BABYYYY ♡
      </h2>

      <p>
        Happy Birthday, Tanmay.
      </p>

      <button onclick="startQuiz()">
        Enter your surprise →
      </button>

    </div>
  `;

  createBirthdayHearts();
}


// 💗 Birthday heart animation
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
