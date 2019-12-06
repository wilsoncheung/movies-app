<template>
  <!-- <div class="navbar-fixed">
    <nav class="nav-center">
      <div class="container nav-wrapper">
        <router-link to="/" class="brand-logo">
          <i class="fas fa-film"></i> Movies
        </router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" class=" hide-on-med-and-down">
          <li><router-link to="/popular">Popular</router-link></li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/popular">Popular</router-link></li>
    </ul>
  </div> -->
  <nav>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><i class="fas fa-film"></i> Movies</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: ""
    };
  }
};

// $(document).ready(function() {
//   $(".sidenav").sidenav();
// });
</script>

<style scoped>
/* nav {
  background-color: black;
}
nav.nav-center ul {
  text-align: center;
}
nav.nav-center ul li {
  display: inline;
  float: none;
}
nav.nav-center ul li a {
  display: inline-block;
}
a:hover {
  text-decoration: none !important;
  color: gray;
}
nav a {
  color: #28d4c2 !important;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
  color: #27a699 !important;
} */
</style>