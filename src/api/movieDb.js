import axios from 'axios';

export const tmdbList = () => axios.create({
  baseURL: 'https://api.themoviedb.org/3/trending/all/week',
  params: {
    api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
    maxResults: 20,
  }
})

export const tmdbSearch = () => axios.create({
  baseURL: 'https://api.themoviedb.org/3/search/movie',
  params: {
    api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
    language: 'fr-FR',
    include_adult: false,
  }
})

export const tmdbGetMovieVideo = (id) => axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/${id}/videos`,
  params: {
    api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
    language: 'fr-FR',
  }
})

export const tmdbGetMovieInfo = (id) => axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/${id}`,
  params: {
    api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
    language: 'fr-FR',
  }
})
export const tmdbGetAllGenres = () => axios.create({
  baseURL: `https://api.themoviedb.org/3/genre/movie/list`,
  params: {
    api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
    language: 'fr-FR',
  }
})
