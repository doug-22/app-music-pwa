import { atom } from 'jotai'

import CoverWaves from '../../public/assets/Mr._Probz_-_Waves.jpg'
import Cover720 from '../../public/assets/i_still_love_you.png'
import { DataType } from '@/components/SongDetails'

export const listMusicAtom = atom<DataType[] | null>([
  {
    title: 'Waves',
    singer: 'Mr. Probz',
    cover: CoverWaves,
    song: '../../musics/Mr._Probz_-_Waves.mp3',
  },
  {
    title: 'I Still Love You',
    singer: '702',
    cover: Cover720,
    song: '../../musics/I Still Love You.mp3',
  },
  {
    title: 'Eu',
    singer: 'Djonga',
    cover: null,
    song: '../../musics/Djonga_Eu.mp3',
  },
  {
    title: 'Hoje Dói',
    singer: 'Tarcisio do Acordeon',
    cover: null,
    song: '../../musics/HOJE_DOI_-_Tarcisio_do_Acordeon.mp3',
  },
  {
    title: 'Passar De Foguetão 2',
    singer: 'MC Don Juan, MC Hariel e MC-Ryan SP',
    cover: null,
    song: '../../musics/MC_Don_Juan_MC_Hariel_MC-Ryan_SP_-_Passar_De_foguetao_2.mp3',
  },
  {
    title: 'Despedidas',
    singer: 'NINA & Sant',
    cover: null,
    song: '../../musics/NINA_Sant_-_Despedidas.mp3',
  },
  {
    title: 'Só Pra Você Lembrar',
    singer: 'João Gomes',
    cover: null,
    song: '../../musics/SO_PRA_VOCE_LEMBRAR_-_Joao_Gomes.mp3',
  },
])
