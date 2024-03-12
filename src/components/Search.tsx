import { useState } from 'react';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function Search() {
  const [formArtist, setFormArtist] = useState('');
  const [toggleloading, setToggleloading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormArtist(event.target.value);
  };
  const handleClick = async (/* event: React.FormEvent<HTMLFormElement> */) => {
    // event.preventDefault();
    setToggleloading(!toggleloading);
    await searchAlbumsAPI(formArtist);
  };

  if (toggleloading) {
    return (<Loading />);
  }

  return (
    <>
      <h1>Search</h1>
      <form
        onSubmit={ handleClick }
      >
        <label htmlFor="name">Search</label>
        <input
          type="text"
          name="name"
          id="name"
          data-testid="search-artist-input"
          onChange={ (event) => { handleChange(event); } }
          value={ formArtist }
        />

        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ formArtist.length < 2 }
        >
          Pesquisar
        </button>
      </form>
    </>
  );
}

export default Search;
