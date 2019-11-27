import axios from 'axios';
import _ from 'lodash';

// Factory Function, use to reset state
const getDefaultState = () => {
    return {
        //movies: []
        movies: {
            popular: [],
            upcoming: [],
            trending: [],
            nowPlaying: []
        },
        trailer: [],
        movieDetails: {}
    }
}

// const state = {
//     movies: []
// };

// Initial state
const state = () => getDefaultState()

const getters = {
    allPopularMovies: (state) => {
        if (state.movies.popular) {
            let sortedPopularMovies = _.orderBy(state.movies.popular.results, 'popularity', 'desc');
            return sortedPopularMovies;
        }
    },
    trendingMovies: (state) => num => {
        if (state.movies.trending.results) {
            let sortedTrendingMovies = _.orderBy(state.movies.trending.results, 'popularity', 'desc').slice(0, num);
            return sortedTrendingMovies;
        }
    },
    upcomingMovies: (state) => num => {
        // Add check here cause route changes, is too quick for states to be changed...idk further RnD required
        if (state.movies.upcoming.results) {
            let filteredUpcomingMovies = state.movies.upcoming.results.filter(movie => movie.poster_path != null && movie.popularity > 10);
            filteredUpcomingMovies = _.orderBy(_.orderBy(filteredUpcomingMovies, 'popularity', 'desc').slice(0, num), 'release_date');
            return filteredUpcomingMovies;
        }
    },
    trailers: (state) => state.trailer                  // Remove these stupid getters
};

const actions = {
    resetMovieState({ commit }) {
        commit('RESET_STATE')
    },
    async fetchPopularMovies({ commit }) {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ef7291a469f1ea67c2f23af1c31deb42');
        commit('SET_POPULAR_MOVIES', response.data);
    },
    async fetchPopularMoviesByPage({ commit }, pageNum) {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=ef7291a469f1ea67c2f23af1c31deb42&sort_by=popularity.desc&page=' + pageNum);
        commit('SET_POPULAR_MOVIES', response.data);
    },
    async fetchUpcomingMovies({ commit }) {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=ef7291a469f1ea67c2f23af1c31deb42&language=en-US&page=1&region=US');
        commit('SET_UPCOMING_MOVIES', response.data);
    },
    async fetchTrendingMovies({ commit }) {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=ef7291a469f1ea67c2f23af1c31deb42');
        commit('SET_TRENDING_MOVIES', response.data);
    },
    async fetchNowPlayingMovies({ commit }) {
        const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=ef7291a469f1ea67c2f23af1c31deb42&language=en-US&page=1&region=us');
        commit('SET_NOW_PLAYING_MOVIES', response.data);
    },
    async fetchAllHomeContent({ commit, dispatch }) {
        Promise.all([
            dispatch('fetchUpcomingMovies'), dispatch('fetchTrendingMovies'),
        ]).then(([upcomingMovies, trendingMovies]) => {
            if (upcomingMovies && trendingMovies) {
                commit('SET_UPCOMING_MOVIES', upcomingMovies.data);
                commit('SET_TRENDING_MOVIES', trendingMovies.data);
            }
        }).catch((error) => console.log(error));

        // Should be a better way of doing this..
        let response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=ef7291a469f1ea67c2f23af1c31deb42&language=en-US&page=1&region=us');
        let movieIds = _.orderBy(_.orderBy(response.data.results, 'popularity', 'desc'), 'release_date').slice(0, 3).map(m => m.id);
        let nowPlayingTrailerUrls = [];

        for (let i = 0; i < 3; i++) {
            let response = await axios.get('https://api.themoviedb.org/3/movie/' + movieIds[i] + '/videos?api_key=ef7291a469f1ea67c2f23af1c31deb42&language=en-US');
            let videoKey = response.data.results.filter(t => t.type === "Trailer")[0].key;
            let trailerUrl = "https://www.youtube.com/embed/" + videoKey;
            nowPlayingTrailerUrls.push(trailerUrl);
        }
        commit('SET_TRAILER_URL', nowPlayingTrailerUrls);
    },
    async fetchMovieDetails({ commit }, movieId) {
        // let movieDetails = await axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=ef7291a469f1ea67c2f23af1c31deb42&language=en-US')
        // let videoResponse = await axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/videos?api_key=ef7291a469f1ea67c2f23af1c31deb42&language=en-US');
        // let trailerUrl = "https://www.youtube.com/embed/" + videoResponse.data.results.filter(t => t.type === "Trailer")[0].key;

        Promise.all([
            await axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=ef7291a469f1ea67c2f23af1c31deb42&language=en-US').then((response) => response.data),
            await axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/videos?api_key=ef7291a469f1ea67c2f23af1c31deb42&language=en-US').then((response) => response.data)
        ]).then(([movieDetails, videoDetails]) => {
            if (movieDetails && videoDetails) {
                let trailerUrl = "https://www.youtube.com/embed/" + videoDetails.results.filter(t => t.type === "Trailer")[0].key;
                commit('SET_MOVIE_DETAILS', movieDetails);
                commit('SET_TRAILER_URL', trailerUrl);
            }
        }).catch((error) => console.log(error));
    }
};

const mutations = {
    RESET_STATE(state) {
        // Merge rather than replace so we don't lose observers
        // https://github.com/vuejs/vuex/issues/1118
        // https://tahazsh.com/vuebyte-reset-module-state
        Object.assign(state, getDefaultState())
    },
    // movies here is the 'response.data' in actions
    //setMovies: (state, movies) => (state.movies = movies),
    SET_POPULAR_MOVIES: (state, movies) => (
        state.movies.popular = movies
    ),
    SET_UPCOMING_MOVIES: (state, movies) => (
        state.movies.upcoming = movies
    ),
    SET_TRENDING_MOVIES: (state, movies) => (
        state.movies.trending = movies
    ),
    SET_NOW_PLAYING_MOVIES: (state, movies) => (
        state.movies.nowPlaying = movies
    ),
    SET_TRAILER_URL: (state, urls) => (
        state.trailer = urls
    ),
    SET_MOVIE_DETAILS: (state, details) => (
        state.movieDetails = details
    )
};

export default {
    state,
    getters,
    actions,
    mutations
};