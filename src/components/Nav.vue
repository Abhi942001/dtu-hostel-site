<template>
	<div id="nav">
		<router-link to="/" exact>
			<v-btn color="primary" :outlined="onHome" text
				>Home</v-btn
			></router-link
		>

		|
		<!-- login link conditonal -->
		<router-link v-if="!isLoggedIn" to="/login" exact>
			<v-btn color="primary" :outlined="onLogin" text
				>Login</v-btn
			></router-link
		>
		<span v-else-if="isLoggedIn">
			<v-btn color="primary" @click="logout()" text
				>Logout
				<span style="color: darkturquoise; margin-left: 5px">
					{{ $store.state.user.username }}</span
				></v-btn
			>
		</span>
	</div>
</template>

<script>
export default {
	name: "Nav",
	data() {
		return {
			uname: this.$store.state.user.username,
			isLoggedIn: false,
			onHome: false,
			onLogin: false,
		};
	},
	methods: {
		logout() {
			this.$store.commit("logout");
			this.isLoggedIn = false;
			alert("Logged out!");
			this.$router.push("/login");
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

		$route: {
			handler: function() {
				if (this.$router.currentRoute.path === "/") {
					this.onHome = true;
					this.onLogin = false;
				} else if (this.$router.currentRoute.path === "/login") {
					this.onHome = false;
					this.onLogin = true;
				} else {
					this.onHome = false;
					this.onLogin = false;
				}
			},
			immediate: true,
			deep: true,
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

	// & a.router-link-exact-active {
	// 	// border-bottom: solid 4px;
	// 	color: cadetblue;
	// }

	// & a:hover {
	// 	// border-bottom: solid 4px;
	// }
}
.navbarLogo {
	height: 100%;
	width: 100%;
}
</style>
