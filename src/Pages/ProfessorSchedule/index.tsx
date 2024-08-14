import React, { useState } from 'react';
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
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Types } from '../../Types/ProfessorScheduleTypes/types';

const ProfessorList: React.FC = () => {
  const [professors, setProfessors] = useState<Types[]>([
    { id: 1, citizenName: 'Prof. João Silva', modality: 'Matemática', date: '10/10/1991' },
    { id: 2, citizenName: 'Prof. Maria Oliveira', modality: 'Português', date: '10/10/1991' },
    { id: 3, citizenName: 'Prof. Carlos Souza', modality: 'Química', date: '10/10/1991' },
    { id: 4, citizenName: 'Prof. Ana Santos', modality: 'Física', date: '10/10/1991' },
    { id: 5, citizenName: 'Prof. Lucas Pereira', modality: 'Biologia', date: '10/10/1991' },
    { id: 6, citizenName: 'Prof. Fernanda Lima', modality: 'História', date: '10/10/1991' },
    { id: 7, citizenName: 'Prof. Rafael Costa', modality: 'Geografia', date: '10/10/1991' },
    { id: 8, citizenName: 'Prof. Juliana Almeida', modality: 'Educação Física', date: '10/10/1991' },
    { id: 9, citizenName: 'Prof. Mariana Souza', modality: 'Artes', date: '10/10/1991' },
    { id: 10, citizenName: 'Prof. Pedro Gomes', modality: 'Inglês', date: '10/10/1991' },
    { id: 11, citizenName: 'Prof. Carolina Rodrigues', modality: 'Literatura', date: '10/10/1991' },
    { id: 12, citizenName: 'Prof. Gustavo Martins', modality: 'Filosofia', date: '10/10/1991' },
    { id: 13, citizenName: 'Prof. Beatriz Silva', modality: 'Sociologia', date: '10/10/1991' },
    { id: 14, citizenName: 'Prof. Daniel Pereira', modality: 'Religião', date: '10/10/1991' },
    { id: 15, citizenName: 'Prof. Roberta Oliveira', modality: 'Educação Artística', date: '10/10/1991' },
    { id: 16, citizenName: 'Prof. Jorge Fernandes', modality: 'Química Orgânica', date: '10/10/1991' },
    { id: 17, citizenName: 'Prof. Lara Mendes', modality: 'Matemática Aplicada', date: '10/10/1991' },
    { id: 18, citizenName: 'Prof. Pedro Henrique', modality: 'Física Experimental', date: '10/10/1991' },
    { id: 19, citizenName: 'Prof. Larissa Silva', modality: 'História do Brasil', date: '10/10/1991' },
    { id: 20, citizenName: 'Prof. Ricardo Almeida', modality: 'Literatura Brasileira', date: '10/10/1991' },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Max 10 items per page

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const handleEdit = (id: number) => {
    console.log(`Editar professor com ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    setProfessors(prevItems => prevItems.filter(prof => prof.id !== id));
    console.log(`Excluir professor com ID: ${id}`);
  };

  const handleAdd = () => {
    console.log('Adicionar novo professor');
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Lista de Professores
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
            {professors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(professor => (
                <TableRow key={professor.id}>
                  <TableCell>{professor.id}</TableCell>
                  <TableCell>{professor.citizenName}</TableCell>
                  <TableCell>{professor.modality}</TableCell>
                  <TableCell>{professor.date}</TableCell>
                  <TableCell>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(professor.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(professor.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}	
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]} // Always show 10 items per page
        component="div"
        count={professors.length} // Total number of items
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} // Optionally you can remove this handler if not needed
      />
    </Container>
  );
};

export default ProfessorList;
