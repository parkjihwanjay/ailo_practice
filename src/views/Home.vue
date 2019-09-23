<template>
	<div>
		<ul>
			<li>
				<router-link to="Planner">Planner</router-link>
			</li>
			<li>
				<router-link to="Basic">Basic</router-link>
			</li>
			<li>
				<router-link to="Dday">Dday</router-link>
			</li>
			<li>
				<router-link to="Calendar">Calendar</router-link>
			</li>
			<li>
				<router-link to="PlannerClick">PlannerClick</router-link>
			</li>
			<li>
				<router-link to="AccountBook-1">AccountBook-1</router-link>
			</li>
			<li>
				<router-link to="Habit">Habit</router-link>
			</li>
			<li>
				<router-link to="PhotoAlbum">PhotoAlbum</router-link>
			</li>
			<li>
				<router-link to="TodoList">TodoList</router-link>
			</li>
		</ul>

		<router-view></router-view>
	</div>
</template>

<script>
import Planner from '../components/Planner';
import Basic from '../components/Basic';
import Dday from '../components/Dday';
import Calendar from '../components/Calendar';
import PlannerClick from '../components/PlannerClick';

import AccountBook from '../경연/AccountBook-1.vue';
import Habit from '../경연/Habit.vue';
import PhotoAlbum from '../경연/PhotoAlbum.vue';
import TodoList from '../경연/TodoList.vue';

export default {
	components: {
		// Planner,
		// Basic,
		// Dday,
		// Calendar,
		// PlannerClick,
		// AccountBook,
		// Habit,
		// PhotoAlbum,
		// TodoList,
	},
};
</script>
