<template>
  <div class="timeline">
    <div v-for="{ label, description } in timeline" :key="label">
      <h3>{{ label }}</h3>
      <p>{{ description }}</p>
    </div>
    <p style="text-align: center">
      <small>
        <a
          href="https://www.cdc.gov/tobacco/data_statistics/sgr/2004/posters/20mins/index.htm"
          target="blank"
        >cdc.gov</a>
      </small>
    </p>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {},
  data() {
    return {
      idx: null,
      timeline: [
        // https://www.cdc.gov/tobacco/data_statistics/sgr/2004/posters/20mins/index.htm
        {
          label: "1 Hour",
          description: "Heart rate drops."
        },
        {
          label: "12 Hours",
          description:
            "The carbon monoxide level in your blood drops to normal."
        },
        {
          label: "2 Weeks to 3 Months",
          description:
            "Heart attack risk begins to drop. Lung function begins to improve."
        },
        {
          label: "1 to 9 Months",
          description: "Coughing and shortness of breath decrease."
        },
        {
          label: "1 Year",
          description:
            "Added risk of coronary heart disease is half that of a smoker's."
        },
        {
          label: "5 Years",
          description: "Stroke risk is reduced to that of a nonsmoker’s."
        },
        {
          label: "10 Years",
          description:
            "Lung cancer death rate is about half that of a smoker’s. Related cancer risks decrease."
        },
        {
          label: "15 Years",
          description:
            "Risk of coronary heart disease is back to that of a nonsmoker’s."
        }
      ]
    };
  }
};
</script>
