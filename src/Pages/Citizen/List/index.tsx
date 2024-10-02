import React, { useState, useEffect } from 'react'
import Wrapper from '../../../utils/Wrapper'
import * as S from './styles'
import { CitizenType } from '../../../Types/user'
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { changeCitizenStatus, getFilteredCitizens, getPagedCitizens } from '../../../Services/citizens'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip } from '@mui/material'
import Button from '../../../utils/Button'

const CitizenList: React.FC = () => {
  const [citizens, setCitizens] = useState<CitizenType[] | null>(null)
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [nameFilter, setNameFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')

  const [open, setOpen] = useState(false)
  const [selectedCitizen, setSelectedCitizen] = useState<CitizenType | null>(null)

  const handleGetCitizens = async (page: number, size: number, name?: string, email?: string) => {
    if (name || email) {
      const formattedName = removeAccents(name || '')
      const formattedEmail = removeAccents(email || '')
      const response = await getFilteredCitizens(page, size, formattedName, formattedEmail)
      setCitizens(response.content)
      setTotalPages(response.totalPages)
      return
    }

    const response = await getPagedCitizens(page, size)
    setCitizens(response.content)
    setTotalPages(response.totalPages)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
    handleGetCitizens(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10)
    setRowsPerPage(newSize)
    setPage(0)
    handleGetCitizens(0, newSize)
  }

  const handleFilter = () => {
    setPage(0)
    handleGetCitizens(0, rowsPerPage, nameFilter, emailFilter)
  }

  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleOpenDetails = (citizen: CitizenType) => {
    setSelectedCitizen(citizen)
    setOpen(true)
  }

  const handleChangeStatus = async (id: number) => {
    await changeCitizenStatus(id)
    handleGetCitizens(page, rowsPerPage)
  }

  const handleCloseDetails = () => {
    setOpen(false)
    setSelectedCitizen(null)
  }

  useEffect(() => {
    handleGetCitizens(page, rowsPerPage)
  }, [page, rowsPerPage])

  return (
    <Wrapper>
      <S.PageTitle>
        Lista de Cidadãos
      </S.PageTitle>
      <S.Subtitle>
        Aqui você pode visualizar todos os cidadãos cadastrados no sistema.
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
      </div>

      <TableContainer component={Paper} sx={{ marginTop: '24px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Nº de atividades</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citizens && citizens.map((citizen: CitizenType) => (
              <TableRow key={citizen.id}>
                <TableCell>{citizen.name}</TableCell>
                <TableCell>{citizen.email}</TableCell>
                <TableCell>{citizen.activitiesAsStudent?.length}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Tooltip title="Visualizar Detalhes">
                      <IconButton onClick={() => handleOpenDetails(citizen)} color="primary" size="small">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={citizen.active ? "Desativar Cidadão" : "Ativar Cidadão"}>
                      <IconButton
                        onClick={() => citizen.id && handleChangeStatus(citizen.id)}
                        size="small"
                        color={citizen.active ? 'error' : 'success'}
                      >
                        {citizen.active ? <CloseIcon /> : <DoneIcon />}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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

      <Dialog open={open} onClose={handleCloseDetails}>
        <DialogTitle>Detalhes do Cidadão</DialogTitle>
        <Divider />

        <DialogContent sx={{marginY: '16px', marginX: '24px', width: '500px'}}>
          {selectedCitizen && (
            <>
              <p><strong>Nome:</strong> {selectedCitizen.name}</p>
              <p><strong>Email:</strong> {selectedCitizen.email}</p>
              <p><strong>Status:</strong> {selectedCitizen.active ? 'Ativo' : 'Inativo'}</p>
              <br />
              <p><strong>Atividades:</strong></p>
              <ul>
                {selectedCitizen.activitiesAsStudent && selectedCitizen.activitiesAsStudent.length > 0 ? (
                  selectedCitizen.activitiesAsStudent.map(activity => (
                    <li key={activity.id}>{activity.name}</li>
                  ))
                ) : (
                  <li>Nenhuma atividade cadastrada</li>
                )}
              </ul>
            </>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{padding: '16px'}}>
          <Button onClick={handleCloseDetails} color="primary" size='small'>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  )
}

export default CitizenList