import { MouseEventHandler, ReactNode } from 'react'
import { WrapperButton } from './styles'

interface Props {
  label?: string
  icon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  align?: 'vertical' | 'horizontal'
}

const Button: React.FC<Props> = ({
  label,
  icon,
  onClick,
  align = 'horizontal',
}) => {
  return (
    <WrapperButton onClick={onClick} $label={!!label} $align={align}>
      {icon}
      {label}
    </WrapperButton>
  )
}
export default Button
