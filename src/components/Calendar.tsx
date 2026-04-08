import React from 'react';
import { ChevronLeft, ChevronRight, PenLine } from 'lucide-react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isWithinInterval,
  isBefore
} from 'date-fns';
import './Calendar.css';

interface CalendarProps {
  // any props if needed later
}

export const Calendar: React.FC<CalendarProps> = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);
  const [notes, setNotes] = React.useState<string>("");

  // Load notes from local storage on mount
  React.useEffect(() => {
    const savedNotes = localStorage.getItem('calendar_notes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to local storage automatically
  React.useEffect(() => {
    localStorage.setItem('calendar_notes', notes);
  }, [notes]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const onDateClick = (day: Date) => {
    if (!startDate) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isBefore(day, startDate)) {
        // Option 1: swap dates if clicked before start
        setEndDate(startDate);
        setStartDate(day);
        // Option 2: just set new start date
        // setStartDate(day);
      } else {
        setEndDate(day);
      }
    } else {
      // Both are set, reset
      setStartDate(day);
      setEndDate(null);
    }
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDateGrid = startOfWeek(monthStart);
    const endDateGrid = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDateGrid;
    let formattedDate = "";

    while (day <= endDateGrid) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;

        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        
        let isStart = startDate && isSameDay(day, startDate);
        let isEnd = endDate && isSameDay(day, endDate);
        let isInRange = false;

        if (startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate })) {
          isInRange = true;
        }

        // Handle hover state when picking end date
        if (startDate && !endDate && hoverDate) {
          const hoveredEnd = isBefore(hoverDate, startDate) ? startDate : hoverDate;
          const hoveredStart = isBefore(hoverDate, startDate) ? hoverDate : startDate;
          if (isWithinInterval(day, { start: hoveredStart, end: hoveredEnd })) {
            isInRange = true;
          }
          if (isSameDay(day, hoverDate)) {
             // visually show the end date being hovered
             if (!isStart) {
                // we won't strictly enforce end-date class just yet, but can styling it
             }
          }
        }

        days.push(
          <div
            className={`day-cell-wrapper`}
            key={day.toString()}
            onMouseEnter={() => setHoverDate(cloneDay)}
            onMouseLeave={() => setHoverDate(null)}
          >
            <div
              className={`day-cell 
                ${!isCurrentMonth ? "empty-cell" : ""} 
                ${isToday ? "is-today" : ""} 
                ${isStart ? "selected-range start-date" : ""} 
                ${isEnd ? "selected-range end-date" : ""} 
                ${isInRange && !isStart && !isEnd ? "selected-range" : ""}`}
              onClick={() => isCurrentMonth ? onDateClick(cloneDay) : null}
            >
              {isCurrentMonth ? (
                 <div className="day-content">
                    {formattedDate}
                 </div>
              ) : ""}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <React.Fragment key={day.toString()}>
          {days}
        </React.Fragment>
      );
      days = [];
    }
    return <div className="calendar-grid">{rows}</div>;
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
    <div className="day-name" key={day}>{day}</div>
  ));

  return (
    <div className="calendar-container">
      {/* Visual Anchor (The Physical aesthetic factor) */}
      <div className="calendar-image-section">
        {/* Placeholder image from unsplash optimized for tall architectural patterns to create premium aesthetic */}
        <img 
          src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
          alt="Architectural Abstract" 
          className="calendar-hero-image"
        />
        <div className="calendar-image-overlay">
          <h2>{format(currentDate, 'MMMM')}</h2>
          <p>{format(currentDate, 'yyyy')}</p>
        </div>
      </div>

      <div className="spiral-binding">
        {Array.from({ length: 15 }).map((_, i) => (
          <div className="spiral-ring" key={i}></div>
        ))}
      </div>

      <div className="calendar-right-panel">
        <div className="calendar-header">
          <div className="calendar-month-year">
            <h3>{format(currentDate, 'MMMM yyyy')}</h3>
          </div>
          <div className="calendar-nav-buttons">
            <button onClick={prevMonth} aria-label="Previous Month">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextMonth} aria-label="Next Month">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="calendar-grid" style={{ marginBottom: '1rem' }}>
          {dayNames}
        </div>
        {renderCells()}

        {/* Integrated Notes Section */}
        <div className="notes-container">
          <div className="notes-header">
            <PenLine size={18} />
            <span>Monthly Memos</span>
          </div>
          <textarea
            className="notes-input"
            placeholder="Jot down important notes for this month..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
