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
            v-model="query"
            v-on:keyup="search()"
          />
          <label for="autocomplete-input"></label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SearchBar",
  data() {
    return {
      query: "",
      selectedItem: ""
    };
  },
  methods: {
    ...mapActions(["searchMovies"]),
    goToMovie(val) {
      // console.log(val);
      this.$router.push({ name: "MovieDetails", params: { id: val.id } });
    },
    search: function() {
      var self = this; // set the Vue 'this' so it can used inside jquery function later

      self.searchMovies(self.query);

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

      $(".autocomplete").autocomplete("open");

      // let elems = document.querySelectorAll(".autocomplete");
      // let instances = M.Autocomplete.init(elems, { data: {}, limit: 10 });
      // instances[0].updateData(results);
      // instances[0].open();
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
</style>