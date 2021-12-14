// import axios from "axios";
// import platform from "platform";
import apis from "../apis";

const state = {
	authStatus: false,
	authToken: null,
};

const mutations = {
	changeAuthToken: (state, payload) => (state.authToken = payload),
	changeAuthStatus: (state, payload) => (state.authStatus = payload),
};

const actions = {
	login: ({ commit }, payload) => {
		const { email, password } = payload;
		window.sessionStorage.setItem("auth_token", "Zl49StyUu9721TFoRHfDqGmEVikCKNhJayGUgDvK");
		commit("changeAuthToken", "Zl49StyUu9721TFoRHfDqGmEVikCKNhJayGUgDvK");
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
