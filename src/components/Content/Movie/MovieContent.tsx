import React, { FC, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
//Interfaces
import { IMedia } from '../../../model/IMedia';
//Components
import MovieItem from './MovieItem';
//Libraries
import { Paper, Grid, Theme, createStyles, makeStyles } from '@material-ui/core';
//Context
import { MediasContext, MediasTyp } from '../../../context/MediasContext';

import _ from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      backgroundColor: "rgba(32, 32, 32,.21) !important",
      color: 'white'
    },
  }),
);

const MovieContent: FC = () => {
  const { state, dispatch } = useContext(MediasContext);
  const classes = useStyles();

  const handleClickMedia = (id: number) => {
    dispatch({ type: MediasTyp.setOneMedia, selectedMedia: id })
  }

  useEffect(() => {
    dispatch({ type: MediasTyp.getAllMedias })
  }, [state.Category])

  const renderMedias = () => {
    switch (state.choice) {
      case 'Movies':
        return (
          !_.isEmpty(state.Category) ?
            state?.medias?.filter((it: IMedia) => it.genre_ids.includes(state.Category.id)).map((media: IMedia) =>
              <div key={media.id}>
                <Link to={'/watch'} onClick={() => handleClickMedia(media.id)}>
                  <MovieItem  {...media} />
                </Link>
              </div>
            )
            :
            state?.medias?.map((media: IMedia) =>
              <div key={media.id}>
                <Link to={'/watch'} onClick={() => handleClickMedia(media.id)}>
                  <MovieItem  {...media} />
                </Link>
              </div>
            )
        )
    }


  }

  return (
    <>
      <Grid container spacing={3} justify={'center'}>
        <Grid item xs={12}>
          <Paper variant={'elevation'} className={classes.paper}>
            {renderMedias()}
          </Paper>
        </Grid>
      </Grid>

    </>
  )
}

export default MovieContent
