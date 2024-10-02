import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../utils/Button'; // Substitua pelo caminho correto para o seu componente

// Mock para o estilo

describe('Button Component', () => {

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const buttonElement = screen.getByText('Click me');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should pass additional props to the button', () => {
    render(<Button data-testid="custom-button">Click me</Button>);

    const buttonElement = screen.getByTestId('custom-button');
    expect(buttonElement).toBeInTheDocument();
  });
});


