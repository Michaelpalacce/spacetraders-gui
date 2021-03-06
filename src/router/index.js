import { createWebHistory, createRouter }	from "vue-router";
import Login								from "@/views/User/Login.vue";
import Register								from "@/views/User/Register.vue";
import Loans								from "@/views/Game/Loans.vue";

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login
	},
	{
		path: "/register",
		name: "Register",
		component: Register
	},
	{
		path: "/loans",
		name: "Loans",
		component: Loans
	},
];

const router	= createRouter({
	history: createWebHistory(),
	routes,
});

export default router;