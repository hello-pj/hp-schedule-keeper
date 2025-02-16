
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import jaLocale from '@fullcalendar/core/locales/ja';
import { Event, Group } from '@/types';

interface CalendarProps {
  events: Event[];
  groups: Group[];
}

export function Calendar({ events, groups }: CalendarProps) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    const activeGroups = groups.filter(g => g.isActive).map(g => g.id);
    setFilteredEvents(events.filter(event => activeGroups.includes(event.groupId)));
  }, [events, groups]);

  const eventContent = (eventInfo: any) => {
    const group = groups.find(g => g.groupId === eventInfo.event.groupId);
    return (
      <div className="p-1">
        <div className="text-xs font-medium">{eventInfo.event.title}</div>
        {eventInfo.event.extendedProps.location && (
          <div className="text-xs text-muted-foreground">
            {eventInfo.event.extendedProps.location}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek'
        }}
        events={filteredEvents.map(event => ({
          ...event,
          backgroundColor: groups.find(g => g.id === event.groupId)?.color,
        }))}
        eventContent={eventContent}
        height="auto"
        aspectRatio={1.8}
      />
    </div>
  );
}
