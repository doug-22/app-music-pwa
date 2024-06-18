import { useCallback, useState } from 'react'
import {
  Background,
  WrapperButtons,
  WrapperForm,
  WrapperList,
  WrapperModal,
} from './styles'
import { playlistsAtom } from '@/atoms/playlists-atom'
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'
import { DataType } from '../SongDetails'
import { XCircle } from '@phosphor-icons/react'
import Button from '../Button'

interface Props {
  closeModal: () => void
  data: DataType
}

const Modal: React.FC<Props> = ({ closeModal, data }) => {
  const [playlist, setPlaylist] = useAtom(playlistsAtom)
  const [stepper, setStepper] = useState(0)
  const [value, setValue] = useState('')

  const handleCreatePlaylist = useCallback(() => {
    setPlaylist([
      ...playlist,
      {
        title: value,
        songs: [],
      },
    ])
    toast.success('Playlist created!')
    setStepper(0)
    setValue('')
  }, [value, playlist])

  const handleAddMusicToPlaylist = useCallback(
    (title: string) => {
      const newArray = playlist?.map((item) => {
        if (item?.title === title) {
          const index = item?.songs.findIndex(
            (item) => item?.title === data?.title,
          )
          if (index === -1) {
            return {
              ...item,
              songs: [...item?.songs, data],
            }
          }
        }
        return item
      })

      setPlaylist(newArray)
      toast.success('Song added to playlist!')
      closeModal()
    },
    [playlist, data],
  )

  return (
    <Background>
      <WrapperModal>
        <div className="modal_header">
          <h1 className="modal_title">
            {stepper === 0 ? 'List playlist' : 'Add to playlist'}
          </h1>
          <button onClick={closeModal} className="close_modal_button">
            <XCircle size={20} />
          </button>
        </div>
        {stepper === 0 ? (
          <WrapperList>
            {playlist?.length > 0 ? (
              <ul>
                {playlist?.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleAddMusicToPlaylist(item?.title)}
                  >
                    {item?.title}
                  </li>
                ))}
              </ul>
            ) : (
              <span>There are no playlists created</span>
            )}
          </WrapperList>
        ) : (
          <WrapperForm>
            <label>Playlist name:</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </WrapperForm>
        )}
        <WrapperButtons>
          {stepper === 0 && (
            <Button onClick={() => setStepper(1)} label="New playlist" />
          )}
          {stepper === 1 && (
            <>
              <Button onClick={handleCreatePlaylist} label="Create playlist" />
              <Button onClick={() => setStepper(0)} label="Back" />
            </>
          )}
        </WrapperButtons>
      </WrapperModal>
    </Background>
  )
}
export default Modal
