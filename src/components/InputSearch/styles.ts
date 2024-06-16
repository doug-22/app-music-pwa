import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ width: string }>`
  ${({ theme, width }) => css`
    width: ${width && width};

    position: relative;

    svg {
      position: absolute;

      top: 50%;
      transform: translate(0, -50%);
      right: 10px;

      fill: ${theme.colors.grayFont};
    }
  `}
`
export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    height: 3.8rem;
    border-radius: 0.4rem;

    border: none;
    background-color: ${theme.colors.outline};
    outline: none;

    padding-left: 1rem;
    color: ${theme.colors.grayFont};

    &:focus,
    &:valid {
      background-color: ${theme.colors.backgroundInputSearch};
      border: 0.1rem solid ${theme.colors.borderinputSearch} !important;
    }

    &::placeholder {
      color: ${theme.colors.grayFont};
    }
  `}
`
