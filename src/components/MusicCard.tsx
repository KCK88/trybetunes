type MusicProps = {
  key: number,
  previewUrl: string,
  trackName: string
};
function MusicCard({ key, previewUrl, trackName }: MusicProps) {
  return (
    <div key={ key }>
      <p>{ trackName }</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
    </div>
  );
}

export default MusicCard;
