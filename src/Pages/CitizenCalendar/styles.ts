import styled from 'styled-components'

export const PageTitle = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 32px;
  font-weight: 300;
`
export const Subtitle = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 300;
`

export const CardList = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 36px;
  align-items: flex-start;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  height: 256px;
  width: 256px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.025);
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  }

  transition:
    transform 0.5s,
    box-shadow 0.5s;
`

export const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 200px;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 12px;
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  font-family: 'Roboto', sans-serif !important;
  font-size: 16px;
  font-weight: 400;
  color: #000;
`

export const Text = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 24px;
  font-weight: 500;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
