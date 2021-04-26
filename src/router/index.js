import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Student from "../views/Student.vue";
import Admin from "../views/Admin.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/student",
		name: "Student",
		component: Student,
	},
	{
		path: "/admin",
		name: "Admin",
		component: Admin,
	},
	{
		path: "/admin-auto",
		name: "AdminAuto",
		component: () => import("../views/AdminAuto"),
	},
];

const router = new VueRouter({
	routes,
	mode: "history",
});

export default router;
