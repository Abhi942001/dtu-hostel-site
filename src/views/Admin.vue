<template>
  <v-app>
    <h1><b>Admin Panel</b></h1>
    <v-divider />
    <span><h2>All hostel requests</h2></span>
    <v-divider style="margin-bottom: 20px" />
    <v-card class="d-flex justify-center flex-wrap" depressed outlined>
      <div>
        <b>Pending Requests</b>
        <RequestTable />
      </div>
      <div>
        <b>Rejected Requests</b>
        <RejectedTable />
      </div>
    </v-card>
  </v-app>
</template>

<script>
import store from "../store/index";
import RequestTable from "@/components/RequestTable.vue";
import RejectedTable from "@/components/RejectedTable.vue";
export default {
  components: { RequestTable, RejectedTable },
  data() {
    return {};
  },

  beforeRouteEnter(to, from, next) {
    const user = JSON.parse(localStorage.getItem("user"));
    if ((user ? user.utype !== "admin" : true) && to.name === "Admin") {
      next("/login");
    } else {
      next();
    }
  },

  // created() {
  // 	if (!this.checkAdmin) {
  // 		this.$router.push("/");
  // 	}
  // },
  // computed: {
  // 	checkAdmin: function() {
  // 		return this.$store.state.user.userType === "admin" ? true : false;
  // 	},
  // },

  // watch: {
  // 	"$store.state.user": function() {
  // 		if (!this.checkAdmin) {
  // 			this.$router.push("/");
  // 		}
  // 	},
  // },
};
</script>

<style></style>
