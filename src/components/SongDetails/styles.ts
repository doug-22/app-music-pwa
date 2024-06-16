import styled, { css } from 'styled-components'

export const WrapperMusic = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;

    border-bottom: 1px solid ${theme.colors.border};

    .song_cover {
      padding: 1rem;

      img {
        width: 50px;
        height: auto;
      }
    }

    .song_details {
      display: flex;
      flex-direction: column;
    }
  `}
`
export const SingerTitle = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    font-weight: ${theme.font.normal};
    color: ${theme.colors.grayFont};
  `}
`
export const MusicTitle = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.grayFont};
  `}
`
export const MenuButton = styled.button`
  ${({ theme }) => css`
    margin-left: auto;

    background-color: transparent;
    border: none;

    svg {
      fill: ${theme.colors.grayFont};
    }
  `}
`
