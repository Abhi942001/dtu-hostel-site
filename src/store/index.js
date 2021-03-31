import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			username: "none",
			userType: "unknown",
		},
	},
	getters: {
		getUser(state) {
			return state.user.username;
		},
	},
	mutations: {
		login(state, user, utype) {
			state.user.username = user;
			state.user.userType = utype;
		},
	},
	actions: {
		async loginUser(state, { uname, utype, upass }) {
			await checkAuth(uname, upass, utype)
				.then((res) => state.commit("login", res, utype))
				.catch((err) => {
					throw alert(err);
				});
		},
	},
	modules: {},
});

//Dummy login backend
async function checkAuth(_uname, _password, utype) {
	const userAuth = new Promise((resolve, reject) => {
		console.log(utype);
		setTimeout(() => {
			if (_uname === "xyz" && _password === "xyz") {
				resolve(_uname);
			} else {
				reject("Invalid Username!");
			}
		}, 1000);
	});
	return userAuth;
}
