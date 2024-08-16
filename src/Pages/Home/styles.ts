import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px;
  gap: 24px;
  margin: 24px;
  border-radius: 12px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffff;
  height: 100%;
  max-height: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  height: 100%;
`

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`

export const Divider = styled.hr`
  width: 1px;
  height: 100%;
  background-color: #06302b;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 24px;
`

export const PageTitle = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 32px;
  font-weight: 400;
`

export const Subtitle = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 18px;
  font-weight: 400;
`

export const Dashboard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 24px;
  margin-top: 24px;
  width: 100%;
`

export const DashboardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  span {
    font-family: 'Quicksand', sans-serif;
    font-size: 24px;
    font-weight: 400;
  }
`

export const ButtonsSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 24px;
  width: 100%;
  border-top: 1px solid #06302b;
  border-bottom: 1px solid #06302b;
  padding: 12px;
  margin-top: 24px;
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: #ffffff;
  color: #03624c;
  font-family: 'Quicksand', sans-serif;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition:
    background-color 0.6s,
    color 0.6s,
    box-shadow 0.6s;

  &:hover {
    background-color: #03624c;
    color: #ffffff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  }
`
