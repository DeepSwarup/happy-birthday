const birthdayMessages = {
  stars: [
    "May this year feel like a slow exhale — soft, lucky, and full of the kinds of moments that make you smile without trying.",
    "May you have more reasons to laugh than to overthink, and more joy than you know what to do with.",
    "May your plans work out beautifully, even the ones that sound a little dramatic at first.",
    "May this year surprise you in the most delightful ways, the kind that feel like a secret gift from the universe.",
    "Keep being exactly as warm, interesting, and unforgettable as you are.",
    "More adventures. More little wins. More beautiful memories. And definitely more cake.",
    "Someone is very lucky to know you, and even more lucky to be smiling because of you. ❤️",
    "May your heart feel calm, your days feel bright, and your dreams feel close enough to touch.",
    "May you keep glowing in all the ways that make you, you."
  ],

  letter: `
    Hey 愛しい,

    Happy Birthday ❤️

    I hope today feels soft around the edges and bright in all the right places.

    I hope this year brings you beautiful surprises, generous laughter, kind people, new adventures, and a hundred little memories that stay with you long after the candles are out.

    And even though the distance hasn’t figured out how to be romantic yet, I hope this tiny corner of the internet still feels like a warm little moment made just for you.

    I hope it makes you smile for a few minutes and reminds you that you deserve a year that feels as lovely as you are.

    Have the best birthday.

    You deserve it. ❤️
  `
};

const state = {
  musicEnabled: false,
  musicReady: false,
  starsLit: false,
  finalOpened: false,
  starSelected: false,
  checklistComplete: false,
  letterRead: false
};

const introLine1 = document.getElementById("introLine1");
const introLine2 = document.getElementById("introLine2");
const introLine3 = document.getElementById("introLine3");
const enterButton = document.getElementById("enterButton");
const docBody = document.body;
const starfield = document.getElementById("starfield");
const starGrid = document.getElementById("starGrid");
const starMessage = document.getElementById("starMessage");
const musicToggle = document.getElementById("musicToggle");
const musicAudio = document.getElementById("bgMusic");
const messageLines = document.getElementById("messageLines");
const finalLead = document.getElementById("finalLead");
const finalSecond = document.getElementById("finalSecond");
const finalButton = document.getElementById("finalOpenButton");
const finalReveal = document.getElementById("finalReveal");
const checklistItems = [...document.querySelectorAll(".check-item")];
const checklistStatus = document.getElementById("checklistStatus");
const wishHeading = document.getElementById("wishHeading");
const wishDetail = document.getElementById("wishDetail");
const wishSecret = document.getElementById("wishSecret");
const wishFinal = document.getElementById("wishFinal");
const cake = document.getElementById("cake");
const candles = [...document.querySelectorAll(".candle")];
const fireworksLayer = document.getElementById("fireworksLayer");
const confettiLayer = document.getElementById("confettiLayer");
const revealTargets = document.querySelectorAll(".reveal");
const allPanels = [...document.querySelectorAll(".panel")];

function toggleMusic() {
  if (!musicAudio || !musicAudio.src) {
    musicToggle.classList.add("hidden");
    return;
  }

  if (!state.musicReady) {
    tryStartMusic();
    return;
  }

  if (musicAudio.paused) {
    musicAudio.play().catch(() => {
      musicToggle.classList.add("hidden");
      state.musicReady = false;
    });
    musicToggle.classList.add("is-playing");
  } else {
    musicAudio.pause();
    musicToggle.classList.remove("is-playing");
  }
}

function tryStartMusic() {
  if (state.musicReady || !musicAudio) {
    return;
  }

  fetch("assets/music.mp3", { method: "HEAD", cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("music missing");
      }

      musicAudio.src = "assets/music.mp3";
      musicAudio.load();

      musicAudio.oncanplaythrough = () => {
        state.musicReady = true;
        musicToggle.classList.remove("hidden");
      };

      musicAudio.onerror = () => {
        state.musicReady = false;
        musicToggle.classList.add("hidden");
      };

      musicAudio.play().then(() => {
        state.musicReady = true;
        musicToggle.classList.remove("hidden");
        musicToggle.classList.add("is-playing");
      }).catch(() => {
        state.musicReady = false;
        musicToggle.classList.add("hidden");
      });
    })
    .catch(() => {
      state.musicReady = false;
      musicToggle.classList.add("hidden");
    });
}

function setVisible(element, visible) {
  if (!element) return;
  element.classList.toggle("visible", visible);
}

function buildStarfield() {
  if (!starfield) return;

  const starCount = window.innerWidth < 540 ? 48 : 80;
  starfield.innerHTML = "";

  for (let i = 0; i < starCount; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    const size = (Math.random() * 3.2 + 1.2).toFixed(2) + "px";
    const left = (Math.random() * 100).toFixed(2) + "%";
    const top = (Math.random() * 100).toFixed(2) + "%";
    const opacity = (Math.random() * 0.9 + 0.2).toFixed(2);
    const duration = (Math.random() * 4 + 3).toFixed(2) + "s";
    const delay = (Math.random() * 4).toFixed(2) + "s";

    star.style.setProperty("--star-size", size);
    star.style.left = left;
    star.style.top = top;
    star.style.setProperty("--star-opacity", opacity);
    star.style.setProperty("--star-duration", duration);
    star.style.setProperty("--star-delay", delay);

    starfield.appendChild(star);
  }
}

function runIntroSequence() {
  const steps = [
    { element: introLine1, delay: 150 },
    { element: introLine2, delay: 1200 },
    { element: introLine3, delay: 2400 }
  ];

  setTimeout(() => setVisible(introLine1, true), steps[0].delay);
  setTimeout(() => setVisible(introLine2, true), steps[1].delay);
  setTimeout(() => setVisible(introLine3, true), steps[2].delay);

  setTimeout(() => {
    enterButton.style.opacity = "1";
    enterButton.style.transform = "translateY(0)";
  }, 3200);
}

function setActivePanel(id) {
  const introPanel = document.querySelector(".intro-panel");

  allPanels.forEach((panel) => {
    const isActive = panel.id === id;
    panel.classList.toggle("active", isActive);
    panel.style.display = isActive ? "block" : "none";
  });

  if (id === "home") {
    if (introPanel) {
      introPanel.style.display = "grid";
      introPanel.style.opacity = "1";
      introPanel.style.position = "relative";
      introPanel.style.inset = "auto";
      introPanel.style.zIndex = "1";
      introPanel.style.pointerEvents = "auto";
      introPanel.style.background = "transparent";
    }
    document.querySelectorAll(".intro-line").forEach((line) => setVisible(line, true));
    return;
  }

  if (introPanel) {
    introPanel.style.display = "none";
  }

  docBody.classList.add("main-visible");
}

function revealMainExperience() {
  docBody.classList.add("main-visible");
  document.querySelectorAll(".intro-line").forEach((line) => line.classList.add("visible"));
  const introPanel = document.querySelector(".intro-panel");
  if (introPanel) {
    introPanel.style.opacity = "0";
    introPanel.style.transition = "opacity 0.8s ease";
    introPanel.style.pointerEvents = "none";
    introPanel.style.position = "fixed";
    introPanel.style.inset = "0";
    introPanel.style.zIndex = "20";
    introPanel.style.background = "rgba(5, 9, 20, 0.95)";
    setTimeout(() => {
      introPanel.style.display = "none";
      setActivePanel("birthday");
    }, 850);
  }

  revealTargets.forEach((target) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    observer.observe(target);
  });

  tryStartMusic();
}

function buildStars() {
  if (!starGrid) return;

  birthdayMessages.stars.forEach((message, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "star-button";
    button.setAttribute("aria-label", `Choose magic star ${index + 1}`);
    button.textContent = "✦";
    button.addEventListener("click", () => {
      document.querySelectorAll(".star-button").forEach((star) => star.classList.remove("active"));
      button.classList.add("active");
      state.starSelected = true;
      starMessage.textContent = message;
      starMessage.classList.add("visible");
      updateNavigationGates();
    });

    starGrid.appendChild(button);
  });

  if (starMessage) {
    starMessage.textContent = "Choose the magic star to continue.";
    starMessage.classList.add("visible");
  }

  updateNavigationGates();
}

function revealMessageLines() {
  if (!messageLines) return;

  const lines = [
    "Anyone can send a message.",
    "Anyone can send a cake emoji.",
    "Anyone can type...",
    "Happy Birthday 🎂",
    "But sometimes...",
    "...someone deserves a little more care and Love."
  ];

  lines.forEach((line, index) => {
    const item = document.createElement("p");
    item.className = "message-line";
    if (index === 5) {
      item.classList.add("embrace");
    }
    item.textContent = line;
    messageLines.appendChild(item);

    setTimeout(() => setVisible(item, true), 500 + index * 550);
  });
}

function updateNavigationGates() {
  const starNext = document.querySelector("#stars .section-next");
  const checklistNext = document.querySelector("#checklist .section-next");
  const wishNext = document.querySelector("#wish .section-next");
  const letterNext = document.querySelector("#letter .section-next");

  if (starNext) {
    starNext.disabled = !state.starSelected;
    starNext.classList.toggle("is-disabled", !state.starSelected);
    starNext.setAttribute("aria-disabled", String(!state.starSelected));
  }

  if (checklistNext) {
    checklistNext.disabled = !state.checklistComplete;
    checklistNext.classList.toggle("is-disabled", !state.checklistComplete);
    checklistNext.setAttribute("aria-disabled", String(!state.checklistComplete));
  }

  if (wishNext) {
    wishNext.disabled = false;
    wishNext.classList.remove("is-disabled");
    wishNext.setAttribute("aria-disabled", "false");
  }

  if (letterNext) {
    letterNext.disabled = !state.letterRead;
    letterNext.classList.toggle("is-disabled", !state.letterRead);
    letterNext.setAttribute("aria-disabled", String(!state.letterRead));
  }
}

function initChecklist() {
  checklistItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("checked");

      const checkedCount = checklistItems.filter((checkItem) => checkItem.classList.contains("checked")).length;
      state.checklistComplete = checkedCount === checklistItems.length;

      if (state.checklistComplete) {
        checklistStatus.textContent = "Okay. Birthday successfully completed. 🎉";
        checklistStatus.classList.add("visible");
      } else {
        checklistStatus.textContent = "Finish the checklist to continue.";
        checklistStatus.classList.remove("visible");
      }

      updateNavigationGates();
    });
  });

  state.checklistComplete = false;
  checklistStatus.textContent = "";
  checklistStatus.classList.remove("visible");
  updateNavigationGates();
}

function typeLetter() {
  const letterText = document.getElementById("letterText");
  if (!letterText) return;

  const text = birthdayMessages.letter.trim();
  let index = 0;

  const typeNext = () => {
    if (index <= text.length) {
      const portion = text.slice(0, index);
      letterText.innerHTML = `${portion.replace(/\n/g, "<br>")}<span class="caret" aria-hidden="true"></span>`;
      index += 1;
      setTimeout(typeNext, 18);
    } else {
      letterText.innerHTML = text.replace(/\n/g, "<br>");
    }
  };

  typeNext();
}

function revealLetterSurprise() {
  const letterCard = document.getElementById("wishLetterCard");
  const letterText = document.getElementById("letterText");
  if (!letterCard || !letterText) return;

  state.letterRead = true;
  letterCard.classList.add("visible");
  updateNavigationGates();

  if (letterText.innerHTML.trim() === "") {
    typeLetter();
  }
}

function createParticleBurst(x, y, count) {
  const fragment = document.createElement("span");
  fragment.className = "spark-particle";
  fragment.style.position = "absolute";
  fragment.style.left = `${x}px`;
  fragment.style.top = `${y}px`;
  fragment.style.width = "8px";
  fragment.style.height = "8px";
  fragment.style.borderRadius = "50%";
  fragment.style.background = "radial-gradient(circle, rgba(255,255,255,1), rgba(176,160,255,0.7), transparent 70%)";
  fragment.style.pointerEvents = "none";
  fragment.style.boxShadow = "0 0 12px rgba(255,255,255,0.7)";
  fragment.style.zIndex = "35";

  const dx = (Math.random() - 0.5) * 220;
  const dy = (Math.random() - 0.5) * 220;
  const duration = 1000 + Math.random() * 700;

  fragment.animate([
    { transform: "translate(0, 0) scale(1)", opacity: 1 },
    { transform: `translate(${dx}px, ${dy}px) scale(0.3)`, opacity: 0 }
  ], {
    duration,
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    fill: "forwards"
  });

  document.body.appendChild(fragment);
  setTimeout(() => fragment.remove(), duration + 80);
}

function createBurstOnIntro() {
  for (let i = 0; i < 18; i += 1) {
    const x = window.innerWidth / 2 + (Math.random() - 0.5) * 220;
    const y = window.innerHeight / 2 + (Math.random() - 0.5) * 180;
    createParticleBurst(x, y, 1);
  }
}

function createConfetti() {
  if (!confettiLayer) return;

  const colors = ["#f7d694", "#d7c9ff", "#ffd3ea", "#b8ebff", "#ffffff"];

  for (let i = 0; i < 130; i += 1) {
    const dot = document.createElement("span");
    dot.style.position = "absolute";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = "-14px";
    dot.style.width = `${5 + Math.random() * 8}px`;
    dot.style.height = `${10 + Math.random() * 18}px`;
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    dot.style.borderRadius = "999px";
    dot.style.opacity = "0.9";
    dot.style.transform = `rotate(${Math.random() * 180}deg)`;
    dot.style.zIndex = "30";

    const xDrift = (Math.random() - 0.5) * 180;
    const yDrop = 500 + Math.random() * 240;
    const rotation = 240 + Math.random() * 420;
    const duration = 1400 + Math.random() * 900;

    dot.animate([
      { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
      { transform: `translate3d(${xDrift}px, ${yDrop}px, 0) rotate(${rotation}deg)`, opacity: 0.9 }
    ], {
      duration,
      easing: "ease-in",
      fill: "forwards"
    });

    confettiLayer.appendChild(dot);
    setTimeout(() => dot.remove(), duration + 200);
  }
}

function createFireworkBurst(x, y) {
  const burst = document.createElement("div");
  burst.className = "firework";
  burst.style.position = "absolute";
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  burst.style.width = "10px";
  burst.style.height = "10px";
  burst.style.borderRadius = "50%";
  burst.style.pointerEvents = "none";
  burst.style.zIndex = "32";
  burst.style.background = "radial-gradient(circle, rgba(255,255,255,1), rgba(244,210,138,1) 30%, transparent 70%)";
  burst.style.boxShadow = "0 0 18px rgba(244,210,138,0.9)";

  fireworksLayer.appendChild(burst);

  for (let i = 0; i < 14; i += 1) {
    const spark = document.createElement("span");
    spark.style.position = "absolute";
    spark.style.left = "50%";
    spark.style.top = "50%";
    spark.style.width = "4px";
    spark.style.height = "4px";
    spark.style.background = ["#f7d694", "#d7c9ff", "#ffd3ea", "#ffffff"][Math.floor(Math.random() * 4)];
    spark.style.borderRadius = "50%";
    spark.style.transform = "translate(-50%, -50%)";

    const angle = (Math.PI * 2 * i) / 14;
    const distance = 28 + Math.random() * 42;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    spark.animate([
      { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0 }
    ], {
      duration: 900 + Math.random() * 300,
      easing: "ease-out",
      fill: "forwards"
    });

    burst.appendChild(spark);
  }

  setTimeout(() => burst.remove(), 1200);
}

function triggerFireworks() {
  const centers = [
    [window.innerWidth * 0.25, window.innerHeight * 0.22],
    [window.innerWidth * 0.5, window.innerHeight * 0.35],
    [window.innerWidth * 0.76, window.innerHeight * 0.21],
    [window.innerWidth * 0.5, window.innerHeight * 0.52]
  ];

  centers.forEach(([x, y], index) => {
    setTimeout(() => createFireworkBurst(x, y), index * 180);
  });
}

function animateWishSequence() {
  if (!wishHeading || !wishDetail || !wishSecret || !wishFinal) return;

  candles.forEach((candle) => candle.classList.add("dimmed"));
  docBody.classList.add("bright-stars");
  docBody.classList.add("dark-overlay");
  cake.classList.add("is-lit");

  setTimeout(() => {
    wishHeading.textContent = "Wish made? ✨";
    setVisible(wishHeading, true);
  }, 200);

  setTimeout(() => {
    wishDetail.textContent = "Good.";
    setVisible(wishDetail, true);
  }, 900);

  setTimeout(() => {
    wishSecret.textContent = "I'm not asking what it was.";
    setVisible(wishSecret, true);
  }, 1800);

  setTimeout(() => {
    wishFinal.textContent = "Some wishes are better kept secret.";
    setVisible(wishFinal, true);
  }, 2800);

  createConfetti();
  triggerFireworks();
}

function bindCakeInteractions() {
  if (!cake) return;

  const handleCakeToggle = (event) => {
    if (!event.target.closest(".candle") && event.target !== cake) return;

    if (state.starsLit) return;
    state.starsLit = true;
    animateWishSequence();
  };

  candles.forEach((candle) => {
    candle.addEventListener("click", (event) => {
      event.stopPropagation();
      candle.classList.add("dimmed");
      handleCakeToggle(event);
    });
  });

  cake.addEventListener("click", handleCakeToggle);
  cake.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!state.starsLit) {
        state.starsLit = true;
        animateWishSequence();
      }
    }
  });
}

function handleFinalReveal() {
  if (!finalLead || !finalSecond || !finalButton || !finalReveal) return;

  finalButton.addEventListener("click", () => {
    if (state.finalOpened) return;
    state.finalOpened = true;
    finalReveal.classList.add("visible");
    finalButton.style.display = "none";
    triggerFireworks();
    createConfetti();
  });
}

function attachScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

function bindNavigation() {
  document.querySelectorAll(".section-back, .section-next").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.target);
      const gate = button.dataset.gate;

      if (button.dataset.target === "#letter") {
        revealLetterSurprise();
        triggerFireworks();
        createConfetti();
      }

      if (gate === "letter") {
        revealLetterSurprise();
        triggerFireworks();
        createConfetti();
      }

      const gateAllowed = !gate || (
        gate === "star" ? state.starSelected :
        gate === "checklist" ? state.checklistComplete :
        gate === "letter" ? state.letterRead :
        true
      );

      if (!gateAllowed && gate) {
        const focusMessage = document.getElementById("starMessage");
        if (gate === "star" && focusMessage) {
          focusMessage.textContent = "Choose the magic star before moving on.";
          focusMessage.classList.add("visible");
        }
        if (gate === "checklist" && checklistStatus) {
          checklistStatus.textContent = "Finish the checklist to continue.";
          checklistStatus.classList.add("visible");
        }
        return;
      }

      if (!target) return;

      setActivePanel(target.id);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.classList.add("visible");
    });
  });
}

enterButton.addEventListener("click", () => {
  createBurstOnIntro();
  revealMainExperience();
  setTimeout(() => {
    enterButton.style.display = "none";
  }, 100);
  tryStartMusic();
});

musicToggle.addEventListener("click", toggleMusic);

window.addEventListener("resize", buildStarfield);

window.addEventListener("load", () => {
  allPanels.forEach((panel) => {
    panel.classList.remove("active");
    panel.style.display = "none";
  });

  const introPanel = document.querySelector(".intro-panel");
  if (introPanel) {
    introPanel.style.display = "grid";
    introPanel.classList.add("active");
  }

  buildStarfield();
  buildStars();
  revealMessageLines();
  initChecklist();
  typeLetter();
  bindCakeInteractions();
  handleFinalReveal();
  attachScrollAnimations();
  bindNavigation();
  updateNavigationGates();
  runIntroSequence();
  musicToggle.classList.add("hidden");
});
