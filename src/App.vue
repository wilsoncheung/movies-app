<template>
  <div id="app">
    <Header />
    <router-view class="mid-content" />
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
html,
body {
  height: 100%;
}
#app {
  color: #2c3e50;
  /* display: grid;
  min-height: 100%;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%; */
  display: flex;
  flex-direction: column;
  height: 100%;
}
.mid-content {
  flex: 1 0 auto;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
