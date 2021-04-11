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

	mounted() {
		if (this.$store.state.user.username) {
			this.$router.push("/");
		}
	},
};
</script>

<style lang="scss" scoped></style>
