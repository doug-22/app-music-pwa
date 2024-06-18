import { DataType } from '@/components/SongDetails'
import { atom } from 'jotai'

type PlaylistType = {
  title: string
  songs: DataType[]
}

export const playlistsAtom = atom<PlaylistType[]>([])
