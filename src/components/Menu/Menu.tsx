import React, { FC, useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
//Context
import { MediasContext, MediasTyp } from '../../context/MediasContext';
//Interfaces
import { Genre, IMedia } from '../../model/IMedia';
//Libraries
import { Home, Whatshot, Subscriptions } from '@material-ui/icons';

const StyledMenu = styled.div`
  color: white;
  position:fixed;
  top:64px;
  background-color: rgb(32, 32, 32);
  width:80px;
  text-align:center;
  min-height:100vh

`

export const StyledMenuItem = styled.div<{ fromPanel?: boolean }>`
  display: flex;
  flex-direction:${props => props.fromPanel ? 'row' : 'column'};
  justify-content:${props => props.fromPanel ? 'space-between' : 'center'};
  padding:${props => props.fromPanel ? '0 24px 0 ' : 0};
  align-items: center;
  cursor: pointer;
  min-height:48px;

  h2{
    font-size:${props => props.fromPanel ? '1.1rem' : '10px'};
    font-weight:${props => props.fromPanel ? 500 : 100};
    font-family:'Roboto,Noto,sans-serif';
    text-align:${props => props.fromPanel ? 'left' : 'center'};
    padding:0;
    margin:0;
    margin-left:${props => props.fromPanel ? '30px' : 0};
    width:100%
  }

  &:hover{
    background-color:rgba(220,220,220,0.3);
    color:white
  }

`

const Menu: FC = () => {
  const { state, dispatch } = useContext(MediasContext);

  const [, setTags] = useState<string[]>([]);

  const retrieveTags = (): void => {
    const tagsToSort: string[] = [];
    state?.medias?.map((media: IMedia) => tagsToSort.push(media.media_type));
    setTags([...new Set(tagsToSort)]);
  }

  useEffect(() => {
    retrieveTags()
  }, [state.medias])

  return (
    <>
      <StyledMenu>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
          <StyledMenuItem
            onClick={
              () => {
                dispatch({ type: MediasTyp.getAllMedias });
                dispatch({ type: MediasTyp.mediasByCategory, Category: {} as Genre })
              }
            }
          >
            <Home />
            <h2>Accueil</h2>
          </StyledMenuItem>
        </Link>
        <StyledMenuItem onClick={() => { }}>
          <Whatshot />
          <h2>Tendances</h2>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => { }} >
          <Subscriptions />
          <h2>Abonnements</h2>
        </StyledMenuItem>
      </StyledMenu>
    </>
  )
}

export default Menu
