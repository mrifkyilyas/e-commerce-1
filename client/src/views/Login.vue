<template>
  <div class="container login-container">
    <div class="row">
      <div class="col-md-6 mx-auto login-form-1">
        <h3>Login</h3>
        <form @submit.prevent="login">
          <div class="form-group">
            <input ref="email" type="text" class="form-control" placeholder="Your Email *" value>
          </div>
          <div class="form-group">
            <input
              ref="password"
              type="password"
              class="form-control"
              placeholder="Your Password *"
              value
            >
          </div>
          <div class="form-group">
            <input type="submit" class="btnSubmit" value="Login">
          </div>
          <div class="form-group">
            Dont have Account?
            <b-link to="/register" exact>
              <a href="#" class="ForgetPwd">Register</a>
            </b-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../api/axios";
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: "/user/login",
        data: {
          email: this.$refs.email.value,
          password: this.$refs.password.value
        }
      })
        .then(({ data }) => {
          this.$refs.email.value = "";
          this.$refs.password.value = "";
          Swal.fire({
            type: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("role", data.role);
          localStorage.setItem("access_token", data.access_token);
          this.$router.push("/");
          this.$store.commit('setUserStatus',{
            role:data.role,
            status:true,
            name:localStorage.name
          })
        })
        .catch(err => {
          this.$refs.email.value = "";
          this.$refs.password.value = "";
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: "animated swing"
            }
          });
        });
    }
  }
};
</script>


<style scoped>
.login-container {
  margin-top: 5%;
  margin-bottom: 5%;
}
.login-form-1 {
  padding: 5%;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-1 h3 {
  text-align: center;
  color: #333;
}

.login-container form {
  padding: 10%;
}
.btnSubmit {
  width: 50%;
  border-radius: 1rem;
  padding: 1.5%;
  border: none;
  cursor: pointer;
}
.login-form-1 .btnSubmit {
  font-weight: 600;
  color: #fff;
  background-color: #e67e22;
}
.login-form-1 .ForgetPwd {
  color: #0062cc;
  font-weight: 600;
  text-decoration: none;
}
</style>

