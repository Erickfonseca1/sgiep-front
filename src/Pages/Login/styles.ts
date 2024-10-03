import {styled} from '@mui/material'
import { Typography } from '@mui/material';


export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '0',
  margin: '24px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  gap: '12px',
  minHeight: '100%',
  height: '100%',
}))

export const TwoColumns = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  height: '100%',
}))

export const FormColumn = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  gap: '16px',
}))

export const PageTitle = styled(Typography)`
  font-family: 'Quicksand', sans-serif;
  font-size: 64px;
  font-weight: 300;
  color: #054A32;
`

export const Caption = styled(Typography)`
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #054A32;
  text-align: center;
  width: 100%;
`