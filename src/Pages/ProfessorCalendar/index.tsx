import React, { useEffect, useState } from 'react';
import * as S from './styles'
import { getProfessor } from '../../Services/professors';
import { ProfessorType } from '../../Types/user';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Divider } from '@mui/material';

type ProfessorCalendarProps = {
  professorId: number;
};

const daysOfWeekMap: { [key: string]: string } = {
  Sunday: 'Domingo',
  Monday: 'Segunda-feira',
  Tuesday: 'Terça-feira',
  Wednesday: 'Quarta-feira',
  Thursday: 'Quinta-feira',
  Friday: 'Sexta-feira',
  Saturday: 'Sábado',
};

// const transformData = (activities: ActivityType[]): ScheduleType[] => {
//   return activities.flatMap(activity =>
//     activity.schedules && activity.schedules.map(schedule => ({
//       ...schedule,
//       activityName: activity.name,
//       students: activity.students,
//     }))
//   ).filter(schedule => schedule !== undefined);
// };

const ProfessorCalendar = ({ professorId }: ProfessorCalendarProps) => {
  const [professor, setProfessor] = useState<ProfessorType>();

  const handleGetProfessor = async () => {
    try {
      getProfessor(professorId).then((professor: ProfessorType) => {
        setProfessor(professor);
      })
    } catch (error) {
      console.error('Failed to fetch professor:', error);
    }
  }

  // const handleGetSchedules = () => {
  //   // try {
  //   //   const response = getProfessorActivities(professorId);
  //   //   const activities: ActivityType[] = await response
  //   //   const transformedSchedules = transformData(activities);
  //   //   setSchedules(transformedSchedules);
  //   // } catch (error) {
  //   //   console.error('Failed to fetch schedules:', error);
  //   // }
  //   if (professor) {
  //     const transformedSchedules = transformData(professor.activities || []);
  //     setSchedules(transformedSchedules);
  //   }
  // };

  const getDayOfWeekInPortuguese = (dayOfWeek: string) => {
    const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase();
    return daysOfWeekMap[capitalizedDayOfWeek];
  };

  useEffect(() => {
    handleGetProfessor();
  }, [professorId]);

  // useEffect(() => {
  //   handleGetSchedules();
  // }, [professor]);

  return (
    <S.Wrapper>
      <S.PageTitle>Agenda - {professor?.name}</S.PageTitle>
      <S.CardList>
        {professor && professor.activities && professor.activities.map(activity => (
          activity.schedules && activity.schedules.map(schedule => (
            <S.Card key={schedule.id}>
              <S.EventCard>
                <S.Text className='day'>{getDayOfWeekInPortuguese(schedule.dayOfWeek)}</S.Text>
                <p>{schedule.startTime} - {schedule.endTime}</p>
              </S.EventCard>
              <S.CardContent>
                <div style={{ alignItems: 'center', display: 'flex'}}>
                  <DirectionsRunIcon sx={{marginRight: '8px'}} fontSize='small'/>
                  {activity.name}
                </div>
                <div style={{ alignItems: 'center', display: 'flex'}}>
                  <LocationOnIcon sx={{marginRight: '8px'}} fontSize='small'/>
                  {activity.location}
                </div>
              </S.CardContent>
            </S.Card>
          ))
        ))}
      </S.CardList>
      <Divider />
    </S.Wrapper>
  );
};

export default ProfessorCalendar;