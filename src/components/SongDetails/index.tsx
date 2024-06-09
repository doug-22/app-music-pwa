import { MusicTitle, SingerTitle, WrapperMusic } from './styles'
import Image, { StaticImageData } from 'next/image'

export interface DataType {
  title: string
  singer: string
  cover: StaticImageData
  song: string
}

interface Props {
  data: DataType
  onPlay: (data: DataType) => void
}

const SongDetails: React.FC<Props> = ({ data, onPlay }) => {
  // const audioRef = useRef<HTMLAudioElement>(null)

  // const handlePlayPause = () => {
  //   if (audioRef.current) {
  //     if (audioRef.current?.paused) {
  //       audioRef.current.play()
  //     } else {
  //       audioRef.current.pause()
  //     }
  //   }
  // }

  return (
    <WrapperMusic>
      <div className="song_cover">
        <Image
          src={data?.cover}
          width={80}
          height={80}
          alt={`Capa da música ${data?.title}`}
        />
      </div>
      <div className="song_details">
        <MusicTitle>{data?.title}</MusicTitle>
        <SingerTitle>{data?.singer}</SingerTitle>
        <button onClick={() => onPlay(data)}>Selecionar</button>
      </div>
    </WrapperMusic>
  )
}

export default SongDetails
