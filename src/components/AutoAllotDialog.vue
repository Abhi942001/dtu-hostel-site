<template>
	<v-dialog v-model="dialog" max-width="fit-content" persistent>
		<v-card style="padding: 40px">
			<v-data-table
				:headers="headers"
				:items="rooms"
				:items-per-page="5"
				:loading="isLoading"
			>
				<template slot="item.room_id" slot-scope="data"
					><span>Room {{ data.item.room_id }}</span></template
				>
				<template slot="item.occupant1" slot-scope="data"
					><span
						style="cursor: pointer"
						@click="
							if (data.item.occupant1)
								$emit(
									'showStudent',
									data.item.occupant1.username
								);
						"
						>{{
							data.item.occupant1
								? data.item.occupant1.roll_no
								: "(empty)"
						}}</span
					></template
				>
				<template slot="item.occupant2" slot-scope="data"
					><span
						style="cursor: pointer"
						@click="
							if (data.item.occupant2)
								$emit(
									'showStudent',
									data.item.occupant2.username
								);
						"
						>{{
							data.item.occupant2
								? data.item.occupant2.roll_no
								: "(empty)"
						}}</span
					></template
				>
			</v-data-table>
			<v-btn
				v-if="!didAllot"
				@click="showAllotment()"
				style="margin: 0px 10px"
				>View Allotments</v-btn
			>
			<v-btn
				v-else
				@click="setAllotments"
				style="margin: 0px 10px"
				:loading="isLoading"
				>Allot</v-btn
			>
			<v-btn @click="closeDialog()">Cancel</v-btn>
		</v-card>
	</v-dialog>
</template>

<script>
import axios from "axios";
export default {
	props: { dialog: { type: Boolean }, selectedStudents: { type: Array } },
	data: () => ({
		headers: [
			{ text: "Room", value: "room_id" },
			{ text: "Occupant 1", value: "occupant1" },
			{ text: "Occupant 2", value: "occupant2" },
		],
		rooms: [],
		didAllot: false,
		shuffledStudents: null,
		isLoading: false,
	}),
	methods: {
		showAllotment() {
			this.shuffledStudents = this.shuffleArray(this.selectedStudents);

			for (let room of this.rooms) {
				let student = this.shuffledStudents.pop();
				if (student) {
					if (!room.occupant1) {
						room.occupant1 = student;
					} else if (!room.occupant2) {
						room.occupant2 = student;
					}
				}
				if (!room.occupant2) {
					let student2 = this.shuffledStudents.pop();
					if (student2) {
						room.occupant2 = student2;
					}
				}
			}
			this.didAllot = true;
		},

		setAllotments() {},

		closeDialog() {
			this.$emit("closeDialog");
		},

		shuffleArray(oldArr) {
			let arr = [];
			for (let i = 0; i < oldArr.length; i++) {
				arr.push(oldArr[i]);
			}
			let n = arr.length;
			for (let i = n - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (n - 0) + 0);
				let temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
			return arr;
		},
	},
	mounted() {
		axios.get("http://localhost:8081/server/admin/hostels").then((res) => {
			this.rooms = res.data;
			this.rooms.forEach((room) => {
				if (room.occupant1) {
					const student1 = this.$store.state.admin.data.filter(
						(el) => el.username === room.occupant1
					)[0];
					room.occupant1 = {
						username: room.occupant1,
						roll_no: student1.roll_no,
					};
				}

				if (room.occupant2) {
					const student2 = this.$store.state.admin.data.filter(
						(el) => el.username === room.occupant2
					)[0];
					room.occupant2 = {
						username: room.occupant1,
						roll_no: student2.roll_no,
					};
				}
			});
		});
	},
};
</script>

<style></style>
