import React, { FC, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
//Interfaces
import { ITVShow } from '../../../model/ITVShow';
//Components
import TVShowItem from './TVShowItem';
//Libraries
import { Paper, Grid, Theme, createStyles, makeStyles } from '@material-ui/core';
//Context
import { TVShowContext, TVShowTyp } from '../../../context/TVShowContext';

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

const TVShowContent: FC = () => {
  const { state, dispatch } = useContext(TVShowContext);
  const classes = useStyles();

  const handleClickMedia = (id: number) => {
    dispatch({ type: TVShowTyp.setOneTVShow, selectedTVS: id })
  }

  useEffect(() => {
    dispatch({ type: TVShowTyp.getAllTVShows })
  }, [])

  const renderMedias = () => {
    return (
      state?.TVShows?.map((media: ITVShow) =>
        <div key={media.id}>
          <Link to={'/watch'} onClick={() => handleClickMedia(media.id)}>
            <TVShowItem  {...media} />
          </Link>
        </div>
      )
    )
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

export default TVShowContent
