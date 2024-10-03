import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import * as S from './styles';
import { registerUser } from '../../Services/auth';
import { UserType } from '../../Types/user';
import Wrapper from '../../utils/Wrapper';
import Button from '../../utils/Button';
import { AppBar, Toolbar } from '@mui/material';
import {useAuth} from '../../Context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState<UserType | string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      email: '',
      password: '',
      phone: ''
    };

    if (!name.trim()) {
      errors.name = 'Nome é obrigatório';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'E-mail é obrigatório';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = 'E-mail inválido';
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = 'A senha deve ter no mínimo 6 caracteres';
      isValid = false;
    }

    const phoneRegex = /^\d{11}$/;
    if (phone && !phoneRegex.test(phone)) {
      errors.phone = 'Telefone inválido. Insira DDD e 9.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await registerUser(name, email, password, role, phone, address);
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
    <>
      {!isLoggedIn && (
        <AppBar 
          position="fixed" 
          color="primary"
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              SGIEP
            </Typography>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
              }}
            >
              <Button color="primary" variant='contained' size='small' onClick={() => navigate('/')}>
                Início
              </Button>

              {!userId && (
                <>
                  <Button color="primary" size='small' onClick={() => navigate('/activities')}>Atividades</Button>
                  <Button color="primary" variant='contained' size='small' onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button color="primary" variant='contained' size='small' onClick={() => navigate('/register')}>
                    Cadastro
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      )}

      <div
        style={{
          marginTop: '6rem',
          height: '100%',
        }}
      >
        <Wrapper>
          <S.FormColumn>
            <a href="/">Voltar para a página inicial</a>
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
                width: '100%',
                maxWidth: '800px',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
                margin: '0 auto',
              }}
            >
              {/* Campos organizados em duas colunas */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <TextField
                  label="Nome"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
                <TextField
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
                <TextField
                  label="Senha"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
                <TextField
                  label="Telefone"
                  type="text"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                />
              </Box>
              <TextField
                label="Endereço"
                type="text"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <Typography variant="h6" color="textSecondary" sx={{ marginTop: '16px' }}>
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
                sx={{ marginTop: '24px' }}
              >
                Cadastrar
              </Button>
            </Box>
          </S.FormColumn>
        </Wrapper>
      </div>
    </>
  );
};

export default Register;
