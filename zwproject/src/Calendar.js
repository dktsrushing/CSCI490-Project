import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import styled from 'styled-components';
import './calendar.css'

const CalendarWrapper = styled.div
`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 20px;
`;

const Day = styled.div
`

  padding: 20px;
  border: 1px solid #ccc;
  background: ${({ isToday }) => (isToday ? '#e0f7fa' : 'rgb(151, 189, 227)')};
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const Header = styled.div
`
  grid-column: span 7;
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const DayHeader = styled.div
`
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #ccc;
`;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  //const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  //const startOfCurrentWeek = startOfWeek(startOfCurrentMonth);
  
  const days = [...Array(20)].map((_, index) => {
    return addDays(currentDate, index);
  });

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayClick = (day) => {
    // alert(`Selected Date: ${format(day, 'MMMM dd, yyyy')}`);

  };

  return (
    <CalendarWrapper>  
      {dayLabels.map((label, index) => (
        <DayHeader key={index}>{label}</DayHeader>
      ))}
      {days.map((day) => (
        <Day
          //key={day}
          //isToday={isToday(day)}
          onClick={() => handleDayClick(day)}
        >
            <p class="dateNum">
            {format(day, 'd')}
            </p>
          
        </Day>
      ))}
    </CalendarWrapper>
  );
};

export default Calendar;