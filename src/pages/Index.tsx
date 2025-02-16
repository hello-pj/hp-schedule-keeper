
import { useState } from 'react';
import { Calendar } from '@/components/Calendar';
import { GroupFilter } from '@/components/GroupFilter';
import { groups, mockEvents } from '@/data/groups';
import { Group } from '@/types';

const Index = () => {
  const [activeGroups, setActiveGroups] = useState<Group[]>(groups);

  const handleToggleGroup = (groupId: string) => {
    setActiveGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? { ...group, isActive: !group.isActive }
          : group
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-center md:text-3xl">
            Hello! Project スケジュール
          </h1>
        </div>
      </header>
      <main className="container mx-auto">
        <GroupFilter
          groups={activeGroups}
          onToggleGroup={handleToggleGroup}
        />
        <Calendar
          events={mockEvents}
          groups={activeGroups}
        />
      </main>
    </div>
  );
};

export default Index;
