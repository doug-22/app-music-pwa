import { useCallback, useState } from 'react'
import SongDetails, { DataType } from '../SongDetails'
import { Menu, WrapperList } from './styles'

interface Props {
  list: DataType[] | null
  setSelectedMusic: (data: DataType) => void
}

const ListSongs: React.FC<Props> = ({ list, setSelectedMusic }) => {
  const [idxSelected, setIdxSelected] = useState<number | null>(null)

  const handleOpenMenu = useCallback(
    (idx: number) => {
      if (idx === idxSelected) {
        return setIdxSelected(null)
      }
      return setIdxSelected(idx)
    },
    [idxSelected],
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectedMusic = (event: any, data: DataType) => {
    if (event.target.tagName === 'svg') {
      return
    }
    setSelectedMusic(data)
    setIdxSelected(null)
  }

  return (
    <>
      {list?.map((music, idx) => (
        <WrapperList key={idx} onClick={(e) => handleSelectedMusic(e, music)}>
          <SongDetails data={music} openMenu={() => handleOpenMenu(idx)} />
          <Menu $hide={idxSelected === idx}>
            <button>Favorite music</button>
            <button>Add playlist</button>
          </Menu>
        </WrapperList>
      ))}
    </>
  )
}

export default ListSongs
