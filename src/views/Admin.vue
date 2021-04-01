<template>
	<h1>Admin</h1>
</template>

<script>
export default {
	components: {},
	data() {
		isAdmin: this.$store.state.user.userType === "admin" ? true : false;
	},
};
</script>

<style></style>
