import React, { useState, useContext, useEffect } from 'react'
import Search from './Search'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar, Divider, Drawer, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { StyledMenuItem } from '../Menu/Menu';
import { Home, Whatshot, Subscriptions, Category } from '@material-ui/icons';
import { MediasContext, MediasTyp } from '../../context/MediasContext';
import { IMedias, Genre } from '../../model/IMedia';

const StyledWrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:'20px';
  color: white;
  background-color: rgb(32, 32, 32);
  position:sticky;
  top:0;
  z-index:100;
`

const useStyles = makeStyles({
  DrawerWidth: {
    width: 250,
    color: 'white',
    backgroundColor: ' rgb(32, 32, 32)',
  },
  DividerStyle: {
    backgroundColor: 'white'
  },

});

const Header = () => {
  const classes = useStyles();
  const [viewLeftMenu, setViewLefMenu] = useState<boolean>(false);
  const { state, dispatch } = useContext<IMedias>(MediasContext);

  return (
    <>
      <StyledWrapperHeader>
        <div style={{ display: 'flex', marginLeft: '18px', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={() => setViewLefMenu(true)}>
            <MenuIcon />
          </IconButton>
          <img style={{ height: '25px', objectFit: 'contain', marginLeft: '20px' }} src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="yt icon" />
        </div>
        <Search />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <VideoCallIcon />
          </IconButton>
          <IconButton color="inherit">
            <AppsIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <Avatar />
          </IconButton>
        </div>
      </StyledWrapperHeader>

      <Drawer classes={{ paper: classes.DrawerWidth }} open={viewLeftMenu} onClose={() => setViewLefMenu(false)}>
        <>
          <StyledMenuItem onClick={() => setViewLefMenu(false)} fromPanel>
            <MenuIcon />
            <img style={{ height: '25px', objectFit: 'contain', marginLeft: '20px' }} src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="yt icon" />
          </StyledMenuItem>
          <Divider classes={{ root: classes.DividerStyle }} />
          <StyledMenuItem fromPanel>
            <Home />
            <h2>Accueil</h2>
          </StyledMenuItem>
          <StyledMenuItem fromPanel>
            <Whatshot />
            <h2>Tendances</h2>
          </StyledMenuItem>
          <StyledMenuItem fromPanel>
            <Subscriptions />
            <h2>Abonnements</h2>
          </StyledMenuItem>
          <Divider classes={{ root: classes.DividerStyle }} />
          <StyledMenuItem fromPanel>
            <Category />
            <h2>Genres</h2>
          </StyledMenuItem>
          <div style={{ height: '40vh', overflowY: 'auto', marginBottom: '10px' }}>
            {state.genres.map((it: Genre) =>
              <StyledMenuItem fromPanel key={it.id} onClick={() => { dispatch({ type: MediasTyp.mediasByCategory, Category: it }); setViewLefMenu(false) }}>
                {it.name}
              </StyledMenuItem>
            )}
          </div>
          <Divider classes={{ root: classes.DividerStyle }} />

        </>

      </Drawer>
    </>
  )
}

export default Header
