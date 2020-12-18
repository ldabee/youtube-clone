import React, { Fragment } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
//Components
import ContentWrapper from './ContentWrapper';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';

const DashBoard = () => {
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
