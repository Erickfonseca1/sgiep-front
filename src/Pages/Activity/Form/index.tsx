import React, { useState, useEffect } from 'react';
import Wrapper from '../../../utils/Wrapper';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';
import { getActiveProfessors } from '../../../Services/professors';
import { ProfessorType } from '../../../Types/user';
import { createActivity } from '../../../Services/activities';
import { Box, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Button from '../../../utils/Button';

const ActivityForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [maxVacancies, setMaxVacancies] = useState(0);
  const [professors, setProfessors] = useState<ProfessorType[]>([]);
  const [professorId, setProfessorId] = useState<number | undefined>(undefined);
  const [schedules, setSchedules] = useState<{ dayOfWeek: string, startTime: string, endTime: string }[]>([{ dayOfWeek: '', startTime: '', endTime: '' }]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessors = async () => {
      const response = await getActiveProfessors();
      setProfessors(response);
    }

    fetchProfessors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newActivity = {
      name,
      description,
      location,
      maxVacancies,
      professorId,
      schedules
    }
  
    const response = await createActivity(newActivity);
    if (response) {
      setMessage('Atividade criada com sucesso!');
      clearFields();
    } else {
      setMessage('Erro ao criar atividade');
    }
  }

  const handleAddSchedule = () => {
    setSchedules([...schedules, { dayOfWeek: '', startTime: '', endTime: '' }]);
  }

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setSchedules(newSchedules);
  }

  const clearFields = () => {
    setName('');
    setDescription('');
    setLocation('');
    setMaxVacancies(0);
    setProfessorId(undefined);
    setSchedules([{ dayOfWeek: '', startTime: '', endTime: '' }]);
  }

  return (
    <Wrapper>
      <S.PageTitle>Cadastro de Atividade</S.PageTitle>
      <S.Subtitle>Preencha os campos abaixo para cadastrar uma nova atividade</S.Subtitle>
      <Divider sx={{ my: 2 }} />

      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Nome da atividade */}
        <TextField
          required
          label="Nome"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Descrição da atividade */}
        <TextField
          required
          label="Descrição"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Local */}
        <TextField
          required
          label="Local"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

      
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Limite de vagas */}
          <TextField
            required
            label="Máximo de Vagas"
            type="number"
            variant="outlined"
            fullWidth
            value={maxVacancies}
            onChange={(e) => setMaxVacancies(parseInt(e.target.value, 10))}
          />

          {/* Seleção de professor */}
          <FormControl fullWidth>
            <InputLabel id="professor-label">Professor</InputLabel>
            <Select
              labelId="professor-label"
              value={professorId}
              onChange={(e) => setProfessorId(Number(e.target.value))}
              label="Professor"
            >
              {professors.map(professor => (
                <MenuItem key={professor.id} value={professor.id}>
                  {professor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Horários (repetidos dinamicamente) */}
        <Typography variant="h6">Horários da Atividade</Typography>
        {schedules.map((schedule, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Dia da Semana"
              select
              value={schedule.dayOfWeek}
              onChange={(e) => handleScheduleChange(index, 'dayOfWeek', e.target.value)}
              fullWidth
            >
              <MenuItem value="MONDAY">Segunda-feira</MenuItem>
              <MenuItem value="TUESDAY">Terça-feira</MenuItem>
              <MenuItem value="WEDNESDAY">Quarta-feira</MenuItem>
              <MenuItem value="THURSDAY">Quinta-feira</MenuItem>
              <MenuItem value="FRIDAY">Sexta-feira</MenuItem>
              <MenuItem value="SATURDAY">Sábado</MenuItem>
              <MenuItem value="SUNDAY">Domingo</MenuItem>
            </TextField>

            <TextField
              label="Horário de Início"
              type="time"
              value={schedule.startTime}
              onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
              fullWidth
            />

            <TextField
              label="Horário de Término"
              type="time"
              value={schedule.endTime}
              onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
              fullWidth
            />
          </Box>
        ))}

        {/* Botão para adicionar mais horários */}
        <Button variant="outlined" color="primary" onClick={handleAddSchedule}>
          Adicionar Horário
        </Button>

        {/* Exibição de mensagens de sucesso/erro */}
        {message && <Typography color="primary">{message}</Typography>}

        {/* Botões de submissão e cancelamento */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Cadastrar Atividade
          </Button>
        </Box>

      </Box>
    </Wrapper>
  )
}

export default ActivityForm;