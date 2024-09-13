import styled from 'styled-components';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 240;

export const DrawerWrapper = styled(MuiDrawer)<{ open: boolean }>`
  width: ${(props) => (props.open ? `${drawerWidth}px` : '64px')}; /* Use um valor fixo para largura minimizada */
  flex-shrink: 0;
  white-space: nowrap;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out; /* Transição suave para mudança de largura */

  & .MuiDrawer-paper {
    width: ${(props) => (props.open ? `${drawerWidth}px` : '64px')};
    transition: width 0.3s ease-in-out; /* Transição suave para o papel também */
    overflow-x: hidden; /* Evita overflow horizontal quando o drawer está minimizado */
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  padding: 10px;
`

export const ListItemButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  width: 100%;
  max-width: ${drawerWidth}px; /* Largura máxima do botão igual à largura do drawer */
  margin: 5px 0;

  &:hover {
    background-color: #707d7d;
    color: white;
  }

  transition: background-color 0.4s; /* Transição suave para o hover */
`

export const SublistItemButton = styled(ListItemButton)`
  margin-left: 20px;
  width: calc(100% - 20px); /* Largura do botão menos as margens */
`

export const HeaderSection = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.open ? 'flex-start' : 'center')};
  width: 100%;
  border-radius: 12px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const MenuTitle = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-size: 24px;
`