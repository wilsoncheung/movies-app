<template>
  <div class="container">
    <h2>Popular</h2>
    <div class="movies">
      <div class="row center-align">
        <ul class="pagination">
          <!-- <li class="waves-effect">
            <a href=""><i class="material-icons">chevron_left</i></a>
          </li> -->
          <li class="waves-effect" v-for="index in 10" :key="index">
            <a @click="nextPage(index)">{{ index }}</a>
          </li>
          <!-- <li class="waves-effect">
            <a href=""><i class="material-icons">chevron_right</i></a>
          </li> -->
        </ul>
      </div>
      <div class="row">
        <div
          class="col s12 m4 l2"
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
      pageNum: 1
    };
  },
  components: {
    Movie
  },
  methods: {
    ...mapActions(["fetchPopularMovies", "fetchPopularMoviesByPage"]),
    nextPage(pageNum) {
      this.fetchPopularMoviesByPage(pageNum);
    }
  },
  computed: {
    ...mapGetters(["allMovies"])
  },
  created() {
    this.fetchPopularMovies();
  }
};
</script>

<style scoped>
</style>