'use client'

import { Heart, Playlist, Clock, Shuffle } from '@phosphor-icons/react'
import {
  WrapperOptions,
  WrapperContainer,
  WrapperPreview,
  WrapperList,
  Divider,
} from './styles'
import InputSearch from '@/components/InputSearch'
import Button from '@/components/Button'
import { DataType } from '@/components/SongDetails'

import Player from '@/components/Player'
import { useEffect, useMemo, useState } from 'react'
import ListSongs from '@/components/ListSongs'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { listMusicAtom } from '@/atoms/list-music-atom'
import { musicSelectedAtom } from '@/atoms/music-selected-atom'
import { playlistSelectedAtom } from '@/atoms/playlist-selected-atom'

const PlayerPage = () => {
  const [search, setSearch] = useState('')

  const setMusicSelected = useSetAtom(musicSelectedAtom)
  const list = useAtomValue(listMusicAtom)

  const [playlistSelected, setPlaylistSelected] = useAtom(playlistSelectedAtom)

  const handleSelectedMusic = (data: DataType) => {
    setMusicSelected(data)
  }

  useEffect(() => {
    setPlaylistSelected(list)
  }, [list])

  const playlistFiltered = useMemo(() => {
    return (
      playlistSelected?.filter((item) => {
        return (
          item?.title.toLocaleLowerCase().includes(search) ||
          item?.singer.toLocaleLowerCase().includes(search)
        )
      }) ?? []
    )
  }, [playlistSelected, search])

  return (
    <>
      <WrapperContainer>
        <InputSearch width="100%" onChange={(e) => setSearch(e.target.value)} />
        <WrapperOptions>
          <Button
            icon={<Clock size={32} weight="fill" />}
            align="vertical"
            label="Recent"
          />
          <Button
            icon={<Heart size={32} weight="fill" />}
            align="vertical"
            label="Favorites"
          />
          <Button
            icon={<Playlist size={32} weight="fill" />}
            align="vertical"
            label="Playlist"
          />
        </WrapperOptions>
        <WrapperPreview>
          <Button
            icon={<Shuffle size={32} weight="fill" />}
            label="Ordem aleatória"
          />
        </WrapperPreview>
        <Divider>
          <span>List</span>
        </Divider>
        <WrapperList>
          <ListSongs
            list={playlistFiltered}
            setSelectedMusic={handleSelectedMusic}
          />
        </WrapperList>
      </WrapperContainer>

      <Player />
    </>
  )
}

export default PlayerPage
