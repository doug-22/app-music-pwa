import styled, { css } from 'styled-components'

interface Props {
  $label?: boolean
  $align?: 'vertical' | 'horizontal'
}

export const WrapperButton = styled.button<Props>`
  ${({ theme, $label, $align }) => css`
    cursor: pointer;

    background-color: transparent;
    border: none;
    padding: 0 1rem;
    border-radius: 25px;

    svg {
      fill: ${theme.colors.borderinputSearch};
    }

    ${$label &&
    css`
      svg {
        width: 2.4rem;
      }

      background-color: ${theme.colors.outline};
      color: ${theme.colors.grayFont};
    `}

    display: flex;
    align-items: center;
    gap: 0.5rem;

    ${$align === 'horizontal'
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: column;
          background-color: transparent;
          gap: 0;
        `}
  `}
`
