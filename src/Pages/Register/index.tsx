import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../Services/auth'
import { UserType } from '../../Types/user'; // Ensure this import exists
import * as S from './styles'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [role, setRole] = useState<UserType | string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await registerUser(name, email, password, role);
      navigate('/login');
    } catch {
      setError('Erro ao realizar o cadastro');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <S.Wrapper>
      <S.TwoColumns>
        <div
          style={{
            backgroundColor: '#177E6A',
            borderRadius: '8px 0 0 8px',
          }}
        />
        <S.FormColumn>
          <S.PageTitle>Cadastro</S.PageTitle>
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
              label="Nome"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="E-mail"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Typography variant="h6" color="textSecondary">
              Selecione o tipo de usuário:
            </Typography>
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                value="citizen"
                control={<Radio color="primary" />}
                label="Cidadão"
              />
              <FormControlLabel
                value="professor"
                control={<Radio color="primary" />}
                label="Professor"
              />
            </RadioGroup>

            {error && <Typography color="red">{error}</Typography>}

            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              type="submit"
            >
              Cadastrar
            </Button>
          </Box>
        </S.FormColumn>
      </S.TwoColumns>
    </S.Wrapper>
  );
};

export default Register;