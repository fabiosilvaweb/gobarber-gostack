import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import "react-day-picker/lib/style.css";

import * as Styled from './styles';

import { useAuth } from '../../hooks/Auth';

import logo from '../../assets/logo.svg'
import { FiClock, FiPower } from 'react-icons/fi';


const Dashboard: React.FC = () => {
  const [ selectedDate, setSelectedDate ] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {

    if (modifiers.available) {
      setSelectedDate(day);
    } 


   
  }, []);

  const { signOut, user } = useAuth();

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HeaderContainer>
          <img src={logo} alt="Gobarber" />
          <Styled.Profile>
            <img src={ !!user.avatar_url ? user.avatar_url : 'https://avatar.tobi.sh/'  } alt={ user.name }/>
            <div>
              <span>Bem-vindo,</span>
              <strong>{ user.name }</strong>
            </div>
          </Styled.Profile>
          <button type="button" onClick={signOut}><FiPower size={24}/></button>
        </Styled.HeaderContainer>
      </Styled.Header>
      <Styled.Content>
        <Styled.Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia</span>
            <span>Segunda feira</span>
          </p>

          <Styled.NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="https://avatar.tobi.sh/" alt=""/>

              <strong>
                Nome do Cliente
              </strong>

              <span>
                <FiClock/>
                08:00
              </span>
            </div>
          </Styled.NextAppointment>

          <Styled.Section>
            <strong>Manhã</strong>
            <Styled.Appointment>
              <span>
                <FiClock size={24} /> 
                08:00
              </span>
              <div>
                <img src="https://avatar.tobi.sh/" alt=""/>

                <strong>
                  Nome do Cliente
                </strong>
              </div>
            </Styled.Appointment>
            <Styled.Appointment>
              <span>
                <FiClock size={24} /> 
                08:00
              </span>
              <div>
                <img src="https://avatar.tobi.sh/" alt=""/>

                <strong>
                  Nome do Cliente
                </strong>
              </div>
            </Styled.Appointment>
          </Styled.Section>
           
          <Styled.Section>
            <strong>Tarde</strong>
            <Styled.Appointment>
              <span>
                <FiClock size={24} /> 
                08:00
              </span>
              <div>
                <img src="https://avatar.tobi.sh/" alt=""/>

                <strong>
                  Nome do Cliente
                </strong>
              </div>
            </Styled.Appointment>
            <Styled.Appointment>
              <span>
                <FiClock size={24} /> 
                08:00
              </span>
              <div>
                <img src="https://avatar.tobi.sh/" alt=""/>

                <strong>
                  Nome do Cliente
                </strong>
              </div>
            </Styled.Appointment>
          </Styled.Section>

        </Styled.Schedule>
        <Styled.Calendar>
          <DayPicker 
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']} 
            fromMonth={new Date()}
            disabledDays={[ { daysOfWeek: [0, 6] } ]}
            modifiers={{
              available: { daysOfWeek: [1,2,3,4,5] }
            }}
            onDayClick={handleDateChange}
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
