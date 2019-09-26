<template>
	<div class="todo-container">
		<h1>할일</h1>
		<table class="table-box">
			<tr>
				<th>중요도</th>
				<th>진행률</th>
				<th>과제내용</th>
			</tr>
			<tr v-for="(todo, index) in todos" :key="index">
				<td class="item-importance">
					<a @click.prevent="showImportance(todo)">{{ todo.importance }}</a>
				</td>
				<!-- ImportanceModal.vue -->
				<modals-container name="Importance"></modals-container>
				<!--  -->
				<td class="item-progress">
					<input type="radio" value="O" v-model="todo.completed" />
					<label>{{ completedChoice.high }}</label>
					<input type="radio" value="▵" v-model="todo.completed" />
					<label>{{ completedChoice.middle }}</label>
					<input type="radio" value="✕" v-model="todo.completed" />
					<label>{{ completedChoice.low }}</label>
				</td>

				<td class="item-content" v-if="!todo.editing" v-on:dblclick="editTodo(todo)">
					{{ todo.title }}
				</td>

				<input
					class="todo-item-edit"
					v-else
					type="text"
					v-model="todo.title"
					v-on:blur="doneEdit(todo)"
					v-on:keyup.enter="doneEdit(todo)"
					v-on:keyup.esc="cancelEdit(todo)"
					v-focus
				/>
				{{
					todo.dueDate
				}}
				{{
					todo.dueTime
				}}
				<td class="item-time" id="btns">
					<a @click.prevent="showDue(todo)">시간</a>
					<!-- DueDateModal.vue -->
					<modals-container name="DueDate"></modals-container>
					<!--  -->
				</td>
				<td class="item-delete" id="btns" v-on:click="removeTodo(index)">삭제</td>
			</tr>
			<tr class="add-btn-tr">
				<div id="btns" v-on:click="addTodo()">추가하기</div>
			</tr>
		</table>

		<!-- <div>달성률: {{rate()}}%</div> -->
	</div>
</template>

<script>
import ImportanceModal from '../modal/ImportanceModal.vue';
import DueDateModal from '../modal/DueDateModal';
export default {
	name: 'todo-list',
	data: function() {
		return {
			TodoModalIndex: 0,
			DueModalIndex: 0,
			newTodo: '',
			todoID: 3,
			importanceChoice: { one: '★', two: '★★' },
			completedChoice: { low: '✕', middle: '▵', high: 'O' },
			// rate: function() {
			//   let count = 0;
			//   this.todos.forEach(function(i) {
			//     if (i.completed === "O") {
			//       count++;
			//     }
			//   });
			//   return Math.round((count / this.todos.length) * 100);
			// }, 하면 computed로
			beforeEditCache: '',
			beforeEditCacheImportance: '',
			beforeEditCacheDate: '',
			beforeEditCacheTime: '',

			todos: [
				{
					id: 1,
					title: '밥먹기',
					completed: '',
					importance: '★',
					editing: false,
					dueDate: '',
					dueTime: '',
					delayDate: '',
				},
				{
					id: 2,
					title: '산책하기',
					completed: '',
					importance: '★',
					editing: false,
					dueDate: '',
					dueTime: '',
					delayDate: '',
				},
			],
		};
	},
	methods: {
		/* importance modal */

		showImportance(todo) {
			this.$modal.show(ImportanceModal, { todo: todo });
		},

		/* due modal */
		showDue(todo) {
			this.$modal.show(DueDateModal, { todo: todo });
		},

		addTodo() {
			this.todos.push({
				id: this.todoID,
				title: this.newTodo,
				completed: '',
				importance: '★',
				editing: false,
				dueDate: '',
				dueTime: '',
				delayDate: '',
			});

			this.todoID++;
			this.newTodo = '';
		},
		// todo 삭제
		removeTodo(index) {
			this.todos.splice(index, 1);
		},
		// todo 수정
		editTodo: function(todo) {
			this.beforeEditCache = todo.title;
			todo.editing = true;
		},
		// todo 수정완료
		doneEdit: function(todo) {
			if (todo.title.trim() == '') {
				todo.title = this.beforeEditCache;
			}
			todo.editing = false;
		},
		// todo 수정취소
		cancelEdit: function(todo) {
			todo.title = this.beforeEditCache;
			todo.editing = false;
		},
	},
	directives: {
		focus: {
			inserted: function(el) {
				el.focus();
			},
		},
	},
};
</script>

<style scoped>
a {
	text-decoration: none;
	color: black;
}
.table-box {
	border: 1px solid gray;
	border-collapse: collapse;
	width: 100%;
}
/*  */
.table-box-main {
	border: 1px solid gray;
	border-collapse: collapse;
}
.top-importance {
	width: 10% !important;
}
.top-progress {
	width: 15% !important;
}
.top-content {
	width: 80% !important;
}
/*  */
.item-importance,
.item-time,
.item-delete {
	width: 10% !important;
}
.item-progress {
	width: 15% !important;
}
.item-content {
	width: 55% !important;
}

.add-btn-tr {
	width: 100%;
}
.table-box-item {
	border: 1px solid gray;
	border-collapse: collapse;
}
/*  */
#btns {
	cursor: pointer;
}
.todo-item-edit {
	margin-left: 1rem;
	padding: 0.8rem;
	border: 1px #ccc solid;
}
</style>
