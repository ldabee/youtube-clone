import React, { FC } from 'react';
import styled from 'styled-components';

const StyledPicture = styled.img`
  width: 100%;
  height: auto;
  object-fit: fill;
  margin-bottom: 15px;
`
interface IPictureProps {
  src: string;
  alt: string
}

const Picture: FC<IPictureProps> = ({ src, alt }) => {
  return src !== null ? <StyledPicture src={`https://image.tmdb.org/t/p/w300/${src}`} alt={alt} /> : <StyledPicture src={'https://www.labaleine.fr/sites/default/files/image-not-found.jpg'} alt={alt} />
}

export default Picture
