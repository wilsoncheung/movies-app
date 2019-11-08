import axios from 'axios';
import _ from 'lodash';

const state = {
    movies: []
};

const getters = {
    allMovies: (state) => state.movies,
    limitedMovies: (state) => num => {
        // Add check here cause route changes, is too quick for states to be changed...idk further RnD required
        if (state.movies.results) {
            let filteredMovies = state.movies.results.filter(movie => movie.poster_path != null && movie.popularity > 10);
            filteredMovies = _.orderBy(filteredMovies, 'popularity', 'desc').slice(0, num);
            filteredMovies = _.orderBy(filteredMovies, 'release_date')
            return filteredMovies;
        }
    }
};

const actions = {
    async fetchPopularMovies({ commit }) {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ef7291a469f1ea67c2f23af1c31deb42');
        commit('setMovies', response.data);
    },
    async fetchPopularMoviesByPage({ commit }, pageNum) {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=ef7291a469f1ea67c2f23af1c31deb42&sort_by=popularity.desc&page=' + pageNum);
        commit('setMovies', response.data);
    },
    async fetchUpcomingMovies({ commit }) {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=ef7291a469f1ea67c2f23af1c31deb42&language=en-US&page=1&region=US');
        commit('setMovies', response.data);
    }
};

const mutations = {
    // movies here is the 'response.data' in actions
    setMovies: (state, movies) => (state.movies = movies)
    // setUpcomingMovies(state, movies) {
    //     let filteredMovies = movies.results.filter(movie => movie.poster_path != null && movie.popularity > 10);
    //     filteredMovies = _.orderBy(filteredMovies, 'popularity', 'desc').slice(0, 6);
    //     state.movies = _.orderBy(filteredMovies, 'release_date')
    // }
};

export default {
    state,
    getters,
    actions,
    mutations
};