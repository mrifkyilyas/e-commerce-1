<template>
  <div class="row">
    <div class="col-6 mx-auto my-4 py-2" style="background-color:white">
      <form @submit.prevent="editProduct">
        <div class="form row">
          <div class="form-group col-md-9">
            <label for="inputname">Name</label>
            <input type="name" class="form-control" id="inputname" placeholder="name" v-model="name">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="inputPrice">Price</label>
            <input type="number" class="form-control" id="inputPrice" v-model="price">
          </div>

          <div class="form-group col-md-3">
            <label for="inputStock">Stock</label>
            <input type="number" class="form-control" id="inputStock" v-model="quantity">
          </div>
        </div>
         <img :src="image" height="150" width="150" style="float:left">
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
      file: "",
      image: "",
      price:'',
      name:"",
      quantity:""
    };
  },
  created() {
    this.getOneProduct()
  },
  methods: {
    handleFileUpload(event) {
      console.log("masuk file upload", this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
    },
    getOneProduct() {
      axios
        .get(
          `/product/${this.$route.params.id}`,
          {},
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.name = data.name;
          this.price = data.price;
          this.quantity = data.quantity;
          this.image = data.image;
        })
        .catch(err => {
          console.log(err);

          this.price.value = "";
          this.name = "";
          this.quantity.value = "";
        });
    },
    editProduct() {
      console.log(this.file);
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("quantity", this.quantity);
      formData.append("price", this.price);
      formData.append("file", this.file);
      axios
        .patch(`/product/${this.$route.params.id}`, formData, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log("berhasil");
          this.name = "";
          this.price = "";
          this.quantity = "";
          this.$router.push("/product");
        })
        .catch(err => {
          console.log(err);
  

        });
    }
  }
};
</script>


