// import axios from "axios";
// import platform from "platform";
import apis from "../apis";

const state = {
	authStatus: false,
};

const mutations = {
	changeAuthStatus: (state, payload) => (state.authStatus = payload),
};

const actions = {
	login: ({ commit }, payload) => {
		const { email, password } = payload;
		// console.log("login", email, password);
		commit("changeAuthStatus", true);
	},

	logout: ({ commit }) => {
		commit("changeAuthStatus", false);
	},
};

const getters = {};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
