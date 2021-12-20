import axios from "axios";
import dayjs from "dayjs";
import apis from "../apis";
import { createToast } from "mosha-vue-toastify";

const state = {
	tasks: [],
};

const mutations = {
	saveTasksList: (state, payload) => {
		state.tasks = payload;
	},
	addNewTask: (state, payload) => {
		const newList = state.tasks;
		newList.push(payload);
		state.tasks = newList;
	},
	updateTask: (state, payload) => {
		let updatedList = state.tasks;
		const index = updatedList.findIndex((item) => item.id === payload.id);
		updatedList[index] = payload.task;
		state.tasks = updatedList;
	},
	deleteTask: (state, id) => {
		const filteredList = state.tasks.filter((item) => item.id !== id);
		state.tasks = filteredList;
	},
};

const actions = {
	getTasks: async ({ rootState, commit }) => {
		const resp = await axios.get(apis.tasks, { headers: { Authorization: `Bearer ${rootState.auth.authToken}` } });
		commit("saveTasksList", resp.data.tasks);
	},

	createTask: async ({ rootState, commit }, payload) => {
		const apiPayload = payload;
		delete apiPayload.id;

		await axios
			.post(apis.tasks, apiPayload, { headers: { Authorization: `Bearer ${rootState.auth.authToken}` } })
			.then((resp) => {
				// console.log("resp ", resp);

				commit("addNewTask", payload);

				createToast(`${resp.data.message}`, {
					position: "top-right",
					type: "success",
					hideProgressBar: "true",
				});
			})
			.catch((error) => {
				// console.log(error.response);
				let errorMsg = error.response.data.message ? error.response.data.message : "An error occured.";
				createToast(`Error : ${errorMsg}`, {
					position: "top-right",
					type: "danger",
					hideProgressBar: "true",
				});
			});
	},

	updateTask: async ({ rootState, commit }, payload) => {
		await axios
			.put(`${apis.tasks}/${payload.id}`, payload, {
				headers: { Authorization: `Bearer ${rootState.auth.authToken}` },
			})
			.then((resp) => {
				commit("updateTask", payload);
				createToast(`${resp.data.message}`, {
					position: "top-right",
					type: "success",
					hideProgressBar: "true",
				});
			})
			.catch((error) => {
				console.log(error, error.response);
				let errorMsg = error.response.data.message ? error.response.data.message : "An error occured.";
				createToast(`Error : ${errorMsg}`, {
					position: "top-right",
					type: "danger",
					hideProgressBar: "true",
				});
			});
	},

	deleteTask: async ({ commit, rootState }, id) => {
		await axios
			.delete(`${apis.tasks}/${id}`, {
				headers: { Authorization: `Bearer ${rootState.auth.authToken}` },
			})
			.then((resp) => {
				commit("deleteTask", id);
				createToast(`${resp.data.message}`, {
					position: "top-right",
					type: "success",
					hideProgressBar: "true",
				});
			})
			.catch((error) => {
				console.log(error, error.response);
				let errorMsg = error.response.data.message ? error.response.data.message : "An error occured.";
				createToast(`Error : ${errorMsg}`, {
					position: "top-right",
					type: "danger",
					hideProgressBar: "true",
				});
			});
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
