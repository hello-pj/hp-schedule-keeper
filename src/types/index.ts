
export interface Group {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  groupId: string;
  description?: string;
  location?: string;
  url?: string;
}
