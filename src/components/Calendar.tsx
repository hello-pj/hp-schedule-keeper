
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const activeGroups = groups.filter(g => g.isActive).map(g => g.id);
    setFilteredEvents(events.filter(event => activeGroups.includes(event.groupId)));
  }, [events, groups]);

  const handleEventClick = (info: any) => {
    const event = events.find(e => e.id === info.event.id);
    setSelectedEvent(event || null);
  };

  const eventContent = (eventInfo: any) => {
    const group = groups.find(g => g.id === eventInfo.event.groupId);
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
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-4/5">
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
          eventClick={handleEventClick}
          height="auto"
          aspectRatio={1.8}
        />
      </div>
      <div className="w-full md:w-1/5 p-4 border rounded-lg bg-background">
        <h2 className="text-lg font-semibold mb-4">イベント詳細</h2>
        {selectedEvent ? (
          <div className="space-y-2">
            <p><strong>タイトル:</strong> {selectedEvent.title}</p>
            <p><strong>日時:</strong> {new Date(selectedEvent.start).toLocaleString('ja-JP')}</p>
            <p><strong>会場:</strong> {selectedEvent.location || '未定'}</p>
            <p><strong>説明:</strong> {selectedEvent.description || '説明なし'}</p>
            <p>
              <strong>グループ:</strong> {groups.find(g => g.id === selectedEvent.groupId)?.name || '不明'}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">イベントを選択してください</p>
        )}
      </div>
    </div>
  );
}
