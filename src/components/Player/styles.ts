import styled, { css } from 'styled-components'

interface Props {
  height: number
  $expanded: boolean
}

export const WrapperPlayer = styled.div<Props>`
  ${({ height, $expanded }) => css`
    width: 100%;
    /* min-height: ${`${height}px`}; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 15px;
    background-color: #ffffff;

    position: fixed;
    z-index: 9;
    bottom: 0;

    padding: 1rem;

    .wrapper_actions {
      display: flex;
    }

    ${$expanded
      ? css`
          height: 100vh;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          .song_info {
            display: none;
          }

          .wrapper_actions {
            gap: 3rem;
          }
        `
      : css`
          min-height: ${`${height}px`};

          display: flex;
          align-items: center;
          justify-content: space-between;

          .song_info {
            display: initial;
          }

          .wrapper_actions {
            gap: 1rem;
          }
        `}

    .header_expanded {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      span {
        font-size: 1.2rem;
      }
    }

    .wrapper_song_details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .song_cover {
        img {
          margin: auto;
          border-radius: 50%;
          border: 3px solid #ad94c1;
        }
      }

      .song_info {
        span {
          font-size: 1.2rem;
        }
      }
    }

    .more_actions {
      display: flex;
      gap: 2rem;

      height: 5rem;
    }
  `}
`

export const WrapperCover = styled.div<{ $expanded: boolean }>`
  ${({ $expanded }) => css`
    img {
      margin: auto;
      border-radius: ${!$expanded ? '50%' : '1rem'};
      border: 3px solid #ad94c1;
    }
  `}
`
