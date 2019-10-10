`<template>
  <div id="app">
    <Header />
    <div class="container">
      <div class="filters">
        <div>1 things</div>
        <div>2 things</div>
        <div>3 things</div>
        <div>4 things</div>
      </div>
      <div class="content">
        <div class="search">5 things</div>
        <div>6 things</div>
        <div>7 things</div>
        <div>8 things</div>
        <div>9 things</div>
        <div>10 things</div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
html, body {
    width: 100%;
    height: 100%;
}
body {
  margin: 0;
  font-size: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  min-height: 100%;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.container {
  margin: 1em 5em;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-column-gap: 25px;
}
.filters {
  /* grid-row-start: 1;
  grid-row-end: 3; */
  display: grid;
  grid-row-gap: 10px;
}
.content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
}
.search {
  grid-column: 1/6;
}
</style>
