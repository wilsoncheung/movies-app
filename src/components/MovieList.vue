<template>
  <div class="container">
    <h2>Popular</h2>
    <div class="movies">
      <div class="row">
        <div v-for="movie in allMovies" :key="movie.id" class="movie">
          <div class="col s12 m2 l2">
            <div class="card hoverable">
              <div class="card-image">
                <img
                  class="activator"
                  :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                />
                <span
                  class="btn-floating halfway-fab waves-effect waves-light center-align"
                >
                  <span class="text-center">{{ movie.vote_average }}</span>
                </span>
              </div>
              <div class="card-content">
                <span class="card-title activator">
                  <p class="valign-wrapper row" title="Vote Count">
                    <i class="material-icons">people_outline</i>:
                    {{ movie.vote_count }}
                  </p>
                  <p class="valign-wrapper row" title="Release Date">
                    <i class="material-icons">today</i>:
                    {{ movie.release_date | moment }}
                  </p>
                </span>
              </div>
              <div class="card-reveal">
                <span class="card-title">
                  <i class="material-icons right">close</i>
                </span>
                <p>{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "MovieList",
  methods: {
    ...mapActions(["fetchMovies"])
  },
  filters: {
    moment: function(date) {
      return moment(date).format("MM/DD/YY");
    }
  },
  computed: mapGetters(["allMovies"]),
  created() {
    this.fetchMovies();
  }
};
</script>

<style scoped>
.card:hover {
  cursor: pointer;
}
.card .card-title {
  font-size: 17px;
  font-weight: bold;
}
.card .card-content {
  padding: 10px;
}
.btn-floating.halfway-fab {
  position: absolute;
  right: 10px;
  bottom: -20px;
}
.card .card-reveal {
  padding: 15px;
}
.card .card-reveal > p {
  padding-top: 15px;
}
</style>