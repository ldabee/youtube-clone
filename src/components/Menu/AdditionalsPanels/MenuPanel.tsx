import { Drawer, Divider, makeStyles } from '@material-ui/core';
import { Home, Whatshot, Subscriptions, Category } from '@material-ui/icons';
import React, { FC, useContext, useState } from 'react'
import { StyledMenuItem } from '../../Menu/Menu';
import { MediasContext, MediasTyp } from '../../../context/MediasContext';
import { Genre } from '../../../model/IMedia';
import MenuIcon from '@material-ui/icons/Menu';

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

type IMenuPanelProps = {
  viewLeftMenu: boolean;
  ClosePanel: () => void;
}

const MenuPanel: FC<IMenuPanelProps> = ({ viewLeftMenu, ClosePanel }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(MediasContext);


  const [viewCategory, setViewCategory] = useState<boolean>(false);

  return (
    <Drawer classes={{ paper: classes.DrawerWidth }} open={viewLeftMenu} onClose={ClosePanel}>
      <>
        <StyledMenuItem onClick={ClosePanel} fromPanel>
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
        <StyledMenuItem fromPanel onClick={() => setViewCategory(!viewCategory)}>
          <Category />
          <h2>Genres</h2>
        </StyledMenuItem>

        {viewCategory && <div style={{ height: '40vh', overflowY: 'auto', marginBottom: '10px' }}>
          {state.genres.map((it: Genre) =>
            <StyledMenuItem fromPanel key={it.id} onClick={() => { dispatch({ type: MediasTyp.mediasByCategory, Category: it }); ClosePanel() }}>
              {it.name}
            </StyledMenuItem>
          )}
        </div>}
        <Divider classes={{ root: classes.DividerStyle }} />

      </>

    </Drawer>
  )
}

export default MenuPanel
