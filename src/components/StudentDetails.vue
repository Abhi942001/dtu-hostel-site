<template>
	<v-dialog v-if="dialog" v-model="dialog" max-width="400">
		<v-card>
			<v-toolbar color="primary darken-3" style="margin-bottom: 20px;">
				<v-card-title class="text-h4">Student Info</v-card-title>
			</v-toolbar>
			<v-card-text v-if="dialogData">
				<v-icon size="120px" color="primary">mdi-account-circle</v-icon>
				<div
					class="d-flex flex-column align-center justify-center"
					style="padding: 20px"
				>
					<div>
						<v-chip
							style="padding: 20px;"
							color="primary "
							label
							outlined
							><span class="text-h4">{{
								dialogData.name
							}}</span></v-chip
						>
					</div>
					<br />
					<div class="other-details">
						<span class="text-h5 key">Roll No:</span>
						<span class="text-h5 val">{{ dialogData.rollno }}</span>
						<span class="text-h5 key">Address:</span>
						<span class="text-h5 val"
							>{{ dialogData.address }},
							{{ dialogData.pincode }}</span
						>
						<span class="text-h5 key">Phone:</span>
						<span class="text-h5 val">{{ dialogData.mobile }}</span>
					</div>
				</div>
			</v-card-text>
			<v-card-actions class="justify-end">
				<v-btn
					text
					@click="$emit('input', false)"
					style="margin: 0px 10px 10px"
					>Close</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	model: {
		prop: "dialog",
	},
	props: ["dialog", "student"],

	computed: {
		dialogData() {
			const student = this.student;
			return {
				name: student.name,
				rollno: student.roll_no,
				address: student.address1,
				pincode: student.pincode,
				mobile: student.mobile,
			};
		},
	},
};
</script>

<style>
.other-details {
	display: grid;
	grid-template-columns: max-content auto;
	column-gap: 20px;
}

.key {
	text-align: right;
	color: cyan;
}
.val {
	text-align: left;
}
</style>
