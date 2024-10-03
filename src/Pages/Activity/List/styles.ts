import { styled } from '@mui/material'

export const PageTitle = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontSize: theme.typography.h1.fontSize,
  fontWeight: theme.typography.h1.fontWeight,
}))

export const Subtitle = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.body1.fontFamily,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
}))