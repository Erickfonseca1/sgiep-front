import React, { useState, useEffect } from 'react'
import Wrapper from '../../../utils/Wrapper'
import * as S from './styles'
import { AdminType } from '../../../Types/user'
import { deleteAdmin, getFilteredAdmins, getPagedAdmins } from '../../../Services/admins'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip } from '@mui/material'
import Button from '../../../utils/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<AdminType[] | null>([])
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [nameFilter, setNameFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const navigate = useNavigate()
  const { userId } = useAuth()

  const [openDialog, setOpenDialog] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState<number | null>(null)

  const handleGetAdmins = async (
    page: number,
    size: number,
    name?: string,
    email?: string
  ) => {
    if (name || email) {
      const formattedName = removeAccents(name || '')
      const formattedEmail = removeAccents(email || '')
      const response = await getFilteredAdmins(page, size, formattedName, formattedEmail)
      setAdmins(response.content)
      setTotalPages(response.totalPages)
      return
    }

    const response = await getPagedAdmins(page, size)
    setAdmins(response.content)
    setTotalPages(response.totalPages)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
    handleGetAdmins(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10)
    setRowsPerPage(newSize)
    setPage(0)
    handleGetAdmins(0, newSize)
  }

  const handleFilter = () => {
    setPage(0)
    handleGetAdmins(0, rowsPerPage, nameFilter, emailFilter)
  }
  
  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleOpenDialog = (id: number) => {
    setAdminToDelete(id)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setAdminToDelete(null)
    setOpenDialog(false)
  }

  const handleConfirmDelete = async () => {
    if (adminToDelete !== null) {
      try {
        await deleteAdmin(adminToDelete)
        handleGetAdmins(page, rowsPerPage)
      } catch (error) {
        console.error(error)
      } finally {
        handleCloseDialog()
      }
    }
  }

  useEffect(() => {
    handleGetAdmins(page, rowsPerPage)
  }, [page, rowsPerPage])

  return (
    <Wrapper>
      <S.PageTitle>
        Lista de Administradores
      </S.PageTitle>
      <S.Subtitle>
        Aqui você pode visualizar todos os administradores cadastrados no sistema.
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
          onClick={() => {navigate('/admins/form')}}
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
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins && admins.map((admin: AdminType) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <div>
                    <Tooltip title={admin.id === userId ? "Não é possível excluir o seu próprio usuário" : "Excluir"} arrow>
                      <IconButton 
                        onClick={() => admin.id && handleOpenDialog(admin.id)}
                        size='small'
                        color='error'
                        disabled={admin.id === userId}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {!admins || admins.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  Nenhum administrador encontrado
                </TableCell>
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{marginTop: '18px', marginBottom: '18px'}}>
            Tem certeza que deseja excluir este administrador? Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" size='small'>
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant='contained' size='small'>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  )
}

export default AdminList