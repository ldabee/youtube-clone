import React, { useContext, useState } from 'react'
import { MediasContext, MediasTyp } from '../../context/MediasContext';
import { Search as Searching } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';


const Search = () => {
  const { dispatch } = useContext(MediasContext);

  const [inputVal, setInputVal] = useState<string>('');

  const filterMedias = () => {
    dispatch({ type: MediasTyp.getAllMediaBySearch, keyword: inputVal });
    setInputVal('');
  }


  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '40%',
      border: '1px solid rgba(150, 150, 150,0.2)',
      borderRadius: '2px',
      height: '30px',
      backgroundColor: 'black',
      paddingLeft: '10px'
    }}>
      <input
        style={{ flex: 1, border: 'none', background: 'none', color: 'inherit', padding: '10px', outline: 'none' }}
        type='text'
        placeholder="Rechercher"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputVal(event.target.value)}
        value={inputVal}
      />
      <IconButton onClick={() => filterMedias()}>
        <Searching style={{ width: '50px ', borderLeft: '1px solid rgba(150, 150, 150,0.2)' }} />
      </IconButton>
    </div>
  )
}

export default Search
