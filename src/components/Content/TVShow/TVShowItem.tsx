import React, { FC } from 'react'
import { Avatar } from '@material-ui/core';
import Picture from '../Picture';
import TVShowInfos from './TVShowInfos';
import styled from 'styled-components';
import { ITVShow } from '../../../model/ITVShow';

const TVShowItem: FC<ITVShow> = (props: ITVShow) => {

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
        <TVShowInfos {...props} />
      </div>
    </StyledMediaItemWrapper>
  )
}

export default TVShowItem
