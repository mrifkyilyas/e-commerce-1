<template>
  <nav class="navbar navbar-expand-sm sticky-top navbar-dark py-2">
    <div class="container">
      <b-link to="/" exact>
        <a class="navbar-brand" href="#">Home</a>
      </b-link>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbar1"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar1">
        <ul class="navbar-nav">
          <li class="nav-item">
            <b-link to="/product" exact>
              <a class="nav-link" href="#">Product</a>
            </b-link>
          </li>
          <li class="nav-item" v-if="isLogin==true && role=='admin'">
            <b-link to="/transaction" exact>
              <a class="nav-link" href="#">Transaction</a>
            </b-link>
          </li>
          <li class="nav-item" v-if="isLogin==true && role !='admin'">
            <b-link to="/mytransaction" exact>
              <a class="nav-link" href="#">My Transaction</a>
            </b-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="isLogin === true">
            <b-dropdown class="text-dark" variant="link" size="lg" no-caret>
              <template slot="button-content">
                <a href="#" class="text-light">
                  halo, {{name}}
                  <i class="fas fa-user-circle"></i>
                </a>
              </template>
              <b-dropdown-item href="#" v-if="isLogin==true && role !='admin'">
                <b-link to="/mytransaction" exact>
                  <a href="#" class="text-dark">
                    <i class="fas fa-align-left mr-2"></i>My Transaction
                  </a>
                </b-link>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <a href="#" @click="logout" class="text-dark">logout</a>
              </b-dropdown-item>
            </b-dropdown>
          </li>
          <li class="nav-item" v-if="isLogin === false">
            <b-link to="/login" exact>
              <a class="nav-link" href="#">login</a>
            </b-link>
          </li>
          <li class="nav-item" v-if="isLogin === true">
            <b-link to="/cart" exact>
              <a class="nav-link" href="#">
                <i class="fas fa-shopping-cart"></i>
              </a>
            </b-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
import axios from "../api/axios";
export default {
  computed: mapState(["isLogin", "role", "name"]),
  methods: {
    logout() {
      Swal.fire({
        type: "success",
        title: "Logout Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      this.$store.dispatch("logout");
      this.$router.push("/");
      console.log(this.name);
    }
  }
};
</script>

