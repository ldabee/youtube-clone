import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import moment from 'moment';
import React, { useContext, FC, useEffect } from 'react';
import { MediasContext, MediasTyp } from '../../context/MediasContext';
import { Genre, ISelectedMedia, IVideos } from '../../model/IMedia';
import styled from 'styled-components';
import { TVShowContext } from '../../context/TVShowContext';

const VideosWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '50px',
      backgroundColor: "rgba(32, 32, 32,.21) !important",
      color: 'white'
    },
    dividerColor: {
      backgroundColor: 'rgba(255,255,255,0.21)',
    },
  }),
);

interface IMediaDetail {
  banner: string;
  picture: string;
  title: string;
  releaseDate: string;
  language: string;
  genres: Genre[];
  tagline: string;
  overview: string;
  videos: IVideos[] | undefined;
}

const MediaDetail: FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(MediasContext);
  const TVSContext = useContext(TVShowContext);

  // useEffect(() => {
  //   return () => dispatch({ type: MediasTyp.getOneMedia, mediaInfo: {} as ISelectedMedia })
  // }, [])

  let InfosToUse: IMediaDetail = {} as IMediaDetail;
  if (state.choice === "Movies") {
    InfosToUse.banner = state.mediaInfo.backdrop_path;
    InfosToUse.picture = state.mediaInfo.belongs_to_collection?.poster_path;
    InfosToUse.title = state.mediaInfo.original_title;
    InfosToUse.releaseDate = state.mediaInfo.release_date;
    InfosToUse.language = state?.mediaInfo?.original_language;
    InfosToUse.genres = state.mediaInfo?.genres;
    InfosToUse.tagline = state.mediaInfo.tagline;
    InfosToUse.overview = state.mediaInfo.overview;
    InfosToUse.videos = state.mediaInfo.videos;
  }
  if (state.choice === "TVShows") {
    InfosToUse.banner = TVSContext.state.tvsInfo.backdrop_path;
    InfosToUse.picture = TVSContext.state.tvsInfo.poster_path;
    InfosToUse.title = TVSContext.state.tvsInfo.name;
    InfosToUse.releaseDate = TVSContext.state.tvsInfo.first_air_date;
    InfosToUse.language = TVSContext.state.tvsInfo.languages[0];
    InfosToUse.genres = TVSContext.state.tvsInfo.genres;
    InfosToUse.tagline = TVSContext.state.tvsInfo.tagline;
    InfosToUse.overview = TVSContext.state.tvsInfo.overview;
    InfosToUse.videos = [];
  }

  return (
    <div style={{ display: 'contents' }}>
      <Grid container spacing={3} className={classes.paper}>
        <Grid container>
          <div style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${InfosToUse.banner})`,
            objectFit: 'cover',
            minHeight: '570px',
            display: 'flex',
            justifyContent: 'center',
            backgroundPosition: 'inherit',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',

          }}>
            <div style={{ display: 'flex', width: '100%', backgroundColor: 'rgba(51,51,255,0.5)', justifyContent: 'center' }}>
              <div style={{ display: 'flex', width: '80%', alignItems: 'center' }}>
                <div><img src={`https://image.tmdb.org/t/p/w300/${InfosToUse.picture}`} alt="" /></div>
                <div style={{
                  minHeight: '72%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  marginLeft: '15px'
                }}>
                  <h2>{InfosToUse.title} ({new Date(InfosToUse.releaseDate).getFullYear()})</h2>
                  <div>{moment(InfosToUse.releaseDate).format('DD/MM/YYYY')} ({InfosToUse.language}) . {InfosToUse.genres?.map((genre: Genre) => <span key={genre.id}>{genre.name},&nbsp;</span>)}</div>
                  <div>
                    <span style={{ fontStyle: 'italic' }}>{InfosToUse.tagline}</span>
                    <h4>Synopsis</h4>
                    <p>{InfosToUse.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid container>
          <h4>Medias</h4>
          <VideosWrapper>
            {InfosToUse.videos?.map((vid) =>
              <div key={vid.id}>
                < iframe id="inlineFrameExample"
                  title="unique"
                  width="533"
                  height="300"
                  allowFullScreen
                  src={`https://www.youtube.com/embed/${vid.key}`}
                  style={{ border: 'none' }}
                >
                </iframe>
              </div>
            )}
          </VideosWrapper>
        </Grid>
      </Grid>

    </div>
  )
}

export default MediaDetail