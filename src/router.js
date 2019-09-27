import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';

import Planner from './components/Planner.vue';
import Basic from './components/Basic.vue';
import Dday from './components/Dday.vue';
import Calendar from './components/Calendar.vue';
import PlannerClick from './components/PlannerClick.vue';

import AccountBook from './경연/AccountBook.vue';
import Habit from './경연/Habit.vue';
import PhotoAlbum from './경연/PhotoAlbum.vue';
import PhotoAlbum_1 from './경연/PhotoAlbum-1.vue';
import TodoList from './경연/TodoList.vue';

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
		{
			path: '/AccountBook',
			name: 'AccountBook',
			component: AccountBook,
		},
		{
			path: '/Habit',
			name: 'Habit',
			component: Habit,
		},
		{
			path: '/PhotoAlbum',
			name: 'PhotoAlbum',
			component: PhotoAlbum,
		},
		{
			path: '/PhotoAlbum-1',
			name: 'PhotoAlbum-1',
			component: PhotoAlbum_1,
		},
		{
			path: '/TodoList',
			name: 'TodoList',
			component: TodoList,
		},
	],
});
