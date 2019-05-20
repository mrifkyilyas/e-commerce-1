<template>
  <div id="app">
    <div class="header atas-nav">
      <img
        style="position:float-left"
        src="https://storage.googleapis.com/miniwp-mri/boulder_140x.png"
      >
    </div>
    <span class="position-absolute trigger">
      <!-- hidden trigger to apply 'stuck' styles -->
    </span>
    <Navbar/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
    <Footer/>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import Navbar from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  created() {
    if (localStorage.access_token) {
      this.$store.commit("setUserStatus", {
        role: localStorage.role,
        status: true,
        name:localStorage.name
      });
    } else {
      this.$store.commit("setUserStatus", {
        role: "customer",
        status: false,
        name:''
      });
    }
  },
  components: {
    Navbar,
    Footer
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

