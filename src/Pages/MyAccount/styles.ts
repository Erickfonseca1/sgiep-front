import { styled } from '@mui/material/styles';

export const ProfileCard = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  margin: '20px auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));


export const ProfileHeader = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  textAlign: 'center',
}));

export const ProfileDetails = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: '16px',
}));

export const DetailItem = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '8px 0',
}));
