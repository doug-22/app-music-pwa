'use client'

import { Heart, Playlist, Clock, Shuffle } from '@phosphor-icons/react'
import {
  WrapperOptions,
  WrapperContainer,
  WrapperPreview,
  WrapperList,
  Divider,
  WrapperListPlaylist,
} from './styles'
import InputSearch from '@/components/InputSearch'
import Button from '@/components/Button'
import { DataType } from '@/components/SongDetails'

import Player from '@/components/Player'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ListSongs from '@/components/ListSongs'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { listMusicAtom } from '@/atoms/list-music-atom'
import { musicSelectedAtom } from '@/atoms/music-selected-atom'
import {
  playlistModeAtom,
  playlistSelectedAtom,
} from '@/atoms/playlist-selected-atom'
import { recentsMusicAtom } from '@/atoms/recents-music-atom'
import { favoritesMusicAtom } from '@/atoms/favorites-music-atom'
import { toast } from 'react-toastify'
import { playlistsAtom } from '@/atoms/playlists-atom'

const PlayerPage = () => {
  const [search, setSearch] = useState('')

  const setMusicSelected = useSetAtom(musicSelectedAtom)
  const [recentsMusics, setRecentsMusics] = useAtom(recentsMusicAtom)
  const [favoritesMusic, setFavoritesMusic] = useAtom(favoritesMusicAtom)
  const playlist = useAtomValue(playlistsAtom)
  const [playlistMode, setPlaylistMode] = useAtom(playlistModeAtom)
  const list = useAtomValue(listMusicAtom)

  const [playlistSelected, setPlaylistSelected] = useAtom(playlistSelectedAtom)

  const handleSelectedMusic = useCallback(
    (data: DataType) => {
      setMusicSelected(data)

      const index = recentsMusics?.findIndex(
        (item) => item?.title === data?.title,
      )

      if (index === -1) {
        setRecentsMusics([data, ...recentsMusics])
      } else {
        const newArray = recentsMusics.toSpliced(index, 1)
        setRecentsMusics([data, ...newArray])
      }
    },
    [recentsMusics],
  )

  useEffect(() => {
    setPlaylistSelected(list)
  }, [list])

  const playlistFiltered = useMemo(() => {
    return (
      playlistSelected?.filter((item) => {
        return (
          item?.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          item?.singer.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      }) ?? []
    )
  }, [playlistSelected, search])

  const handleSetShuffleMusic = useCallback(() => {
    const playlistRandom = playlistFiltered?.sort(() => Math.random() - 0.5)
    setPlaylistSelected(playlistRandom)
    setMusicSelected(playlistRandom[0])
  }, [playlistFiltered, setPlaylistSelected, setMusicSelected])

  const handleSetPlaylistRecentsMode = useCallback(() => {
    if (playlistMode === 'recents') {
      setPlaylistMode('default')
      return
    }
    setPlaylistMode('recents')
  }, [playlistMode])

  const handleSetFavoritesMode = useCallback(() => {
    if (playlistMode === 'favorites') {
      setPlaylistMode('default')
      return
    }
    setPlaylistMode('favorites')
  }, [playlistMode])

  const handleSetPlaylistsMode = useCallback(() => {
    if (['playlist-list', 'playlist-songs'].includes(playlistMode)) {
      setPlaylistMode('default')
      return
    }
    setPlaylistMode('playlist-list')
  }, [playlistMode])

  const handleFavoriteMusic = useCallback(
    (data: DataType) => {
      const index = favoritesMusic?.findIndex((item) => {
        return item?.title === data?.title
      })
      if (index === -1) {
        setFavoritesMusic([...favoritesMusic, data])
        toast.success('Music add to favorites!')
      } else {
        const newArray = favoritesMusic?.toSpliced(index, 1)
        setFavoritesMusic([...newArray])
        toast.success('Music removed from favorites!')
      }
    },
    [favoritesMusic],
  )

  const handleSelectPlaylist = useCallback(
    (songs: DataType[]) => {
      setPlaylistSelected(songs)
      setPlaylistMode('playlist-songs')
    },
    [playlist],
  )

  useEffect(() => {
    if (playlistMode === 'favorites') {
      setPlaylistSelected(favoritesMusic)
    } else if (playlistMode === 'recents') {
      setPlaylistSelected(recentsMusics)
    } else if (playlistMode === 'default') {
      setPlaylistSelected(list)
    }
  }, [playlistMode, favoritesMusic, recentsMusics, list])

  return (
    <>
      <WrapperContainer>
        <InputSearch width="100%" onChange={(e) => setSearch(e.target.value)} />
        <WrapperOptions>
          <Button
            icon={
              <Clock
                size={32}
                weight={playlistMode === 'recents' ? 'fill' : 'regular'}
              />
            }
            align="vertical"
            label="Recents"
            onClick={handleSetPlaylistRecentsMode}
          />
          <Button
            icon={
              <Heart
                size={32}
                weight={playlistMode === 'favorites' ? 'fill' : 'regular'}
              />
            }
            align="vertical"
            label="Favorites"
            onClick={handleSetFavoritesMode}
          />
          <Button
            icon={
              <Playlist
                size={32}
                weight={
                  ['playlist-list', 'playlist-songs'].includes(playlistMode)
                    ? 'fill'
                    : 'regular'
                }
              />
            }
            align="vertical"
            label="Playlist"
            onClick={handleSetPlaylistsMode}
          />
        </WrapperOptions>
        <WrapperPreview>
          <Button
            icon={<Shuffle size={32} weight="fill" />}
            label="Random order"
            onClick={handleSetShuffleMusic}
          />
        </WrapperPreview>
        <Divider>
          <span>List</span>
        </Divider>
        <WrapperList>
          {playlistMode === 'playlist-list' ? (
            <WrapperListPlaylist>
              {playlist?.map((item, idx) => (
                <li key={idx} onClick={() => handleSelectPlaylist(item?.songs)}>
                  <h3>{item?.title}</h3>
                  <span>
                    <strong>Total songs:</strong> {item?.songs.length}
                  </span>
                </li>
              ))}
            </WrapperListPlaylist>
          ) : (
            <ListSongs
              list={playlistFiltered}
              setSelectedMusic={handleSelectedMusic}
              setFavoriteMusic={handleFavoriteMusic}
            />
          )}
        </WrapperList>
      </WrapperContainer>

      <Player setFavoriteMusic={handleFavoriteMusic} />
    </>
  )
}

export default PlayerPage
