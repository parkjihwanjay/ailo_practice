<template>
	<div class="account-container">
		<h1>가계부</h1>
		<div class="container-box">
			<div class="account-table-box">
				<table>
					<tr>
						<td class="table-top">카테고리</td>
						<td class="table-top">결제수단</td>
						<td class="table-top">내용</td>
						<td class="table-top">수입</td>
						<td class="table-top">지출</td>
					</tr>
					<tr v-for="(info, index) in infos" :key="index">
						<td>
							<multiselect
								v-model="info.category"
								track-by="name"
								label="name"
								:options="category"
								:searchable="false"
								:close-on-select="true"
								:show-labels="false"
								placeholder="선택하기"
							></multiselect>
						</td>
						<td>
							<multiselect
								v-model="info.payment"
								:options="payments"
								:searchable="false"
								:close-on-select="true"
								:show-labels="false"
								placeholder="선택하기"
							></multiselect>
						</td>

						<td v-if="!info.contentEditing" @dblclick="edit(info, 'content')">
							{{ info.content }}
						</td>

						<td v-else>
							<input
								type="text"
								v-model="info.content"
								blur="doneEdit(info, 'content')"
								@keyup.enter="doneEdit(info, 'content')"
								@keyup.esc="cancelEdit(info, 'content')"
								v-focus
							/>
						</td>

						<td id="income-num" v-if="!info.incomeEditing" v-on:dblclick="edit(info, 'income')">
							<!-- 숫자를 스트링으로 바꿈 -->
							+
							<p v-if="info.income">{{ info.income }}</p>
						</td>
						<input
							v-else
							v-model.number="info.income"
							v-on:blur="doneEdit(info, 'income')"
							v-on:keyup.enter="doneEdit(info, 'income')"
							v-on:keyup.esc="cancelEdit(info, 'income')"
							v-focus
						/>

						<td id="expense-num" v-if="!info.expenseEditing" v-on:dblclick="edit(info, 'expense')">
							<!-- 숫자를 스트링으로 바꿈 -->
							-
							<p v-if="info.expense">{{ info.expense.toLocaleString() }}</p>
						</td>
						<input
							v-else
							v-model.number="info.expense"
							v-on:blur="doneEdit(info, 'expense')"
							v-on:keyup.enter="doneEdit(info, 'expense')"
							v-on:keyup.esc="cancelEdit(info, 'expense')"
							v-focus
						/>
					</tr>

					<tr>
						<td colspan="5" id="add-btn" @click="addTable()">+</td>
					</tr>

					<tr>
						<td colspan="3" id="totals">합계</td>
						<td id="total-income">+{{ totalIncome }}</td>
						<td id="total-expense">-{{ totalExpense }}</td>
					</tr>
				</table>
			</div>
			<div class="category-box">
				<h4>카테고리관리</h4>
				<h5 style="color: blue">수입</h5>
				<ul>
					<li id="cate-income-list" v-for="(i, index) in category" :key="index">
						<span v-if="i.value === 'income'">{{ i.name }}</span>
					</li>

					<template name="category-income-plus">
						<span @click="addIncomeCate()" v-if="!addingIncome" class="btn">+</span>
						<input
							v-else
							type="text"
							v-model="adding"
							v-on:blur="doneAddIncome()"
							v-on:keyup.enter="doneAddIncome()"
							v-focus
						/>
					</template>
				</ul>
				<h5 style="color: red">지출</h5>
				<ul>
					<li id="cate-expense-list" v-for="(i, index) in category" :key="index">
						<span v-if="i.value === 'expense'">{{ i.name }}</span>
					</li>
					<template name="category-expense-plus">
						<span v-if="!addingExpense" @click="addExpenseCate()" class="btn">+</span>
						<input
							type="text"
							v-else
							v-model="adding"
							v-on:blur="doneAddExpense()"
							v-on:keyup.enter="doneAddExpense()"
							v-focus
						/>
					</template>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'account-book',
	data() {
		return {
			infoID: 2,
			// 각 행의 id
			category: [
				{ value: 'income', name: '급여' },
				{ value: 'income', name: '용돈' },
				{ value: 'income', name: '이자' },
				{ value: 'expense', name: '식사' },
				{ value: 'expense', name: '카페/식사' },
				{ value: 'expense', name: '의료/건상' },
				{ value: 'expense', name: '술/유흥' },
				{ value: 'expense', name: '의복/미용' },
				{ value: 'expense', name: '자동차' },
				{ value: 'expense', name: '교통' },
				{ value: 'expense', name: 'IT' },
				{ value: 'expense', name: '생활' },
				{ value: 'expense', name: '문화/여가' },
				{ value: 'expense', name: '여행/숙박' },
				{ value: 'expense', name: '공과금' },
			],
			payments: ['계좌', '카드', '현금'],

			beforeContentCache: '',
			beforeIncomeCache: '',
			beforeExpenseCache: '',
			addingIncome: false,
			addingExpense: false,
			adding: '',
			infos: [
				{
					id: 1,
					category: null,
					payment: null,
					content: '',
					income: null,
					expense: null,
					contentEditing: false,
					incomeEditing: false,
					expenseEditing: false,
				},
			],
		};
	},
	computed: {
		totalIncome: function() {
			let total = 0;
			for (let i = 0; i < this.infos.length; i++) {
				total += this.infos[i].income;
			}
			return this.addComaToNum(total);
		},
		totalExpense: function() {
			let total = 0;
			for (let i = 0; i < this.infos.length; i++) {
				total += this.infos[i].expense;
			}
			return this.addComaToNum(total);
		},
	},
	methods: {
		// 숫자에 , 붙이는 함수
		addComaToNum(num) {
			let str = num.toString().split('.');
			if (str[0].length >= 4) {
				str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
			}

			return str.join('.');
		},
		// 테이블 하단 + 클릭 시 테이블 생성
		addTable() {
			this.infos.push({
				id: this.infoID,
				category: null,
				payment: null,
				content: '',
				income: null,
				expense: null,
				contentEditing: false,
				incomeEditing: false,
				expenseEditing: false,
			});
			this.infoID++;
		},

		// 내용 더블클릭 시 수정
		edit(info, category) {
			if (category === 'content') {
				this.beforeContentCache = info.content;
				info.contentEditing = true;
			} else if (category === 'income') {
				this.beforeIncomeCache = info.income;
				info.incomeEditing = true;
			} else {
				this.beforeExpenseCache = info.expense;
				info.expenseEditing = true;
			}
		},

		// esc나 blur 시 수정 취소
		cancelEdit(info, category) {
			if (category === 'content') {
				info.content = this.beforeContentCache;
				info.contentEditing = false;
			} else if (category === 'income') {
				info.income = this.beforeIncomeCache;
				info.incomeEditing = false;
			} else {
				info.expense = this.beforeContentCache;
				info.expenseEditing = false;
			}
		},

		// if 빈 문자열 === 수정 안 됨
		doneEdit(info, category) {
			if (category === 'content') info.contentEditing = false;
			else if (category === 'income') info.incomeEditing = false;
			else info.expenseEditing = false;
		},
		// income 더블클릭 시 수정.
		// if 빈 숫자열 === 수정 안 됨

		doneAddIncome() {
			if (!this.adding.trim() == '') {
				this.category.push({
					value: 'income',
					name: this.adding,
				});
				this.adding = '';
			}
			this.addingIncome = false;
		},
		doneAddExpense() {
			if (!this.adding.trim() == '') {
				this.category.push({
					value: 'expense',
					name: this.adding,
				});
				this.adding = '';
			}
			this.addingExpense = false;
		},
		// 수입 카테고리 추가
		addIncomeCate() {
			this.addingIncome = true;
		},

		// 지출 카테고리 추가
		addExpenseCate() {
			this.addingExpense = true;
		},
	},
	directives: {
		focus: {
			inserted: function(el) {
				el.focus();
			},
		},
	},

	// if 빈 숫자열 === 수정 안 됨
};
</script>

<style scoped>
input:focus {
	padding: 0 0;
	margin: 0 0;
	width: 70%;
	outline: none;
	font-size: 1rem;
}
div {
	outline: none;
}
p {
	margin: 0;
}

/* container-box */
.container-box {
	display: flex;
	justify-content: center;
}

/* table-box */
.account-table-box {
	width: 100%;
}
.table-top {
	background-color: lightgray;
	border-bottom: 0;
}
table {
	width: 100%;
	/* border-collapse: collapse; */
	border-collapse: collapse;
}
tr {
	width: 100%;
}
td {
	border: 1px solid gray;
	margin: 0;
	padding: 0;
	border-collapse: collapse;
}
td:nth-child(1) {
	width: 15%;
}
td:nth-child(2) {
	width: 15%;
}
td:nth-child(3) {
	width: 40%;
}
td:nth-child(4) {
	width: 15%;
}
td:nth-child(5) {
	width: 15%;
}
#add-btn {
	width: 100%;
	border-top: 0;
	border-bottom: 0;
}
#add-btn:hover {
	cursor: pointer;
}
.multiselect__content-wrapper {
	max-height: 15rem !important;
	overflow: scroll;
	background: #fff;
	position: absolute;
	width: 12%;
	display: block;
	border: 1px solid gray;
	border-top: none;
	z-index: 3;
}
.multiselect,
.multiselect__content:hover {
	cursor: pointer;
}
.multiselect {
	width: 100%;
	padding: 0;
	border: 0;
	display: block;
}
ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
	margin-bottom: 1rem;
}
#totals {
	width: 70%;
	background-color: lightgray;
}
#income-num {
	color: blue;
}
#expense-num {
	color: red;
}
#total-income {
	width: 15%;
	color: blue;
}
#total-expense {
	width: 15%;
	color: red;
}

/* category-box */
.category-box {
	width: 20%;
	border: 2px rebeccapurple solid;
}
#cate-income-list {
	size: 1rem;
}
#cate-expense-list {
	size: 4rem;
}
.btn:hover {
	cursor: pointer;
}
</style>
