<template>
  <div class="container person-details">
    <div class="row">
      <div class="col s12 m4 l4">
        <img
          class="responsive-img"
          :src="
            'https://image.tmdb.org/t/p/original' +
              this.personDetails.profile_path
          "
        />
        <div class="row center">
          <a
            class="col s3 l3"
            v-if="this.personDetails.external_ids.imdb_id"
            :href="
              'https://www.imdb.com/name/' +
                this.personDetails.external_ids.imdb_id
            "
            ><i class="fab fa-imdb fa-3x"></i
          ></a>
          <a
            class="col s3 l3"
            v-if="this.personDetails.external_ids.instagram_id"
            :href="
              'https://www.instagram.com/' +
                this.personDetails.external_ids.instagram_id
            "
            ><i class="fab fa-instagram fa-3x"></i
          ></a>
          <a
            class="col s3 l3"
            v-if="this.personDetails.external_ids.twitter_id"
            :href="
              'https://twitter.com/' +
                this.personDetails.external_ids.twitter_id
            "
            ><i class="fab fa-twitter-square fa-3x"></i
          ></a>
          <!-- <a
            class="col l3"
            :href="
              'https://www.facebook.com/' +
                this.personDetails.external_ids.facebook_id
            "
            ><i class="fab fa-facebook-square fa-4x"></i
          ></a> -->
          <a
            class="col s3 l3"
            :href="
              'https://en.wikipedia.org/wiki/' +
                this.$helpers.underscoreText(this.personDetails.name)
            "
            ><i class="fab fa-wikipedia-w fa-3x"></i
          ></a>
        </div>
      </div>
      <div class="col s12 m8 l8">
        <h3 class="bold-text mt-0">{{ this.personDetails.name }}</h3>
        <span v-for="(r, index) in roles" :key="index">
          <span class="chip">{{ r }}</span>
        </span>
        <ul class="details-list">
          <li class="row">
            <div class="col l4">
              <span class="bold-text">Birthday</span><br />
              {{ this.personDetails.birthday | toDateString }}
              <span class="subtext" v-if="!this.personDetails.deathday">
                ({{ this.personDetails.birthday | toYears }} years old)
              </span>
            </div>
            <div class="col l8" v-if="this.personDetails.deathday">
              <span class="bold-text" v-if="this.personDetails.deathday"
                >Death</span
              ><br />
              {{ this.personDetails.deathday | toDateString }}
              <span class="subtext"> ({{ ageAtDeath }} years old) </span>
            </div>
          </li>
          <li>
            <span class="bold-text">Place of Birth</span><br />
            {{ this.personDetails.place_of_birth || "???" }}
          </li>
          <br />
        </ul>
        <span class="bold-text">Biography</span><br />
        <p>
          {{ this.personDetails.biography || "???" }}
        </p>
        <br />
      </div>
    </div>
    <h4 class="bold-text center-align">Known For</h4>
    <div class="row flex-it">
      <div
        class="col s6 m4 l2 center-align"
        v-for="movie in moviesKnownFor(12)"
        :key="movie.id"
      >
        <MovieCard :theMovie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import MovieCard from "./MovieCard.vue";
import moment from "moment";

export default {
  name: "PersonDetails",
  props: ["personId"],
  components: {
    MovieCard
  },
  methods: {
    ...mapActions(["getPersonDetails"])
  },
  computed: {
    ...mapState({
      personDetails: state => state.movies.personDetails
    }),
    ...mapGetters(["moviesKnownFor", "roles"]),
    ageAtDeath() {
      let birthday = moment(this.personDetails.birthday);
      let deathday = moment(this.personDetails.deathday);
      return deathday.diff(birthday, "years");
    }
  },
  created() {
    this.getPersonDetails(this.personId);
  }
};
</script>

<style>
.person-details {
  margin-top: 85px !important;
}
.mt-0 {
  margin-top: 0;
}
</style>