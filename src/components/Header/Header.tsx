import React, { useContext, useEffect, useState } from 'react'
import Search from './Search'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuPanel from '../Menu/AdditionalsPanels/MenuPanel';

import { UsersContext, UsersTyp } from '../../context/UsersContext';

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

const Header = () => {
  const UsersState = useContext(UsersContext);
  const [viewLeftMenu, setViewLefMenu] = useState<boolean>(false);

  useEffect(() => {
    UsersState.dispatch({ type: UsersTyp.getAllusers })
  }, [])

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

      <MenuPanel viewLeftMenu={viewLeftMenu} ClosePanel={() => setViewLefMenu(false)} />
    </>
  )
}

export default Header
