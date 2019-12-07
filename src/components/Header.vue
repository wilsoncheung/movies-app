<template>
  <div class="navbar-fixed">
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
      <li>
        <router-link to="/">
          <i class="material-icons">home</i>Home
        </router-link>
      </li>
      <li>
        <router-link to="/popular">
          <i class="material-icons">movie_filter</i>Popular Movies
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header"
};

$(document).ready(function() {
  $(".sidenav").sidenav();
});
</script>

<style>
nav {
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
}
</style>