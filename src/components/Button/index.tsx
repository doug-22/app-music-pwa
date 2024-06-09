import { MouseEventHandler, ReactNode } from 'react'
import { WrapperButton } from './styles'

interface Props {
  label?: string
  icon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<Props> = ({ label, icon, onClick }) => {
  return (
    <WrapperButton onClick={onClick}>
      {icon}
      {label}
    </WrapperButton>
  )
}
export default Button
