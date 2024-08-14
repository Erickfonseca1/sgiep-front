// src/pages/ProfessorList.tsx

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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Types } from '../../Types/ProfessorScheduleTypes/Types';

const ProfessorList: React.FC = () => {
  const [professors, setProfessors] = useState<Types[]>([
    { id: 1, citizenName: 'Prof. João Silva', modality: 'Matemática', date: '10/10/1991' },
    { id: 2, citizenName: 'Prof. Maria Oliveira', modality: 'Português', date: '10/10/1991' },
  ]);

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
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professors.map(professor => (
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
    </Container>
  );
};

export default ProfessorList;
