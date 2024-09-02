import React from 'react'
import * as S from './styles'

type ButtonSize = 'small' | 'medium'

interface CustomButtonProps {
    size? : ButtonSize;
    variant? : 'contained' | 'outlined';
    color? : 'primary' | 'secondary' | 'error' | 'warning' | 'info';
    onClick? : () => void;
    children : React.ReactNode | string;
}

const Button: React.FC<CustomButtonProps> = ({ 
    size = 'medium', 
    variant = 'contained', 
    color = 'primary', 
    onClick, 
    children 
}) => {

    return (
        <S.StyledButton
            size={size}
            variant={variant}
            color={color}
            onClick={onClick}
        >
            {children}
        </S.StyledButton>
    )
}

export default Button