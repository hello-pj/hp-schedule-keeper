
import { Group } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface GroupFilterProps {
  groups: Group[];
  onToggleGroup: (groupId: string) => void;
}

export function GroupFilter({ groups, onToggleGroup }: GroupFilterProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span>グループフィルター</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {groups.map((group) => (
          <Badge
            key={group.id}
            variant={group.isActive ? "default" : "outline"}
            className="cursor-pointer transition-all"
            style={{
              backgroundColor: group.isActive ? group.color : 'transparent',
              borderColor: group.color,
              color: group.isActive ? 'white' : group.color,
            }}
            onClick={() => onToggleGroup(group.id)}
          >
            {group.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
