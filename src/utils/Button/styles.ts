import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Estilos personalizados do botão
export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'color',
})<{
  size: 'small' | 'medium';
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info';
}>(({ theme, size, color, variant }) => {
  const backgroundColor = variant === 'contained' ? theme.palette[color].main : 'transparent';
  const textColor = variant === 'contained' ? theme.palette[color].contrastText : theme.palette[color].main;
  const hoverBackgroundColor = variant === 'contained' ? theme.palette[color].contrastText : theme.palette[color].main;
  const hoverTextColor = variant === 'contained' ? theme.palette[color].main : theme.palette[color].contrastText;

  return {
    padding: size === 'small' ? theme.spacing(0.5, 2) : theme.spacing(1, 3), // Ajusta o padding: small menor, medium padrão
    fontSize: size === 'small' ? '1rem' : '1.2rem', // Ajusta o tamanho da fonte
    borderRadius: theme.shape.borderRadius, // Usa o border-radius do tema
    textTransform: 'none', // Remove o uppercase padrão do MUI
    color: textColor, // Define a cor do texto
    backgroundColor: backgroundColor, // Define a cor de fundo
    border: variant === 'outlined' ? `1px solid ${theme.palette[color].main}` : 'none', // Define a borda para 'outlined'
    '&:hover': {
      backgroundColor: hoverBackgroundColor, // Inverte as cores no hover
      color: hoverTextColor,
      borderColor: hoverBackgroundColor,
      boxShadow: size === 'small' ? theme.shadows[2] : theme.shadows[3], // Sombra ao passar o mouse
    },
    height: size === 'small' ? 48 : 56, // Altura do botão
    minWidth: size === 'small' ? 64 : 120, // Largura mínima do botão
  };
});