<template>
	<div id="app">
		<v-app>
			<Nav />

			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
		</v-app>
	</div>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
	components: { Nav },
	beforeCreate() {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			this.$store.commit("login", user);
		}
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap");

#app {
	font-family: "Open Sans", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

html {
	background-color: #121212;
}

.fade-enter-active {
	transition: all 300ms;
}
.fade-enter {
	opacity: 0;
}

/* width */
::-webkit-scrollbar {
	width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
	opacity: 0;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #333;
	border-radius: 100px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: var(--v-secondary-base);
}
</style>
