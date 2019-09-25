import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';

import Planner from './components/Planner.vue';
import Basic from './components/Basic.vue';
import Dday from './components/Dday.vue';
import Calendar from './components/Calendar.vue';
import PlannerClick from './components/PlannerClick.vue';

import PlannerClickCopy from './components/PlannerClickCopy.vue';

import AccountBook_1 from './경연/AccountBook-1.vue';
import AccountBook from './경연/AccountBook.vue';
import Habit from './경연/Habit.vue';
import Habit_1 from './경연/Habit-1.vue';
import PhotoAlbum from './경연/PhotoAlbum.vue';
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
			path: '/PlannerClickCopy',
			name: 'PlannerClickCopy',
			component: PlannerClickCopy,
		},
		{
			path: '/AccountBook-1',
			name: 'AccountBook-1',
			component: AccountBook_1,
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
			path: '/Habit-1',
			name: 'Habit-1',
			component: Habit_1,
		},
		{
			path: '/PhotoAlbum',
			name: 'PhotoAlbum',
			component: PhotoAlbum,
		},
		{
			path: '/TodoList',
			name: 'TodoList',
			component: TodoList,
		},
	],
});
