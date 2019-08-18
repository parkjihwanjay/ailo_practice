import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";

import List from "./components/List.vue";
import Basic from "./components/Basic.vue";
import Dday from "./components/Dday.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/list",
            name: "list",
            component: List
        },
        {
            path: "/basic",
            name: "basic",
            component: Basic
        },
        {
            path: "/Dday",
            name: "Dday",
            component: Dday
        }
    ]
});