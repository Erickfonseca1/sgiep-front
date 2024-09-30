import React, { useState, useEffect } from 'react'
import Wrapper from '../../../utils/Wrapper'
import * as S from './styles'
import { ManagerType } from '../../../Types/user'
import { getManagers } from '../../../Services/managers'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Button from '../../../utils/Button'
import { useNavigate } from 'react-router-dom'

const ManagerList: React.FC = () => {
  const [managers, setManagers] = useState<ManagerType[] | null>(null)
  const navigate = useNavigate()

  const handleGetManagers = async () => {
    const response: ManagerType[] = await getManagers()
    console.log(response)
    setManagers(response)
  }

  useEffect(() => {
    handleGetManagers()
  }, [])

  return (
    <Wrapper>
      <S.PageTitle>
        Lista de Gerentes
      </S.PageTitle>
      <S.Subtitle>
        Aqui você pode visualizar todos os gerentes cadastrados no sistema.
      </S.Subtitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={() => {navigate('/managers/form')}}
          color="primary"
          size="small"
          variant="contained"
        >
          Adicionar Gestor
        </Button>
      </div>

      <TableContainer component={Paper} sx={{marginTop: '24px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers && managers.map((manager: ManagerType) => (
              <TableRow key={manager.id}>
                <TableCell>{manager.name}</TableCell>
                <TableCell>{manager.email}</TableCell>
                <TableCell>{manager.active ? 'Ativo' : 'Inativo'}</TableCell>
              </TableRow>
            ))}

            {!managers || managers.length == 0 && (
              <TableRow>
                <TableCell colSpan={2}>Nenhum gestor cadastrado</TableCell> 
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  )
}

export default ManagerList

