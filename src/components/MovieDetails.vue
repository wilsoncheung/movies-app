<template>
  <div>
    <h3>Movie Details</h3>
    {{ id }}
    {{ movieDetails }}
    {{ trailer }}
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "MovieDetails",
  props: ["id"],
  methods: {
    ...mapActions(["fetchMovieDetails"])
  },
  computed: {
    // ...mapState(["movieDetails", "trailers"])

    //...mapGetters(["movieDetails", "trailers"])

    // movieDetails() {
    //   return this.$store.state.movies.movieDetails;
    // }

    // Have to do it this way since our vuex store is in modules
    ...mapState({
      movieDetails: state => state.movies.movieDetails,
      trailer: state => state.movies.trailer
    })
  },
  created() {
    this.fetchMovieDetails(this.id);
  }
};
</script>

<style>
</style>