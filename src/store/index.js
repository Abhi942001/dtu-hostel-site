import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const serverPort = 8081;

export default new Vuex.Store({
	state: {
		user: {
			username: "",
			userType: "",
			hasRequestedAllotment: false,
		},
	},
	getters: {
		getUser(state) {
			return state.user.username;
		},
	},
	mutations: {
		login(state, user) {
			const { uname, utype, hasRequestedAllotment } = user;

			state.user = {
				username: uname,
				userType: utype,
				hasRequestedAllotment: hasRequestedAllotment,
			};

			localStorage.setItem("user", JSON.stringify(user));
		},
		logout(state) {
			state.user = {
				username: null,
				userType: null,
			};
			localStorage.removeItem("user");
		},

		allotmentRequested(state) {
			const tempState = state;
			tempState.user.hasRequestedAllotment = true;
			state = tempState;
		},
	},
	actions: {
		async loginUser(state, payload) {
			await axios
				.post(`http://localhost:${serverPort}/server/login`, {
					data: payload,
				})
				.then((res) => {
					const result = res.data;

					if (!result) {
						throw new Error("Invalid Username");
					} else {
						state.commit("login", {
							uname: result.uname,
							utype: payload.utype,
							hasRequestedAllotment:
								result.hostelStatus === null ? false : true,
						});
					}
				});
		},

		async submitAllotmentForm(state, formData) {
			await axios
				.post(`http://localhost:${serverPort}/server/form/submit`, {
					data: {
						user: state.state.user.username,
						formData: formData,
					},
				})
				.then(() => {
					state.commit("allotmentRequested");
				});
		},
	},
	modules: {},
});
