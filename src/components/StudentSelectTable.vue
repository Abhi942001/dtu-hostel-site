<template>
	<div class="table">
		<v-data-table
			v-model="selectedStudents"
			:headers="headers"
			:items="students"
			:single-select="singleSelect"
			item-key="name"
			show-select
			:loading="isTableLoading"
		>
			<template v-slot:top>
				<v-switch
					color="cyan lighten-2"
					v-model="singleSelect"
					label="Single select"
					class="pa-3"
				></v-switch>
			</template>
			<template slot="item.actions" slot-scope="data">
				<v-btn
					color="cyan lighten-2"
					small
					text
					@click.stop="openDialogue(data.item)"
				>
					View
				</v-btn>
			</template>
		</v-data-table>

		<v-btn
			style="margin: 20px 0px 0px 0px"
			outlined
			@click="autoAllot()"
			:loading="isButtonLoading"
			>Allot</v-btn
		>

		<AutoAllotDialog
			v-if="allotDialog"
			:dialog="allotDialog"
			:selectedStudents="selectedStudents"
			v-on:closeDialog="allotDialog = false"
			v-on:showStudent="showStudent($event)"
		/>

		<StudentDetails v-if="dialog" v-model="dialog" :student="dialogData" />
	</div>
</template>

<script>
import AutoAllotDialog from "./AutoAllotDialog.vue";
import StudentDetails from "./StudentDetails.vue";

export default {
	components: { AutoAllotDialog, StudentDetails },
	data: () => ({
		students: [],
		singleSelect: false,
		headers: [
			{
				text: "Name",
				value: "name",
			},
			{
				text: "Roll No.",
				value: "roll_no",
			},
			{
				text: "City",
				value: "city",
			},
			{
				text: "Back in Prev year?",
				value: "back",
			},
			{
				text: "Actions",
				value: "actions",
				align: "center",
				sortable: false,
			},
		],
		selectedStudents: [],

		dialog: false,
		dialogData: null,

		allotDialog: false,

		isButtonLoading: false,
		isTableLoading: false,
	}),
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

		autoAllot() {
			this.isButtonLoading = true;
			//TODO: Stuff Here
			this.allotDialog = true;
			this.isButtonLoading = false;
		},

		openDialogue(student) {
			this.dialog = true;
			this.dialogData = student;
		},

		showStudent(id) {
			const student = this.$store.state.admin.data.filter(
				(el) => el.username === id
			);
			this.openDialogue(student[0]);
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
