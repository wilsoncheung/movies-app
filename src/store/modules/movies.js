import axios from 'axios';

const state = {
    movies: []
};

const getters = {
    allMovies: (state) => state.movies
};

const actions = {
    async fetchPopularMovies({ commit }) {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ef7291a469f1ea67c2f23af1c31deb42');
        commit('setMovies', response.data);
    },
    async fetchPopularMoviesByPage({ commit }, pageNum) {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=ef7291a469f1ea67c2f23af1c31deb42&sort_by=popularity.desc&page=' + pageNum);
        commit('setMovies', response.data);
    }
};

const mutations = {
    // movies here is the 'response.data' in actions
    setMovies: (state, movies) => (state.movies = movies)
};

export default {
    state,
    getters,
    actions,
    mutations
};