<template>
  <div class="slider row">
    <ul class="slides">
      <li v-for="movie in theMovies" :key="movie.id">
        <img
          :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"
        />
        <div class="caption left-align">
          <h3 class="white-text ">{{ movie.title }}</h3>
          <h5 class="white-text ">
            {{ formatDate(movie.release_date) }}
          </h5>
        </div>
      </li>
    </ul>
  </div>
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
    // Called here instead of "mounted" because data is not ready before mounted
    $(document).ready(function() {
      console.log(this.allTrendingMovies);
      $(".slider").slider({
        interval: 5000
      });
    });
    // document.addEventListener("DOMContentLoaded", function() {
    //   var elems = document.querySelectorAll(".slider");
    //   var options = { interval: 5000 };
    //   var instances = M.Slider.init(elems, options);
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
  background-position: top;
}
</style>