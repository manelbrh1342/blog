import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { events as allEvents } from '../data/events';
import AuthNav from '../../../components/AuthNavigation';
import { ArrowLeft } from 'lucide-react';

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  events: typeof allEvents;
}

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const MONTHS_MAP: { [key: string]: number } = {
  'JANVIER': 0, 'FÉVRIER': 1, 'MARS': 2, 'AVRIL': 3, 'MAI': 4, 'JUIN': 5,
  'JUILLET': 6, 'AOÛT': 7, 'SEPTEMBRE': 8, 'OCTOBRE': 9, 'NOVEMBRE': 10, 'DÉCEMBRE': 11,
  'DECEMBER': 11
};

const DAYS_FR = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const parseEventDate = (dateStr: string): Date | null => {
    try {
      const parts = dateStr.split(' ');
      if (parts.length !== 3) return new Date(dateStr);

      const day = parseInt(parts[0], 10);
      const monthStr = parts[1].toUpperCase();
      const year = parseInt(parts[2], 10);

      const month = MONTHS_MAP[monthStr];

      if (month !== undefined && !isNaN(day) && !isNaN(year)) {
        return new Date(year, month, day);
      }
      return new Date(dateStr);
    } catch (e) {
      console.error("Date parsing error", e);
      return null;
    }
  };

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6;

    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: CalendarDay[] = [];

    for (let i = startDay - 1; i >= 0; i--) {
      const dayDate = daysInPrevMonth - i;
      days.push({
        date: dayDate,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false,
        events: []
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = allEvents.filter(event => {
        const eventDate = parseEventDate(event.date);
        if (!eventDate) return false;

        return eventDate.getDate() === i &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year;
      });

      days.push({
        date: i,
        month,
        year,
        isCurrentMonth: true,
        events: dayEvents
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
        events: []
      });
    }

    setCalendarDays(days);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (day: CalendarDay) => {
    const today = new Date();
    return day.date === today.getDate() &&
      day.month === today.getMonth() &&
      day.year === today.getFullYear() &&
      day.isCurrentMonth;
  };

  return (
    <>
      <AuthNav />
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: 'url(/calendar-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 min-h-screen flex flex-col items-center p-4 sm:p-8 pt-24">
          <div className="w-full max-w-4xl mb-6">
            <button
              onClick={() => navigate('/event')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </button>
          </div>

          <div className="w-full max-w-4xl">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 text-white">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 capitalize">
                  {MONTHS_FR[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h1>
                <p className="text-white/70 text-lg">Organize your schedule perfectly</p>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0 bg-white/10 p-1.5 rounded-full backdrop-blur-md border border-white/20">
                <button onClick={previousMonth} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white">
                  ←
                </button>
                <button onClick={goToToday} className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-[#4F46E5] shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Today
                </button>
                <button onClick={nextMonth} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white">
                  →
                </button>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/30 shadow-2xl">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {DAYS_FR.map((day, index) => (
                  <div key={index} className="text-center font-bold text-white/80 text-sm tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] md:min-h-[120px] rounded-2xl p-2 md:p-3 relative group transition-all duration-300 border 
                      ${day.isCurrentMonth
                        ? 'bg-white/80 hover:bg-white border-white/40 shadow-sm hover:shadow-lg transform hover:-translate-y-1'
                        : 'bg-white/10 text-white/40 border-transparent'
                      }
                    `}
                  >
                    <span className={`text-lg font-bold ${day.isCurrentMonth ? 'text-gray-700' : 'text-white/30'
                      } ${isToday(day) ? 'bg-[#4F46E5] text-white w-8 h-8 flex items-center justify-center rounded-full -ml-1 -mt-1 mb-1' : ''
                      }`}>
                      {day.date}
                    </span>

                    <div className="mt-1 space-y-1">
                      {day.events.map(evt => (
                        <div key={evt.id} className="text-[10px] md:text-xs truncate bg-[#4F46E5]/10 text-[#4F46E5] px-1.5 py-0.5 rounded font-medium border border-[#4F46E5]/20">
                          {evt.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;