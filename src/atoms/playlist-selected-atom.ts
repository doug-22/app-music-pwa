import { DataType } from '@/components/SongDetails'
import { atom } from 'jotai'

export const playlistSelectedAtom = atom<DataType[] | null>(null)
export const playlistModeAtom = atom<
  'default' | 'recents' | 'favorites' | 'playlist-list' | 'playlist-songs'
>('default')
