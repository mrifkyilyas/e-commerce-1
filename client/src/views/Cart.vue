<template>
  <div class="container">
    <table id="cart" class="table table-hover table-condensed">
      <thead>
        <tr>
          <th style="width:50%">Product</th>
          <th style="width:10%">Price</th>
          <th style="width:8%">Quantity</th>
          <th style="width:22%" class="text-center"></th>
          <th style="width:10%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart,index) in carts" :key="index">
          <td data-th="Product">
            <div class="row">
              <div class="col-sm-2 hidden-xs">
                <img
                  :src="cart.image"
                  alt="..."
                  class="img-responsive"
                  height="100px"
                  width="100px"
                >
              </div>
              <div class="col-sm-10">
                <br>
                <h4 class="nomargin">{{cart.name}}</h4>
              </div>
            </div>
          </td>

          <td data-th="Price">Rp.{{cart.price}}</td>
          <td data-th="Quantity">1</td>
          <td data-th=" " class="text-center"></td>
          <td class="actions" data-th>
            <button class="btn btn-danger btn-sm" @click.prevent="removefromcart(cart._id)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="visible-xs">
          <td class="text-center">
            <strong></strong>
          </td>
        </tr>
        <tr>
          <td>
            <router-link to="/product">
              <a href="#" class="btn btn-warning">
                <i class="fa fa-angle-left"></i> Continue Shopping
              </a>
            </router-link>
          </td>
          <td colspan="2" class="hidden-xs"></td>
          <td class="hidden-xs text-center">
            <strong>Total :Rp.{{totalPrice}}</strong>
          </td>
          <td>
            <router-link to="/checkout">
              <a href="#" class="btn btn-success btn-block">
                Checkout
                <i class="fa fa-angle-right"></i>
              </a>
            </router-link>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../api/axios";
export default {
  created() {
    if (localStorage.getItem("access_token")) {
      this.getCart();
    } else {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      carts: [],
      totalPrice: 0
    };
  },
  methods: {
    getCart() {
      axios
        .get(`/cart`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.carts = data.cart;
          data.cart.map(e => {
            this.totalPrice += Number(e.price);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    removefromcart(id) {
      axios
        .patch(
          `/cart/removefromcart`,
          {
            productId: id
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(({ data }) => {
          this.getCart();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

