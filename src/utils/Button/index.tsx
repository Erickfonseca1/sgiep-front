import React from 'react'
import * as S from './styles'
import { ButtonProps } from '@mui/material'

type ButtonSize = 'small' | 'medium'

interface CustomButtonProps extends ButtonProps {
    size? : ButtonSize;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'warning';
    children : React.ReactNode | string;
}

const Button: React.FC<CustomButtonProps> = ({ 
    size = 'medium', 
    variant = 'contained', 
    color = "primary", 
    onClick, 
    children,
    ...muiprops
}) => {

    return (
        <S.StyledButton
            size={size}
            variant={variant}
            color={color}
            onClick={onClick}
            {...muiprops}
        >
            {children}
        </S.StyledButton>
    )
}

export default Button