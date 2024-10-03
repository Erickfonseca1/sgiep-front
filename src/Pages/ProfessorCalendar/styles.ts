import { styled } from '@mui/material/styles';
import { Divider as MuiDivider } from '@mui/material';

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

// Container do calendário semanal
export const CalendarContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  flexGrow: 1,
  justifyContent: 'space-between',
  marginTop: '24px',
}));

// Colunas da semana (Domingo a Sábado) com divider entre as colunas
export const WeekColumn = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '14%',
  padding: '8px',
  boxSizing: 'border-box',
  borderRight: '1px solid #e0e0e0',
  '&:last-child': {
    borderRight: 'none', 
  },
}));

// Cabeçalho de cada dia (Domingo, Segunda, etc.)
export const DayHeader = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.h6.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  textAlign: 'center',
  padding: '8px 0',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
}));

// Conteúdo de cada dia (Eventos)
export const DayContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginTop: '8px',
}));

// Cartão de evento (Aulas/Atividades)
export const EventCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: '14px',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[2],
  },
}));

export const EventTime = styled('div')(() => ({
  fontWeight: 500,
}));

export const EventContent = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
}));

export const Divider = styled(MuiDivider)(() => ({
  margin: '16px 0',
}));
