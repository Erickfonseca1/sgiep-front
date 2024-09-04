import { styled } from '@mui/material/styles'; // Corrige a importação do styled

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '24px',
  margin: '24px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  gap: '12px',
  minHeight: '100%',
  height: 'auto',
}));

export const PageTitle = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontSize: theme.typography.h1.fontSize,
  fontWeight: theme.typography.h1.fontWeight,
}));

export const Subtitle = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.body1.fontFamily,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
}));

export const CardList = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  marginTop: '16px',
  gap: '36px',
  alignItems: 'flex-start',
}));

export const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '256px',
  width: '256px',
  padding: '16px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.5s, box-shadow 0.5s',
  '&:hover': {
    transform: 'scale(1.025)',
    boxShadow: theme.shadows[3],
  },
}));

export const EventCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  height: '200px',
  width: '100%',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

export const CardContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '12px',
  fontFamily: `${theme.typography.body1.fontFamily} !important`,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  color: theme.palette.text.primary,
}));

export const Text = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.h2.fontFamily,
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.h2.fontWeight,
}));

export const Body = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));