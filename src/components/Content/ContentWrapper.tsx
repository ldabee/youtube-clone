import React, { FC } from 'react';
import styled from 'styled-components';
import MediaContent from '../Content/Media/MediaContent';
import MediaDetail from './Media/MediaDetail';
import { Switch, Route } from "react-router-dom";

const StyledContentWrapper = styled.div`
  flex:0.8;
  padding-bottom:0;
  display: flex;
  flex-wrap: wrap;
  margin-left:9%;
  min-width:90%;

  @media screen and (max-width: 790px){
    justify-content:center
  }
`

const ContentWrapper: FC = () => {
  return (
    <StyledContentWrapper>
      <Switch>
        <Route exact path='/' component={MediaContent} />
        <Route exact path='/watch' component={MediaDetail} />
      </Switch>
    </StyledContentWrapper>
  )
}

export default ContentWrapper
