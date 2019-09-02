
<template>
  <div class="calendar">
    <div>
      <input type="radio" v-model="start_day" value="Sun" />일요일
      <input type="radio" v-model="start_day" value="Mon" />월요일
    </div>
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
            @click="plus(index, index2)"
            :class="{ 'clicked' : day.status === 'clicked', 'last_month' : day.class === 'last_month'}"
          >
            <span :class="{rounded : isToday(currentYear, currentMonth, day.day)}">{{day.day}}</span>
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


<script>
import { log } from 'util';
export default {
  name: "Calendar",
  data() {
    return {
      weekNames: [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
      ],
      start_day: "Sun",
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
  watch: {
    start_day: function(start_day) {
      this.init();
    }
  },
  methods: {
    init: function() {
      this.currentMonthStartWeekIndex = this.getStartWeek(
        this.currentYear,
        this.currentMonth,
        this.start_day
      );
      // console.log(this.currentMonthStartWeekIndex)
      this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
      this.LastMonthendOfDay = this.getEndOfDay(this.currentYear, this.currentMonth-1);
      this.initCalendar();
    },
    initCalendar: function() {
      this.currentCalendarMatrix = [];
      let day = 1;
      let last_month_day = String(new Date(this.currentYear, this.currentMonth - 1, this.LastMonthendOfDay));
      last_month_day = Number(last_month_day.split(" ")[2])

      for (let i = 0; i < 6; i++) {
        let calendarRow = [];
        for (let j = 0; j < 7; j++) {
          if (i == 0 && j < this.currentMonthStartWeekIndex) {
            // 첫 주에 첫번째 날, 요일 전에는 그 전달 날짜로 채워 놓는다.
            if(last_month_day === 1)
              last_month_day = 31;

            calendarRow.unshift({
              day : last_month_day,
              class : "last_month"
            });

            last_month_day--;
          } else if (day <= this.endOfDay) {
            // 해당 달의 끝까지 채워 놓는다.
            calendarRow.push({
              day: day,
              status: "not_click"
            });

            day++;
            
          } else {
            // 해당 달의 일수를 넘기면 빈칸으로 채워 놓는다.
            calendarRow.push("");
          }
        }
        this.currentCalendarMatrix.push(calendarRow);
      }
    },
    // getEndOfDay : 그 달의 일수 계산
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
    // 해당하는 년도의 해당 월의 첫번째 요일을 계산하는 함수
    // 박지환 버전
    getStartWeek: function(targetYear, targetMonth, start_day) {
      // let now = new Date();
      let firstDate = String(new Date(targetYear, targetMonth - 1, 1));
      let firstDate_split = firstDate.split(" ");
      let startWeek = firstDate_split[0];

      // console.log(start_day);

      if (start_day === "Sun"){
        start_day = 0;
        this.weekNames = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
      ];
      }
      else if (start_day === "Mon"){
        start_day = -1;
        this.weekNames = [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",        
        "일요일",
      ];
      
      }
      else
      {
        return alert('다시 입력해주세요')
      }

      switch (
        startWeek) {
        case "Sun":
          if(start_day === -1)
            return 6;
          return 0 + start_day;
          break;
        case "Mon":
          return 1 + start_day;
          break;
        case "Tue":
          return 2 + start_day;
          break;
        case "Wed":
          return 3 + start_day;
          break;
        case "Thu":
          return 4 + start_day;
          break;
        case "Fri":
          return 5 + start_day;
          break;
        case "Sat":
          return 6 + start_day;
          break;

        default:
          alert("unknown week");
          this.currentMonthStartWeekIndex = -1;
          break;
      }
    },

    // 구글링 버전
    // getStartWeek: function(targetYear, targetMonth) {
    //   let year = this.rootYear;
    //   let month = 1;
    //   let sumOfDay = this.rootDayOfWeekIndex;
    //   while (true) {
    //     if (targetYear > year) {
    //       for (let i = 0; i < 12; i++) {
    //         sumOfDay += this.getEndOfDay(year, month + i);
    //       }
    //       year++;
    //     } else if (targetYear == year) {
    //       if (targetMonth > month) {
    //         sumOfDay += this.getEndOfDay(year, month);
    //         month++;
    //       } else if (targetMonth == month) {
    //         return sumOfDay % 7;
    //       }
    //     }
    //   }
    // },

    //전달 가기 눌렀을 때
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

    // 다음 달 가기 눌렀을 때
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
    // 달력에서 오늘을 확인하기 위한 함수
    isToday: function(year, month, day) {
      let date = new Date();
      return (
        year == date.getFullYear() &&
        month == date.getMonth() + 1 &&
        day == date.getDate()
      );
    },

    // 달력에서 해당 날을 선탰했을 때 함수
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
.calendar {
  margin-top: 50px;
}
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

.last_month{
  color : gray;
}
a {
  text-decoration: none;
}

thead tr td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

tbody tr td {
  border-top: 1px solid #ddd;
  padding: 20px;
}
</style>


