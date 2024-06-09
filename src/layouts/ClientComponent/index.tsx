'use client'

import GlobalStyles from '@/styles/global'
import { ReactNode } from 'react'

const ClientComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  )
}

export default ClientComponent
