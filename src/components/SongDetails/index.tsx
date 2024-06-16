import { DotsThreeVertical } from '@phosphor-icons/react'
import { MenuButton, MusicTitle, SingerTitle, WrapperMusic } from './styles'
import Image, { StaticImageData } from 'next/image'
import CoverDefault from '../../../public/assets/cover_default.jpg'

export interface DataType {
  title: string
  singer: string
  cover: StaticImageData | null
  song: string
}

interface Props {
  data: DataType
  openMenu: () => void
}

const SongDetails: React.FC<Props> = ({ data, openMenu }) => {
  return (
    <>
      <WrapperMusic>
        <div className="song_cover">
          <Image
            src={data?.cover ?? CoverDefault}
            width={50}
            height={50}
            alt={`Capa da música ${data?.title}`}
          />
        </div>
        <div className="song_details">
          <MusicTitle>{data?.title}</MusicTitle>
          <SingerTitle>{data?.singer}</SingerTitle>
        </div>
        <MenuButton onClick={openMenu}>
          <DotsThreeVertical size={32} weight="bold" />
        </MenuButton>
      </WrapperMusic>
    </>
  )
}

export default SongDetails
