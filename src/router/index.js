import { createWebHistory, createRouter }	from "vue-router";
import Login								from "@/views/User/Login.vue";
import Register								from "@/views/User/Register.vue";
import Loans								from "@/views/Game/Loans.vue";
import Ships								from "@/views/Game/Ships.vue";
import Ship									from "@/views/Game/Ships/Ship.vue";

const routes	= [
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
	{
		path: "/ships",
		name: "Ships",
		component: Ships
	},
	{
		path: "/ship/:id",
		name: "Ship",
		component: Ship,
		props: true
	}
];

const router	= createRouter({
	history: createWebHistory(),
	routes,
});

export default router;