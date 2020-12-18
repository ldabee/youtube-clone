import React, { Fragment } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
//Components
import ContentWrapper from './ContentWrapper';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
//Libraries
import { createStyles, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${370}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 370,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: 370,
      flexShrink: 0,

    },
    drawerPaper: {
      width: 370,
      backgroundColor: 'rgb(32, 32, 32) !important',
      color: 'white'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -370,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }),
);

const DashBoard = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Header />
      <div style={{ display: 'flex' }}>
        <Router>
          <Menu />
          <ContentWrapper />
        </Router>
      </div>
    </Fragment>
  )
}

export default DashBoard
