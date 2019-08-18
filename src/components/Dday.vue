<template>
  <div>
    <div>
      <input type="date" v-model="start_date" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Dday",
  data() {
    return {
      start_date: ""
    };
  },
  watch: {
    start_date: function(start_date) {
      //   console.log(start_date);

      if (start_date < this.today) {
        this.getDday(start_date, this.today);
      } else {
        this.getDday(this.today, start_date);
      }
    }
  },
  methods: {
    getDday(start_date, finish_date) {
      let start_date_split = start_date.split("-");
      let finish_date_split = finish_date.split("-");
      console.log(start_date_split);
      console.log(finish_date_split);
    }
  },
  computed: {
    today: function() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      today = yyyy + "-" + mm + "-" + dd;

      return today;
    }
  }
};
</script>