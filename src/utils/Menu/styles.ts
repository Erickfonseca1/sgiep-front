import styled from 'styled-components'

export const Wrapper = styled.div`
    display: 'flex';
    align-items: 'flex-start';
    justify-content: 'flex-end';
    width: '500px'
`

export const ListItemButton = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    width: 100%;

    &:hover {
        background-color: #f5f5f5;
    }

    transition: background-color 0.3s;
`