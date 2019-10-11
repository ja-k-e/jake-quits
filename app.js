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
  dailyCost: 6.375466667,
  time: 1569369600000 // new Date(2019, 8, 24, 19)
};

const progresses = [];
const radius = 25;
const circumference = radius * 2 * Math.PI;
const dom = {
  dollars: document.getElementById("dollars"),
  cents: document.getElementById("cents"),
  progresses: document.querySelectorAll(".progress[fraction]")
};

let lastDollars = null;
let lastCents = null;

init();

function init() {
  dom.progresses.forEach((progress, i) => {
    progresses[i] = {
      dom: {
        elem: dom.progresses[i],
        left: dom.progresses[i].querySelector(".left"),
        digits: dom.progresses[i].querySelector("h2")
      },
      fraction: progress.getAttribute("fraction"),
      offset: null,
      v: null
    };
  });

  update();
}

function update() {
  const now = Date.now();
  const seconds = (now - data.time) / 1000;
  data.years = seconds / 31556952;
  data.months = seconds / 2592000;
  data.weeks = seconds / 604800;
  data.days = seconds / 86400;
  data.hours = seconds / 3600;
  data.minutes = seconds / 60;
  data.seconds = seconds;
  data.savings = data.days * data.dailyCost;
  data.dollars = Math.floor(data.savings)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  data.cents = (data.savings - Math.floor(data.savings))
    .toFixed(2)
    .split(".")[1];
  updatePies();
  if(lastDollars !== data.dollars) {
    lastDollars = data.dollars;
    dom.dollars.innerText = data.dollars;
  }
  if(lastCents !== data.cents) {
    lastCents = data.cents;
    dom.cents.innerText = data.cents;
  }
  requestAnimationFrame(update);
}

function updatePies() {
  progresses.forEach((progress, i) => {
    const value = data[progress.fraction];
    const complete = Math.floor(value);
    let v = complete.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (complete < 10) v = value.toFixed(2);
    if (complete < 1) v = value.toFixed(3);
    const percent = Math.round((value - complete) * 100 * 10) / 10;
    const offset = circumference - (percent / 100) * circumference;
    if(v !== progress.v) {
      progress.v = v;
      progress.dom.digits.innerText = v;
    }
    if(offset !== progress.offset) {
      progress.offset = offset;
      progress.dom.left.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 100 100">
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
    }
  });
}
