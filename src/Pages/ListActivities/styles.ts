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
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
  align-items: flex-start;
`

export const Card = styled.div<{ expanded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;

  background-color: ${(props) => (props.expanded ? '#f9f9f9' : '#ffffff')};

  span {
    transition:
      max-height 0.3s ease,
      opacity 0.3s ease;
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 16px;

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 300;
  }
`

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`

export const Button = styled.button`
  background-color: #f9f9f9;
  color: #032221;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #032221;
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #03624c;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
    color: #ffffff;
  }
`
