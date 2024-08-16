// [For now, ignore the TypeScript ]
import React, { useState } from 'react'
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Types } from '../../Types/CitizenScheduleTypes/types'

const CitizenList: React.FC = () => {
  const [citizens, setCitizens] = useState<Types[]>([
    {
      id: 1,
      teacherName: 'Prof. João Silva',
      modality: 'Matemática',
      date: '10/10/1991',
    },
    {
      id: 2,
      teacherName: 'Prof. Maria Oliveira',
      modality: 'Português',
      date: '10/10/1991',
    },
    {
      id: 3,
      teacherName: 'Prof. Carlos Souza',
      modality: 'Química',
      date: '10/10/1991',
    },
    {
      id: 4,
      teacherName: 'Prof. Ana Santos',
      modality: 'Física',
      date: '10/10/1991',
    },
    {
      id: 5,
      teacherName: 'Prof. Lucas Pereira',
      modality: 'Biologia',
      date: '10/10/1991',
    },
    {
      id: 6,
      teacherName: 'Prof. Fernanda Lima',
      modality: 'História',
      date: '10/10/1991',
    },
    {
      id: 7,
      teacherName: 'Prof. Rafael Costa',
      modality: 'Geografia',
      date: '10/10/1991',
    },
    {
      id: 8,
      teacherName: 'Prof. Juliana Almeida',
      modality: 'Educação Física',
      date: '10/10/1991',
    },
    {
      id: 9,
      teacherName: 'Prof. Mariana Souza',
      modality: 'Artes',
      date: '10/10/1991',
    },
    {
      id: 10,
      teacherName: 'Prof. Pedro Gomes',
      modality: 'Inglês',
      date: '10/10/1991',
    },
    {
      id: 11,
      teacherName: 'Prof. Carolina Rodrigues',
      modality: 'Literatura',
      date: '10/10/1991',
    },
    {
      id: 12,
      teacherName: 'Prof. Gustavo Martins',
      modality: 'Filosofia',
      date: '10/10/1991',
    },
    {
      id: 13,
      teacherName: 'Prof. Beatriz Silva',
      modality: 'Sociologia',
      date: '10/10/1991',
    },
    {
      id: 14,
      teacherName: 'Prof. Daniel Pereira',
      modality: 'Religião',
      date: '10/10/1991',
    },
    {
      id: 15,
      teacherName: 'Prof. Roberta Oliveira',
      modality: 'Educação Artística',
      date: '10/10/1991',
    },
    {
      id: 16,
      teacherName: 'Prof. Jorge Fernandes',
      modality: 'Química Orgânica',
      date: '10/10/1991',
    },
    {
      id: 17,
      teacherName: 'Prof. Lara Mendes',
      modality: 'Matemática Aplicada',
      date: '10/10/1991',
    },
    {
      id: 18,
      teacherName: 'Prof. Pedro Henrique',
      modality: 'Física Experimental',
      date: '10/10/1991',
    },
    {
      id: 19,
      teacherName: 'Prof. Larissa Silva',
      modality: 'História do Brasil',
      date: '10/10/1991',
    },
    {
      id: 20,
      teacherName: 'Prof. Ricardo Almeida',
      modality: 'Literatura Brasileira',
      date: '10/10/1991',
    },
  ])

  const [page] = useState(0)
  const [rowsPerPage] = useState(10) // Max 10 items per page

  const handleEdit = (id: number) => {
    console.log(`Editar Cidadão com ID: ${id}`)
  }

  const handleDelete = (id: number) => {
    setCitizens((prevItems) => prevItems.filter((prof) => prof.id !== id))
    console.log(`Excluir Cidadão com ID: ${id}`)
  }

  const handleAdd = () => {
    console.log('Adicionar novo Cidadão')
  }

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lista do Cidadão
        </Typography>
        <Tooltip title="Adicionar novo professor" arrow>
          <IconButton color="primary" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '16px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Disciplina</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citizens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((citizen) => (
              <TableRow key={citizen.id}>
                <TableCell>{citizen.id}</TableCell>
                <TableCell>{citizen.teacherName}</TableCell>
                <TableCell>{citizen.modality}</TableCell>
                <TableCell>{citizen.date}</TableCell>
                <TableCell>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(citizen.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(citizen.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default CitizenList
