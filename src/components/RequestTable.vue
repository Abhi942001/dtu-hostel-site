<template>
  <v-container>
    <v-card class="width-adj margin-adj" depressed outlined>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="students"
        :items-per-page="5"
        :loading="isTableLoading"
      >
        <template slot="item.actions" slot-scope="data">
          <v-btn
            class="btn1"
            color="success"
            width="100%"
            small
            depressed
            outlined
            @click="allotActions(data.item)"
            >Allot</v-btn
          >
          <v-btn
            class="btn2"
            color="red"
            width="100%"
            @click="rejectActions(data.item.username)"
            small
            depressed
            outlined
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
    <AllotmentDialogue
      :dialog="dialog"
      :student="student"
      v-on:closedialog="(dialog = false), (student = null)"
    />
  </v-container>
</template>

<script>
import AllotmentDialogue from "./AllotmentDialogue";
import axios from "axios";
export default {
  components: { AllotmentDialogue },
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
          text: "Roll No",
          value: "roll_no",
        },
        {
          text: "Back in Prev year?",
          value: "back",
        },
        {
          text: "Actions",
          align: "center",
          value: "actions",
          sortable: false,
        },
      ],
      students: [],

      dialog: false,
      student: null,
      isButtonLoading: false,
      isTableLoading: false,
    };
  },
  methods: {
    fetchRequestActions: async function () {
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
    allotActions: function (data) {
      this.dialog = true;
      this.student = data;
    },
    rejectActions: async function (username) {
      await axios.post("http://localhost:8081/server/admin/reject", {
        data: { username: username },
      });

      await this.$store.dispatch("getStudents");

      alert("Request Rejected!");
    },
  },
  mounted: async function () {
    this.isTableLoading = true;
    await this.fetchRequestActions();
    this.isTableLoading = false;
  },
  watch: {
    "$store.state.admin": function () {
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
.btn1 {
  margin-top: 5px;
  margin-bottom: 1px;
}
.btn2 {
  margin-top: 1px;
  margin-bottom: 5px;
}
</style>
