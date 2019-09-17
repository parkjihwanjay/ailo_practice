<template>
	<div>
		<div>다이어리 만들기</div>

		<div>섹션</div>
		<div v-for="section in basic_customizing.section" :key="section.name">
			<input type="checkbox" :name="section.name" v-model="section.checked" />
			<label :for="section">{{ section.name }}</label>
		</div>

		<div>배열</div>
		<input
			type="radio"
			name="array"
			v-model="basic_customizing.array"
			value="M-D-M-D"
		/>M-D-M-D
		<br />
		<input
			type="radio"
			name="array"
			v-model="basic_customizing.array"
			value="MM-DD"
		/>MM-DD
		<br />

		<div>적용</div>
		<input type="date" v-model="basic_customizing.startDate" />부터
		<input type="date" v-model="basic_customizing.endDate" />까지
		<br />

		<div>Daily</div>

		<div>기본 구성</div>
		<div
			v-for="element in basic_customizing.basic_component"
			:key="element.name"
		>
			<input type="checkbox" :name="element.name" v-model="element.checked" />
			<label :for="element.name">{{ element.name }}</label>
		</div>

		<input type="button" value="적용하기" @click="show_basic_customizing" />
	</div>
</template>

<script>
export default {
	name: 'Basic',
	data() {
		return {
			basic_customizing: {
				section: [
					{
						name: 'Prologue',
						checked: true,
					},
					{
						name: 'Epilogue',
						checked: true,
					},
					{
						name: 'Yearly',
						checked: true,
					},
					{
						name: 'Monthly',
						checked: true,
					},
					{
						name: 'Daily',
						checked: true,
					},
				],
				array: '',
				startDate: '',
				endDate: '',
				basic_component: [
					{
						name: '24시간 플래너',
						checked: true,
					},
					{
						name: 'To-do-list',
						checked: true,
					},
					{
						name: '일기',
						checked: true,
					},
					{
						name: '포토앨범(2장)',
						checked: false,
					},
					{
						name: '가계부',
						checked: false,
					},
				],
			},
		};
	},
	methods: {
		// 적용하기를 누르면 콘솔에 결과 출력
		show_basic_customizing() {
			console.log(this.basic_customizing);
		},
	},
	watch: {
		// 시작 일을 정했을 때 실행되는 함수
		'basic_customizing.startDate': function(startDate) {
			if (startDate && this.basic_customizing.endDate) {
				if (this.basic_customizing.endDate < startDate) {
					this.basic_customizing.startDate = '';
					alert('시작 날짜가 끝나는 날짜보다 늦습니다. 다시 선택해주세요');
				}
			}
		},
		// 끝나는 날짜를 정했을 때 실행되는 함수
		'basic_customizing.endDate': function(endDate) {
			if (endDate && this.basic_customizing.startDate) {
				if (this.basic_customizing.startDate > endDate) {
					this.basic_customizing.endDate = '';
					alert('시작 날짜가 끝나는 날짜보다 늦습니다. 다시 선택해주세요');
				}
			}
		},
	},
};
</script>
