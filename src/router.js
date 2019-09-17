import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';

import Planner from './components/Planner.vue';
import Basic from './components/Basic.vue';
import Dday from './components/Dday.vue';
import Calendar from './components/Calendar.vue';
import PlannerClick from './components/PlannerClick.vue';
Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/Planner',
			name: 'Planner',
			component: Planner,
		},
		{
			path: '/basic',
			name: 'Basic',
			component: Basic,
		},
		{
			path: '/Dday',
			name: 'Dday',
			component: Dday,
		},
		{
			path: '/calendar',
			name: 'Calendar',
			component: Calendar,
		},
		{
			path: '/PlannerClick',
			name: 'PlannerClick',
			component: PlannerClick,
		},
	],
});
