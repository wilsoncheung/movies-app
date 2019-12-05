<template>
  <div id="search-bar" class="container row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">search</i>
          <input
            type="text"
            id="autocomplete-input"
            class="autocomplete"
            placeholder="Search"
            v-model="query"
          />
          <label for="autocomplete-input"></label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "SearchBar",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    ...mapActions(["searchMovies"])
  },
  computed: {
    ...mapGetters(["searchResults"])
  },
  created() {
    let options = {
      data: {
        Apple: null,
        Microsoft: null,
        Google:
          "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
        Good: "https://placehold.it/250x250"
      },
      limit: 10,
      onAutocomplete: displayAlert()
    };

    function displayAlert() {
      return function(text) {
        this.searchMovies(text);
      };
    }

    $(document).ready(function() {
      $("input.autocomplete").autocomplete(options);
    });
  }
};
</script>

<style>
#search-bar > form > .row {
  margin-bottom: 0 !important;
}
</style>