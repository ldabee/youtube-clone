import React, { FC } from 'react';
import styled from 'styled-components';

const StyledPicture = styled.img`
  width: 320px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 15px;
`
interface IPictureProps {
  src: string;
  alt: string
}

const Picture: FC<IPictureProps> = ({ src, alt }) => {
  return src !== null ? <StyledPicture src={`https://image.tmdb.org/t/p/original/${src}`} alt={alt} /> : <StyledPicture src={'https://www.labaleine.fr/sites/default/files/image-not-found.jpg'} alt={alt} />
}

export default Picture
