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
            color="success"
            @click="reconsiderActions(data.item.username)"
            small
            depressed
            outlined
            >Reconsider</v-btn
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
  </v-container>
</template>

<script>
import axios from "axios";
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
          text: "Roll No",
          value: "roll_no",
        },
        {
          text: "Back in Prev year?",
          value: "back",
          // filter: (value) => {
          // 	return value === "No" ? true : false;
          // },
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

    reconsiderActions: async function (username) {
      this.isButtonLoading = true;
      await axios.post("http://localhost:8081/server/admin/reconsider", {
        data: { username: username },
      });

      await this.$store.dispatch("getStudents").catch((e) => {
        alert(e);
      });
      this.isButtonLoading = false;
      alert("This request is reconsidered!");
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
