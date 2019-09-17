<template>
	<div>
		<table>
			<tr>
				<th v-for="minitue in minitues" :key="minitue">{{ minitue }}</th>
			</tr>

			<tr v-for="(one_hour, hindex) in one_day_planner" :key="hindex">
				{{
					hindex
				}}
				<td
					v-for="(ten_minute, mindex) in one_hour"
					@mousedown.prevent="mouseDown(hindex, mindex, $event)"
					@mouseover="mouseOver(hindex, mindex, $event)"
					@mouseup="mouseUp(hindex, mindex, $event)"
					:id="ten_minute.id"
					:key="(hindex, mindex)"
				></td>
			</tr>
		</table>

		<div v-for="(list, index) in plannerList" :key="index">
			{{ list.time }}
			<input type="text" v-model="list.memo" placeholder="할일을 적어주세요." />
			<button @click="deleteColor(list.start_index, list.finish_index, index)">
				삭제
			</button>
		</div>
	</div>
</template>

<script>
// import { debuglog, log } from 'util';

export default {
	data() {
		return {
			minitues: ['10', '20', '30', '40', '50', '60'],
			one_day_planner: [],
			color: [],
			plannerList: [],
		};
	},
	created: function() {
		for (let i = 0; i < 22; i++) {
			this.one_day_planner[i] = new Array();
			for (let j = 0; j < this.minitues.length; j++) {
				this.one_day_planner[i].push({
					id: `${i}_${j}`,
				});
			}
		}
	},
	methods: {
		coloring(start_index, finish_index, color) {
			let start_x = start_index[0];
			let start_y = start_index[1];

			let end_x = finish_index[0];
			let end_y = finish_index[1];

			while (1) {
				for (let i = start_y; i <= 5; i++) {
					document.getElementById(start_x + '_' + i).style.backgroundColor = color;

					if (start_x === end_x && i === end_y) return;
				}
				start_y = 0;
				start_x++;
			}
		},
		mouseUp(hindex, mindex, event) {
			if (this.color[this.color.length - 1]['start_index'][0] > hindex) {
				document.getElementById(
					this.color[this.color.length - 1]['start_index'][0] +
						'_' +
						this.color[this.color.length - 1]['start_index'][1],
				).style.backgroundColor = 'white';
				this.color.splice(this.color.length - 1, 1);
				// this.plannerList.splice(this.color.length - 1, 1);
				return;
			} else if (this.color[this.color.length - 1]['start_index'][0] === hindex) {
				if (this.color[this.color.length - 1]['start_index'][1] > mindex) {
					document.getElementById(
						this.color[this.color.length - 1]['start_index'][0] +
							'_' +
							this.color[this.color.length - 1]['start_index'][1],
					).style.backgroundColor = 'white';
					this.color.splice(this.color.length - 1, 1);
					// this.plannerList.splice(this.color.length - 1, 1);
					return;
				}
			}

			if (event.target.className !== 'colored') {
				if (!this.color[this.color.length - 1]['finish_index'])
					this.color[this.color.length - 1]['finish_index'] = [hindex, mindex];

				let start_hindex = this.color[this.color.length - 1]['start_index'][0] + 1;
				let start_mindex = (this.color[this.color.length - 1]['start_index'][1] + 1) * 10;
				let finish_hindex = this.color[this.color.length - 1]['finish_index'][0] + 1;
				let finish_mindex = (this.color[this.color.length - 1]['finish_index'][1] + 1) * 10;

				this.coloringClass(
					this.color[this.color.length - 1]['start_index'],
					this.color[this.color.length - 1]['finish_index'],
					'colored',
				);

				this.plannerList.push({
					time: `${start_hindex}시 ${start_mindex}분부터 ${finish_hindex}시 ${finish_mindex}분까지`,
					start_index: this.color[this.color.length - 1]['start_index'],
					finish_index: this.color[this.color.length - 1]['finish_index'],
					memo: '',
				});
			}
		},
		coloringClass(start_index, finish_index, string) {
			let start_x = start_index[0];
			let start_y = start_index[1];

			let end_x = finish_index[0];
			let end_y = finish_index[1];

			while (1) {
				for (let i = start_y; i <= 5; i++) {
					// document.getElementById(start_x + '_' + i).style.backgroundColor = color;
					document.getElementById(start_x + '_' + i).className = string;

					if (start_x === end_x && i === end_y) return;
				}
				start_y = 0;
				start_x++;
			}
		},
		mouseDown(hindex, mindex, event) {
			if (event.target.className !== 'colored') {
				document.getElementById(hindex + '_' + mindex).style.backgroundColor = 'red';
				document.getElementById(hindex + '_' + mindex).style.className = 'colored';
				this.color.push({
					start_index: [hindex, mindex],
				});
			}
		},
		mouseOver(hindex, mindex, event) {
			if (event.which === 1) {
				if (this.color[this.color.length - 1]['start_index'][0] > hindex) return;
				else if (this.color[this.color.length - 1]['start_index'][0] === hindex) {
					if (this.color[this.color.length - 1]['start_index'][1] > mindex) return;
				}

				if (this.color[this.color.length - 1]['finish_index']) {
					let finish_hindex = this.color[this.color.length - 1]['finish_index'][0];
					let finish_mindex = this.color[this.color.length - 1]['finish_index'][1];

					if (finish_hindex > hindex || finish_mindex > mindex) {
						if (event.target.className !== 'colored') this.deleteColorOver();
					}
				}

				if (event.target.className !== 'colored') {
					this.color[this.color.length - 1]['finish_index'] = [hindex, mindex];
					this.colorPlanner();
				}
			}
		},
		deleteColorOver() {
			this.coloring(
				this.color[this.color.length - 1]['start_index'],
				this.color[this.color.length - 1]['finish_index'],
				'white',
			);
		},
		deleteColor(start_index, finish_index, index) {
			this.plannerList.splice(index, 1);
			this.coloring(start_index, finish_index, 'white');
		},
		colorPlanner() {
			this.coloring(
				this.color[this.color.length - 1]['start_index'],
				this.color[this.color.length - 1]['finish_index'],
				'red',
			);
		},
	},
};
</script>

<style scoped>
tr td {
	border: 1px solid black;
	empty-cells: show;
	padding: 10px;
}

table {
	border-spacing: 0px;
}

.drag {
	background: red;
}
</style>
