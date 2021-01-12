import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import moment from 'moment';
import React, { useContext, FC, useEffect } from 'react';
import { MediasContext, MediasTyp } from '../../../context/MediasContext';
import { Genre, ISelectedMedia } from '../../../model/IMedia';
import styled from 'styled-components';

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

const MediaDetail: FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(MediasContext);

  useEffect(() => {
    return () => dispatch({ type: MediasTyp.getOneMedia, mediaInfo: {} as ISelectedMedia })
  }, [])

  return (
    <div style={{ display: 'contents' }}>
      <Grid container spacing={3} className={classes.paper}>
        <Grid container>
          <div style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${state.mediaInfo.backdrop_path})`,
            objectFit: 'cover',
            minHeight: '570px',
            display: 'flex',
            justifyContent: 'center',
            backgroundPosition: 'inherit',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',

          }}>
            <div style={{ display: 'flex', width: '100%', backgroundColor: 'rgba(183,45,64,0.79)', justifyContent: 'center' }}>
              <div style={{ display: 'flex', width: '80%', alignItems: 'center' }}>
                <div><img src={`https://image.tmdb.org/t/p/w300/${state.mediaInfo.belongs_to_collection?.poster_path}`} alt="" /></div>
                <div style={{
                  minHeight: '72%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  marginLeft: '15px'
                }}>
                  <h2>{state.mediaInfo.original_title} ({new Date(state.mediaInfo.release_date).getFullYear()})</h2>
                  <div>{moment(state.mediaInfo.release_date).format('DD/MM/YYYY')} ({state?.mediaInfo?.original_language}) . {state.mediaInfo?.genres?.map((genre: Genre) => <span>{genre.name},&nbsp;</span>)}</div>
                  <div>
                    <span style={{ fontStyle: 'italic' }}>{state.mediaInfo.tagline}</span>
                    <h4>Synopsis</h4>
                    <p>{state.mediaInfo.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid container>
          <h4>Medias</h4>
          <VideosWrapper>
            {state.mediaInfo.videos?.map((vid) =>
              <div>
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


//   < Dialog
// fullWidth
// PaperProps = {{
//   style: {
//     backgroundColor: "rgb(32, 32, 32)",
//       boxShadow: "none",
//         color: 'white',
//           alignItems: 'center',
//             width: '61%',
//               textAlign: 'center'
//   },
// }}
// open = { open }
// TransitionComponent = { Transition }
// keepMounted
// onClose = {() => setOpen(false)}
// aria - labelledby="alert-dialog-slide-title"
// aria - describedby="alert-dialog-slide-description"
// maxWidth = { 'xl'}
//   >
//         <DialogTitle id="alert-dialog-slide-title">{state?.mediaInfo?.original_title}</DialogTitle>
//         <DialogContent>
//           {state?.mediaInfo[0] ?
//             < iframe id="inlineFrameExample"
//               title="unique"
//               width="800"
//               height="600"
//               allowFullScreen
//               src={`https://www.youtube.com/embed/${state?.mediaInfo[0].key}`}>
//             </iframe> :
//             <CircularProgress />
//           }

//           <div style={{ marginTop: '15px' }}>{state?.mediaInfo?.overview}</div>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={() => handleQuit()} >
//       Quit
//           </Button>
//         </DialogActions>
//       </Dialog >