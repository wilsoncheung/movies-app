<template>
  <!-- <div id="search-bar" class="container row">
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
  </div> -->
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    item-value="API"
    placeholder="Search movies..."
    prepend-icon="mdi-database-search"
    return-object
  ></v-autocomplete>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "SearchBar",
  data() {
    return {
      query: "",
      model: null,
      isLoading: false,
      descriptionLimit: 60
    };
  },
  methods: {
    ...mapActions(["searchMovies"])
  },
  computed: {
    ...mapGetters(["searchResults"]),
    items() {
      return this.searchResults.map(entry => {
        const title = entry.title;
        return Object.assign({}, entry, { title });
      });
    }
  },
  watch: {
    search(val) {
      console.log("autocomplete watching!");
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;
      // this.searchMovies(val);
    }
  }
  // created() {
  //   let options = {
  //     data: {
  //       Apple: null,
  //       Microsoft: null,
  //       Google:
  //         "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
  //       Good: "https://placehold.it/250x250"
  //     },
  //     limit: 10,
  //     onAutocomplete: displayAlert()
  //   };
  //   function displayAlert() {
  //     return function(text) {
  //       this.searchMovies(text);
  //     };
  //   }
  //   $(document).ready(function() {
  //     $("input.autocomplete").autocomplete(options);
  //   });
  // }
};
</script>

<style>
/* #search-bar > form > .row {
  margin-bottom: 0 !important;
} */
</style>