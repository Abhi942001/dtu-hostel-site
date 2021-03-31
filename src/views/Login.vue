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
};
</script>

<style lang="scss" scoped></style>
