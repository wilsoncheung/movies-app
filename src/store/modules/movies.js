import axios from 'axios';

const state = {
    movies: []
};

const getters = {
    allMovies: (state) => state.movies
};

const actions = {
    async fetchMovies({ commit }) {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ef7291a469f1ea67c2f23af1c31deb42');
        commit('setMovies', response.data.results);
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