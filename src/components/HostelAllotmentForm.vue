<template>
  <v-app>
    <v-card class="form" outlined>
      <v-container class="flex-column justify-center">
        <v-text-field
          label="Name"
          outlined
          v-model="formData.name"
          :error-messages="formData.name"
        />
        <v-text-field label="Roll No." outlined v-model="formData.rollno" />
        <div class="title">Address</div>
        <v-text-field
          label="Address Line 1"
          outlined
          dense
          v-model="formData.al1"
        />
        <v-text-field
          label="Address Line 2"
          outlined
          dense
          v-model="formData.al2"
        />
        <v-text-field label="City" outlined dense v-model="formData.city" />
        <v-text-field label="State" outlined dense v-model="formData.state" />
        <v-text-field
          label="Pin Code"
          outlined
          v-model="formData.pincode"
          maxlength="6"
          counter
          :rules="pincodeRules"
        />
        <v-radio-group
          label="Back in Previous Year?"
          v-model="hasBack"
          row
          dense
        >
          <v-radio label="Yes" value="yes" />
          <v-radio label="No" value="no" />
        </v-radio-group>
        <v-select label="Year" :items="year" outlined />
        <v-text-field
          label="Email"
          :rules="emailRules"
          required="false"
          outlined
          dense
          v-model="formData.email"
        />
        <v-text-field
          label="Mobile"
          :rules="phoneRules"
          counter
          maxlength="10"
          outlined
          dense
          v-model="formData.mobile"
        />
        <v-btn
          color="success"
          outlined
          :loading="isLoading"
          @click="submitForm()"
          >Submit</v-btn
        >
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "HostelAllotmentForm",
  data() {
    return {
      hasBack: "no",
      year: ["First", "Second", "Third", "Fourth"],

      email: "",
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      phoneRules: [
        (v) => /\d\d\d\d\d\d\d\d\d\d/.test(v) || "Phone no. must be valid",
      ],
      pincodeRules: [(v) => /\d\d\d\d\d\d/.test(v) || "Pin Code must be valid"],

      isLoading: false,

      formData: {
        name: "",
        rollno: "",
        al1: "",
        al2: "",
        city: "",
        state: "",
        pincode: "",
        email: "",
        mobile: "",
      },
    };
  },
  methods: {
    async submitForm() {
      this.isLoading = true;

      await this.$store
        .dispatch("submitAllotmentForm", this.formData)
        .then(() => {
          if (this.$store.state.user.hasRequestedAllotment) {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
.form {
  width: 600px;
  padding: 20px;
}
.title {
  margin-bottom: 10px;
}
</style>
