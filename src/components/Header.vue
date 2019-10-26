<template>
  <header>
      <div class="logo">
          <router-link to="/">
            <i class="fas fa-film fa-3x"></i>
            <span class="site-name"> Movie App </span>
          </router-link>
      </div>
      <router-link to="list">List</router-link>
  </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>
header {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: black;
    color: white;
    height: 5vh;
    /* margin: 0 auto; */
}
a {
    display: flex;
    align-items: center;
}
a:hover {
    text-decoration: none !important;
    color: gray;
}
.logo {
    display: flex;
    align-items: center;
    padding: 0 5em 0 7em;
}
.site-name {
    font-size: 25px;
    padding: 0 10px;
}
</style>