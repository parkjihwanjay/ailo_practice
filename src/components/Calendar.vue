
<template>
  <div class="calendar">
    <h2>
      <a href="#" v-on:click="onClickPrev(currentMonth)">◀</a>
      {{currentYear}}년 {{currentMonth}}월
      <a href="#" v-on:click="onClickNext(currentMonth)">▶</a>
    </h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <td v-for="(weekName, index) in weekNames" v-bind:key="index">{{weekName}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in currentCalendarMatrix" :key="index">
          <td
            v-for="(day, index2) in row"
            :key="index2"
            style="padding:20px;"
            @click="plus(index, index2)"
            :class="{ 'clicked' : day.status === 'clicked'}"
          >
            <span v-if="isToday(currentYear, currentMonth, day.day)" class="rounded">{{day.day}}</span>
            <span v-else>{{day.day}}</span>
            <div v-if="day.memo">{{day.memo}}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-for="clicked_day in clicked_days" :key="clicked_day.day">
      {{clicked_day.day}}일
      <input type="text" placeholder="일정을 적으세요" v-model="clicked_day.memo" />
    </div>
  </div>
</template>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      weekNames: [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
        "일요일"
      ],
      rootYear: 1904,
      rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      currentDay: new Date().getDate(),
      currentMonthStartWeekIndex: null,
      currentCalendarMatrix: [],
      endOfDay: null,
      memoDatas: [],
      clicked_days: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.currentMonthStartWeekIndex = this.getStartWeek(
        this.currentYear,
        this.currentMonth
      );
      this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
      this.initCalendar();
    },
    initCalendar: function() {
      this.currentCalendarMatrix = [];
      let day = 1;
      for (let i = 0; i < 6; i++) {
        let calendarRow = [];
        for (let j = 0; j < 7; j++) {
          if (i == 0 && j < this.currentMonthStartWeekIndex) {
            calendarRow.push("");
          } else if (day <= this.endOfDay) {
            calendarRow.push({
              day: day,
              status: "not_click"
            });
            day++;
          } else {
            calendarRow.push("");
          }
        }
        this.currentCalendarMatrix.push(calendarRow);
      }
    },
    getEndOfDay: function(year, month) {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          return 30;
          break;
        case 2:
          if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return 29;
          } else {
            return 28;
          }
          break;
        default:
          console.log("unknown month " + month);
          return 0;
          break;
      }
    },
    getStartWeek: function(targetYear, targetMonth) {
      let year = this.rootYear;
      let month = 1;
      let sumOfDay = this.rootDayOfWeekIndex;
      while (true) {
        if (targetYear > year) {
          for (let i = 0; i < 12; i++) {
            sumOfDay += this.getEndOfDay(year, month + i);
          }
          year++;
        } else if (targetYear == year) {
          if (targetMonth > month) {
            sumOfDay += this.getEndOfDay(year, month);
            month++;
          } else if (targetMonth == month) {
            return sumOfDay % 7;
          }
        }
      }
    },
    onClickPrev: function(month) {
      month--;
      if (month <= 0) {
        this.currentMonth = 12;
        this.currentYear -= 1;
      } else {
        this.currentMonth -= 1;
      }
      this.init();
    },
    onClickNext: function(month) {
      month++;
      if (month > 12) {
        this.currentMonth = 1;
        this.currentYear += 1;
      } else {
        this.currentMonth += 1;
      }
      this.init();
    },
    isToday: function(year, month, day) {
      let date = new Date();
      return (
        year == date.getFullYear() &&
        month == date.getMonth() + 1 &&
        day == date.getDate()
      );
    },
    plus: function(row, col) {
      let current_status = this.currentCalendarMatrix[row][col].status;

      if (current_status === "clicked") {
        // current_status = "not_click";
        this.currentCalendarMatrix[row][col].status = "not_click";
        this.clicked_days.splice(
          this.clicked_days.indexOf(this.currentCalendarMatrix[row][col]),
          1
        );
      } else {
        // current_status = "clicked";
        this.currentCalendarMatrix[row][col].status = "clicked";
        this.clicked_days.push(this.currentCalendarMatrix[row][col]);
      }
    }
  }
};
</script>

<style type="text/css">
.rounded {
  -moz-border-radius: 20px 20px 20px 20px;
  border-radius: 20px 20px 20px 20px;
  border: solid 1px #ffffff;
  background-color: #2b6bd1;
  padding: 10px;
  color: #ffffff;
}
.clicked {
  background-color: red;
}
</style>


