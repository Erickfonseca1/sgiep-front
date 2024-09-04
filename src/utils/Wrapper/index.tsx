import React from 'react'
import * as S from './styles'

type WrapperProps = {
  children: React.ReactNode,
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <S.StyledWrapper>
      {children}
    </S.StyledWrapper>
  )
}

export default Wrapper