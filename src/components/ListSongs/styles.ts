import styled, { css, keyframes } from 'styled-components'

export const WrapperList = styled.div`
  position: relative;
`

export const Menu = styled.div<{ $hide: boolean }>`
  ${({ theme, $hide }) => css`
    width: 150px;

    background-color: ${theme.colors.white};
    box-shadow: 1px 1px 3px ${theme.colors.shadow};

    position: absolute;
    z-index: 9;

    top: 50px;
    right: 30px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0;
    gap: 1rem;

    button {
      background-color: transparent;
      border: none;
      padding: 0 1rem;
      color: ${theme.colors.grayFont};
    }

    ${!$hide
      ? css`
          animation: ${FadeOut} 0.5s forwards;
          display: none;
        `
      : css`
          animation: ${FadeIn} 0.5s none;
        `}
  `}
`

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;

  }
`

const FadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`
