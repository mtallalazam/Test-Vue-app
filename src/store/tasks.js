const tasks = [
	{
		id: 1,
		title: "Task One",
		description: "Task Description",
		status: "Incomplete",
		due_at: "2021-03-23 23:30:00",
	},
	{
		id: 2,
		title: "Task Two",
		description: "Task Description",
		status: "Incomplete",
		due_at: "2021-03-23 23:30:00",
	},
	{
		id: 3,
		title: "Task Three",
		description: "Task Description",
		status: "Complete",
		due_at: "2021-03-23 23:30:00",
	},
	{
		id: 4,
		title: "Task Four",
		description: "Task Description",
		status: "Complete",
		due_at: "2021-03-23 23:30:00",
	},
	{
		id: 5,
		title: "Task Five",
		description: "Task Description",
		status: "Complete",
		due_at: "2021-03-23 23:30:00",
	},
];

const state = {
	tasks: tasks,
};

const mutations = {
	addNewTask: (state, payload) => {
		const newList = state.tasks;
		newList.push(payload);
		console.log(newList);
		state.tasks = newList;
	},
	updateTask: (state, payload) => {
		let updatedList = state.tasks;
		const index = updatedList.findIndex((item) => item.id === payload.id);
		updatedList[index] = payload.task;
		state.tasks = updatedList;
	},
	deleteTask: (state, payload) => {
		const filteredList = state.tasks.filter((item) => item.id !== payload);
		state.tasks = filteredList;
	},
};

const actions = {
	createTask: ({ commit }, payload) => {
		commit("addNewTask", payload);
	},

	updateTask: ({ commit }, payload) => {
		commit("updateTask", payload);
	},

	deleteTask: ({ commit }, payload) => {
		commit("deleteTask", payload);
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
