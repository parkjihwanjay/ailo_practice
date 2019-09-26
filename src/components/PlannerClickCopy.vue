/* eslint-disable prettier/prettier */
<template>
	<div>
		<select name="color" v-model="selectColor">
			<option disabled value="">색깔을 골라주세요</option>
			<option v-for="(color, index) in candidateColors" :key="index" :value="color">{{
				color
			}}</option>
		</select>
		<table>
			<tr>
				<th v-for="minitue in minitues" :key="minitue">{{ minitue }}</th>
			</tr>

			<div @click.stop="Click($event)" @mouseover.stop="MouseOver($event)">
				<tr v-for="(one_hour, hindex) in oneDayPlanner" :key="hindex">
					{{
						hindex
					}}
					<td
						v-for="(ten_minute, mindex) in one_hour"
						:id="ten_minute.id"
						:key="(hindex, mindex)"
						:class="ten_miniute.class"
					></td>
				</tr>
			</div>
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
			oneDayPlanner: [],
			color: [],
			plannerList: [],
			click: 0,
			selectColor: '',
			candidateColors: ['red', 'green', 'blue', 'pink'],
		};
	},
	created: function() {
		for (let i = 0; i < 22; i++) {
			this.oneDayPlanner[i] = new Array();
			for (let j = 0; j < this.minitues.length; j++) {
				this.oneDayPlanner[i].push({
					id: `${i}_${j}`,
					class: 'white',
				});
			}
		}
	},
	methods: {
		reduceCandidate() {
			let index = this.candidateColors.indexOf(this.selectColor);
			this.candidateColors.splice(index, 1);
			this.selectColor = '';
		},
		Click(event) {
			if (!this.selectColor) return;

			let hindex = event.target.id[0];
			let mindex = event.target.id[2];

			if (this.click === 0) {
				event.target.style.backgroundColor = this.selectColor;
				event.target.className = 'colored';
				// document.getElementById(hindex + '_' + mindex).style.backgroundColor = this.selectColor;
				// document.getElementById(hindex + '_' + mindex).style.className = 'colored';
				this.color.push({
					start_index: [hindex, mindex],
				});
			} else if (this.click === 1) {
				if (event.target.className !== 'colored') {
					if (this.color[this.color.length - 1]['start_index'][0] > hindex) {
						this.ClickBefore();
						return;
					} else if (this.color[this.color.length - 1]['start_index'][0] === hindex) {
						if (this.color[this.color.length - 1]['start_index'][1] > mindex) {
							this.ClickBefore();
							return;
						}
					}

					if (!this.color[this.color.length - 1]['finish_index'])
						this.color[this.color.length - 1]['finish_index'] = [hindex, mindex];

					let start_hindex = this.color[this.color.length - 1]['start_index'][0] + 1;
					let start_mindex = (this.color[this.color.length - 1]['start_index'][1] + 1) * 10;
					let finish_hindex = this.color[this.color.length - 1]['finish_index'][0] + 1;
					let finish_mindex = (this.color[this.color.length - 1]['finish_index'][1] + 1) * 10;

					this.applyClass(
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
					this.reduceCandidate();
				} else {
					if (this.click === 1) {
						alert('겹치면 안됩니다');
						this.deleteColorOver();
						this.color.splice(this.color.length - 1, 1);
						this.click = 0;
						return;
					}
				}
			}
			this.click++;
			if (this.click === 2) this.click = 0;
		},
		ClickBefore() {
			document.getElementById(
				this.color[this.color.length - 1]['start_index'][0] +
					'_' +
					this.color[this.color.length - 1]['start_index'][1],
			).style.backgroundColor = 'white';
			this.color.splice(this.color.length - 1, 1);
			this.click = 0;
		},
		MouseOver(event) {
			event.stopPropagation();
			let hindex = event.target.id[0];
			let mindex = event.target.id[2];

			if (this.click === 1) {
				if (event.target.className) {
					alert('겹치면 안됩니다');
					this.deleteColorOver();
					this.color.splice(this.color.length - 1, 1);
					this.click = 0;
					return;
				}
				if (this.color[this.color.length - 1]['start_index'][0] > hindex) {
					return;
				} else if (this.color[this.color.length - 1]['start_index'][0] === hindex) {
					if (this.color[this.color.length - 1]['start_index'][1] > mindex) {
						return;
					}
				}

				if (this.color[this.color.length - 1]['finish_index']) {
					let finish_hindex = this.color[this.color.length - 1]['finish_index'][0];
					let finish_mindex = this.color[this.color.length - 1]['finish_index'][1];

					if (finish_hindex > hindex || finish_mindex > mindex) {
						if (event.target.className !== 'colored') this.deleteColorOver();
					}
				}

				this.color[this.color.length - 1]['finish_index'] = [hindex, mindex];
				this.colorPlanner();
			}
		},
		colorPlanner() {
			this.coloring(
				this.color[this.color.length - 1]['start_index'],
				this.color[this.color.length - 1]['finish_index'],
				this.selectColor,
			);
		},
		coloring(start_index, finish_index, color, Class) {
			let start_x = start_index[0];
			let start_y = start_index[1];

			let end_x = finish_index[0];
			let end_y = finish_index[1];

			while (1) {
				if (Class) {
					for (let i = start_y; i <= 5; i++) {
						document.getElementById(start_x + '_' + i).style.backgroundColor = color;
						document.getElementById(start_x + '_' + i).className = '';
						if (start_x === end_x && i === end_y) return;
					}
				} else {
					for (let i = start_y; i <= 5; i++) {
						if (
							color === 'white' &&
							document.getElementById(start_x + '_' + i).className === 'colored'
						) {
							continue;
						}

						document.getElementById(start_x + '_' + i).style.backgroundColor = color;

						if (start_x === end_x && i === end_y) return;
					}
				}
				start_y = 0;
				start_x++;
			}
		},
		deleteColorOver() {
			if (this.color[this.color.length - 1]['finish_index']) {
				this.coloring(
					this.color[this.color.length - 1]['start_index'],
					this.color[this.color.length - 1]['finish_index'],
					'white',
				);
			} else {
				document.getElementById(
					this.color[this.color.length - 1]['start_index'][0] +
						'_' +
						this.color[this.color.length - 1]['start_index'][1],
				).style.backgroundColor = 'white';
			}
		},
		deleteColor(start_index, finish_index, index) {
			this.plannerList.splice(index, 1);
			let color = document.getElementById(
				this.color[this.color.length - 1]['start_index'][0] +
					'_' +
					this.color[this.color.length - 1]['start_index'][1],
			).style.backgroundColor;
			this.candidateColors.push(color);
			this.coloring(start_index, finish_index, 'white', 'colored');
		},
		applyClass(start_index, finish_index, string) {
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
.white {
	background-color: white;
}
</style>
