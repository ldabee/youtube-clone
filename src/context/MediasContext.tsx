import React, { createContext, useReducer, useEffect } from 'react';
import { Genre, IMedia, ISelectedMedia, ITVShows } from '../model/IMedia';

import { tmdbGetAllGenres, tmdbGetMovieInfo, tmdbGetMovieVideo, tmdbGetTVShows, tmdbList, tmdbSearch } from '../api/movieDb';
import _ from 'lodash';

export interface IMedias {
  medias: IMedia[];
  selectedMedia: number;
  mediaInfo: ISelectedMedia;
  Category: Genre;
  keyword: string;
  genres: Genre[];
  TVShows: ITVShows[];
  choice: string;

}

export const initialStateMedias: IMedias = {
  medias: [],
  selectedMedia: 0,
  mediaInfo: {} as ISelectedMedia,
  Category: {} as Genre,
  keyword: "",
  genres: [],
  TVShows: [],
  choice: 'Movies'
}

export enum MediasTyp {
  getAllGenres = "getAllGenres",
  getAllGenresSuccess = "getAllGenresSuccess",
  getAllMedias = "getAllMedias",
  getAllMediasSuccess = "getAllMediasSuccess",
  getAllMediaBySearch = "getAllMediaBySearch",
  setOneMedia = "setOneMedia",
  getOneMedia = "getOneMedia",
  mediasByCategory = "mediasByCategory",
  getAllTVShows = "getAllTVShows",
  getAllTVShowsSuccess = "getAllTVShowsSuccess",
  setChoice = "setChoice"
}

export type IMediasActionType =
  | { type: MediasTyp.getAllMedias }
  | { type: MediasTyp.getAllMediasSuccess, medias: IMedia[] }
  | { type: MediasTyp.getAllMediaBySearch, keyword: string }
  | { type: MediasTyp.getAllGenres }
  | { type: MediasTyp.getAllGenresSuccess, genres: Genre[] }
  | { type: MediasTyp.setOneMedia, selectedMedia: number }
  | { type: MediasTyp.getOneMedia, mediaInfo: ISelectedMedia }
  | { type: MediasTyp.mediasByCategory, Category: Genre }
  | { type: MediasTyp.getAllTVShows }
  | { type: MediasTyp.getAllTVShowsSuccess, TVShows: ITVShows[] }
  | { type: MediasTyp.setChoice, Choice: string }

const reducerMedias = (state: IMedias = initialStateMedias, action: IMediasActionType): IMedias => {
  switch (action.type) {
    case MediasTyp.getAllMediasSuccess:
      return {
        ...state,
        medias: action.medias
      }
    case MediasTyp.getAllGenresSuccess:
      return {
        ...state,
        genres: action.genres
      }
    case MediasTyp.mediasByCategory:
      return {
        ...state,
        Category: action.Category
      }
    case MediasTyp.setOneMedia:
      return {
        ...state,
        selectedMedia: action.selectedMedia,
      }
    case MediasTyp.getOneMedia:
      return {
        ...state,
        mediaInfo: action.mediaInfo
      }
    case MediasTyp.getAllTVShowsSuccess:
      return {
        ...state,
        TVShows: action.TVShows
      }
    case MediasTyp.setChoice:
      return {
        ...state,
        choice: action.Choice
      }
    default:
      return state
  }
}

interface defaultValue {
  state: IMedias;
  dispatch: (action: IMediasActionType) => void;
}

const MediasContext = createContext<defaultValue>({
  state: initialStateMedias,
  dispatch: () => { }
})

const MediasContextProvider = (props: any): JSX.Element => {
  const [MediasState, dispatch] = useReducer(reducerMedias, initialStateMedias);

  const Dispatch = async (action: IMediasActionType) => {
    switch (action.type) {
      case MediasTyp.getAllMedias:
        const responseForAll = await tmdbList().get('', { params: {} });
        // let res = _.orderBy(responseForAll.data.results, t => t.vote_count, "asc");
        dispatch({ type: MediasTyp.getAllMediasSuccess, medias: responseForAll.data.results });
        break;
      case MediasTyp.getAllMediaBySearch:
        const responseBySearch = await tmdbSearch().get('', { params: { query: action.keyword } });
        dispatch({ type: MediasTyp.getAllMediasSuccess, medias: responseBySearch.data.results })
        break;
      case MediasTyp.setOneMedia:
        const response = await tmdbGetMovieVideo(action.selectedMedia).get('', { params: {} });
        let videos = response.data.results;
        const response2 = await tmdbGetMovieInfo(action.selectedMedia).get('', { params: {} });
        let res2 = response2.data;
        dispatch({ type: MediasTyp.getOneMedia, mediaInfo: { videos, ...res2 } });
        break;
      case MediasTyp.getAllGenres:
        const responseGenres = await tmdbGetAllGenres().get('', { params: {} });
        let resGenres = responseGenres.data.genres;
        dispatch({ type: MediasTyp.getAllGenresSuccess, genres: resGenres })
        break;
      case MediasTyp.getAllTVShows:
        const responseTVShows = await tmdbGetTVShows().get('', { params: {} });
        let resTVShows = responseTVShows.data.results;
        dispatch({ type: MediasTyp.getAllTVShowsSuccess, TVShows: resTVShows })
        break;

      default: dispatch(action)
    }
  }

  useEffect(() => {
    Dispatch({ type: MediasTyp.getAllMedias })
    Dispatch({ type: MediasTyp.getAllGenres })
  }, [MediasState.Category])

  return (
    <MediasContext.Provider value={{ state: MediasState, dispatch: Dispatch }}>
      {props.children}
    </MediasContext.Provider>
  )
}


export { MediasContext, MediasContextProvider }