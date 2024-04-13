import axios from 'axios'
import {apiKey} from '../constants'

//Endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`

// dynamic endpoints https://api.themoviedb.org/3/movie/movie_id https://api.themoviedb.org/3/movie/movie_id/credits 'https://api.themoviedb.org/3/movie/movie_id/similar'
const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`

const personDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null; 
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342${path}` : null; 
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185${path}` : null; 

export const fallbackMoviePoster = `https://www.freepik.com/icon/user_2102647#fromView=keyword&page=1&position=12&uuid=4664a4df-ed95-4848-9009-e07491c6e04a`;

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    }

    try {
        const respone = await axios.request(options);
        return respone.data;
    } catch (error) {
        console.log('error', error);
        return {}
    }
}

export const fetchTrendingMovies =  () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies =  () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies =  () => {
    return apiCall(topRatedMoviesEndpoint);
}

// dynamic endpoints
export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id));
}
export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id));
}
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id));
}

