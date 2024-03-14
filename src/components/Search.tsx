import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import Header from './Header';

function Search() {
  const [formArtist, setFormArtist] = useState('');
  const [toggleloading, setToggleloading] = useState(false);
  const [albunsList, setAlbunsList] = useState<AlbumType[]>([]);
  const [validArtist, setValidArtist] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormArtist(event.target.value);
  };
  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToggleloading((prevState) => !prevState);
    const albuns = await searchAlbumsAPI(formArtist);
    if (albuns) {
      setAlbunsList(albuns);
      setValidArtist(formArtist);
      setFormArtist('');
      setToggleloading((prevState) => !prevState);
    }
  };

  if (toggleloading) {
    return (<Loading />);
  }

  return (
    <>
      <Header />
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
      {validArtist && (<p>{`Resultado de álbuns de: ${validArtist}`}</p>)}
      <ul>
        {albunsList.length === 0
          ? <p>Nenhum álbum foi encontrado</p>
          : albunsList.map((album) => (
            <li key={ album.collectionId }>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <p>{album.collectionName}</p>
                <img
                  src={ album.artworkUrl100 }
                  alt={ `${album.artistName} - ${album.collectionName}` }
                />
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Search;
