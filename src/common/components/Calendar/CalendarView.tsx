import { format } from 'date-fns';
import classNames from 'classnames';

interface CalendarViewProps {
  date: Date;
  attendanceMap: Map<string, number>;
  onDateClick?: (date: Date) => void;
  className?: string;
}

const getBackgroundColor = (count: number) => {
  if (count === 0) return 'bg-white';
  if (count <= 1) return 'bg-blue-200';
  if (count <= 2) return 'bg-sky-300';
  if (count <= 5) return 'bg-teal-300';
  return 'bg-emerald-200';
};

const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  // Add padding for first week with previous month's days
  const prevMonthDays = firstDay.getDay();
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push(prevDate);
  }

  // Add current month's days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add padding for last week with next month's days
  const remainingDays = 42 - days.length; // 6 weeks * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};

export const CalendarView = ({
  date,
  attendanceMap,
  onDateClick,
  className
}: CalendarViewProps) => {
  const days = getDaysInMonth(date);
  const currentMonth = date.getMonth();

  return (
    <div className={classNames('space-y-4', className)}>
      <div className="text-xl font-semibold text-gray-900 text-center">
        {format(date, 'MMMM yyyy')}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentMonth;
          const dateString = date.toDateString();
          const attendanceCount = attendanceMap.get(dateString) || 0;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onDateClick?.(date)}
              className={classNames(
                'aspect-square p-2 border rounded-lg transition-colors',
                'flex flex-col items-center justify-start',
                'hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
                {
                  [getBackgroundColor(attendanceCount)]: isCurrentMonth,
                  'bg-gray-50 border-gray-100 text-gray-400': !isCurrentMonth,
                  'cursor-pointer': onDateClick
                }
              )}
              disabled={!isCurrentMonth}
            >
              <div className={classNames(
                'font-medium',
                isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
              )}>
                {date.getDate()}
              </div>
              {/* {isCurrentMonth && attendanceCount > 0 && (
                <div className="mt-1 text-xs text-gray-600">
                  {attendanceCount} record{attendanceCount > 1 ? 's' : ''}
                </div>
              )} */}
            </button>
          );
        })}
      </div>
      
      {/* Color Code Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-white border border-gray-200"></div>
          <span>0 records</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-blue-200"></div>
          <span>1 record</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-sky-300"></div>
          <span>2 records</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-teal-300"></div>
          <span>3-5 records</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-emerald-200"></div>
          <span>5+ records</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
