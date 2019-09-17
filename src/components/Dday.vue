<template>
	<div>
		<div>
			<input type="date" v-model="startDate" />
			<div>{{ Dday }}day</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Dday',
	data() {
		return {
			startDate: '',
			today: '',
		};
	},
	computed: {
		Dday: function() {
			let startDate = this.startDate;

			if (startDate === '') return '';
			else {
				let Dday = 0;

				startDate = new Date(startDate);

				if (startDate < this.today) Dday = '+' + (this.getDday(startDate, this.today) - 1);
				else Dday = '-' + this.getDday(this.today, startDate);

				return Dday;
			}
		},
	},

	methods: {
		// start_date와 finish_date 사이의 Dday를 구하는 함수
		getDday(startDate, endDate) {
			// startDate = new Date(startDate);
			// endDate = new Date(endDate);

			let diff = Math.abs(endDate.getTime() - startDate.getTime());
			diff = Math.ceil(diff / (1000 * 3600 * 24));

			return diff;
		},
	},

	created: function() {
		this.today = new Date();
	},
};
</script>
