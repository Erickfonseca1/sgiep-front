import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: 16px 32px;  /* Adicionado para espaçamento interno */
  @media (max-width: 1024px) {
    flex-direction: column; /* Ajuste para responsividade em telas menores */
    justify-content: center;
    align-items: center;
  }
`

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 100%;
  img {
    max-width: 80%; /* Ajuste para imagens menores em telas menores */
    object-fit: contain;
  }
`

export const Divider = styled.hr`
  width: 2px;
  height: 100%;
  background-color: #06302b;
  margin: 24px 0;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 24px;
`

export const PageTitle = styled.h1`
  font-family: 'Quicksand', sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: #06302b;
  text-align: center;
`

export const Subtitle = styled.h2`
  font-family: 'Quicksand', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #03624c;
  margin-top: 12px;
  text-align: center;
`

export const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); /* Usando grid para organizar os itens */
  gap: 24px;
  margin-top: 24px;
  width: 100%;
`

export const DashboardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  }

  span {
    font-family: 'Quicksand', sans-serif;
    font-size: 24px;
    font-weight: 500;
    color: #03624c;
  }

  svg {
    font-size: 64px;
    color: #03624c;
  }
`

export const ButtonsSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`

export const Button = styled.button`
  padding: 12px 24px;
  border: 2px solid #03624c;
  border-radius: 8px;
  background-color: #ffffff;
  color: #03624c;
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #03624c;
    color: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
`

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`

export const ActivityCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`

export const ActivityName = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #03624c;
`

export const ActivityDetails = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #707070;
`

export const NoActivityMessage = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #707070;
`

export const NextCommitment = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #03624c;
  margin-top: 16px;
  padding: 16px;
  background-color: #e0f2f1;
  border-radius: 8px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
`
