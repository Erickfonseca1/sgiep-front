import { useEffect, useState } from 'react'
import * as S from './styles'
import { CitizenType } from '../../Types/user'
import { getCitizen } from '../../Services/citizens'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CloseIcon from '@mui/icons-material/Close'
import Wrapper from '../../utils/Wrapper'
import { useAuth } from '../../Context/AuthContext'
import { ScheduleType } from '../../Types/schedule'
import { Dialog, DialogTitle, IconButton, DialogContent, Typography } from '@mui/material'

const daysOfWeekMap: { [key: string]: string } = {
  SUNDAY: 'Domingo',
  MONDAY: 'Segunda-feira',
  TUESDAY: 'Terça-feira',
  WEDNESDAY: 'Quarta-feira',
  THURSDAY: 'Quinta-feira',
  FRIDAY: 'Sexta-feira',
  SATURDAY: 'Sábado',
}

const daysOfWeekOrder: { [key: string]: number } = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
}

const getDayOfWeekInPortuguese = (dayOfWeek: string): string => {
  const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase()
  return daysOfWeekMap[capitalizedDayOfWeek]
}

const CitizenCalendar = () => {
  const [citizen, setCitizen] = useState<CitizenType | undefined>()
  const { userId } = useAuth()
  const [schedules, setSchedules] = useState<ScheduleType[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<ScheduleType | null>(null)

  const handleGetCitizen = async (citizenId: number) => {
    try {
      const citizenData = await getCitizen(citizenId)
      setCitizen(citizenData)

      if (citizenData.activitiesAsStudent) {
        const allSchedules: ScheduleType[] = []
        for (const activity of citizenData.activitiesAsStudent) {
          allSchedules.push(
            ...activity.schedules.map((schedule) => ({
              ...schedule,
              activityName: activity.name,
              activityLocation: activity.location,
            })),
          )
        }
        setSchedules(allSchedules)
      }
    } catch (error) {
      console.error('Failed to fetch citizen:', error)
    }
  }

  const handleEventCardClick = (schedule: ScheduleType) => {
    setSelectedActivity(schedule)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedActivity(null)
  }

  const sortedSchedules = schedules.sort((a, b) => daysOfWeekOrder[a.dayOfWeek] - daysOfWeekOrder[b.dayOfWeek])

  useEffect(() => {
    if (userId) handleGetCitizen(userId)
  }, [userId])

  return (
    <Wrapper>
      <S.PageTitle>Agenda Cidadão - {citizen?.name}</S.PageTitle>
      <S.Subtitle>
        Confira sua agenda semanal de atividades esportivas. Mantenha-se informado sobre seus compromissos e participe
        ativamente das aulas e eventos que você se inscreveu.
      </S.Subtitle>

      <S.CalendarContainer>
        {Object.keys(daysOfWeekOrder).map((dayOfWeek) => (
          <S.WeekColumn key={dayOfWeek}>
            <S.DayHeader>{getDayOfWeekInPortuguese(dayOfWeek)}</S.DayHeader>
            <S.DayContent>
              {sortedSchedules
                .filter((schedule) => schedule.dayOfWeek === dayOfWeek)
                .map((schedule) => (
                  <S.EventCard key={schedule.id} onClick={() => handleEventCardClick(schedule)}>
                    <S.EventTime>
                      {schedule.startTime} - {schedule.endTime}
                    </S.EventTime>
                    <S.EventContent>
                      <DirectionsRunIcon sx={{ marginRight: '8px' }} fontSize="small" />
                      {schedule.activityName}
                    </S.EventContent>
                    <S.EventContent>
                      <LocationOnIcon sx={{ marginRight: '8px' }} fontSize="small" />
                      {schedule.activityLocation}
                    </S.EventContent>
                  </S.EventCard>
                ))}
            </S.DayContent>
          </S.WeekColumn>
        ))}
      </S.CalendarContainer>

      {citizen && !citizen?.activitiesAsStudent && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <S.Subtitle>Você ainda não se inscreveu em nenhuma atividade.</S.Subtitle>
        </div>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Detalhes da Atividade
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedActivity && (
            <>
              <Typography variant="h6">Nome da Atividade: {selectedActivity.activityName}</Typography>
              <Typography>Local: {selectedActivity.activityLocation}</Typography>
              <Typography>Horário: {selectedActivity.startTime} - {selectedActivity.endTime}</Typography>
              <Typography>Dia da Semana: {getDayOfWeekInPortuguese(selectedActivity.dayOfWeek)}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Wrapper>
  )
}

export default CitizenCalendar
