<template>
  <div class="container popular">
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
      <div class="row flex-it">
        <div
          class="col s12 m4 l2 center-align"
          v-for="movie in allPopularMovies"
          :key="movie.id"
        >
          <MovieCard :theMovie="movie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MovieCard from "./MovieCard.vue";

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
    MovieCard
  },
  methods: {
    ...mapActions([
      "fetchPopularMovies",
      "fetchPopularMoviesByPage",
      "resetMovieState"
    ]),
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
    //...mapGetters(["allMovies"])
    ...mapGetters(["allPopularMovies"])
  },
  created() {
    this.resetMovieState();
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
.popular {
  margin-top: 65px;
}
.flex-it {
  display: flex;
  flex-wrap: wrap;
}
.flex-it:after {
  content: "";
  flex: auto;
}
</style>