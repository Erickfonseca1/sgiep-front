import React, { useEffect } from 'react'
import * as S from './styles'
import { Box, TextField } from '@mui/material'
import { useAuth } from '../../Context/AuthContext'
import Button from '../../utils/Button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { handleLogin, loading, error, setLoadingAuthState } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const teste = await handleLogin(email, password)
    if (teste) {
      navigate('/')
    }
  }

  useEffect(() => {
    setLoadingAuthState(false)
  }, [])

  return (
    <S.Wrapper>
      <S.TwoColumns>
        <div
        style={{
          backgroundColor: '#177E6A',
          borderRadius: '8px 0 0 8px',
        }}/>
        <S.FormColumn>
          <a href="/">Voltar para a página inicial</a>
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