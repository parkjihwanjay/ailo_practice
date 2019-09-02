<template>
  <div>
    <div>
      <input type="date" v-model="start_date" />
      <div>{{Dday}}day</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dday",
  data() {
    return {
      start_date: "",
      Dday: "",
      today: ""
    };
  },
  watch: {
    start_date: function(start_date) {
      //   console.log(start_date);
      let Dday = 0;
      start_date = new Date(start_date);
      if (start_date < this.today) {
        Dday = this.getDday(start_date, this.today);
        this.Dday = "+" + Dday;
      } else {
        Dday = this.getDday(this.today, start_date);
        this.Dday = "-" + Dday;
      }
    }
  },
  methods: {
    // start_date와 finish_date 사이의 Dday를 구하는 함수
    getDday(start_date, finish_date) {
      let start_date_day = new Date(start_date);
      let finish_date_day = new Date(finish_date);

      let diff = Math.abs(finish_date_day.getTime() - start_date_day.getTime());
      diff = Math.ceil(diff / (1000 * 3600 * 24));

      return diff;
    }
  },
  created: function() {
    this.today = new Date();
  }
};
</script>