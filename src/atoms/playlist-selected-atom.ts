import { DataType } from '@/components/SongDetails'
import { atom } from 'jotai'

export const playlistSelectedAtom = atom<DataType[] | null>(null)
