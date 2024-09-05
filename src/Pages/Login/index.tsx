import React from 'react'
import * as S from './styles'
import { Box, TextField } from '@mui/material'
import Button from '../../utils/Button'

const Login = () => {
  return (
    <S.Wrapper>
      <S.TwoColumns>
        <div
        style={{
          backgroundColor: '#177E6A',
          borderRadius: '8px 0 0 8px',
        }}/>
        <S.FormColumn>
          <S.PageTitle>
            Login
          </S.PageTitle>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '64px 48px',
              borderRadius: '8px',
              width: '80%',
              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            <TextField
              label='E-mail'
              type='email'
              variant='outlined'
            />
            <TextField
              label='Senha'
              type='password'
              variant='outlined'
            />
            <Button
              variant='contained'
              color='primary'
            >
              Entrar
            </Button>
          </Box>
        </S.FormColumn>
      </S.TwoColumns>
    </S.Wrapper>
  )
}

export default Login