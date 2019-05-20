<template>
  <div class="container py-10">
    <br>
    <br>
    <br>
    <div class="row">
      <div class="col-10 bg-light mx-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Email Buyer</th>
              <th>Total Items</th>
              <th>Items</th>
              <th>Proccess Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody v-for="transaction in transactions" :key="transaction._id">
            <tr>
              <td>
                <h5>{{ transaction.userId.email }}</h5>
              </td>
              <td>
                <h5>{{ transaction.productList.length }}</h5>
              </td>
              <td>
                <h5
                  v-for="(product, index) in transaction.productList"
                  :key="index"
                >{{ index + 1 }}. {{product.name}}</h5>
              </td>
              <td>
                <h5>{{ transaction.createdAt.slice(0,10) }}</h5>
              </td>
              <td>
                <h5>Rp.{{ transaction.totalPayment.toLocaleString() }}</h5>
              </td>
              <td>
                <h5 style="color: #ca0029;" v-if="transaction.status === 'pending'">
                  <b>{{ transaction.status }}</b>
                </h5>
                <h5 style="color: green;" v-else>
                  <b>{{ transaction.status }}</b>
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../api/axios";

export default {
  name: "all-transaction",
  data() {
    return {
      transactions: [],
      status: ""
    };
  },
  created() {
    this.getMytransaction();
  },
  mounted() {},
  methods: {
    getMytransaction() {
      axios
        .get(`/transaction`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          data.map(e => {
            if (e.status === false) {
              e.status = "pending";
            } else {
              e.status = "arrived";
            }
          });
          this.transactions = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

