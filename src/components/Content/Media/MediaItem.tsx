import React, { FC } from 'react'
import { IMedia, ITVShows } from '../../../model/IMedia';
import { Avatar } from '@material-ui/core';
import Picture from '../Media/Picture';
import MediaInfos from '../Media/MediaInfos';
import styled from 'styled-components';

const MediaItem: FC<IMedia | ITVShows> = (props: IMedia | ITVShows) => {

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

export default MediaItem
