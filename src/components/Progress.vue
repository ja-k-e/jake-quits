<template>
  <div class="progress">
    <div class="left">
      <!-- eslint-disable -->
      <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 100 100">
        <circle class="bg" :r="radius" cx="50" cy="50" />
        <circle
          class="prog"
          :r="radius"
          cx="50"
          cy="50"
          :stroke-dasharray="`${circumference} ${circumference}`"
          :stroke-dashoffset="offset"
        />
        <!-- <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{{ percent }}%</text> -->
      </svg>
    </div>
    <div class="right">
      <h2>{{ number }}</h2>
      <h3>{{ label }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fraction: { type: Number, required: true },
    label: { type: String, required: true }
  },
  data() {
    return {
      radius: 25,
      circumference: 25 * 2 * Math.PI
    };
  },
  computed: {
    complete() {
      return Math.floor(this.fraction);
    },
    number() {
      if (this.complete < 1) return this.fraction.toFixed(3);
      if (this.complete < 10) return this.fraction.toFixed(2);
      return this.complete.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // if (this.complete < 999) return this.complete;
      // if (this.complete < 999999)
      //   return Math.round((this.complete / 1000) * 10) / 10 + "k";
      // if (this.complete < 999999999)
      //   return Math.round((this.complete / 1000000) * 10) / 10 + "M";
      // return Math.round((this.complete / 1000000000) * 10) / 10 + "B";
    },
    percent() {
      return Math.round((this.fraction - this.complete) * 100 * 10) / 10;
    },
    offset() {
      return this.circumference - (this.percent / 100) * this.circumference;
    }
  }
};
</script>

<style lang="scss">
svg {
  transform: rotate(-90deg);
  display: block;
  margin: 0;
  width: 100%;
  height: auto;
}
svg text {
  transform-origin: 50% 50%;
  transform: rotate(90deg);
  font-size: 10pt;
}
svg circle {
  // stroke-miterlimit: round;
  // stroke-linecap: round;
  fill: none;
  stroke-width: 50px;
}
svg circle.prog {
  will-change: auto;
  stroke: #000;
  // stroke: rgba(#ffbb00, 1);
  // stroke: rgba(#ffbb00, 1);
}
svg circle.bg {
  stroke: rgba(0, 0, 0, 0.1);
}

.progress {
  display: flex;
  // color: #ffbb00;
  // background: black;
  text-align: left;
  .left {
    width: 40px;
  }
  .left,
  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .right {
    flex: 1;
    margin-left: 0.5rem;
  }
}
</style>
