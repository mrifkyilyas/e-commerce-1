<template>
  <div class="container login-container">
    <div class="row">
      <div class="col-md-6 mx-auto login-form-1">
        <h3>Register</h3>
        <form @submit.prevent="registerAct">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Your Name *" value ref="name">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Your Email *" value ref="email">
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Your Password *"
              value
              ref="password"
            >
          </div>
          <div class="form-group">
            <input type="submit" class="btnSubmit" value="register">
          </div>
          <div class="form-group">
            <a href="#" class="ForgetPwd">Forget Password?</a>
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
  components: {},
  methods: {
    registerAct() {
      axios({
        method: "POST",
        url: "/user/register",
        data: {
          name: this.$refs.name.value,
          email: this.$refs.email.value,
          password: this.$refs.password.value
        }
      })
        .then(({ data }) => {
          this.$refs.name.value = "";
          this.$refs.email.value = "";
          this.$refs.password.value = "";
          Swal.fire({
            type: "success",
            title: "Successfully registered",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push("/login");
        })
        .catch(err => {
          this.$refs.name.value = "";
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
.login-form-2 {
  padding: 5%;
  background: #213235;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3 {
  text-align: center;
  color: #fff;
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
  background-color: #0062cc;
}
.login-form-2 .btnSubmit {
  font-weight: 600;
  color: #0062cc;
  background-color: #fff;
}
.login-form-2 .ForgetPwd {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.login-form-1 .ForgetPwd {
  color: #0062cc;
  font-weight: 600;
  text-decoration: none;
}
</style>

