import styled, { css } from 'styled-components'

export const Background = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100vh;
    background-color: ${theme.colors.shadow};

    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  `}
`
export const WrapperModal = styled.div`
  ${({ theme }) => css`
    width: 60%;

    padding: 1rem;

    background-color: ${theme.colors.backgroundHome};
    box-shadow: 1px 1px 3px ${theme.colors.black};

    .modal_header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .modal_title {
        font-size: ${theme.font.sizes.medium};
      }

      .close_modal_button {
        background-color: transparent;
        border: none;
      }
    }
  `}
`

export const WrapperList = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100px;
    max-height: 200px;
    padding-top: 1rem;

    overflow: auto;

    display: flex;

    ul li {
      font-size: ${theme.font.sizes.medium};
      padding-bottom: 0.5rem;
    }

    span {
      font-size: ${theme.font.sizes.small};
      margin: auto;
    }
  `}
`
export const WrapperForm = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 1rem 0;

    label {
      font-size: ${theme.font.sizes.small};
    }

    input {
      width: 100%;
      font-size: ${theme.font.sizes.small};
    }
  `}
`

export const WrapperButtons = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    gap: 1rem;
    padding-top: 1rem;
    background-color: ${theme.colors.backgroundHome};

    button {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
  `}
`
