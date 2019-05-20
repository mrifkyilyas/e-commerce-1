<template>
  <div class="container login-container">
    <div class="row">
      <div class="col-md-6 login-form-1">
        <h3>Your Cart Detail</h3>
        <table class="table">
          <br>
          <br>
           <br>
          <tbody>
            <tr>              
              <td>Items</td>
              <td></td>
              <td>{{carts.length}}</td>
            </tr>
            <tr>
            
              <td>Subtotal</td>
              <td></td>
              <td>{{totalPrice}}</td>
            </tr>
            <tr>
              
              <td>Shipping</td>
              <td></td>
              <td>{{ongkir}}</td>
            </tr>

             <tr>
              
              <td>Total</td>
              <td></td>
              <td>{{getTotal.toLocaleString()}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6 login-form-2">
        <h3>input your address</h3>
        <form>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="province" value v-model="provinsi">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="city" value v-model="kota"  @blur="getDeliveryFee">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="address" value v-model="alamat">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="phone Number" value v-model="phone">
          </div>
          <div class="form-group">
            <input type="submit" class="btnSubmit" value="checkout" @click.prevent="checkout">
          </div>
          <div class="form-group"></div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "../api/axios";
export default {
  created() {
    if (localStorage.getItem("access_token")) {
      console.log("masuk sini");
      this.getCart();
    } else {
      this.$router.push("/login");
    }
  },
  data() {
    return {
	  carts: [],
      totalPrice:0,
      ongkir:0,
      kota :'',
      provinsi:'',
      alamat:'',
      phone:'',

    };
  },
  computed: {
    getTotal() {
      return this.totalPrice + this.ongkir;
    }
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
		  console.log(this.carts);
		   data.cart.map(e => {
            this.totalPrice += Number(e.price)
          })
		
        })
        .catch(err => {
          console.log(err);
        });
    },
     getDeliveryFee() {
      axios
        .post(
          `/transaction/delivery`,
          {
            province: this.provinsi,
            city: this.kota
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(({data}) => {
          this.err = false;
          this.ongkir = data;
        })
        .catch(err => {
          this.errMsg = err.response.data.msg;
          this.err = true;
          console.log(err);
        });
    },
     checkout() {
      axios
        .post(
          `/transaction/checkout`,
          {
            phone: this.phone,
            address: this.alamat,
            totalPayment: this.getTotal
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(checkedout => {
           Swal.fire({
            type: "success",
            title: "checkout Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push('/mytransaction')
        })
        .catch(err => {
          this.errMsg = err.response.data.msg;
          this.err = true;
        });
    },
  
   
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
  color: #213235;
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

