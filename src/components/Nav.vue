<template>
  <div id="nav">
	  
    <router-link to="/" exact>Home</router-link> |

    <!-- login link conditonal -->
    <router-link v-if="!isLoggedIn" to="/login" exact>Login</router-link>
    <span v-else>
      <a href="#" label="Logout" color="success" @click="logout()">Logout</a>
      {{ $store.state.user.username | capitalize }}
    </span>
  </div>
</template>

<script>
// import { userBus } from "@/main.js";

export default {
  name: "Nav",
  data() {
    return {
      uname: "null",
      isLoggedIn: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.isLoggedIn = false;
      alert("Logged out!");
      this.$router.push("login");
      // userBus.$emit("userLogout");
    },
  },
  watch: {
    "$store.state.user": function () {
      const uname = this.$store.state.user.username;

      if (!uname) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.uname = uname;
      }
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";

      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  created() {
    // userBus.$on("userLogin", (newUser) => {
    // 	this.uname = newUser;
    // 	this.isLoggedIn = true;
    // });
  },
};
</script>

<style lang="scss">
#nav {
  padding: 20px 30px 10px 30px;

  & a {
    display: inline block;
    text-decoration: none;
    border-radius: 2px;
    font-weight: bold;
    color: #2c3e50;

    padding: 3px;
  }

  & a.router-link-exact-active {
    background-color: #42b983;
    color: white;
  }

  & a:hover {
    background-color: #42b983;
    color: white;
  }
}
.navbarLogo{
	
	height: 100%;
	width:100%;
}
</style>
