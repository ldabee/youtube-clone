import React, { createContext, useReducer, useEffect } from 'react';
import { IMedias, IMediasActionType, initialStateMedias, MediasTyp } from '../model/IMedia';

import { tmdbGetAllGenres, tmdbGetMovieInfo, tmdbGetMovieVideo, tmdbList, tmdbSearch } from '../api/movieDb';
import _ from 'lodash';



const reducerMedias = (state: IMedias = initialStateMedias, action: IMediasActionType): IMedias => {
  switch (action.type) {
    case MediasTyp.getAllMedias:
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
    case MediasTyp.searchKey:
      return {
        ...state,
        keyword: action.keyword
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
      case MediasTyp.fetchAll:
        if (MediasState.keyword !== "") {
          const response = await tmdbSearch.get('', { params: { query: MediasState.keyword } });
          dispatch({ type: MediasTyp.getAllMedias, medias: response.data.results });
        } else {
          const response = await tmdbList(action.page).get('', { params: {} });
          let res = _.orderBy(response.data.results, t => t.vote_count, "asc");
          dispatch({ type: MediasTyp.getAllMedias, medias: res });
        }
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

      default: dispatch(action)
    }
  }

  useEffect(() => {
    Dispatch({ type: MediasTyp.fetchAll, page: 1 })
    Dispatch({ type: MediasTyp.getAllGenres })
  }, [MediasState.Category])

  return (
    <MediasContext.Provider value={{ state: MediasState, dispatch: Dispatch }}>
      {props.children}
    </MediasContext.Provider>
  )
}


export { MediasContext, MediasContextProvider }