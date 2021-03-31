<template>
	<div class="allotment-form ">
		<HostelAllotmentForm />
	</div>
</template>

<script>
import HostelAllotmentForm from "@/components/HostelAllotmentForm";

export default {
	components: { HostelAllotmentForm },
	name: "Student",

	created() {
		const username = this.$store.state.user.username;
		const alreadyRequested = this.$store.state.user.hasRequestedAllotment;

		if (username === null) {
			this.$router.push("login");
		} else if (alreadyRequested) {
			alert("Already Requested!");
			this.$router.push("login");
		}
	},
};
</script>

<style lang="scss" scoped>
.allotment-form {
	display: flex;
	width: 100%;
	justify-content: center;
}
</style>
