<template>
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
          {{ movie.release_date }}
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
</template>

<script>
import moment from "moment";

export default {
  name: "Movie",
  props: ["theMovie"],
  computed: {
    movie() {
      this.theMovie.release_date = moment(this.theMovie.release_date).format(
        "MM/DD/YY"
      );
      return this.theMovie;
    }
  }
};
</script>

<style>
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