import { useState } from 'react';
import checked_heart from '../images/checked_heart.png';
import empty_heart from '../images/empty_heart.png';

type MusicProps = {
  trackId: number,
  previewUrl: string,
  trackName: string
};
function MusicCard({ trackId, previewUrl, trackName }: MusicProps) {
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  const handleClick = () => {
    setCheckboxStatus((prevState) => !prevState);
  };

  return (
    <div key={ trackId }>
      <p>{ trackName }</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label htmlFor={ `song-${trackId}` } data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          name=""
          id={ `song-${trackId}` }
          onClick={ handleClick }
          style={ { display: 'none' } }
        />
        <img src={ checkboxStatus ? checked_heart : empty_heart } alt="favorite" />
      </label>

    </div>
  );
}

export default MusicCard;
