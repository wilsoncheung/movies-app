import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import MovieList from "@/components/MovieList";
import MovieDetails from "@/components/MovieDetails";
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
      component: MovieDetails
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});
