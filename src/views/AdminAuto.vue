<template>
	<v-container style="width:100%">
		<HelloWorld style="margin-bottom: 20px;" />
		<v-card style="padding: 20px;">
			<div class="text-h3">
				<b>Auto Allotment</b>
			</div>
		</v-card>
		<v-divider style="margin:20px 0px 20px" />
		<v-card
			class="d-flex justify-center table-container"
			style="width:100%"
		>
			<StudentSelectTable />
		</v-card>
	</v-container>
</template>

<script>
import StudentSelectTable from "@/components/StudentSelectTable";
import HelloWorld from "@/components/HelloWorld";
export default {
	components: { StudentSelectTable, HelloWorld },
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
	width: 80%;
	padding: 20px;
}
</style>
