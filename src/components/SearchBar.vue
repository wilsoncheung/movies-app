<template>
  <div id="search-bar" class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">search</i>
          <input
            type="text"
            id="autocomplete-input"
            class="autocomplete"
            placeholder="Search"
            v-model="searchQuery"
          />
          <p class="ml-3">{{ coolText }}</p>
          <label for="autocomplete-input"></label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
      selectedItem: "",
      coolText: ""
    };
  },
  // Use "Watchers" when you want to perform asynchronous/ expensive opertions
  // in reponse to changing data (aka in our case calling api based on every letter typed by user input..)
  // https://vuejs.org/v2/guide/computed.html#Watchers
  watch: {
    // whenever "searchQuery" changes this runs..(must be the same name as the v-model)
    searchQuery() {
      this.coolText = "Typing...";
      this.debounceGetSearchResults();
    }
  },
  created() {
    // using lodash "debounce" to limit expensive api calls
    this.debounceGetSearchResults = _.debounce(this.search, 500);
  },
  methods: {
    ...mapActions(["searchMovies"]),
    goToMovie(val) {
      this.$router.push({ name: "MovieDetails", params: { id: val.id } });
    },
    search: function() {
      var self = this; // set the Vue 'this' so it can used inside jquery function later
      self.searchMovies(self.searchQuery);

      let results = {};

      for (let r of self.searchResults) {
        results[r.title] = null;
      }

      // THIS WAS WHAT CAUSING THE AUTOCOMPLETE-OPTIONS/ DROPDOWN NOT SHOWING...
      // // $(document).ready(function() {
      $("input.autocomplete").autocomplete({
        data: results,
        limit: 10,
        onAutocomplete: function(val) {
          let itemSelected = self.searchResults.filter(r => r.title === val)[0];
          if (itemSelected) {
            self.goToMovie(itemSelected);
          }
        }
      });
      // // });

      self.coolText = "";
      $(".autocomplete").autocomplete("open");
    }
  },
  computed: {
    ...mapGetters(["searchResults"])
  }
};
</script>

<style>
#search-bar {
  margin-bottom: 0;
}
#search-bar > form > .row {
  margin-bottom: 0 !important;
}
.ml-3 {
  margin-left: 3rem;
}
</style>