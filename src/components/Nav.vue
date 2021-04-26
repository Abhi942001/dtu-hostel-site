<template>
	<div id="nav">
		<router-link to="/" exact>Home</router-link> |

		<!-- login link conditonal -->
		<router-link v-if="!isLoggedIn" to="/login" exact>Login</router-link>
		<span v-else>
			<a href="#" label="Logout" @click="logout()">Logout</a>
			<span style="color: darkturquoise">
				{{ $store.state.user.username | capitalize }}</span
			>
		</span>
	</div>
</template>

<script>
// import { userBus } from "@/main.js";

export default {
	name: "Nav",
	data() {
		return {
			uname: this.$store.state.user.username,
			isLoggedIn: false,
		};
	},
	methods: {
		logout() {
			this.$store.commit("logout");
			this.isLoggedIn = false;
			alert("Logged out!");
			this.$router.push("/login");
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
	filters: {
		capitalize: function(value) {
			if (!value) return "";

			return value.charAt(0).toUpperCase() + value.slice(1);
		},
	},

	created() {
		this.uname ? (this.isLoggedIn = true) : (this.isLoggedIn = false);
	},
};
</script>

<style lang="scss">
#nav {
	padding: 20px 30px 10px 30px;

	& a {
		display: inline block;
		text-decoration: none;
		border-radius: 2px;
		font-weight: bold;
		color: darkturquoise;
		padding: 3px;

		transition: border cubic-bezier(0.39, 0.39, 0.32, 1.37) 300ms;
	}

	& a.router-link-exact-active {
		border-bottom: solid 4px;
	}

	& a:hover {
		border-bottom: solid 4px;
	}
}
.navbarLogo {
	height: 100%;
	width: 100%;
}
</style>
