import React, { FC, useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
//Interfaces
import { IMedia, ITVShows } from '../../../model/IMedia';
//Components
import MediaItem from './MediaItem';
//Libraries
import { Paper, Button, Grid, Theme, createStyles, makeStyles } from '@material-ui/core';
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

const MediaContent: FC = () => {
  const { state, dispatch } = useContext(MediasContext);
  const classes = useStyles();

  // const [selectedItem, setSelectedItem] = useState<IMedia>({});
  const [page, setPage] = useState<number>(1);
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
                  <MediaItem  {...media} />
                </Link>
              </div>
            )
            :
            state?.medias?.map((media: IMedia) =>
              <div key={media.id}>
                <Link to={'/watch'} onClick={() => handleClickMedia(media.id)}>
                  <MediaItem  {...media} />
                </Link>
              </div>
            )
        )
      case 'TVShows':
        return (
          state?.TVShows?.map((media: ITVShows) =>
            <div key={media.id}>
              <Link to={'/watch'} onClick={() => handleClickMedia(media.id)}>
                <MediaItem  {...media} />
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
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item>
              {page > 1 && <Button color={'secondary'} onClick={() => setPage(page - 1)}>Previous</Button>}
            </Grid>&nbsp;
          <Grid item>
              <span style={{ color: 'white' }}>|</span>
            </Grid>&nbsp;
          <Grid item>
              <Button color={'secondary'} onClick={() => { setPage(page + 1); window.scrollTo(0, 0) }}>Next</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </>
  )
}

export default MediaContent
