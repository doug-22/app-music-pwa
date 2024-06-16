import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input, Wrapper } from './styles'

export interface InputSearchProps {
  width: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputSearch = ({ width, onChange }: InputSearchProps) => {
  return (
    <Wrapper width={width}>
      <Input placeholder="Search" required onChange={onChange} />
      <MagnifyingGlass size={24} />
    </Wrapper>
  )
}
export default InputSearch
