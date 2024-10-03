import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { Box, TextField } from '@mui/material'
import { useAuth } from '../../Context/AuthContext'
import Button from '../../utils/Button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { handleLogin, loading, error, setLoadingAuthState } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const validateForm = () => {
    let isValid = true
    const errors = {
      email: '',
      password: '',
    }

    if (!email.trim()) {
      errors.email = 'E-mail é obrigatório'
      isValid = false
    }

    if (password.length < 6) {
      errors.password = 'A senha deve ter no mínimo 6 caracteres'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

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
          <S.Caption>
            <a 
              href="/"
              style={{textDecoration: 'none', color: 'black'}}
            >
              Voltar para a página inicial
            </a>
          </S.Caption>
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              label='Senha'
              type='password'
              variant='outlined'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
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
            <S.Caption>
              Ainda não tem uma conta? <a href='/register' style={{textDecoration: 'none', color: 'black'}}>Cadastre-se</a>
            </S.Caption>
          </Box>
        </S.FormColumn>
      </S.TwoColumns>
    </S.Wrapper>
  )
}

export default Login