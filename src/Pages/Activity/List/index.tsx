import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Tooltip, IconButton, Box, Typography, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { getPagedActivities, deleteActivity, getActivityById, getActivityCitizens } from '../../../Services/activities';
import Button from '../../../utils/Button';
import Wrapper from '../../../utils/Wrapper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { ActivityType } from '../../../Types/activity';
import { CitizenType } from '../../../Types/user';

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [citizens, setCitizens] = useState<CitizenType[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetActivities = async (page: number, size: number) => {
    const response = await getPagedActivities(page, size);
    setActivities(response.content);
    setTotalElements(response.totalElements);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    handleGetActivities(newPage, rowsPerPage);
  };

  const handleDeleteActivity = async (id: number) => {
    await deleteActivity(id);
    handleGetActivities(page, rowsPerPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0); 
    handleGetActivities(0, newSize);
  };

  const handleOpenModal = async (id: number) => {
    const response = await getActivityById(id);
    setSelectedActivity(response);

    const citizensResponse = await getActivityCitizens(id);
    setCitizens(citizensResponse);

    setOpen(true);  
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedActivity(null);
  };

  useEffect(() => {
    handleGetActivities(page, rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <Wrapper>
      <S.PageTitle>Atividades</S.PageTitle>
      <S.Subtitle>
        Aqui você pode visualizar todas as atividades cadastradas no sistema.
      </S.Subtitle>
      <TableContainer component={Paper} sx={{marginTop: '24px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Local</TableCell>
              <TableCell>Vagas Máximas</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities && activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.location}</TableCell>
                <TableCell>{activity.maxVacancies}</TableCell>
                <TableCell>
                  <Tooltip title="Visualizar">
                    <IconButton onClick={() => activity.id && handleOpenModal(activity.id)} size="small" color="default">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton onClick={() => navigate(`/activities/form/${activity.id}`)} size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Deletar">
                    <IconButton onClick={() => activity.id && handleDeleteActivity(activity.id)} size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {!activities || activities.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>Nenhuma atividade encontrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalElements}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[2, 5 ,10, 25]}
          labelRowsPerPage="Linhas por página"
        />
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Detalhes da Atividade</DialogTitle>
        <DialogContent dividers  sx={{marginY: '16px', width: '500px'}}>
          {selectedActivity && (
            <Box>
              <Typography><strong>ID:</strong> {selectedActivity.id}</Typography>
              <Typography><strong>Nome:</strong> {selectedActivity.name}</Typography>
              <Typography><strong>Local:</strong> {selectedActivity.location}</Typography>
              <Typography><strong>Descrição:</strong> {selectedActivity.description}</Typography>
              <Typography><strong>Máximo de Vagas:</strong> {selectedActivity.maxVacancies}</Typography>
              <Typography><strong>Professor:</strong> {selectedActivity.professor?.name || 'Não atribuído'}</Typography>
              <Typography variant="h6" sx={{ marginTop: '16px' }}>Cidadãos Cadastrados</Typography>
              {citizens.length > 0 ? (
                citizens.map((citizen, index) => (
                  <Typography key={index}>{citizen.name}</Typography>
                ))
              ) : (
                <Typography>Nenhum cidadão cadastrado.</Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}

export default ActivityList;
