/* eslint-disable no-unneeded-ternary */
import { useCallback, useEffect, useRef, useState } from 'react'
import { WrapperCover, WrapperPlayer, WrapperSlider } from './styles'
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
import Slider from 'rc-slider'
import { DataType } from '../SongDetails'
import { favoritesMusicAtom } from '@/atoms/favorites-music-atom'

interface Props {
  setFavoriteMusic: (data: DataType) => void
}

const Player: React.FC<Props> = ({ setFavoriteMusic }) => {
  const [musicSelected, setMusicSelected] = useAtom(musicSelectedAtom)
  const playlistSelected = useAtomValue(playlistSelectedAtom)
  const favoritesMusic = useAtomValue(favoritesMusicAtom)
  const [seconds, setSeconds] = useState(0)
  const [moveSlider, setMoveSlider] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const [paused, setPaused] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const [songTime, setSongTime] = useState(0)

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

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (musicSelected && !paused && !moveSlider) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [musicSelected, paused, moveSlider])

  useEffect(() => {
    if (seconds === musicSelected?.duration) {
      if (repeat) {
        handleChangeSelectedTime(0)
      } else {
        handleNextMusic(musicSelected?.title)
        setSeconds(0)
      }
    }
  }, [seconds, musicSelected, handleNextMusic, repeat])

  useEffect(() => {
    if (musicSelected) {
      setSeconds(0)
    }
  }, [musicSelected])

  useEffect(() => {
    changeSliderTime(seconds)
  }, [seconds])

  useEffect(() => {
    if (musicSelected && audioRef.current) {
      audioRef.current.play()
    }
  }, [musicSelected])

  const changeSliderTime = (value: number) => {
    setSongTime(value)
  }

  const handleChangeSelectedTime = (value: number) => {
    setSeconds(value)
    setMoveSlider(false)
    if (audioRef?.current) {
      audioRef.current.currentTime = value
    }
  }

  const isFavoriteMusic = useCallback(
    (title: string) => {
      const index = favoritesMusic?.findIndex((item) => item?.title === title)
      return index !== -1
    },
    [favoritesMusic],
  )

  const stringLimiter = (title: string, max: number) => {
    if (title.length > 14) {
      return title.substring(0, max) + '...'
    }
    return title
  }

  const toogleRepeat = useCallback(() => {
    setRepeat(!repeat)
  }, [repeat])

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
                  width={expanded ? 250 : 58}
                  height={expanded ? 250 : 58}
                  alt={`Capa da música ${musicSelected?.title}`}
                />
              </WrapperCover>
              <div className="song_info">
                <h1>{stringLimiter(musicSelected?.title, 14)}</h1>
                <span>{stringLimiter(musicSelected?.singer, 20)}</span>
              </div>
            </div>

            {expanded && (
              <WrapperSlider>
                <Slider
                  onChange={(nextValues) => {
                    setMoveSlider(true)
                    setSongTime(nextValues as number)
                  }}
                  onChangeComplete={(v) =>
                    handleChangeSelectedTime(v as number)
                  }
                  min={0}
                  value={songTime}
                  max={musicSelected?.duration}
                  step={1}
                  styles={{
                    track: {
                      backgroundColor: 'rgba(128, 172, 255, 1)',
                    },
                    handle: {
                      borderColor: 'rgba(128, 172, 255, 1)',
                    },
                  }}
                />
              </WrapperSlider>
            )}

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
                <Button
                  icon={<Repeat size={32} weight={repeat ? 'thin' : 'bold'} />}
                  onClick={toogleRepeat}
                />
                <Button
                  icon={
                    <Heart
                      size={32}
                      weight={
                        isFavoriteMusic(musicSelected?.title)
                          ? 'fill'
                          : 'regular'
                      }
                      onClick={() => setFavoriteMusic(musicSelected)}
                    />
                  }
                />
              </div>
            )}
          </>

          <audio src={musicSelected?.song} ref={audioRef}></audio>
        </WrapperPlayer>
      )}
    </>
  )
}

export default Player
