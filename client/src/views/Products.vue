<template>
<div class="container">
    <h3 class="h3">Our Product</h3>
    <div class="row">
      <CardProduct  v-for="product in allProducts" :key="product._id" :productnya="product" />
       
       
    </div>
</div>
</template>

<script>
// @ is an alias to /src

import CardProduct from "@/components/CardProduct.vue";
import { mapState } from "vuex";

export default {
  name: "products",
  computed: mapState([ "allProducts", "role"]),
  components: {
    CardProduct
  },
  data() {
    return {
      size: 12,
    };
  },
  created() {
    this.$store.dispatch("getProducts");
  },
};
</script>


<style scoped>
h3.h3{text-align:center;margin:1em;text-transform:capitalize;font-size:1.7em;}


</style>

