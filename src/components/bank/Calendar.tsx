
import React, { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

interface CalendarProps {
  currentMonth: Date;
  usedDays: Date[];
  onDayClick?: (date: Date) => void;
}

const Calendar = ({ currentMonth, usedDays, onDayClick }: CalendarProps) => {
  // Calcula los días del mes y los días de la semana para mostrar
  const monthDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [currentMonth]);

  // Offset para el primer día del mes (para alinear con el día de la semana correcto)
  const firstDayOffset = getDay(startOfMonth(currentMonth));
  
  // Comprobar si un día tiene transacciones
  const isDayUsed = (date: Date) => {
    return usedDays.some(usedDate => isSameDay(date, usedDate));
  };
  
  // Días de la semana en español
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Celdas vacías para el offset del primer día del mes */}
        {Array.from({ length: firstDayOffset }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day invisible"></div>
        ))}
        
        {/* Días del mes */}
        {monthDays.map(day => (
          <button
            key={format(day, 'yyyy-MM-dd')}
            onClick={() => onDayClick?.(day)}
            className={`calendar-day ${
              isDayUsed(day)
                ? 'calendar-day-used hover:bg-bank-secondary hover:bg-opacity-10 text-bank-dark'
                : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
