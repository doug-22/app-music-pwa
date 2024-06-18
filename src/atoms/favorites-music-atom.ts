import { DataType } from '@/components/SongDetails'
import { atom } from 'jotai'

export const favoritesMusicAtom = atom<DataType[]>([])
