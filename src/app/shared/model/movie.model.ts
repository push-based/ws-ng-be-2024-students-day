export interface TMDBMovieModel {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: string;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}
export interface MovieModel {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
}
