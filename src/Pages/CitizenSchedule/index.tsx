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
import { Types } from '../../Types/CitizenScheduleTypes/types';

const CitizenAgenda: React.FC = () => {
  const [agendaItems, setAgendaItems] = useState<Types[]>([
    { id: 1, date: '2024-08-15', modality: 'Natação', teacherName: 'Prof. João Silva' },
    { id: 2, date: '2024-08-20', modality: 'Futebol', teacherName: 'Prof. Maria Oliveira' },
  ]);

  const handleEdit = (id: number) => {
    console.log(`Editar atividade com ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    setAgendaItems(prevItems => prevItems.filter(item => item.id !== id));
    console.log(`Excluir atividade com ID: ${id}`);
  };

  const handleAdd = () => {
    console.log('Adicionar nova atividade');
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Agenda do Cidadão
        </Typography>
        <Tooltip title="Adicionar nova atividade" arrow>
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
              <TableCell>Data</TableCell>
              <TableCell>Atividade</TableCell>
              <TableCell>Professor</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendaItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.modality}</TableCell>
                <TableCell>{item.teacherName}</TableCell>
                <TableCell>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
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

export default CitizenAgenda;
