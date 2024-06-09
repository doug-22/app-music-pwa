'use client'

import { Heart, Playlist, Clock, Shuffle } from '@phosphor-icons/react'
import {
  WrapperOptions,
  WrapperContainer,
  WrapperPreview,
  WrapperList,
} from './styles'
import InputSearch from '@/components/InputSearch'
import Button from '@/components/Button'
import SongDetails, { DataType } from '@/components/SongDetails'

import CoverWaves from '../../../public/assets/Mr._Probz_-_Waves.jpg'
// import SongWaves from '../../musics/Mr._Probz_-_Waves.mp3'
import Cover720 from '../../../public/assets/i_still_love_you.png'
import Player from '@/components/Player'
import { useState } from 'react'
// import { useRef } from 'react'

const PlayerPage = () => {
  // const audioRef = useRef(null)

  const [musicSelected, setMusicSelected] = useState<DataType | null>(null)

  const list = [
    {
      title: 'Waves',
      singer: 'Mr. Probz',
      cover: CoverWaves,
      song: '../../musics/Mr._Probz_-_Waves.mp3',
    },
    {
      title: 'I Still Love You',
      singer: '702',
      cover: Cover720,
      song: '../../musics/I Still Love You.mp3',
    },
    // {
    //   title: 'Música 3',
    // },
    // {
    //   title: 'Música 4',
    // },
  ]

  // const handlePlay = () => {
  //   // const player = document.querySelector('#player')
  //   // console.log(player?.play())
  //   if (audioRef.current) {
  //     audioRef.current.play()
  //   }
  // }

  const handleSelectedMusic = (data: DataType) => {
    setMusicSelected(data)
  }

  return (
    <>
      <WrapperContainer>
        <InputSearch />
        <WrapperOptions>
          <Button icon={<Clock size={32} weight="fill" />} />
          <Button icon={<Heart size={32} weight="fill" />} />
          <Button icon={<Playlist size={32} weight="fill" />} />
        </WrapperOptions>
        <WrapperPreview>
          <Button
            icon={<Shuffle size={32} weight="fill" />}
            label="Ordem aleatória"
          />
        </WrapperPreview>
        <WrapperList>
          {list?.map((music, idx) => (
            <SongDetails key={idx} data={music} onPlay={handleSelectedMusic} />
            // <WrapperMusic key={idx}>
            //   <div className="song_cover">
            //     <Image
            //       src={music?.cover}
            //       alt={`Capa da música ${music?.title}`}
            //     />
            //   </div>
            //   <div className="song_details">
            //     <MusicTitle>{music?.title}</MusicTitle>
            //     <SingerTitle>{music?.singer}</SingerTitle>
            //     <audio src={music?.song} ref={audioRef}></audio>
            //     <button onClick={handlePlay}>Play</button>
            //   </div>
            // </WrapperMusic>
          ))}
        </WrapperList>
      </WrapperContainer>

      <Player data={musicSelected} />
    </>
  )
}

export default PlayerPage
