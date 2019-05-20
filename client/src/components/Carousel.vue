<template>
  <div style="margin-top:-40px;">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      img-width="1024"
      img-height="480"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        img-src="https://storage.googleapis.com/miniwp-mri/hero_slide_2_1_1512x.jpg"
      >
       <div class="d-inline-flex p-2" style=" background-color:#e67e22;"><h1>bring it on to your next adventure!</h1></div>
      </b-carousel-slide>

      <!-- Slides with custom text -->

      <!-- Slides with image only -->
      <b-carousel-slide
        img-src="https://storage.googleapis.com/miniwp-mri/hero_slide_1_1_1512x.jpg"
      >
         <div class="d-inline-flex p-2" style=" background-color:#e67e22;"><h1>TAKE IT OUTDOORS!</h1></div>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>