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
`;

const Day = styled.div
`
  display: grid;
  grid-template-columns: 75% 25%;
  position: relative;
  padding: 5px;
  padding-top: 30px;
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


let dayCount = 28
const Calendar = () => {
  // hook to handle Date data
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startOfCurrentWeek = startOfWeek(currentDate);

  // handles sets/reps incrementing and toggling
  const [setsCount, setSetsCount] = useState(3);
  const [repsCount, setRepsCount] = useState(12);
  const [isToggled, setIsToggled] = useState(false); // New state to track toggle

  // Function to toggle values
  const toggleValues = () => {
    if (!isToggled) {
      setSetsCount(4);  // New values when toggled on
      setRepsCount(15);
    } else {
      setSetsCount(3);  // Original values when toggled off
      setRepsCount(12);
    }
    setIsToggled(!isToggled); // Toggle the state
  };

  // Creates an array of days starting from the sunday of the current week
  const days = [...Array(dayCount)].map((_, index) => {
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
    <div class="container">
      <button onClick={toggleValues}>
        {isToggled ? 'Revert' : 'Increment'} {/* Toggle button label */}
      </button>
      <CalendarWrapper> 
        {/* Maps labels sun-sat to display which day of the week corresponds to each column of days */}
        {dayLabels.map((label, index) => (
          <DayHeader key={index}>{label}</DayHeader>
        ))}
        {days.map((day, index) => (
          <Day
            key={day}
            isToday={isToday(day)}
          > 
            <div>
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
            </div>
            <div>      
              {/* Header to display date and sets/reps label in each Day div */}
              <h3 class="dateNum">
                {format(day, 'd')} <br></br> Set|Rep
              </h3>
              {(() => {
                 let displaySetsCount = setsCount;
                 let displayRepsCount = repsCount;
               
                 if (index < 7) {
                   displaySetsCount = 3;
                   displayRepsCount = 12;
                 } else if (index >= 7 && index <= 13) {
                   displaySetsCount = 3;
                 } else if (index >= 13 && index <= 20) {
                   displayRepsCount = 12;
                 }
                 
                 return (
                   <>
                     {[...Array(3)].map((_, i) => (
                       <span key={i} className="label">
                         {displaySetsCount} | {displayRepsCount}
                         <br />
                       </span>
                     ))}
                   </>
                 );
              })()}
            </div>
             {/* Apply toggle functionality only for second and third rows (index 7 to 20) */}             
          </Day>
        ))}
      </CalendarWrapper>
    </div>
  );
};

export default Calendar;