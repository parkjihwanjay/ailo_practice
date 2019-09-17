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
export default {
	components: {
		Planner,
		Basic,
		Dday,
		Calendar,
		PlannerClick,
	},
};
</script>
