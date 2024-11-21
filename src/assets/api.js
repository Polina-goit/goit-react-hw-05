import axios from "axios";

const ApiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzJhOWE1MGE4ZDU4M2ZjOTIyYTI4NmQ0MTJiYzRmYyIsIm5iZiI6MTczMjA1MTQwNi43NjUwMjYsInN1YiI6IjY3M2NkYmZjMTlhYzMyY2ViMWJkMzkwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.brnFR52fY4Rv2klDGEJVCsmPRF_EHSLlj9ykTPSEdQE";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const options = {
  headers: {
    Authorization: `Bearer ${ApiToken}`,
  },
};
export const fetchMovies = async () => {
  const response = await axios(`trending/movie/day`, options);
  return response.data.results;
};

export const fetchMovieById = async (movieId) => {
  const response = await axios(`/movie/${movieId}`, options);
  return response.data;
};

