<template>
  <div class="container movie-details">
    <blockquote>
      <h3 class="movie-details-title">
        {{ movieDetails.title }}
        <span class="subtext grey-text text-darken-2"> ({{ year }}) </span>
      </h3>
      <div class="row">
        <div class="col l1 valign-wrapper">
          <i class="material-icons">access_time</i>
          <span title="Duration">
            {{ convertToDuration(movieDetails.runtime) }}
          </span>
        </div>
        <div class="col l2 valign-wrapper">
          <i class="material-icons">today</i>
          <span title="Release Date">
            {{ movieDetails.release_date | toDateString }}
          </span>
        </div>
        <div class="col l4 valign-wrapper">
          <i class="material-icons">star</i>
          <span title="Rating">{{ movieDetails.vote_average || "?" }}</span>
        </div>
      </div>
    </blockquote>

    <div class="row">
      <div class="col s12 l3">
        <img
          class="materialboxed responsive-img"
          :data-caption="movieDetails.tagline"
          :src="
            'https://image.tmdb.org/t/p/original' + movieDetails.poster_path
          "
        />
        <div class="row bold-text">
          <div class="col l4 offset-l2 valign-wrapper">
            <i class="material-icons">people_outline</i>
            <span title="Vote Count">{{ movieDetails.vote_count || "?" }}</span>
          </div>
          <div class="col l4 valign-wrapper">
            <i class="material-icons">trending_up</i>
            <span title="Popularity Score">{{
              movieDetails.popularity || "?"
            }}</span>
          </div>
        </div>
      </div>
      <div class="col s12 l8">
        <div class="video-container">
          <iframe
            width="100%"
            height="520"
            :src="trailer"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col l12">
        <div class="container">
          <div class="movie-summary">
            <span v-for="genre in movieDetails.genres" :key="genre.id">
              <span class="new badge" data-badge-caption="">{{
                genre.name
              }}</span>
            </span>
            <h5 class="bold-text">Summary</h5>
            <p>{{ movieDetails.overview }}</p>
          </div>
          <div class="movie-finances row">
            <div class="col l2">
              <h6 class="bold-text">Budget:</h6>
              <span>
                {{ movieDetails.budget | toCurrency }}
              </span>
            </div>
            <div class="col l2">
              <h6 class="bold-text">Revenue:</h6>
              <span :title="netProfit | toCurrency">
                {{ movieDetails.revenue || "?" | toCurrency }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "MovieDetails",
  props: ["id"],
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchMovieDetails"]),

    formatDate(date) {
      return moment(date).format("MM/DD/YY");
    },

    convertToDuration(minutes) {
      return minutes
        ? Math.floor(minutes / 60) + "h " + (minutes % 60) + "min"
        : "??";
    }
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
    }),

    netProfit() {
      return this.movieDetails.revenue - this.movieDetails.budget;
    },

    year() {
      return this.movieDetails.release_date
        ? this.movieDetails.release_date.slice(0, 4)
        : "";
    }
  },
  created() {
    this.fetchMovieDetails(this.id);

    $(document).ready(function() {
      $(".materialboxed").materialbox();
    });
  }
};
</script>

<style>
.material-icons {
  padding-right: 3px;
}
.subtext {
  font-size: 85%;
  font-weight: bold;
}
.bold-text {
  font-weight: bold;
}
.movie-details blockquote {
  margin-bottom: 2em;
}
.movie-details {
  margin-top: 45px !important;
}
.movie-details-title {
  margin-bottom: 0;
}
.movie-details blockquote .row {
  margin: 7px 0;
}
.movie-details blockquote .row .col {
  padding: 0;
}
</style>