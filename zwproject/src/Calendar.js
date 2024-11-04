import React, { useEffect, useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import styled from 'styled-components';
import './calendar.css'


/*
Declarations of styled div elements
*/
const CalendarWrapper = styled.div
`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 90px;
`;

const Day = styled.div
`
  position: relative;
  padding: 5px;
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
  // hook to handle Date data
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startOfCurrentWeek = startOfWeek(currentDate);

  // Creates an array of days starting from the sunday of the current week
  const days = [...Array(21)].map((_, index) => {
    return addDays(startOfCurrentWeek, index);
  });

  // Labels to organize columns into days of the week
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // hook to handle exercises data from database
  const [exercises, setExercises] = useState([]);
  // GET request to fetch all exercises from database
  useEffect(() => {
      const fetchExercises = async () => {
          try {
              const response = await fetch('http://localhost:3000/api/exercises');
              const data = await response.json();
              setExercises(data);
            // throws error message if there is an error while trying to fetch exercises
          } catch (error) {
              console.error('Error fetching exercises:', error);
          }
      };

      fetchExercises();
  }, []);

  return (
    <CalendarWrapper>  
      {/* Maps labels sun-sat to display which day of the week corresponds to each column of days */}
      {dayLabels.map((label, index) => (
        <DayHeader key={index}>{label}</DayHeader>
      ))}
      {days.map((day) => (
        <Day
          key={day}
          isToday={isToday(day)}
        >
            {/* Header to display date in each Day div */}
            <h3 class="dateNum">
            {format(day, 'd')}
            </h3>

            {/* Table to contain workout select dropdowns */}
            <table>
              <tr>
                <select>
                  <option value=''>     </option>
                  {/* Query MongoDB, map results to options in dropdown */}
                  {exercises.map((exercises) => (
                  <option value={exercises._id}>{exercises.exercise_name}</option>
                  ))}
                </select>
              </tr>
              <tr>
                <select>
                  <option value=''>     </option>
                  {exercises.map((exercises) => (
                  <option value={exercises._id}>{exercises.exercise_name}</option>
                  ))}
                </select>
              </tr>
              <tr>
                <select>
                  <option value=''>     </option>
                  {exercises.map((exercises) => (
                  <option value={exercises._id}>{exercises.exercise_name}</option>
                  ))}
                </select>
              </tr>
            </table>
          
        </Day>
      ))}
    </CalendarWrapper>
  );
};

export default Calendar;