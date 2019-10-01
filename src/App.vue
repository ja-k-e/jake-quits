<template>
  <div id="app" v-if="seconds !== null">
    <header class="container">
      <h1>jake quits.</h1>
      <p>
        <a href="https://twitter.com/jake_albaugh" target="blank">jake albaugh</a> quit nicotine. this is helping him along the way.
      </p>
    </header>
    <div class="container flex">
      <Progress label="Seconds" :fraction="seconds" />
      <Progress label="Minutes" :fraction="minutes" />
      <Progress label="Hours" :fraction="hours" />
      <Progress label="Days" :fraction="days" />
    </div>
    <div class="container flex">
      <Progress label="Weeks" :fraction="weeks" />
      <Progress label="Months" :fraction="months" />
      <Progress label="Years" :fraction="years" />
      <div class="progress dark">
        <div class="right">
          <h2>
            <span>${{ dollars }}</span>
            <small>.{{ cents }}</small>
          </h2>
          <h3>Saved</h3>
        </div>
      </div>
    </div>
    <div class="container">
      <Timeline :hours="hours" />
    </div>
  </div>
</template>

<script>
import Progress from "./components/Progress";
import Timeline from "./components/Timeline";

export default {
  name: "app",
  components: { Progress, Timeline },
  data() {
    return {
      years: null,
      months: null,
      weeks: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      savings: null,
      dailyCost: 6.375466667,
      time: 1569369600000 // new Date(2019, 8, 24, 19)
    };
  },
  computed: {
    dollars() {
      return Math.floor(this.savings)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    cents() {
      return (this.savings - Math.floor(this.savings)).toFixed(2).split(".")[1];
    }
  },
  methods: {
    update() {
      const now = new Date().getTime();
      const seconds = (now - this.time) / 1000;
      this.years = seconds / 31556952;
      this.months = seconds / 2592000;
      this.weeks = seconds / 604800;
      this.days = seconds / 86400;
      this.hours = seconds / 3600;
      this.minutes = seconds / 60;
      this.seconds = seconds;
      this.savings = this.days * this.dailyCost;
      requestAnimationFrame(this.update.bind(this));
    }
  },
  mounted() {
    this.update();
  }
};
</script>
