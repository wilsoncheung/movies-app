<template>
  <div class="container">
    <SearchBar />
    <div>
      <h5 class="row bold-text center-align">Trending</h5>
      <!--Carousel-->
      <div class="row">
        <PosterSlider :theMovies="trendingMovies(7)" />
      </div>
      <!--//-->
      <hr />

      <!--Now Playing Video Gallery-->
      <div class="row center-align">
        <h5 class="row bold-text">Playing Now</h5>
        <div
          class="col s12 m4 l4"
          v-for="(trailer, index) in trailers"
          :key="index"
        >
          <div class="video-container z-depth-4">
            <iframe
              width="375"
              height="210"
              :src="trailer.trailerUrl"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
          <p>
            <strong class="bold-text">
              {{ formatDate(trailer.releaseDate) }}
            </strong>
          </p>
        </div>
      </div>
      <!--//-->

      <hr />
      <!--Coming Soon Posters-->
      <div class="row center-align">
        <h5 class="row bold-text">Coming Soon</h5>
        <div class="row flex-it">
          <div
            class="col s6 m2 l2"
            v-for="movie in upcomingMovies(6)"
            :key="movie.id"
          >
            <MovieCard :theMovie="movie" />
          </div>
        </div>
      </div>
      <!--//-->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MovieCard from "./MovieCard.vue";
import PosterSlider from "./PosterSlider.vue";
import SearchBar from "./SearchBar.vue";
import moment from "moment";

export default {
  name: "Home",
  data() {
    return {
      // trailerUrls: [
      //   "http://www.youtube.com/embed/ECewrAld3zw",
      //   "http://www.youtube.com/embed/TZE9gVF1QbA",
      //   "http://www.youtube.com/embed/bCM3clq-_c0"
      // ]
    };
  },
  components: {
    MovieCard,
    PosterSlider,
    SearchBar
  },
  methods: {
    ...mapActions([
      "resetMovieState",
      "fetchAllHomeContent",
      "fetchMovieTrailer"
    ]),
    formatDate(d) {
      return moment(d).format("MM/DD/YY");
    }
  },
  mounted() {},
  updated() {
    // Called here instead of "mounted" because data is not ready before mounted
    $(document).ready(function() {
      $(".slider").slider({
        interval: 5000
      });
    });
    // document.addEventListener("DOMContentLoaded", function() {
    //   var elems = document.querySelectorAll(".slider");
    //   var options = { interval: 5000 };
    //   var instances = M.Slider.init(elems, options);
    // });
  },
  computed: {
    ...mapGetters(["upcomingMovies", "trendingMovies", "trailers"])
  },
  created() {
    this.resetMovieState();
    this.fetchAllHomeContent();
  }
};
</script>

<style>
hr {
  margin: 2rem 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
}
#search-bar > .row {
  margin-bottom: 0 !important;
}
.flex-it {
  display: flex;
  flex-wrap: wrap;
}
.flex-it:after {
  content: "";
  flex: auto;
}
.video-container {
  margin-bottom: 1em;
}
</style>