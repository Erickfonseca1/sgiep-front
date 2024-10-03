import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Divider } from '@mui/material';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../Services/users';
import { UserProfileType } from '../../Types/user';
import { useAuth } from '../../Context/AuthContext';
import Wrapper from '../../utils/Wrapper';
import Button from '../../utils/Button';

const MyAccount = () => {
  const [user, setUser] = useState<UserProfileType | null>(null);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    const fetchProfile = async () => {
      const response = await getUserProfile(userId);
      setUser(response);
    };

    fetchProfile();
  }, [userId]);

  const handleEditClick = () => {
    navigate('/my-account/edit');
  };

  return (
    <Wrapper>
      <S.ProfileCard>
        <S.ProfileHeader>
          <Avatar
            alt={user?.name}
            sx={{ width: 180, height: 180 }}
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {user?.name || 'Carregando...'}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user?.email || 'Carregando...'}
            </Typography>
          </Box>
        </S.ProfileHeader>

        <Divider sx={{ marginY: '24px' }} />

        <S.ProfileDetails>
          <S.DetailItem>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Telefone</Typography>
            <Typography>{user?.phone || 'Não informado'}</Typography>
          </S.DetailItem>

          <Divider sx={{ marginY: '16px' }} />

          <S.DetailItem>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Endereço</Typography>
            <Typography>{user?.address || 'Não informado'}</Typography>
          </S.DetailItem>
        </S.ProfileDetails>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditClick}
            sx={{ marginTop: '24px' }}
          >
            Editar Perfil
          </Button>
        </div>
      </S.ProfileCard>
    </Wrapper>
  );
};

export default MyAccount;
