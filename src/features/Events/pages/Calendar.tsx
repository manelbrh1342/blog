import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { events as allEvents } from '../data/events';

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
  'DECEMBER': 11 // Handling English fallback if any
};

const DAYS_FR = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [events, setEvents] = useState<typeof allEvents>([]);

  useEffect(() => {
    // Load events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('all_events') || '[]');
    if (storedEvents.length > 0) {
      setEvents(storedEvents);
    } else {
      setEvents(allEvents);
    }
  }, []);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate, events]);

  // Helper to parse "20 NOVEMBRE 2024" format
  const parseEventDate = (dateStr: string): Date | null => {
    try {
      const parts = dateStr.split(' ');
      if (parts.length !== 3) return new Date(dateStr); // Try standard parsing if format doesn't match

      const day = parseInt(parts[0], 10);
      const monthStr = parts[1].toUpperCase();
      const year = parseInt(parts[2], 10);

      const month = MONTHS_MAP[monthStr];

      if (month !== undefined && !isNaN(day) && !isNaN(year)) {
        return new Date(year, month, day);
      }
      return new Date(dateStr); // Fallback
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

    // Adjust for Monday start (0 = Sunday, 1 = Monday, etc.)
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6; // Sunday becomes 6

    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: CalendarDay[] = [];

    // Previous month days
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

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = events.filter(event => {
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

    // Next month days to fill the grid
    const remainingDays = 35 - days.length; // 5 weeks * 7 days
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

  return (
    <>
      <div
        className="min-h-screen relative overflow-hidden mt-16"
        style={{
          backgroundImage: 'url(/calendar-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-4xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-5xl sm:text-6xl font-serif italic text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Les événements de
              </h1>
              <h2 className="text-4xl sm:text-5xl font-script text-white" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                {MONTHS_FR[currentDate.getMonth()]}
              </h2>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/30 shadow-2xl">
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {DAYS_FR.map((day) => (
                  <div key={day} className="text-center text-white font-bold text-sm sm:text-base py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const hasEvents = day.events.length > 0;
                  const isToday = day.isCurrentMonth &&
                    day.date === new Date().getDate() &&
                    day.month === new Date().getMonth() &&
                    day.year === new Date().getFullYear();

                  return (
                    <div
                      key={index}
                      className={`
                        aspect-square rounded-xl overflow-hidden transition-all duration-300 relative group
                        ${day.isCurrentMonth ? 'bg-white/30' : 'bg-white/10'}
                        ${!hasEvents && 'hover:bg-white/40'}
                        ${isToday ? 'ring-2 ring-white z-10' : ''}
                        border border-white/40
                        cursor-pointer
                        shadow-lg
                      `}
                    >
                      {hasEvents ? (
                        <>
                          {/* Event Image Background */}
                          <div className="absolute inset-0">
                            <img
                              src={day.events[0].image
                                ? (day.events[0].image.startsWith('data:') || day.events[0].image.startsWith('http') ? day.events[0].image : `/images/${day.events[0].image}`)
                                : "/api/placeholder/400/320"}
                              alt={day.events[0].title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          </div>

                          <div className="h-full flex flex-col justify-between p-2 relative z-10">
                            <div className="text-lg sm:text-xl font-bold text-white drop-shadow-md">
                              {day.date}
                            </div>

                            <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                              <div className="text-[10px] sm:text-xs text-white font-bold leading-tight line-clamp-2 drop-shadow-md">
                                {day.events[0].title}
                              </div>
                              {day.events.length > 1 && (
                                <div className="text-[9px] text-white/90 font-medium mt-0.5">
                                  +{day.events.length - 1} autre{day.events.length > 2 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="h-full p-2 sm:p-3">
                          <div className={`text-lg sm:text-xl font-bold ${day.isCurrentMonth ? 'text-white' : 'text-white/50'}`}>
                            {day.date}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Control Buttons - Empty and Transparent */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={previousMonth}
                className="w-14 h-14 rounded-full border-2 border-white/60 bg-transparent flex items-center justify-center hover:bg-white/20 hover:border-white transition-all duration-300 group"
                title="Mois précédent"
              >
                <span className="text-3xl text-white font-light group-hover:scale-110 transition-transform pb-1">&lt;</span>
              </button>

              <button
                onClick={nextMonth}
                className="w-14 h-14 rounded-full border-2 border-white/60 bg-transparent flex items-center justify-center hover:bg-white/20 hover:border-white transition-all duration-300 group"
                title="Mois suivant"
              >
                <span className="text-3xl text-white font-light group-hover:scale-110 transition-transform pb-1">&gt;</span>
              </button>
            </div>

            {/* Month/Year Display */}
            <div className="text-center mt-6">
              <p className="text-white/80 text-lg font-medium tracking-widest uppercase">
                {MONTHS_FR[currentDate.getMonth()]} {currentDate.getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;