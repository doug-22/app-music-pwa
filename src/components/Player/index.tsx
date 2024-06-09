/* eslint-disable no-unneeded-ternary */
import { useRef, useState } from 'react'
import { DataType } from '../SongDetails'
import { WrapperCover, WrapperPlayer } from './styles'
import {
  CaretDown,
  Heart,
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
} from '@phosphor-icons/react'
import Button from '../Button'
import Image from 'next/image'

interface Props {
  data: DataType | null
}

const Player: React.FC<Props> = ({ data }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [paused, setPaused] = useState(false)

  const [height, setHeight] = useState(80)
  const [expanded, setExpanded] = useState(false)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current?.paused) {
        audioRef.current.play()
        setPaused(false)
      } else {
        audioRef.current.pause()
        setPaused(true)
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleExpand = (event: any) => {
    const totalHeight = window.innerHeight
    if (!expanded) {
      if (
        event.target === event.currentTarget ||
        event.target.tagName === 'H1'
      ) {
        setHeight(totalHeight)
        setExpanded(true)
      }
    }
  }

  const handleDecrease = () => {
    setHeight(80)
    setExpanded(false)
  }

  return (
    <>
      {data && (
        <WrapperPlayer
          onClick={handleExpand}
          height={height}
          $expanded={expanded}
        >
          <>
            {expanded && (
              <div className="header_expanded">
                <Button
                  onClick={handleDecrease}
                  icon={<CaretDown size={32} weight="fill" />}
                />
                <div>
                  <h1>{data?.title}</h1>
                  <span>{data?.singer}</span>
                </div>
              </div>
            )}

            <div className="wrapper_song_details">
              <WrapperCover $expanded={expanded}>
                <Image
                  src={data?.cover}
                  width={expanded ? 250 : 60}
                  height={expanded ? 250 : 60}
                  alt={`Capa da música ${data?.title}`}
                />
              </WrapperCover>
              <div className="song_info">
                <h1>{data?.title}</h1>
                <span>{data?.singer}</span>
              </div>
            </div>

            <div className="wrapper_actions">
              {expanded && (
                <Button icon={<SkipBack size={32} weight="fill" />} />
              )}
              {paused && (
                <Button
                  icon={<Play size={32} weight="fill" />}
                  onClick={handlePlayPause}
                />
              )}
              {!paused && (
                <Button
                  icon={<Pause size={32} weight="fill" />}
                  onClick={handlePlayPause}
                />
              )}
              <Button icon={<SkipForward size={32} weight="fill" />} />
            </div>

            {expanded && (
              <div className="more_actions">
                <Button icon={<Repeat size={32} weight="fill" />} />
                <Button icon={<Heart size={32} weight="fill" />} />
              </div>
            )}
          </>

          <audio src={data?.song} ref={audioRef} autoPlay></audio>
        </WrapperPlayer>
      )}
    </>
  )
}

export default Player
