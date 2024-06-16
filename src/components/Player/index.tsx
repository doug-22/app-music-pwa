/* eslint-disable no-unneeded-ternary */
import { useCallback, useRef, useState } from 'react'
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
import { useAtom, useAtomValue } from 'jotai'
import { playlistSelectedAtom } from '@/atoms/playlist-selected-atom'
import { musicSelectedAtom } from '@/atoms/music-selected-atom'
import CoverDefault from '../../../public/assets/cover_default.jpg'

const Player = () => {
  const [musicSelected, setMusicSelected] = useAtom(musicSelectedAtom)
  const playlistSelected = useAtomValue(playlistSelectedAtom)

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

  const handleNextMusic = useCallback(
    (title: string) => {
      const playlistLength = playlistSelected?.length
        ? playlistSelected?.length
        : 0
      if (playlistSelected) {
        const index = playlistSelected?.findIndex(
          (item) => item.title === title,
        )
        if (playlistLength - 1 !== index) {
          setMusicSelected(playlistSelected[index + 1])
          setPaused(false)
        } else {
          setMusicSelected(playlistSelected[0])
          setPaused(false)
        }
      }
    },
    [playlistSelected],
  )

  const handlePrevMusic = useCallback(
    (title: string) => {
      const playlistLength = playlistSelected?.length
        ? playlistSelected?.length
        : 0
      if (playlistSelected) {
        const index = playlistSelected?.findIndex(
          (item) => item.title === title,
        )
        if (index === 0) {
          setMusicSelected(playlistSelected[playlistLength - 1])
          setPaused(false)
        } else {
          setMusicSelected(playlistSelected[index - 1])
          setPaused(false)
        }
      }
    },
    [playlistSelected],
  )

  return (
    <>
      {musicSelected && (
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
                  <h1>{musicSelected?.title}</h1>
                  <span>{musicSelected?.singer}</span>
                </div>
              </div>
            )}

            <div className="wrapper_song_details">
              <WrapperCover $expanded={expanded}>
                <Image
                  src={musicSelected?.cover ?? CoverDefault}
                  width={expanded ? 250 : 60}
                  height={expanded ? 250 : 60}
                  alt={`Capa da música ${musicSelected?.title}`}
                />
              </WrapperCover>
              <div className="song_info">
                <h1>{musicSelected?.title}</h1>
                <span>{musicSelected?.singer}</span>
              </div>
            </div>

            <div className="wrapper_actions">
              {expanded && (
                <Button
                  icon={<SkipBack size={32} weight="fill" />}
                  onClick={() => handlePrevMusic(musicSelected?.title)}
                />
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
              <Button
                icon={<SkipForward size={32} weight="fill" />}
                onClick={() => handleNextMusic(musicSelected?.title)}
              />
            </div>

            {expanded && (
              <div className="more_actions">
                <Button icon={<Repeat size={32} weight="fill" />} />
                <Button icon={<Heart size={32} weight="fill" />} />
              </div>
            )}
          </>

          <audio src={musicSelected?.song} ref={audioRef} autoPlay></audio>
        </WrapperPlayer>
      )}
    </>
  )
}

export default Player
