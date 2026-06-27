// ================= SCREEN 2 SCROLL EFFECT =================
const barcode = document.querySelector(".barcode-icon");
const tabs = document.querySelector(".tabs");
const heroBtn = document.querySelector(".hero-btn");

const MOVE_SPEED = 0.15;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const move = Math.min(scrollY * MOVE_SPEED, 60);

  // Tabs still animate (unchanged)
  tabs.style.transform = `translateY(${-move}px)`;

  if (scrollY > 10) {
    document.querySelector(".screen2-content").style.zIndex = "10";
    document.querySelector(".tabs").style.zIndex = "11";
    heroBtn.style.zIndex = "0";
  } else {
    document.querySelector(".screen2-content").style.zIndex = "";
    document.querySelector(".tabs").style.zIndex = "";
    heroBtn.style.zIndex = "0";
  }

  if (scrollY >= 120) {
    tabs.style.position = "fixed";
    tabs.style.top = "450px";
    tabs.style.left = "0";
    tabs.style.width = "100%";

    barcode.style.position = "fixed";

    // 🔥 CHANGED THIS (higher position)
    barcode.style.top = "-110px";
    barcode.style.right = "16px";
  } else {
    tabs.style.position = "";
    barcode.style.position = "";
    barcode.style.top = "";
    barcode.style.right = "";
  }
});


// ================= SCREENS =================
const screen2 = document.getElementById('screen2');
const screen3 = document.getElementById('screen3');
const screen4 = document.getElementById('screen4');
const screen5 = document.getElementById('screen5');
const screen6 = document.getElementById('screen6');
const screen7 = document.getElementById('screen7');

// ================= HELPERS =================
function closeAllSheets() {
  screen3?.classList.remove('active');
  screen4?.classList.remove('active');
  screen5?.classList.remove('active');
}

// ================= OPEN SHEET =================
function openSheet(screen, z) {
  closeAllSheets();

  if (screen2) screen2.style.pointerEvents = "none";

  screen?.classList.add('active');

  if (screen) screen.style.zIndex = z;
}

// ================= BACK TO SCREEN 2 =================
function backToScreen2() {
  closeAllSheets();
  if (screen2) screen2.style.pointerEvents = "auto";
}

// ================= FLOW =================
document.querySelector('.action-card .action')?.addEventListener('click', () => {
  openSheet(screen3, 1100);
});

document.querySelector('#screen3 .header')?.addEventListener('click', () => {
  backToScreen2();
});

document.querySelector('.transfer-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  openSheet(screen4, 1200);
});

document.querySelector('#screen4 .bottom-back')?.addEventListener('click', () => {
  openSheet(screen3, 1100);
});

document.querySelectorAll('.transfer-option')[1]?.addEventListener('click', () => {
  openSheet(screen5, 1300);
});

document.querySelector('#screen5 .back-action')?.addEventListener('click', () => {
  openSheet(screen4, 1200);
});


// ================= HERO → SCREEN 6 =================
document.querySelector(".hero-btn")?.addEventListener("click", () => {
  backToScreen2();

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen6.classList.add("active");
});


// ================= SCREEN 3 COUNTER =================
const seats = document.querySelectorAll(".seat-card");
const ticketCount = document.getElementById("ticketCount");

function updateScreen3Count() {
  const selected = document.querySelectorAll(".seat-card.selected").length;

  if (ticketCount) {
    ticketCount.textContent =
      `${selected} Ticket${selected !== 1 ? "s" : ""} Selected`;
  }
}

seats.forEach(seat => {
  seat.addEventListener("click", () => {
    seat.classList.toggle("selected");
    updateScreen3Count();
  });
});


// ================= SCREEN 6 INDICATOR =================
const carousel = document.querySelector(".cards-wrapper");
const indicator = document.getElementById("indicator");

const total = document.querySelectorAll(".ticket-card").length;

function updateIndicator() {
  if (!carousel || !indicator) return;

  const scrollLeft = carousel.scrollLeft;
  const cardWidth = carousel.offsetWidth * 0.85;
  const index = Math.round(scrollLeft / cardWidth);

  indicator.textContent = `${index + 1} of ${total}`;
}

carousel?.addEventListener("scroll", () => {
  requestAnimationFrame(updateIndicator);
});

updateIndicator();


// ================= SCREEN 6 BACK =================
document.querySelector(".screen6-back")?.addEventListener("click", () => {
  screen6?.classList.remove("active");
  backToScreen2();
});


// ================= SCREEN 7 =================
document.querySelector(".info-btn")?.addEventListener("click", () => {
  screen7.classList.add("active");
});

document.querySelector("#screen7 .back-btn")?.addEventListener("click", () => {
  screen7.classList.remove("active");
});