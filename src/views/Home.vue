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
				<router-link to="AccountBook">AccountBook</router-link>
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
export default {};
</script>
