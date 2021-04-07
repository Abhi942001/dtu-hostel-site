<template>
	<v-card class="width-adj margin-adj" depressed outlined>
		<v-data-table
			:search="search"
			:headers="headers"
			:items="students"
			:items-per-page="5"
			:loading="isTableLoading"
			class="elevation-1"
		></v-data-table>
		<v-btn
			class="margin-adj"
			@click="fetchRequestActions"
			:loading="isButtonLoading"
			depressed
			outlined
		>
			Refresh Data
		</v-btn>
	</v-card>
</template>

<script>
export default {
	name: "RejectedTable",
	data() {
		return {
			search: "",
			headers: [
				{
					text: "Name",
					value: "name",
				},
				{
					text: "City",
					value: "city",
				},
				{
					text: "Year:",
				},
				{
					text: "Back in Prev year?",
					value: "back",
					filter: (value) => {
						return value === "No" ? true : false;
					},
				},
			],
			students: [],
			isButtonLoading: false,
			isTableLoading: false,
		};
	},
	methods: {
		fetchRequestActions: async function() {
			this.isButtonLoading = true;
			await this.$store
				.dispatch("getStudents")
				.catch((e) => {
					alert(e);
				})
				.finally(() => {
					this.isButtonLoading = false;
				});
		},
	},
	mounted: async function() {
		this.isTableLoading = true;
		await this.fetchRequestActions();
		this.isTableLoading = false;
	},
	watch: {
		"$store.state.admin": function() {
			const adminData = this.$store.state.admin.data;
			const validData = [];
			adminData.forEach((element) => {
				if (element.req_rejected === 1) {
					validData.push(element);
				}
			});
			this.students = validData;
		},
	},
};
</script>

<style scoped>
.width-adj {
	width: 500px;
}
.margin-adj {
	margin: 10px;
}
</style>
