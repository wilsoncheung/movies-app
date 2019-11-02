<template>
  <div class="container">
    <h2>Popular</h2>
    <div class="movies">
      <div class="row center-align">
        <ul class="pagination">
          <li
            :class="[
              this.currentPage !== this.minPage ? 'waves-effect' : 'disabled'
            ]"
          >
            <a>
              <i class="material-icons" @click="previousPage">chevron_left</i>
            </a>
          </li>
          <li
            :class="[currentPage !== index ? 'waves-effect' : 'active']"
            v-for="index in 10"
            :key="index"
          >
            <a @click="loadPage(index)">{{ index }}</a>
          </li>
          <li
            :class="[
              this.currentPage !== this.maxPage ? 'waves-effect' : 'disabled'
            ]"
          >
            <a>
              <i class="material-icons" @click="nextPage">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
      <div class="row ">
        <div
          class="col s12 m4 l2 center-align"
          v-for="movie in allMovies.results"
          :key="movie.id"
        >
          <Movie :theMovie="movie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Movie from "./Movie.vue";

export default {
  name: "MovieList",
  data() {
    return {
      currentPage: 1,
      minPage: 1,
      maxPage: 10
    };
  },
  components: {
    Movie
  },
  methods: {
    ...mapActions(["fetchPopularMovies", "fetchPopularMoviesByPage"]),
    loadPage(pageNumClicked) {
      if (pageNumClicked !== this.currentPage) {
        this.currentPage = pageNumClicked;
        this.fetchPopularMoviesByPage(pageNumClicked);
      }
    },
    previousPage() {
      if (this.currentPage > this.minPage) {
        this.currentPage -= 1;
        this.fetchPopularMoviesByPage(this.currentPage);
      }
    },
    nextPage() {
      if (this.currentPage < this.maxPage) {
        this.currentPage += 1;
        this.fetchPopularMoviesByPage(this.currentPage);
      }
    }
  },
  computed: {
    ...mapGetters(["allMovies"])
  },
  created() {
    this.fetchPopularMovies();
    window.addEventListener("keydown", e => {
      //console.log(e);
      if (e.key == "ArrowLeft" || e.keyCode == "37") {
        this.previousPage();
      }
      if (e.key == "ArrowRight" || e.keyCode == "39") {
        this.nextPage();
      }
    });
  }
};
</script>

<style>
/* @media screen and (min-width: 993px) {
  .fix-height {
    height: 27rem;
  }
} */
/* .mb-45 {
  margin-bottom: 45px;
} */
</style>