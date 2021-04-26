<template>
	<!-- if user is student -->
	<div v-if="userType === 'student'">
		<div v-if="!$store.state.user.hasRequestedAllotment">
			To request hostel allotment click
			<router-link to="student" exact>here!</router-link>
		</div>
		<div v-else-if="$store.state.user.hasRequestedAllotment">
			Hostel request pending.
		</div>
	</div>

	<!-- if user is admin -->
	<div v-else-if="userType === 'admin'">
		<v-btn style="margin: 0px 10px" outlined @click="$router.push('/admin')"
			>Manual Hostel Allotment</v-btn
		>

		<v-btn outlined @click="$router.push('/admin-auto')"
			>Auto Hostel Allotment</v-btn
		>
	</div>

	<!-- if not logged in -->
	<div v-else>Welcome to DTU hostel portal, please login to continue!</div>
</template>

<script>
import axios from "axios";
export default {
	name: "HelloWorld",
	data() {
		return {
			hostelStatus: null,
			userType: this.$store.state.user.userType,
		};
	},

	watch: {
		"$store.state.user": function() {
			this.userType = this.$store.state.user.userType;
		},
	},

	beforeMount() {
		const user = JSON.parse(localStorage.getItem("user"));
		axios
			.get("http://localhost:8081/server/hostel-status", {
				params: { username: user ? user.uname : null },
			})
			.then((res) => (this.hostelStatus = res.data));
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

a:hover {
	background-color: #42b983;
	color: white;
}
</style>
