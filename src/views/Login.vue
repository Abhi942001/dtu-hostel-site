<template>
	<v-app>
		<login-card />
	</v-app>
</template>

<script>
import loginCard from "@/components/loginCard.vue";

export default {
	components: { loginCard },
	name: "login",

	beforeRouteEnter(to, from, next) {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			next("/");
		} else {
			next();
		}
	},
};
</script>

<style lang="scss" scoped></style>
