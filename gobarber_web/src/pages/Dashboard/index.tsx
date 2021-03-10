import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import "react-day-picker/lib/style.css";

import { isToday, format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import * as Styled from './styles';

import { useAuth } from '../../hooks/Auth';

import logo from '../../assets/logo.svg'
import { FiClock, FiPower } from 'react-icons/fi';
import api from '../../services/api';
import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string; 
  user: {
    name: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {

    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    } 
  }, []);

  const handleMonthChange = useCallback(( month: Date) => {
    setCurrentMonth(month);
  }, []);

  const disabledDays = useMemo(() => {
    const days = monthAvailability
    .filter(monthDay => monthDay.available === false)
    .map(monthDay => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      return new Date(year, month, monthDay.day);
    });

    return days;

  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR
    })
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    })
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    })
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => isAfter(parseISO(appointment.date), new Date()))
  }, [appointments]);

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1
      }
    }).then(response => {
      setMonthAvailability(response.data);
    })
  }, [currentMonth, user.id]);

  useEffect(() => {
    api.get<Appointment[]>('/appointments/me', {
      params: {
        day: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear()
      }
    }).then(response => {

      const appointmensFormatted = response.data.map(appointment => {
        return {
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'), 
        }
      });

      setAppointments(appointmensFormatted);
    });
  }, [selectedDate]);


  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HeaderContainer>
          <img src={logo} alt="Gobarber" />
          <Styled.Profile>
            <img src={ !!user.avatar_url ? user.avatar_url : 'https://avatar.tobi.sh/'  } alt={ user.name }/>
            <div>
              <span>Bem-vindo,</span>
              <Link to="/minha-conta"><strong>{ user.name }</strong></Link>
            </div>
          </Styled.Profile>
          <button type="button" onClick={signOut}><FiPower size={24}/></button>
        </Styled.HeaderContainer>
      </Styled.Header>
      <Styled.Content>
        <Styled.Schedule>
          <h1>Horários agendados</h1>
          <p>
            { isToday(selectedDate) && <span>Hoje</span> }
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
          { isToday(selectedDate) && nextAppointment && (
            <Styled.NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img 
                  src={ nextAppointment.user.avatar_url ? nextAppointment.user.avatar_url : "https://avatar.tobi.sh/" }  
                  alt={ nextAppointment.user.name }
                />

                <strong>
                  { nextAppointment.user.name }
                </strong>

                <span>
                  <FiClock/>
                  { nextAppointment.hourFormatted }
                </span>
              </div>
            </Styled.NextAppointment>
          ) }
          
          { morningAppointments.length > 0 && (
            <Styled.Section>
              <strong>Manhã</strong>
              
              {  morningAppointments.map(appoitment => (
                <Styled.Appointment key={appoitment.id}>
                  <span>
                    <FiClock size={24} /> 
                    { appoitment.hourFormatted }
                  </span>
                  <div>
                    <img 
                      src={ appoitment.user.avatar_url ? appoitment.user.avatar_url : "https://avatar.tobi.sh/" }  
                      alt={ appoitment.user.name }
                    />
                    <strong>
                      { appoitment.user.name }
                    </strong>
                  </div>
                </Styled.Appointment>
              )) }
            </Styled.Section>
          ) }
          
           
          <Styled.Section>
            <strong>Tarde</strong>
            { afternoonAppointments && afternoonAppointments.map(appoitment => (
              <Styled.Appointment key={appoitment.id}>
                <span>
                  <FiClock size={24} /> 
                  { appoitment.hourFormatted }
                </span>
                <div>
                  <img 
                    src={ appoitment.user.avatar_url ? appoitment.user.avatar_url : "https://avatar.tobi.sh/" }  
                    alt={ appoitment.user.name }
                  />
                  <strong>
                    { appoitment.user.name }
                  </strong>
                </div>
              </Styled.Appointment>
            )) }
          </Styled.Section>

        </Styled.Schedule>
        <Styled.Calendar>
          <DayPicker 
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']} 
            fromMonth={new Date()}
            disabledDays={[ { daysOfWeek: [0, 6] }, ...disabledDays ]}
            modifiers={{
              available: { daysOfWeek: [1,2,3,4,5] }
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Styled.Calendar>
      </Styled.Content>
    </Styled.Container>
  );
}

export default Dashboard;
