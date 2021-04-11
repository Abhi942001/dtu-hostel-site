<template>
	<v-card class="width-adj margin-adj" depressed outlined>
		<v-data-table
			:search="search"
			:headers="headers"
			:items="students"
			:items-per-page="5"
			:loading="isTableLoading"
		>
			<template slot="item.actions" slot-scope="">
				<v-btn color="success" width="60%" small depressed outlined
					>Allot</v-btn
				>
				<v-btn color="red" width="60%" small depressed outlined
					>Reject</v-btn
				>
			</template>
		</v-data-table>
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
	name: "RequestTable",
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
				{
					text: "Actions",
					align: "center",
					value: "actions",
					sortable: false,
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
				if (element.req_rejected === 0 && element.is_alloted === 0) {
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
