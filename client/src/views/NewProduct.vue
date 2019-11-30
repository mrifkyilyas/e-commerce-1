<template>
  <div class="row">
    <div class="col-6 mx-auto my-4 py-2" style="background-color:white">
      <form @submit.prevent="addProduct">
        <div class="form row">
          <div class="form-group col-md-9">
            <label for="inputname">Name</label>
            <input type="name" class="form-control" id="inputname" placeholder="name" ref="name">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="inputPrice">Price</label>
            <input type="number" class="form-control" id="inputPrice" ref="price">
          </div>

          <div class="form-group col-md-3">
            <label for="inputStock">Stock</label>
            <input type="number" class="form-control" id="inputStock" ref="quantity">
          </div>
        </div>
        <div class="form-group col-md-3">
          <label for="inputPassword4">image</label>
          <input type="file" ref="file" v-on:change="handleFileUpload">
        </div>
        <button type="submit" class="btn btn-primary">upload</button>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "../api/axios";
export default {
  name: "addProduct",
  data() {
    return {
      file: ""
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = this.$refs.file.files[0];
    },
    addProduct() {
      let formData = new FormData();
      formData.append("name", this.$refs.name.value);
      formData.append("quantity", this.$refs.quantity.value);
      formData.append("price", this.$refs.price.value);
      formData.append("file", this.file);
      axios
        .post(`/product`, formData, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.$refs.name = "";
          this.$refs.price = "";
          this.$refs.quantity = "";
          this.$router.push("/product");
        })
        .catch(err => {
          console.log(err);

          this.$refs.price.value = "";
          this.$refs.name = "";
          this.$refs.quantity.value = "";
        });
    }
  }
};
</script>


