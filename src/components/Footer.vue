<template>
  <footer class="page-footer">
    <div class="container">
      <div class="row center">
        <a href="https://www.themoviedb.org/">
          <img
            class="col s6 l2 offset-l5 offset-s3"
            src="https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg"
          />
        </a>
      </div>
      <div class="row center">
        <a class="" href="https://github.com/wilsoncheung">
          <i class="fab fa-github fa-2x"></i>
        </a>
        <a
          class="pl-3"
          href="https://www.linkedin.com/in/wilson-cheung-1347b549/"
        >
          <i class="fab fa-linkedin-in fa-2x"></i>
        </a>
        <a class="pl-3" href="https://wilsoncheung.github.io/">
          <i class="fas fa-portrait fa-2x"></i>
        </a>
      </div>
    </div>
    <div class="footer-copyright center-align">
      <div class="container bold-text">
        © Copyright {{ new Date().getFullYear() }}
        <div>
          <a href="https://www.linkedin.com/in/wilson-cheung-1347b549/"
            >Wilson Cheung</a
          >
        </div>
        <!-- <a class="grey-text text-lighten-4 right" href="#!">More Links</a> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
footer {
  background-color: black !important;
  color: #28d4c2 !important;
}
.page-footer .footer-copyright {
  color: #28d4c2 !important;
  background-color: black !important;
}
.pl-3 {
  padding-left: 3rem;
}
</style>