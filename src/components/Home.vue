<template>
  <div id="search-bar">
    <div class="container row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">search</i>
            <input
              type="text"
              id="autocomplete-input"
              class="autocomplete"
              placeholder="Search"
            />
            <!-- <label for="autocomplete-input">Search</label> -->
          </div>
        </div>
      </form>
    </div>
    <!--Carousel-->
    <div class="container">
      <div class="slider row">
        <ul class="slides">
          <li v-for="(url, index) in posters" :key="index">
            <img :src="url" />
            <!-- random image -->
            <!-- <div class="caption center-align">
              <h3>This is our big Tagline!</h3>
              <h5 class="light grey-text text-lighten-3">
                Here's our small slogan.
              </h5>
            </div> -->
          </li>
        </ul>
      </div>
      <!--//-->

      <!--Now Playing Video Gallery-->
      <div class="row center-align">
        <h5 class="row">Playing Now</h5>
        <hr />
        <div
          class="col s12 m4 l4"
          v-for="(url, index) in this.trailerUrls"
          :key="index"
        >
          <div class="video-container z-depth-4">
            <iframe
              width="375"
              height="210"
              :src="url"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <!--//-->

      <!--Coming Soon Posters-->
      <div class="row center-align">
        <h5 class="row">Coming Soon</h5>
        <hr />
        <div class="row flex-it">
          <div
            class="col s12 m2 l2"
            v-for="movie in limitedMovies(6)"
            :key="movie.id"
          >
            <Movie :theMovie="movie" />
          </div>
        </div>
      </div>
      <!--//-->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import Movie from "./Movie.vue";

export default {
  name: "Home",
  data() {
    return {
      posters: [
        // "https://lorempixel.com/580/250/animals",
        // "https://lorempixel.com/580/250?grayscale",
        // "https://lorempixel.com/580/250?blur",
        // "https://source.unsplash.com/random/580x250",
        "https://source.unsplash.com/1600x900/?poster,movie",
        "https://source.unsplash.com/1920x1080/?poster,movie",
        "https://source.unsplash.com/580x250/?poster,movie",
        "https://source.unsplash.com/1280x720/?poster,movie",
        "https://source.unsplash.com/500x500/?poster,movie"
      ],
      trailerUrls: [
        "http://www.youtube.com/embed/ECewrAld3zw",
        "http://www.youtube.com/embed/TZE9gVF1QbA",
        "http://www.youtube.com/embed/bCM3clq-_c0"
      ]
    };
  },
  components: {
    Movie
  },
  methods: {
    ...mapActions(["fetchUpcomingMovies"])
  },
  mounted() {
    $(document).ready(function() {
      $(".slider").slider({
        interval: 5000
      });
    });
  },
  computed: {
    ...mapGetters(["limitedMovies"])
  },
  created() {
    this.fetchUpcomingMovies();
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
.slider {
  margin-bottom: 2.5rem;
}
.slider .indicators .indicator-item.active {
  background-color: #27a699;
}
.flex-it {
  display: flex;
  flex-wrap: wrap;
}
.flex-it:after {
  content: "";
  flex: auto;
}
/* .container {
  margin: 1em 5em;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-column-gap: 25px;
}
.filters {
  grid-row-start: 1;
  grid-row-end: 3;
  display: grid;
  grid-row-gap: 10px;
}
.content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
}
.search {
  grid-column: 1/6;
} */
</style>