import { styled } from '@mui/material';
import { Typography } from '@mui/material';

export const FormColumn = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  gap: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px'
}));

export const PageTitle = styled(Typography)`
  font-family: 'Quicksand', sans-serif;
  font-size: 64px;
  font-weight: 300;
  color: #054A32;
  text-align: center;
`;
