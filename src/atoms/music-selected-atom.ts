import { DataType } from '@/components/SongDetails'
import { atom } from 'jotai'

export const musicSelectedAtom = atom<null | DataType>(null)
