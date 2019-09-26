<template>
	<div>
		{{ todo.id }} / {{ todo.title }}
		<br />
		<br />
		<div>
			<h4>마감기한</h4>
			<br />
			<input type="date" v-model="todo.dueDate" />
			<br />
			<input type="time" v-model="todo.dueTime" />
			<div v-if="todo.completed !== 'O'">
				<h4>미루기</h4>
				<form name="delay">
					<input type="radio" value="tomorrow" v-model="delay" @click="setTomorrow" />
					내일
					<br />
					{{ tomorrow }}
					<br />
					<input type="radio" value="otherDays" v-model="delay" />
					날짜 선택
					<br />
					<input v-show="delay === 'otherDays'" type="date" v-model="todo.delayDate" />
					<br />
					<input type="radio" value="none" v-model="delay" @click="setNone" />안함
				</form>
			</div>
			<br />
			<button @click.prevent="applyDueDate">적용</button>
			<button @click.prevent="cancelDueDate">취소</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DueDate',
	props: ['todo'],
	computed: {
		today: function() {
			return new Date();
		},
		tomorrow: function() {
			let nextDay = new Date(this.today);
			nextDay.setDate(this.today.getDate() + 1);
			return nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1) + '-' + nextDay.getDate();
		},
	},
	data() {
		return {
			lastdueDate: '',
			lastdueTime: '',
			lastdelayDate: '',
			delay: 'otherDays',
		};
	},
	mounted: function() {
		this.lastdueDate = this.todo.dueDate;
		this.lastdueTime = this.todo.dueTime;
		this.lastdelayDate = this.todo.delayDate;
	},
	methods: {
		setTomorrow() {
			this.delayDate = this.tomorrow;
		},
		setNone() {
			this.delayDate = '';
		},
		applyDueDate() {
			this.$emit('close');
		},
		cancelDueDate() {
			this.todo.dueDate = this.lastdueDate;
			this.todo.dueTime = this.lastdueTime;
			this.todo.delayDate = this.lastdelayDate;
			this.$emit('close');
		},
	},
};
</script>

<style></style>
