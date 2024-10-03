import React, { useState, useEffect } from 'react'
import Wrapper from '../../../utils/Wrapper'
import * as S from './styles'
import { ManagerType } from '../../../Types/user'
import { changeManagerStatus, getPagedManagers, getFilteredManagers } from '../../../Services/managers'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip } from '@mui/material'
import Button from '../../../utils/Button'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom'

const ManagerList: React.FC = () => {
  const [managers, setManagers] = useState<ManagerType[] | null>(null)
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [nameFilter, setNameFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const navigate = useNavigate()

  const handleGetManagers = async (page: number, size: number, name?: string, email?: string) => {
    if (name || email) {
      const formattedName = removeAccents(name || '')
      const formattedEmail = removeAccents(email || '')
      const response = await getFilteredManagers(page, size, formattedName, formattedEmail)
      setManagers(response.content)
      setTotalPages(response.totalPages)
      return
    }

    const response = await getPagedManagers(page, size)
    setManagers(response.content)
    setTotalPages(response.totalPages)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
    handleGetManagers(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10)
    setRowsPerPage(newSize)
    setPage(0)
    handleGetManagers(0, newSize)
  }

  const handleFilter = () => {
    setPage(0)
    handleGetManagers(0, rowsPerPage, nameFilter, emailFilter)
  }

  const handleChangeStatus = async (id: number) => {
    const response = await changeManagerStatus(id)
    console.log(response)
    handleGetManagers(page, rowsPerPage)
  }

  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };


  useEffect(() => {
    handleGetManagers(page, rowsPerPage)
  }, [page, rowsPerPage])

  return (
    <Wrapper>
      <S.PageTitle>
        Lista de Gestores
      </S.PageTitle>
      <S.Subtitle>
        Aqui você pode visualizar todos os gestores cadastrados no sistema.
      </S.Subtitle>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <TextField
            label="Nome"
            variant="outlined"
            size="medium"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            size='medium'
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size='small'
            onClick={handleFilter}
          >
            Filtrar
          </Button>
        </div>

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
              <TableCell colSpan={2}><strong>Nome</strong></TableCell>
              <TableCell colSpan={2}><strong>Email</strong></TableCell>
              <TableCell colSpan={1}><strong>Status</strong></TableCell>
              <TableCell colSpan={1} align='center'><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers && managers.map((manager: ManagerType) => (
              <TableRow key={manager.id}>
                <TableCell colSpan={2}>{manager.name}</TableCell>
                <TableCell colSpan={2}>{manager.email}</TableCell>
                <TableCell colSpan={1}>{manager.active ? 'Ativo' : 'Inativo'}</TableCell>
                <TableCell
                  align='center'
                  colSpan={1}
                >
                  <div>
                    <Tooltip title={manager.active ? "Desativar gestor" : "Aprovar Solicitação"}>
                      <IconButton
                        onClick={() => manager.id !== undefined && handleChangeStatus(manager.id)}
                        size="small"
                        color={manager.active ? 'error' : 'success'}
                      >
                        {manager.active ? <CloseIcon /> : <DoneIcon />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar">
                      <IconButton
                        onClick={() => navigate(`/managers/form/${manager.id}`)}
                        size="small"
                        color='primary'
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {!managers || managers.length == 0 && (
              <TableRow>
                <TableCell colSpan={4}>Nenhum gestor cadastrado</TableCell> 
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination 
          component="div"
          count={totalPages * rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[2, 5, 10, 25]}
          labelRowsPerPage="Linhas por página"
        />
      </TableContainer>
    </Wrapper>
  )
}

export default ManagerList

