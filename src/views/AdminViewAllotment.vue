<template>
  <v-container style="width: 100%">
    <HelloWorld style="margin-bottom: 20px" />
    <v-card style="padding: 20px">
      <div class="text-h2">
        <b>View Allotment</b>
      </div>
    </v-card>
    <v-divider style="margin: 20px 0px 20px" />
    <v-card class="d-flex justify-center table-container" style="width: 100%">
      <ViewAllotments :selectedStudents="selectedStudents" />
    </v-card>
  </v-container>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
import ViewAllotments from "@/components/ViewAllotments";
export default {
  props: { selectedStudents: { type: Array } },
  components: {
    HelloWorld,
    ViewAllotments,
  },
  data: () => ({}),

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

<style>
</style>