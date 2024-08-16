import styled from 'styled-components'

export const Wrapper = styled.div`
    display: 'flex';
    align-items: 'flex-start';
    justify-content: 'flex-end';
`

export const ListItemButton = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 12px;
    width: 240px;
    max-width: 240px;
    margin: 5px 5px;

    &:hover {
        background-color: #707d7d;
        color: white;
    }

    transition: background-color 0.4s;
`

export const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px;
    padding: 4px 8px;
    border-radius: 12px;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const MenuTitle = styled.span`
    font-family: "Quicksand", sans-serif;
    font-size: 24px;
`