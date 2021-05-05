<template>
	<v-container>
		<HelloWorld style="margin-bottom: 20px;" />
		<v-card style="padding: 20px;">
			<div class="text-h3">
				<b>Manual Allotment</b>
			</div>
		</v-card>
		<v-divider style="margin:20px 0px 20px" />
		<v-card class="d-flex justify-center flex-wrap">
			<div
				class="text-h4"
				style="width: 100%; text-align: center; margin: 40px 0px 40px"
			>
				All hostel requests
			</div>
			<div>
				<span class="text-h5" style="font-weight: 300;"
					>Pending Requests</span
				>
				<RequestTable />
			</div>
			<div>
				<span class="text-h5" style="font-weight: 300;"
					>Rejected Requests</span
				>
				<RejectedTable />
			</div>
		</v-card>
	</v-container>
</template>

<script>
import RequestTable from "@/components/RequestTable.vue";
import RejectedTable from "@/components/RejectedTable.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	components: { RequestTable, RejectedTable, HelloWorld },
	data() {
		return {};
	},

	beforeRouteEnter(to, from, next) {
		const user = JSON.parse(localStorage.getItem("user"));
		if ((user ? user.utype !== "admin" : true) && to.name === "Admin") {
			next("/login");
		} else {
			next();
		}
	},
};
</script>

<style></style>
