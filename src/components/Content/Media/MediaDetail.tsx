import { createStyles, Divider, Grid, makeStyles, Theme } from '@material-ui/core';
import moment from 'moment';
import React, { useContext, FC } from 'react';
import { MediasContext } from '../../../context/MediasContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      width: '95%',
      padding: '10px',
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
  const { state } = useContext(MediasContext);

  const video = (state?.mediaInfo?.videos && state?.mediaInfo?.videos.length) ? state?.mediaInfo?.videos?.find((video) => video.key !== undefined || video.key !== null)?.key : '';

  return (
    <div>
      <Grid container spacing={3} className={classes.paper}>
        <Grid container wrap={"nowrap"}>
          <Grid item xs={10}>
            {video ?
              < iframe id="inlineFrameExample"
                title="unique"
                width="1280"
                height="720"
                allowFullScreen
                src={`https://www.youtube.com/embed/${video}`}
                style={{ border: 'none' }}
              >
              </iframe> :
              <div style={{ maxWidth: 1280, height: 720 }}>
                <img src={`https://image.tmdb.org/t/p/original/${state.mediaInfo.poster_path}`} alt='' style={{ width: '100%', height: 'auto', maxWidth: '400px' }} />
              </div>
            }
          </Grid>
        </Grid>
        <Grid container spacing={3} alignContent={'center'} style={{ color: 'white' }}>
          <Grid item xs={12}>
            <h1>{state.mediaInfo.title}</h1>
            <span>{state.mediaInfo.vote_count} votes . {moment(state.mediaInfo.release_date).format('MMMM Do YYYY')}</span>
          </Grid>
          <Grid item xs={12}>
            <Divider className={classes.dividerColor} />
          </Grid>
          <Grid item xs={12}>
            <p>{state.mediaInfo.overview}</p>
          </Grid>
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