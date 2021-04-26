<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
		<HelloWorld style="margin: 10px 0px" />
		<DashBoard />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import DashBoard from "@/components/DashBoard.vue";

export default {
	name: "Home",
	components: {
		HelloWorld,
		DashBoard,
	},
};
</script>
