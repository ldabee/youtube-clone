import React, { FC, Fragment } from 'react';
import './App.css';
import DashBoard from './components/Content/DashBoard';

import { MediasContextProvider } from './context/MediasContext';

const App: FC = () => {
  return (
    <Fragment>
      <MediasContextProvider>
        <DashBoard />
      </MediasContextProvider>
    </Fragment>
  );
}

export default App;
