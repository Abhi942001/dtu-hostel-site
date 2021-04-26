<template>
	<v-app>
		<v-container
			class="d-flex justify-center table-container"
			style="width:100%"
		>
			<v-card class="d-flex justify-center table-container" outlined>
				<StudentSelectTable />
			</v-card>
		</v-container>
	</v-app>
</template>

<script>
import StudentSelectTable from "../components/StudentSelectTable";
export default {
	components: { StudentSelectTable },
	name: "AdminAuto",
	data: () => ({}),

	beforeRouteEnter(to, from, next) {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user ? user.utype !== "admin" : true) {
			next("/login");
		} else {
			next();
		}
	},
};
</script>

<style>
.table-container {
	width: 50%;
	padding: 20px;
}
</style>
