import React, { useState, useEffect } from 'react'
import Wrapper from '../../../utils/Wrapper'
import * as S from './styles'
import { ProfessorType } from '../../../Types/user'
import { getPagedProfessors } from '../../../Services/professors'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material'
import Button from '../../../utils/Button'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom'

const ProfessorList: React.FC = () => {
  const [professors, setProfessor] = useState<ProfessorType[] | null>(null)
  const navigate = useNavigate()
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  const handleGetProfessors = async (page: number, size: number) => {
    const response = await getPagedProfessors(page, size)
    setProfessor(response.content)
    setTotalPages(response.totalPages)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    handleGetProfessors(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10)
    setRowsPerPage(newSize)
    setPage(0)
    handleGetProfessors(0, newSize)
  }

  useEffect(() => {
    handleGetProfessors(page, rowsPerPage)
  }, [page, rowsPerPage])

  return (
    <Wrapper>
      <S.PageTitle>
        Lista de Professores
      </S.PageTitle>
      <S.Subtitle>
        Aqui você pode visualizar todos os professores cadastrados no sistema.
      </S.Subtitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={() => {navigate('/professors/form')}}
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
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professors && professors.map((professor: ProfessorType) => (
              <TableRow key={professor.id}>
                <TableCell>{professor.name}</TableCell>
                <TableCell>{professor.email}</TableCell>
                <TableCell>{professor.active ? 'Ativo' : 'Inativo'}</TableCell>
                <TableCell>
                  <div>
                    <Tooltip title={professor.active ? "Desativar gestor" : "Aprovar Solicitação"}>
                      <IconButton
                        onClick={() => professor.id !== undefined && console.log(professor.id)}
                        size="small"
                        color={professor.active ? 'error' : 'success'}
                      >
                        {professor.active ? <CloseIcon /> : <DoneIcon />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar">
                      <IconButton
                        onClick={() => navigate(`/professors/form/${professor.id}`)}
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

            {!professors || professors.length == 0 && (
              <TableRow>
                <TableCell colSpan={2}>Nenhum gestor cadastrado</TableCell> 
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

export default ProfessorList

