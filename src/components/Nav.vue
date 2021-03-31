<template>
	<div id="nav">
		<router-link to="/" exact>Home</router-link> |

		<!-- login link conditonal -->
		<router-link v-if="!isLoggedIn" to="/login" exact>Login</router-link>
		<a href="#" v-else label="Logout" color="success" @click="logout()"
			>Logout {{ $store.state.user.username }}</a
		>
	</div>
</template>

<script>
// import { userBus } from "@/main.js";

export default {
	name: "Nav",
	data() {
		return {
			uname: "null",
			isLoggedIn: false,
		};
	},
	methods: {
		logout() {
			this.$store.commit("logout");
			this.isLoggedIn = false;
			alert("Logged out!");
			this.$router.push("login");
			// userBus.$emit("userLogout");
		},
	},
	watch: {
		"$store.state.user": function() {
			const uname = this.$store.state.user.username;

			if (!uname) {
				this.isLoggedIn = false;
			} else {
				this.isLoggedIn = true;
				this.uname = uname;
			}
		},
	},

	created() {
		// userBus.$on("userLogin", (newUser) => {
		// 	this.uname = newUser;
		// 	this.isLoggedIn = true;
		// });
	},
};
</script>

<style lang="scss">
#nav {
	padding: 30px;

	& a {
		display: inline block;
		text-decoration: none;
		border-radius: 2px;
		font-weight: bold;
		color: #2c3e50;

		padding: 3px;
	}

	& a.router-link-exact-active {
		background-color: #42b983;
		color: white;
	}
}
</style>
