<template>
	<div v-if="username !== 'none'">Hello {{ username }}!</div>
	<div v-else>Welcome to DTU hostel portal, please login to continue!</div>
</template>

<script>
export default {
	name: "HelloWorld",
	data() {
		return {
			username: "",
		};
	},

	created() {
		this.username = this.$store.getters.getUser;
	},
};
</script>
