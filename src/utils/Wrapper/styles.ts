import { styled } from '@mui/material/styles'

export const StyledWrapper = styled('div')(({ theme }) => ({
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
}))
