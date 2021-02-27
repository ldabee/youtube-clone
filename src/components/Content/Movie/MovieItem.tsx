import React, { FC } from 'react'
import { IMedia } from '../../../model/IMedia';
import { Avatar } from '@material-ui/core';
import Picture from '../Picture';
import MediaInfos from './MovieInfos';
import styled from 'styled-components';

const MovieItem: FC<IMedia> = (props: IMedia) => {

  const StyledMediaItemWrapper = styled.div`
   max-width: 300px;
   height: auto; 
   color: white;
   margin: 15px;
   cursor: pointer;
   padding:5px;

`

  return (
    <StyledMediaItemWrapper >
      <Picture src={props.poster_path} alt='' />
      <div style={{ display: 'flex' }} >
        <div style={{ marginRight: '20px' }}><Avatar /></div>
        <MediaInfos {...props} />
      </div>
    </StyledMediaItemWrapper>
  )
}

export default MovieItem
