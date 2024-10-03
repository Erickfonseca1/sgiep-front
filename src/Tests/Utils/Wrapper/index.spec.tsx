import { render, screen } from '@testing-library/react';
import Wrapper from '../../../utils/Wrapper'; // Substitua pelo caminho correto do componente

describe('Wrapper Component', () => {
  it('should render children correctly', () => {
    render(
      <Wrapper>
        <p>Test content</p>
      </Wrapper>
    );

    // Verifica se o conteúdo passado como children é renderizado corretamente
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
