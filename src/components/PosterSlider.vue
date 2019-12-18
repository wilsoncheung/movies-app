<template>
  <div class="slider row">
    <ul class="slides">
      <li class="z-depth-4" v-for="movie in theMovies" :key="movie.id">
        <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }">
          <img
            :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"
          />
          <div class="caption left-align text-shadow">
            <h3 class="white-text ">{{ movie.title }}</h3>
            <h5 class="white-text valign-wrapper">
              <i class="material-icons" style="color:white">today</i>
              {{ formatDate(movie.release_date) }}
            </h5>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
  <!-- <div class="carousel carousel-slider">
    <a class="carousel-item" v-for="movie in theMovies" :key="movie.id">
      <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }">
        <img
          :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"
        />
      </router-link>
    </a>
  </div> -->
</template>

<script>
import moment from "moment";

export default {
  name: "PosterSlider",
  props: ["theMovies"],
  methods: {
    formatDate(d) {
      return moment(d).format("MM/DD/YY");
    }
  },
  updated() {
    //Called here instead of "mounted" because data is not ready before mounted
    $(document).ready(function() {
      $(".slider").slider({
        interval: 9999
      });
    });

    // $(document).ready(function() {
    //   $(".carousel.carousel-slider").carousel({
    //     height: 800,
    //     indicators: true,
    //     transition: 500,
    //     interval: 1000
    //   });
    // });
  }
};
</script>

<style>
.slider {
  margin-bottom: 2.5rem;
}
.slider .indicators .indicator-item.active {
  background-color: #27a699;
}
.slider .slides li img {
  /* background-position: top; */
  background-position-y: 15%;
}
/* .slider .slides li img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  max-width: 100%;
  max-height: 100%;
} */
.text-shadow {
  text-shadow: 2px 2px #000000;
}
</style>