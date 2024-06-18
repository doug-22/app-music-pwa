import { useCallback, useState } from 'react'
import SongDetails, { DataType } from '../SongDetails'
import { Menu, WrapperList } from './styles'
import { useAtomValue } from 'jotai'
import { favoritesMusicAtom } from '@/atoms/favorites-music-atom'
import Modal from '../ModalPlaylist'

interface Props {
  list: DataType[] | null
  setSelectedMusic: (data: DataType) => void
  setFavoriteMusic: (data: DataType) => void
}

const ListSongs: React.FC<Props> = ({
  list,
  setSelectedMusic,
  setFavoriteMusic,
}) => {
  const [idxSelected, setIdxSelected] = useState<number | null>(null)
  const favoritesMusic = useAtomValue(favoritesMusicAtom)

  const [openModal, setOpenModal] = useState(false)
  const [music, setMusic] = useState<DataType | null>(null)

  const handleOpenMenu = useCallback(
    (idx: number) => {
      if (idx === idxSelected) {
        return setIdxSelected(null)
      }
      return setIdxSelected(idx)
    },
    [idxSelected],
  )

  const handleSelectedMusic = (data: DataType) => {
    setSelectedMusic(data)
    setIdxSelected(null)
  }

  const isFavoriteMusic = useCallback(
    (title: string) => {
      const index = favoritesMusic?.findIndex((item) => item?.title === title)
      return index !== -1
    },
    [favoritesMusic],
  )

  return (
    <>
      {list?.map((music, idx) => (
        <WrapperList key={idx}>
          <SongDetails
            data={music}
            openMenu={() => handleOpenMenu(idx)}
            setMusic={() => handleSelectedMusic(music)}
          />
          <Menu $hide={idxSelected === idx}>
            <button
              onClick={() => {
                setFavoriteMusic(music)
                setIdxSelected(null)
              }}
            >
              {isFavoriteMusic(music?.title)
                ? 'Remove to favorites'
                : 'Add to favorites'}
            </button>
            <button
              onClick={() => {
                setOpenModal(true)
                setIdxSelected(null)
                setMusic(music)
              }}
            >
              Add playlist
            </button>
          </Menu>
        </WrapperList>
      ))}
      {openModal && music && (
        <Modal
          data={music}
          closeModal={() => {
            setOpenModal(false)
            setMusic(null)
          }}
        />
      )}
    </>
  )
}

export default ListSongs
