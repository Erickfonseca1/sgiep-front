import React, { useState, useEffect } from 'react'
import Wrapper from '../../../utils/Wrapper'
import * as S from './styles'
import { AdminType } from '../../../Types/user'
import { getAdmins } from '../../../Services/admins'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Button from '../../../utils/Button'
import { useNavigate } from 'react-router-dom'

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<AdminType[]>([])
  const navigate = useNavigate()

  const handleGetAdmins = async () => {
    const response: AdminType[] = await getAdmins()
    setAdmins(response)
  }

  useEffect(() => {
    handleGetAdmins()
  }, [])

  return (
    <Wrapper>
      <S.PageTitle>
        Lista de Administradores
      </S.PageTitle>
      <S.Subtitle>
        Aqui você pode visualizar todos os administradores cadastrados no sistema.
      </S.Subtitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={() => {navigate('/admin/form')}}
          color="primary"
          size="small"
          variant="contained"
        >
          Adicionar Administrador
        </Button>
      </div>

      <TableContainer component={Paper} sx={{marginTop: '24px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin: AdminType) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  )
}

export default AdminList