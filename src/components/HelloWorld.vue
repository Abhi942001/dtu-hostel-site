<template>
	<div v-if="username !== null">
		<div v-if="!$store.state.user.hasRequestedAllotment">
			To request hostel allotment click
			<router-link to="student" exact>here!</router-link>
		</div>
		<div v-else-if="$store.state.user.hasRequestedAllotment">
			You've requested hostel!
		</div>
	</div>
	<div v-else>Welcome to DTU hostel portal, please login to continue!</div>
</template>

<script>
import { userBus } from "@/main.js";

export default {
	name: "HelloWorld",
	data() {
		return {
			username: "",
		};
	},

	created() {
		this.username = this.$store.getters.getUser;

		userBus.$on("userLogout", () => {
			this.username = "none";
		});
	},
};
</script>

<style scoped>
a {
	display: inline block;
	text-decoration: none;
	border-radius: 2px;
	font-weight: bold;
	color: #2c3e50;

	padding: 3px;
}

a {
	background-color: #42b983;
	color: white;
}
</style>
