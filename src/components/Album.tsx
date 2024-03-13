import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { AlbumType, SongType } from '../types';

function Album() {
  const [toggleloading, setToggleloading] = useState(true);
  const [albumMetadata, setAlbumMetadata] = useState<AlbumType>();
  const [albumSongs, setAlbumSongs] = useState<Array<SongType>>([]);
  const { id } = useParams();
  useEffect(() => {
    getMusics(id as string).then((data) => {
      setAlbumMetadata(() => data[0]);
      // data.shift();
      const [album, ...tracks] = data;
      setAlbumSongs(tracks as Array<SongType>);
      setToggleloading((prevState) => !prevState);
    });
  }, [id]);

  if (toggleloading) {
    return (<Loading />);
  }

  return (
    <>
      <h1>Albuns</h1>
      <p data-testid="artist-name">{albumMetadata?.artistName}</p>
      <p data-testid="album-name">{albumMetadata?.collectionName}</p>
      {
          albumSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              previewUrl={ song.previewUrl }
              trackName={ song.trackName }

            />
          ))
      }
    </>
  );
}

export default Album;
