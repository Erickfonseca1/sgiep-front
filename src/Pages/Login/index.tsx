import React from 'react'
import * as S from './styles'
import { Box, TextField } from '@mui/material'
import { useAuth } from '../../Context/AuthContext'
import Button from '../../utils/Button'

const Login = () => {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    login(email, password)
  }

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
            component="form"
            onSubmit={handleSubmit}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label='Senha'
              type='password'
              variant='outlined'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Button
              variant='contained'
              color='primary'
              disabled={loading}
              type='submit'
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