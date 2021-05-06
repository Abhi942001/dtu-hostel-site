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
            class="student"
            @click="
              if (data.item.occupant1)
                $emit('showStudent', data.item.occupant1.username);
            "
            >{{
              data.item.occupant1 ? data.item.occupant1.roll_no : "(empty)"
            }}</span
          ></template
        >
        <template slot="item.occupant2" slot-scope="data"
          ><span
            class="student"
            @click="
              if (data.item.occupant2)
                $emit('showStudent', data.item.occupant2.username);
            "
            >{{
              data.item.occupant2 ? data.item.occupant2.roll_no : "(empty)"
            }}</span
          ></template
        >
      </v-data-table>
      <v-btn @click="allotHostels()" style="margin: 0px 10px"
        >View Auto Allot</v-btn
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

    isLoading: false,
  }),
  methods: {
    allotHostels() {},
    closeDialog() {
      this.$emit("closeDialog");
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

<style lang="scss">
.student {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: var(--v-primary-base);
  }
}
</style>
