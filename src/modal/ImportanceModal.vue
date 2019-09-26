<template>
	<div>
		<h4>중요도 설정</h4>
		<input type="radio" value="★" v-model="todo.importance" />
		<label>★</label>
		<input type="radio" value="★★" v-model="todo.importance" />
		<label>★★</label>
		<br />
		<button @click.prevent="applyImportance">적용</button>
		<button @click.prevent="cancelImportance">
			취소
		</button>
	</div>
</template>

<script>
export default {
	name: 'TodoModal',
	props: ['todo'],
	data() {
		return {
			lastStars: '',
		};
	},
	mounted() {
		this.lastStars = this.todo.importance;
	},
	methods: {
		applyImportance() {
			this.$emit('close');
		},
		cancelImportance() {
			this.todo.importance = this.lastStars;
			this.$emit('close');
		},
	},
};
</script>
