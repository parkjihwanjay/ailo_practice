<!-->
  참고 : https://passioncell.tistory.com/7
<!-->

<template>
	<div class="calendar">
		<div>
			<input type="radio" v-model="start_day" value="Sun" />일요일
			<input type="radio" v-model="start_day" value="Mon" />월요일
		</div>

		<h2>
			<a href="#" @click.prevent="onClickPrev(currentMonth)">◀</a>
			{{ currentYear }}년 {{ currentMonth }}월
			<a href="#" @click.prevent="onClickNext(currentMonth)">▶</a>
			<!-- 수정 필요 -->
		</h2>

		<table class="table table-hover">
			<thead>
				<tr>
					<td v-for="(weekName, index) in weekNames" v-bind:key="index">
						{{ weekName }}
					</td>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(row, index) in currentCalendarMatrix" :key="index">
					<td
						v-for="(day, index2) in row"
						:key="index2"
						:class="{ last_month: day.class === 'last_month' }"
					>
						<span :class="{ rounded: isToday(currentYear, currentMonth, day) }">{{ day.day }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { log } from 'util';
// import { log } from 'util';
export default {
	name: 'Calendar',
	data() {
		return {
			weekNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
			// 기본 시작일은 일요일
			start_day: 'Sun',
			first_day: 1,
			today: new Date(),
			currentYear: new Date().getFullYear(),
			currentMonth: new Date().getMonth() + 1,
			currentDay: new Date().getDate(),
			currentMonthStartWeekIndex: null,
			currentCalendarMatrix: [],
			endOfDay: null,
			LastMonthendOfDay: 0,
		};
	},
	mounted() {
		this.init();
	},
	// 요일을 바꿔을 때 실행
	watch: {
		start_day: function() {
			this.currentMonthStartWeekIndex = this.getStartWeek(
				this.currentYear,
				this.currentMonth,
				this.start_day,
			);
			this.initCalendar();
		},
	},
	methods: {
		init: function() {
			this.currentMonthStartWeekIndex = this.getStartWeek(
				this.currentYear,
				this.currentMonth,
				this.start_day,
			);
			this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);

			if (this.currentMonth === 1)
				this.LastMonthendOfDay = this.getEndOfDay(this.currentYear - 1, 12);
			else this.LastMonthendOfDay = this.getEndOfDay(this.currentYear, this.currentMonth - 1);

			this.initCalendar();
		},
		initCalendar: function() {
			this.currentCalendarMatrix = this.fillCalendar(this.first_day, this.LastMonthendOfDay);
		},
		// 해당 월에 해당하는 2차원 배열의 달력을 만듬
		fillCalendar: function(day, LastMonthendOfDay) {
			let currentCalendarMatrix = [];

			for (let i = 0; i < 6; i++) {
				let calendarRow = [];
				for (let j = 0; j < 7; j++) {
					// 해당 월의 첫번째 날 전까지는 그 전달 날로 채운다
					if (i == 0 && j < this.currentMonthStartWeekIndex) {
						calendarRow.unshift({
							day: LastMonthendOfDay,
							class: 'last_month',
						});

						LastMonthendOfDay--;
					}

					// 해당 월의 첫번째 날부터 끝 날까지는 해당 월의 날로 채운다
					else if (day <= this.endOfDay) {
						// 해당 달의 끝까지 채워 놓는다.
						calendarRow.push({
							day: day,
						});

						day++;
					} else {
						// 해당 달의 일수를 넘기면 빈칸으로 채워 놓는다.
						calendarRow.push('');
					}
				}
				currentCalendarMatrix.push(calendarRow);
			}
			return currentCalendarMatrix;
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
				case 4:
				case 6:
				case 9:
				case 11:
					return 30;
				case 2:
					if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
						return 29;
					} else {
						return 28;
					}
				default:
					console.log('unknown month ' + month);
					return 0;
			}
		},
		// 해당하는 년도의 해당 월의 첫번째 요일을 계산하는 함수
		getStartWeek: function(targetYear, targetMonth, start_day) {
			let startWeek = this.$moment(new Date(targetYear, targetMonth - 1, 1)).format('ddd');

			if (start_day === 'Sun') {
				start_day = 0;
				this.weekNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
			} else if (start_day === 'Mon') {
				start_day = -1;
				this.weekNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
			} else {
				return alert('다시 입력해주세요');
			}

			switch (startWeek) {
				case 'Sun':
					if (start_day === -1) return 6;
					return 0 + start_day;
				case 'Mon':
					return 1 + start_day;
				case 'Tue':
					return 2 + start_day;
				case 'Wed':
					return 3 + start_day;
				case 'Thu':
					return 4 + start_day;
				case 'Fri':
					return 5 + start_day;
				case 'Sat':
					return 6 + start_day;

				default:
					alert('unknown week');
					this.currentMonthStartWeekIndex = -1;
					break;
			}
		},
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
			return (
				year == this.today.getFullYear() &&
				month == this.today.getMonth() + 1 &&
				day.day == this.today.getDate() &&
				day.class !== 'last_month'
			);
		},
	},
};
</script>

<style scoped>
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

.last_month {
	color: gray;
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
