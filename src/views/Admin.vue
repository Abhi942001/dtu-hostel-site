<template>
	<v-app>
		<h1>Admin Panel</h1>
		<v-card>
			<span>All hostel requests</span>
		</v-card>
	</v-app>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			isAdmin: this.$store.state.user.userType === "admin" ? true : false,
		};
	},

	watch: {
		"$store.state.user": function() {
			this.isAdmin =
				this.$store.state.user.userType === "admin" ? true : false;

			if (!this.isAdmin) {
				this.$router.push("/");
			}
		},
	},
};
</script>

<style></style>
