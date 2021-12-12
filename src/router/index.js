import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";

import store from "../store";

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	// console.log(to.path, store.state.auth.authStatus);
	if (to.path !== "/" && !store.state.auth.authStatus) {
		// console.log("next");
		next("/");
	}
	next();
});

export default router;
