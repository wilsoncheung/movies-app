import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import MovieList from "@/components/MovieList";
import MovieDetails from "@/components/MovieDetails";
import PersonDetails from "@/components/PersonDetails"
import NotFound from "@/components/NotFound";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/popular",
      name: "Popular",
      component: MovieList
    },
    {
      path: "/movie/:id",
      name: "MovieDetails",
      props: true,
      component: MovieDetails,
      // https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard
      beforeEnter: (to, from, next) => {
        //console.log('Entering Component!')
        next()
      }
    },
    {
      path: "/person/:personId",
      name: "PersonDetails",
      props: true,
      component: PersonDetails,
      beforeEnter: (to, from, next) => {
        next()
      }
    },
    {
      path: "*",
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});
