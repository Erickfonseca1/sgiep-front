import styled from 'styled-components';

// Wrapper ajustado para usar valores do tema
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px;
  margin: 24px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  gap: 12px;
  min-height: 100%;
  height: auto;
`;

// PageTitle ajustado para usar valores do tema
export const PageTitle = styled.span`
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
`;

// Subtitle ajustado para usar valores do tema
export const Subtitle = styled.span`
  font-family: ${({ theme }) => theme.typography.body1.fontFamily};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1.fontWeight};
`;

// CardList ajustado
export const CardList = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 36px;
  align-items: flex-start;
`;

// Card ajustado para usar valores do tema
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 256px;
  width: 256px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  
  &:hover {
    transform: scale(1.025);
    box-shadow: ${({ theme }) => theme.shadows[3]};
  }

  transition: transform 0.5s, box-shadow 0.5s;
`;

// EventCard ajustado para usar valores do tema
export const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 200px;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

// CardContent ajustado para usar valores do tema
export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  font-family: ${({ theme }) => theme.typography.body1.fontFamily} !important;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1.fontWeight};
  color: ${({ theme }) => theme.palette.text.primary};
`;

// Text ajustado para usar valores do tema
export const Text = styled.span`
  font-family: ${({ theme }) => theme.typography.h2.fontFamily};
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
`;

// Body ajustado
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;