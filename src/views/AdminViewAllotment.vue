<template>
  <v-container style="width: 100%">
    <v-card style="padding: 20px">
      <div class="text-h3">
        <b>View Allotment</b>
      </div>
    </v-card>
    <v-divider style="margin: 20px 0px 20px" />
    <v-card class="d-flex justify-center table-container" style="width: 100%">
      <ViewAllotments v-on:showStudent="showStudent($event)" />
      <StudentDetails v-model="dialog" :student="student" />
    </v-card>
  </v-container>
</template>

<script>
import ViewAllotments from "@/components/ViewAllotments";
import StudentDetails from "@/components/StudentDetails.vue";

export default {
  props: { selectedStudents: { type: Array } },
  components: {
    ViewAllotments,
    StudentDetails,
  },
  data: () => ({
    student: null,
    dialog: false,
  }),
  methods: {
    showStudent(id) {
      this.dialog = true;
      const student = this.$store.state.admin.data.filter(
        (el) => el.username === id
      );
      this.student = student[0];
    },
  },

  beforeRouteEnter(to, from, next) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user ? user.utype !== "admin" : true) {
      next("/login");
    } else {
      next();
    }
  },
};
</script>

<style></style>
