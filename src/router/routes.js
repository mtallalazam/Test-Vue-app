import Login from "../views/Login.vue";
import Tasks from "../views/Tasks.vue";
import Location from "../views/Location.vue";
import NotFound from "../views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
	{ path: "/", component: Login, meta: { title: "Login" } },
	{
		path: "/tasks",
		meta: { title: "Tasks" },
		component: Tasks,
		// example of route level code-splitting
		// this generates a separate chunk (About.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import('./views/About.vue')
	},
	{
		path: "/location",
		meta: { title: "Location" },
		component: Location,
	},
	{ path: "/:path(.*)", component: NotFound },
];
