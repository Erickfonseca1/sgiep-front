import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Grid } from '@mui/material';
import Button from '../../utils/Button';
import { useNavigate } from 'react-router-dom';

const backgroundImage = 'url("src/assets/sports.jpg")';
const logo = 'src/assets/full_logotipo_3.png';
const erick = 'src/assets/erick.jpeg';
const ronaldo = 'src/assets/ronaldo.jpeg';
const rodrigo = 'src/assets/rodrigo.jpeg';

const MainPage = () => {
  const navigate = useNavigate();

  const handleActivitiesClick = () => {
    navigate('/activities');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      
      {/* 1ª Seção - Topbar */}
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SGIEP
          </Typography>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            {/* <Button color="primary" size='small' onClick={() => navigate('/')}>Início</Button> */}
            <Button color="primary" size='small' onClick={handleActivitiesClick}>Atividades</Button>
            <Button color="primary" size='small' onClick={handleLoginClick}>Login</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box
        sx={{
          height: '80vh',
          backgroundImage: backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          padding: '0 2rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            width: '50%',
            padding: '2rem',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            gap: '1rem',
          }}
        >  
          <img src={logo} alt="SGIEP" style={{ width: '300px' }} />
          <Typography variant="h4" color="primary" gutterBottom>
            Bem-vindo ao SGIEP
          </Typography>

          <Typography variant="body1" color="textSecondary">
            Faça parte das atividades esportivas públicas da sua cidade. 
            Cadastre-se e participe de aulas, eventos e competições esportivas.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleActivitiesClick}
            sx={{ backgroundColor: '#03624C', padding: '10px 20px' }}
          >
            Ver Atividades
          </Button>
        </div>
      </Box>

      <Box sx={{ backgroundColor: '#fff', padding: '4rem 0' }}>
        <Container maxWidth="md">
          <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center' }}>
            Sobre o SGIEP
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            O Sistema de Gestão de Instituições Esportivas Públicas (SGIEP) é uma plataforma desenvolvida para facilitar o acesso 
            às atividades esportivas públicas. Aqui, cidadãos podem visualizar e se inscrever em atividades, gestores podem organizar 
            eventos esportivos e professores podem gerenciar suas aulas e horários de forma eficiente.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: '#f5f5f5', padding: '4rem 0' }}>
        <Container maxWidth="md">
          <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center' }}>
            Desenvolvedores
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={ronaldo} alt="Ronaldo" style={{ width: '150px', borderRadius: '50%', margin: '1rem 0' }} />
                <Typography variant="h6" color="primary">
                  Ronaldo Paulo
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Assert - IFPB
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={erick} alt="Erick" style={{ width: '150px', borderRadius: '50%', margin: '1rem 0' }} />
                <Typography variant="h6" color="primary">
                  Erick Fonseca
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Inovenow
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={rodrigo} alt="Rodrigo" style={{ width: '150px', borderRadius: '50%', margin: '1rem 0' }} />
                <Typography variant="h6" color="primary">
                  Rodrigo Silva
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  IFPB - TSI
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default MainPage;
