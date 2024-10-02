import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleActivitiesClick = () => {
    navigate('/activities/list');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Typography variant="h3" color="#03624C" gutterBottom>
            Bem-vindo ao SGIEP
          </Typography>
          <Typography variant="h5" color="textSecondary">
            O Sistema de Gestão de Instituições Esportivas Públicas. Aqui você pode visualizar e se inscrever
            nas atividades esportivas disponíveis em sua cidade.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleActivitiesClick}
            sx={{ backgroundColor: '#03624C', padding: '10px 20px' }}
          >
            Ver Atividades
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLoginClick}
            sx={{ borderColor: '#03624C', color: '#03624C', padding: '10px 20px' }}
          >
            Login
          </Button>
        </Box>

        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
          O SGIEP oferece uma plataforma completa para cidadãos, gestores e professores. 
          Gerencie suas atividades esportivas de forma eficiente!
        </Typography>
      </Container>
    </Box>
  );
};

export default MainPage;
