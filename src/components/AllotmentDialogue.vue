<template>
  <v-app>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card style="height: 300px; overflow: auto">
          <v-select
            :items="hostelRooms"
            item-text="room_id"
            label="Hostel Room"
            v-model="room_id"
            dense
            solo
            style="margin: 20px 30px 10px"
            :loading="isSelectBoxLoading"
          >
            <template slot="item" slot-scope="data">
              Room No. {{ data.item.room_id }}
            </template>
          </v-select>
          <v-select
            :items="occupant1list"
            item-text="username"
            v-model="occupant1"
            label="Occupant 1"
            :disabled="!room_id || isOccupant1Disabled"
            dense
            solo
            style="margin: 10px 30px 10px"
            :loading="isSelectBoxLoading"
          >
            <template slot="item" slot-scope="data">
              Name: {{ data.item.name }} Roll No. {{ data.item.roll_no }}
            </template>
            <template slot="selection" slot-scope="data">
              Name: {{ data.item.name }} Roll No. {{ data.item.roll_no }}
            </template>
          </v-select>
          <v-select
            :disabled="!room_id || isOccupant2Disabled"
            :items="occupant2list"
            item-text="username"
            label="Occupant 2"
            v-model="occupant2"
            dense
            solo
            style="margin: 10px 30px 10px"
            :loading="isSelectBoxLoading"
          >
            <template slot="item" slot-scope="data">
              Name: {{ data.item.name }} Roll No. {{ data.item.roll_no }}
            </template>
            <template slot="selection" slot-scope="data">
              Name: {{ data.item.name }} Roll No. {{ data.item.roll_no }}
            </template></v-select
          >
          <v-btn color="blue" text @click="closedialog"> Close </v-btn>
          <v-btn color="success" text @click="allotActions()"> Allot </v-btn>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "AllotmentDialogue",
  props: ["dialog", "student"],
  data: () => ({
    hostelRooms: [],
    hostel: null,
    room_id: null,
    occupant1: null,
    occupant2: null,
    occupant1list: [],
    occupant2list: [],
    students: [],

    isOccupant1Disabled: false,
    isOccupant2Disabled: false,

    isSelectBoxLoading: false,
  }),
  methods: {
    closedialog: function () {
      this.clear();
      this.$emit("closedialog");
    },

    clear: function () {
      this.room_id = null;
    },

    allotActions: async function () {
      if (this.occupant1) {
        await axios.post("http://localhost:8081/server/admin/hostel", {
          data: {
            room_id: this.room_id,
            occupant1: this.occupant1,
            occupant2: this.occupant2,
          },
        });

        this.$store.dispatch("getStudents");
        this.$emit("closedialog");
        alert("Alloted Successfully!");
      } else {
        alert("Set occupant1 first");
      }
    },
  },

  watch: {
    room_id: function (prevval, newval) {
      do {
        console.log("loop");
        this.hostel = this.hostelRooms.find((e) => e.room_id === this.room_id);
      } while (this.hostel === null);
      this.occupant1 = this.hostel.occupant1;
      this.occupant2 = this.hostel.occupant2;

      if (!this.occupant1 && !this.occupant2) {
        this.occupant1 = this.student.username;
      } else if (!this.occupant2) {
        this.occupant2 = this.student.username;
      }

      this.occupant1list = this.students.filter(
        (student) => student.username !== this.occupant2
      );

      this.isOccupant1Disabled = this.occupant1 ? true : false;
      this.isOccupant2Disabled = this.occupant2 ? true : false;

      this.occupant2list = this.students.filter(
        (student) => student.username !== this.occupant1
      );

      if (!this.isOccupant2Disabled) {
        this.occupant2list = this.students.filter(
          (student) =>
            student.username !== this.occupant1 && student.is_alloted === 0
        );
      }

      if (!this.isOccupant1Disabled) {
        this.occupant1list = this.students.filter(
          (student) =>
            student.username !== this.occupant2 && student.is_alloted === 0
        );
      }
    },
    occupant1: function () {
      if (this.isOccupant2Disabled) {
        this.occupant2list = this.students.filter(
          (student) => student.username !== this.occupant1
        );
      }
    },
    occupant2: function () {
      if (this.isOccupant2Disabled) {
        this.occupant1list = this.students.filter(
          (student) => student.username !== this.occupant2
        );
      }
    },
    dialog: function () {
      this.isSelectBoxLoading = true;
      axios.get("http://localhost:8081/server/admin/hostels").then((res) => {
        this.hostelRooms = res.data;
      });
      this.isSelectBoxLoading = false;

      if (this.$store.state.admin) {
        this.students = this.$store.state.admin.data;
      }
    },
  },

  mounted() {
    // axios
    //   .get("http://localhost:8081/server/admin/hostel/students")
    //   .then((res) => {
    //     this.students = res.data;
    //     console.log(this.students);
    //   });
  },
};
</script>

<style>
</style>