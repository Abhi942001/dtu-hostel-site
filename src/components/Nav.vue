<template>
	<div id="nav">
		<router-link to="/" exact>Home</router-link> |
		<router-link to="/login" exact>Login</router-link>
	</div>
</template>

<script>
export default {
	name: "Nav",
	data() {
		return {
			uname: String,
		};
	},
	watch: {
		uname() {
			this.uname === this.$store.getters.getUser;
		},
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
