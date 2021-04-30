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
					@click="openDialogue(data.item)"
				>
					View
				</v-btn>
			</template>
		</v-data-table>

		<v-btn
			style="margin: 20px 0px 0px 0px;"
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

		<v-dialog
			v-model="dialog"
			transition="dialog-top-transition"
			max-width="600"
		>
			<v-card>
				<v-toolbar color="primary" dark
					><h1>Student Info</h1></v-toolbar
				>
				<!-- TODO Correct view -->
				<v-card-text>
					<div class="text-h5">Name: {{ dialogData.name }}</div>
					<div class="text-h5 ">
						Roll No.: {{ dialogData.rollno }}
					</div>
					<div class="text-h5">Address: {{ dialogData.address }}</div>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn text @click="dialog = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import AutoAllotDialog from "./AutoAllotDialog.vue";
export default {
	components: { AutoAllotDialog },
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
		dialogData: {
			name: null,
			rollno: null,
			address: null,
		},

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
			//code
			this.allotDialog = true;
			this.isButtonLoading = false;
		},

		openDialogue(student) {
			this.dialog = true;
			this.dialogData = {
				name: student.name,
				rollno: student.roll_no,
				address: student.address1,
			};
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

<style></style>
