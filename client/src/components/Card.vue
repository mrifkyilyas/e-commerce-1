<template>
  <div  >
    <b-card
      border-variant="light"
      :title="productnya.name"
      :img-src="productnya.image"
      img-alt="Image"
      img-bottom
      tag="article"
      :style="{ 'max-width': size, 'border-radius':'0px', 'hover:background-color':'red' }"
    >  <a class="button btn btn-success">abc</a>
    </b-card>
  
  </div>
</template>

<script>
export default {
  props: ["sizenya", "productnya"],

  data() {
    return {
      size: `${this.sizenya}rem`
    };
  }
};
</script>

<style scoped>
.button {
  display: none;
  margin-top:-50px;

 
}
.img{
  background-color: firebrick;
}

.img:hover + .button, .button:hover {
    display: inline-block;
}
</style>




