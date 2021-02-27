import React, { createContext, useReducer } from 'react';
import { ISelectedTVShow, ITVShow } from '../model/ITVShow';

import { tmdbGetMovieInfo, tmdbGetMovieVideo, tmdbGetTVShows } from '../api/movieDb';
import _ from 'lodash';

export interface ITVShows {
  TVShows: ITVShow[];
  tvsInfo: ISelectedTVShow;
  selectedTVS: number;
}

export const initialStateTVShows: ITVShows = {
  TVShows: [],
  tvsInfo: {} as ISelectedTVShow,
  selectedTVS: 0
}

export enum TVShowTyp {
  getAllTVShows = "getAllTVShows",
  getAllTVShowsSuccess = "getAllTVShowsSuccess",
  setOneTVShow = "setOneTVShow",
  getOneTVShow = "getOneTVShow",
}

export type TVShowActionType =
  | { type: TVShowTyp.getAllTVShows }
  | { type: TVShowTyp.getAllTVShowsSuccess, TVShows: ITVShow[] }
  | { type: TVShowTyp.setOneTVShow, selectedTVS: number }
  | { type: TVShowTyp.getOneTVShow, tvsInfo: ISelectedTVShow }

const reducerTVShow = (state: ITVShows = initialStateTVShows, action: TVShowActionType): ITVShows => {
  switch (action.type) {
    case TVShowTyp.getAllTVShowsSuccess:
      return {
        ...state,
        TVShows: action.TVShows
      }
    case TVShowTyp.setOneTVShow:
      return {
        ...state,
        selectedTVS: action.selectedTVS,
      }
    case TVShowTyp.getOneTVShow:
      return {
        ...state,
        tvsInfo: action.tvsInfo
      }
    default:
      return state
  }
}

interface defaultValue {
  state: ITVShows;
  dispatch: (action: TVShowActionType) => void;
}

const TVShowContext = createContext<defaultValue>({
  state: initialStateTVShows,
  dispatch: () => { }
})

const TVShowsContextProvider = (props: any): JSX.Element => {
  const [TVShowsState, dispatch] = useReducer(reducerTVShow, initialStateTVShows);

  const Dispatch = async (action: TVShowActionType) => {
    switch (action.type) {
      case TVShowTyp.getAllTVShows:
        const responseTVShows = await tmdbGetTVShows().get('', { params: {} });
        let resTVShows = responseTVShows.data.results;
        dispatch({ type: TVShowTyp.getAllTVShowsSuccess, TVShows: resTVShows })
        break;
      case TVShowTyp.setOneTVShow:
        const resp = await tmdbGetMovieVideo(action.selectedTVS).get('', { params: {} });
        let TVvideos = resp.data.results;
        const resp2 = await tmdbGetMovieInfo(action.selectedTVS).get('', { params: {} });
        let TVresp2 = resp2.data;
        dispatch({ type: TVShowTyp.getOneTVShow, tvsInfo: { TVvideos, ...TVresp2 } });
        break;
      default: dispatch(action)
    }
  }

  return (
    <TVShowContext.Provider value={{ state: TVShowsState, dispatch: Dispatch }}>
      {props.children}
    </TVShowContext.Provider>
  )
}


export { TVShowContext, TVShowsContextProvider }