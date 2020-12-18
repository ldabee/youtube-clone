
export enum MediasTyp {
  fetchAll = "fetchAll",
  getAllGenres = "getAllGenres",
  getAllGenresSuccess = "getAllGenresSuccess",
  getAllMedias = "getAllMedias",
  setOneMedia = "setOneMedia",
  getOneMedia = "getOneMedia",
  mediasByCategory = "mediasByCategory",
  searchKey = "searchKey"
}

export type IMediasActionType =
  | { type: MediasTyp.fetchAll, page: number }
  | { type: MediasTyp.getAllGenres }
  | { type: MediasTyp.getAllGenresSuccess, genres: Genre[] }
  | { type: MediasTyp.getAllMedias, medias: IMedia[] }
  | { type: MediasTyp.setOneMedia, selectedMedia: number }
  | { type: MediasTyp.getOneMedia, mediaInfo: ISelectedMedia }
  | { type: MediasTyp.mediasByCategory, Category: Genre }
  | { type: MediasTyp.searchKey, keyword: string };


export interface IMedias {
  medias: IMedia[];
  selectedMedia: number;
  mediaInfo: ISelectedMedia;
  Category: Genre;
  keyword: string;
  genres: Genre[];
}

export const initialStateMedias: IMedias = {
  medias: [],
  selectedMedia: 0,
  mediaInfo: {} as ISelectedMedia,
  Category: {} as Genre,
  keyword: "",
  genres: []
}

export interface IMedia {
  id: number;
  video: boolean;
  videoID?: string;
  vote_count: number;
  vote_average: number;
  title: string;
  release_date: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  poster_path: string;
  popularity: number;
  media_type: string;
  name: string;
}

export interface ISelectedMedia {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Productioncompany[];
  production_countries: Productioncountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Spokenlanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos?: IVideos[];
  vote_average: number;
  vote_count: number;

}

interface Spokenlanguage {
  iso_639_1: string;
  name: string;
}

interface Productioncountry {
  iso_3166_1: string;
  name: string;
}

interface Productioncompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Genre {
  id: number;
  name: string;
}

interface IVideos {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string
}
