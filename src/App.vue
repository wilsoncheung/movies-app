<template>
  <div id="app">
    <Header />
    <transition
      name="router-animation"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view class="mid-content" />
    </transition>
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
  margin-top: 65px;
}
a {
  color: #27a699;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
  color: #33d6c5;
}
.sidenav-overlay {
  z-index: 1; /*Was in the background*/
}
.pointer {
  cursor: pointer;
}
</style>
