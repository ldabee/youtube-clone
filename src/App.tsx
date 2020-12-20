import React, { FC, Fragment } from 'react';
import './App.css';
import DashBoard from './components/Content/DashBoard';

import { MediasContextProvider } from './context/MediasContext';
import { UsersContextProvider } from './context/UsersContext';

const App: FC = () => {
  return (
    <Fragment>
      <UsersContextProvider>
        <MediasContextProvider>
          <DashBoard />
        </MediasContextProvider>
      </UsersContextProvider>
    </Fragment>
  );
}

export default App;
