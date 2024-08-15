import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { CitizenType } from "../../Types/user";
import { getCitizen } from "../../Services/citizens";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type CitizenCalendarProps = {
  citizenId: number;
};

const daysOfWeekMap: { [key: string]: string } = {
  Sunday: "Domingo",
  Monday: "Segunda-feira",
  Tuesday: "Terça-feira",
  Wednesday: "Quarta-feira",
  Thursday: "Quinta-feira",
  Friday: "Sexta-feira",
  Saturday: "Sábado",
};

const CitizenCalendar = ({ citizenId }: CitizenCalendarProps) => {
  const [citizen, setCitizen] = useState<CitizenType>();

  const handleGetCitizen = async () => {
    try {
      getCitizen(citizenId).then((citizen: CitizenType) => {
        setCitizen(citizen);
      });
    } catch (error) {
      console.error("Failed to fetch citizen:", error);
    }
  };

  const getDayOfWeekInPortuguese = (dayOfWeek: string) => {
    const capitalizedDayOfWeek =
      dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase();
    return daysOfWeekMap[capitalizedDayOfWeek];
  };

  useEffect(() => {
    handleGetCitizen();
  }, [citizenId]);

  return (
    <S.Wrapper>
      <S.PageTitle>Agenda - {citizen?.name}</S.PageTitle>
      <S.CardList>
        {citizen &&
          citizen.activities &&
          citizen.activities.map(
            (activity) =>
              activity.schedules &&
              activity.schedules.map((schedule) => (
                <S.Card key={schedule.id}>
                  <S.EventCard>
                    <S.Text className="day">
                      {getDayOfWeekInPortuguese(schedule.dayOfWeek)}
                    </S.Text>
                    <p>
                      {schedule.startTime} - {schedule.endTime}
                    </p>
                  </S.EventCard>
                  <S.CardContent>
                    <div style={{ alignItems: "center", display: "flex" }}>
                      <DirectionsRunIcon
                        sx={{ marginRight: "8px" }}
                        fontSize="small"
                      />
                      {activity.name}
                    </div>
                    <div style={{ alignItems: "center", display: "flex" }}>
                      <LocationOnIcon
                        sx={{ marginRight: "8px" }}
                        fontSize="small"
                      />
                      {activity.location}
                    </div>
                  </S.CardContent>
                </S.Card>
              ))
          )}
      </S.CardList>
    </S.Wrapper>
  );
};

export default CitizenCalendar;
