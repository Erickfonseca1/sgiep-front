import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TablePagination, Tooltip, IconButton } from '@mui/material';
import { getPagedActivities, filterActivitiesByLocation, deleteActivity } from '../../../Services/activities';
import Button from '../../../utils/Button';
import Wrapper from '../../../utils/Wrapper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ActivityType } from '../../../Types/activity';

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [locationFilter, setLocationFilter] = useState('');
  const navigate = useNavigate();

  const handleGetActivities = async (page: number, size: number) => {
    const response = await getPagedActivities(page, size);
    setActivities(response.content);
    setTotalElements(response.totalElements);
  };

  const handleFilterByLocation = async () => {
    if (locationFilter) {
      const response = await filterActivitiesByLocation(locationFilter, page, rowsPerPage);
      setActivities(response._embedded.activityList);
      setTotalElements(response.page.totalElements);
    }
  };

  const handleClearFilters = () => {
    setLocationFilter('');
    handleGetActivities(page, rowsPerPage);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
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
    setPage(0);  // Resetar para a primeira página
    handleGetActivities(0, newSize);
  };

  useEffect(() => {
    handleGetActivities(page, rowsPerPage);
  }, [page, rowsPerPage]);

  useEffect(() => {
    console.log(activities)
  }, [activities])

  return (
    <Wrapper>
      <S.PageTitle>Atividades</S.PageTitle>
      <S.Subtitle>
        Aqui você pode visualizar todas as atividades cadastradas no sistema.
      </S.Subtitle>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
        <TextField
          label="Localização"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          variant="outlined"
          size='medium'
        />
        <Button variant="contained" size='small' onClick={handleFilterByLocation}>Filtrar por Localização</Button>
        <Button variant="outlined" size='small' onClick={handleClearFilters}>Limpar Filtros</Button>
      </div>

      {/* Tabela de Atividades */}
      <TableContainer component={Paper}>
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
    </Wrapper>
  );
}

export default ActivityList;
