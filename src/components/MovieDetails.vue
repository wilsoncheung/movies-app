<template>
  <div class="container movie-details">
    <SearchBar />
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
        <div class="video-container" v-if="trailer.length > 0">
          <iframe
            width="100%"
            height="520"
            :src="trailer"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div class="center-align border-box" v-if="trailer.length === 0">
          <h3>No Available Trailer</h3>
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
            <h4 class="bold-text">Summary</h4>
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
            <div class="col l2 offset-l2">
              <h6 class="bold-text">
                Director<span v-if="crews.Directors.length > 1">s</span>:
              </h6>
              <div v-for="(name, index) in crews.Directors" :key="index">
                {{ name }}
              </div>
            </div>
            <div class="col l2">
              <h6 class="bold-text">
                Writer<span v-if="crews.Writers.length > 1">s</span>:
              </h6>
              <div v-for="(name, index) in crews.Writers" :key="index">
                {{ name }}
              </div>
            </div>
            <div class="col l2">
              <h6 class="bold-text">
                Producer<span v-if="crews.Producers.length > 1">s</span>:
              </h6>
              <div v-for="(name, index) in crews.Producers" :key="index">
                {{ name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <h4 class="bold-text center-align">Casts</h4>
      <div class="col l2" v-for="cast in casts(6)" :key="cast.cast_id">
        <div class="card">
          <div class="card-image">
            <img
              :src="'https://image.tmdb.org/t/p/original' + cast.profile_path"
            />
          </div>
        </div>
        <div class="center-align bold-text">{{ cast.name }}</div>
        <div class="center-align">{{ cast.character }}</div>
      </div>
    </div>

    <div class="row">
      <div class="col l12">
        <div class="container">
          <h4 class="bold-text center-align">Reviews</h4>
          <div v-for="review in reviews(5)" :key="review.id">
            <blockquote>
              <span class="subtext"
                ><u> {{ review.author }} </u> -
              </span>
              <span v-if="!review.showText">
                {{ truncateText(review.content) }}
                <a
                  class="comment-toggle"
                  v-if="review.content.length > commentsLength"
                  @click="$set(review, 'showText', true)"
                >
                  (more)
                </a>
              </span>
              <span v-if="review.showText">
                <span
                  class="comment-toggle"
                  @click="review.showText = !review.showText"
                >
                  {{ review.content }}
                </span>
                <!-- <a class="comment-toggle" @click="review.showText = !review.showText">(less)</a> -->
              </span>
            </blockquote>
          </div>
          <!-- <div class="center-align" v-if="reviews(5)">
            <h5>None</h5>
          </div> -->
        </div>
      </div>
    </div>

    <div class="row">
      <h4 class="bold-text center-align">Similar Movies</h4>
      <div
        class="col s12 m4 l2 center-align"
        v-for="movie in similarMovies(6)"
        :key="movie.id"
      >
        <MovieCard :theMovie="movie" />
      </div>
      <!-- <div class="center-align" v-if="similarMovies(6)">
        <h5>None</h5>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import MovieCard from "./MovieCard.vue";
import SearchBar from "./SearchBar.vue";
import moment from "moment";

export default {
  name: "MovieDetails",
  props: ["id"],
  components: {
    MovieCard,
    SearchBar
  },
  data() {
    return {
      commentsLength: 250
    };
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
    },
    truncateText(text) {
      return text.length <= this.commentsLength
        ? text
        : text.substring(0, this.commentsLength) + "...";
    }
  },
  computed: {
    // movieDetails() {
    //   return this.$store.state.movies.movieDetails;
    // }

    // Have to do it this way since our vuex store is in modules
    ...mapState({
      movieDetails: state => state.movies.movieDetails,
      trailer: state => state.movies.trailer
    }),

    ...mapGetters(["casts", "reviews", "similarMovies"]),

    netProfit() {
      return this.movieDetails.revenue - this.movieDetails.budget;
    },

    year() {
      return this.movieDetails.release_date
        ? this.movieDetails.release_date.slice(0, 4)
        : "";
    },

    crews() {
      let staffs = {
        Directors: [],
        Producers: [],
        Writers: []
      };

      let filteredCrews = this.movieDetails.credits.crew
        .filter(
          c =>
            c.job === "Director" ||
            c.job === "Producer" ||
            c.job === "Writer" ||
            c.job === "Screenplay"
        )
        .map(c => ({ name: c.name, job: c.job }));

      for (let i of filteredCrews) {
        if (i.job.toUpperCase() === "DIRECTOR") {
          staffs.Directors.push(i.name);
        }
        if (i.job.toUpperCase() === "PRODUCER") {
          staffs.Producers.push(i.name);
        }
        if (
          i.job.toUpperCase() === "WRITER" ||
          i.job.toUpperCase() === "SCREENPLAY"
        ) {
          staffs.Writers.push(i.name);
        }
      }

      return staffs;
    }
  },
  created() {
    this.fetchMovieDetails(this.id);

    $(document).ready(function() {
      $(".materialboxed").materialbox();
    });
  },
  // Remember that params or query changes won't trigger enter/leave navigation guards.
  // You can either watch the $route object to react to those changes, or use the
  // beforeRouteUpdate in-component guard.
  beforeRouteUpdate(to, from, next) {
    //console.log("Reusing component!!");
    this.fetchMovieDetails(to.params.id);
    next();
  }
};
</script>

<style>
.material-icons {
  padding-right: 3px;
  color: #27a699;
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
/* .movie-details {
  margin-top: 45px !important;
} */
.movie-details-title {
  margin-bottom: 0;
  margin-top: 0;
}
.movie-details blockquote .row {
  margin: 7px 0;
}
.movie-details blockquote .row .col {
  padding: 0;
}
.comment-toggle:hover {
  cursor: pointer;
}
blockquote {
  margin: 0;
  padding-left: 0.5rem;
  border-left: 5px solid #26a69a !important;
}
.border-box {
  border: 1px solid #27a699;
}
</style>