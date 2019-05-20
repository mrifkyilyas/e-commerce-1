<template>
  <div class="home">
    <Carousel/>
    <div class="container">
      
      <div class="d-flex justify-content-center col-10 mx-auto bg-light" style="margin-top:-50px">
        <CardProduct v-for="product in allProductsz" :key="product._id" :productnya="product"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Carousel from "@/components/Carousel.vue";
import Navbar from "@/components/Nav.vue";
import Card from "@/components/Card.vue";
import Footer from "@/components/Footer.vue";
import CardProduct from "@/components/CardProduct.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    HelloWorld,
    Carousel,
    Navbar,
    Card,
    Footer,
    CardProduct
  },
  computed: mapState([ "allProducts", "role"]),
  data() {
    return {
      size: 12,
      allProductsz : []
    };
  },
  created() {
    this.$store.dispatch("getProducts");
    this.allProductsz = this.allProducts.reverse().slice(0,4)

  },

};
</script>
