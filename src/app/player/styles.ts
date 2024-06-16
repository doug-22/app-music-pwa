import styled, { css } from 'styled-components'

export const WrapperContainer = styled.main`
  width: 100%;
  height: 100vh;
  padding: 1rem;
`
export const WrapperOptions = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-around;
  padding: 2rem 0;
`
export const WrapperPreview = styled.div`
  padding: 1rem 0;
`

export const WrapperList = styled.div`
  width: 100%;
  height: calc(100% - 220px);

  display: flex;
  flex-direction: column;

  overflow: auto;
`
export const Divider = styled.div`
  ${({ theme }) => css`
    padding: 1rem 0;
    span {
      color: ${theme.colors.grayFont};
      display: flex;
      align-items: center;
      font-size: ${theme.font.sizes.small};

      &::after {
        content: '';
        width: 100%;
        height: 0.01rem;
        background-color: ${theme.colors.gray};
        margin-left: 5px;
      }
    }
  `}
`

export const Menu = styled.div`
  ${({ theme }) => css`
    width: 100px;
    height: 100px;

    border-radius: 10px;

    background-color: ${theme.colors.white};
    box-shadow: 1px 1px 3px ${theme.colors.shadow};
  `}
`
