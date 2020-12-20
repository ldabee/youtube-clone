import React, { FC } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { IMedia } from '../../../model/IMedia';

interface IMediaInfos {
  title: string;
  tag: string;
  countViews: number;
  creationDate: Date;
}

const StyledMediaInfos = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: column;
  font-size: 0.8rem
`

const StyledTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center
`

const MediaInfos: FC<IMedia> = (props) => {
  return (
    <StyledMediaInfos>
      <StyledTitle>
        {props.title ? props.title : props.name}
      </StyledTitle>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '15px' }}>
        <span>{props.popularity}</span>
        <span> {props.vote_count} likes . {moment(props.release_date).fromNow()}</span>
      </div>
    </StyledMediaInfos>
  )
}

export default MediaInfos
