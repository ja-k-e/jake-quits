const params = new URLSearchParams(window.location.search);

function getTime() {
  const fallback = "2019-09-24T19:00"; // 1569369600000, // new Date(2019, 8, 24, 19)
  try {
    const d = Date.parse(params.has("d") ? params.get("d") : fallback);
    return isNaN(d) ? Date.parse(fallback) : d;
  } catch (e) {
    return Date.parse(fallback);
  }
}

const dailyCost = params.has("s") ? parseFloat(params.get("s")) : 6.375466667;
const currency = params.has("c") ? params.get("c") : "$";
const time = getTime();
const n = params.has("n") ? params.get("n") : "jake";
if (n) {
  document.querySelectorAll(".name").forEach((s) => (s.innerText = n));
}
const color = params.has("h") ? params.get("h") : "FB0";
if (color) {
  document.body.style.setProperty("--color", `#${color}`);
}

const data = {
  years: null,
  months: null,
  weeks: null,
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
  savings: null,
  dollars: null,
  cents: null,
};

const progresses = document.querySelectorAll(".progress[fraction]");

update();

function update() {
  const now = new Date().getTime();
  const seconds = (now - time) / 1000;
  data.years = seconds / 31556952;
  data.days = seconds / 86400;
  data.months = data.years * 12;
  data.weeks = data.days / 7;
  data.hours = seconds / 3600;
  data.minutes = seconds / 60;
  data.seconds = seconds;
  data.savings = data.days * dailyCost;
  data.dollars = Math.floor(data.savings)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  data.cents = (data.savings - Math.floor(data.savings))
    .toFixed(2)
    .split(".")[1];
  updatePies();
  document.getElementById("dollars").innerText = `${currency}${data.dollars}`;
  document.getElementById("cents").innerText = data.cents;

  requestAnimationFrame(update);
}

function updatePies() {
  const radius = 25;
  const circumference = radius * 2 * Math.PI;
  progresses.forEach((progress) => {
    const value = data[progress.getAttribute("fraction")];
    const complete = Math.floor(value);
    let v = complete.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (complete < 10) v = value.toFixed(2);
    if (complete < 1) v = value.toFixed(3);
    progress.querySelector("h2").innerText = v;
    const percent = Math.round((value - complete) * 100 * 10) / 10;
    const offset = circumference - (percent / 100) * circumference;
    progress.querySelector(
      ".left"
    ).innerHTML = `<svg aria-hidden="true" role="presentation" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 100 100">
    <circle class="bg" r="${radius}" cx="50" cy="50" />
    <circle
      class="prog"
      r="${radius}"
      cx="50"
      cy="50"
      stroke-dasharray="${circumference} ${circumference}"
      stroke-dashoffset="${offset}"
    />
  </svg>`;
  });
}
