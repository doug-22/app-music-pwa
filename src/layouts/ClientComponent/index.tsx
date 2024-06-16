'use client'

import GlobalStyles from '@/styles/global'
import theme from '@/styles/theme'
import { Provider } from 'jotai'
import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

const ClientComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider>
        <GlobalStyles />
        {children}
      </Provider>
    </ThemeProvider>
  )
}

export default ClientComponent
