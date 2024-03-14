import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { AlbumType, SongType } from '../types';
import Header from './Header';

function Album() {
  const [toggleloading, setToggleloading] = useState(true);
  const [albumMetadata, setAlbumMetadata] = useState<AlbumType>();
  const [albumSongs, setAlbumSongs] = useState<Array<SongType>>([]);
  const { id } = useParams();
  useEffect(() => {
    getMusics(id as string).then((data) => {
      const [album, ...tracks] = data;
      setAlbumMetadata(album);
      // data.shift(); o shift estava modificando o array original, aparentemente
      setAlbumSongs(tracks as Array<SongType>);
      setToggleloading((prevState) => !prevState);
    });
  }, [id]);

  if (toggleloading) {
    return (<Loading />);
  }

  return (
    <>
      <Header />
      <p data-testid="artist-name">{albumMetadata?.artistName}</p>
      <p data-testid="album-name">{albumMetadata?.collectionName}</p>
      {
          albumSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackId={ song.trackId }
              previewUrl={ song.previewUrl }
              trackName={ song.trackName }

            />
          ))
      }
    </>
  );
}

export default Album;
