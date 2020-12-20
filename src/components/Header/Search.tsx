import React, { useContext, useState } from 'react'
import { MediasContext, MediasTyp } from '../../context/MediasContext';
import { createStyles, Divider, IconButton, InputBase, makeStyles, Paper, Theme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      background: 'none',

    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      color: 'white'
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);


const Search = () => {
  const classes = useStyles();
  const { dispatch } = useContext(MediasContext);

  const [inputVal, setInputVal] = useState<string>('');

  const filterMedias = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: MediasTyp.getAllMediaBySearch, keyword: inputVal });
    setInputVal('');
  }


  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        value={inputVal}
        className={classes.input}
        placeholder="Rechercher"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setInputVal(event.target.value) }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <div style={{ backgroundColor: '#303030', color: 'white' }}>
        <IconButton type="submit" aria-label="search" onClick={(e) => filterMedias(e)}>
          <SearchIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default Search
