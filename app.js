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

const progresses = document.querySelectorAll(".progress[fraction]");

update();

function update() {
  const now = new Date().getTime();
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
  document.getElementById("dollars").innerText = data.dollars;
  document.getElementById("cents").innerText = data.cents;

  requestAnimationFrame(update);
}

function updatePies() {
  const radius = 25;
  const circumference = radius * 2 * Math.PI;
  progresses.forEach(progress => {
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
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 100 100">
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
