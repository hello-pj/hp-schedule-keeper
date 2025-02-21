
interface SpreadsheetEvent {
  title: string;
  start: string;
  end: string;
  groupId: string;
  location?: string;
  description?: string;
}

export class SpreadsheetService {
  private static API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxXh9UQzHzgSAxUg8sxAINgapf-XZl-2mIKjbzR0JGqzscrIjBRaG72wgE2MmnQolsKpg/exec';

  private static groupNameToId: { [key: string]: string } = {
    'モーニング娘。': 'morningmusume',
    'アンジュルム': 'angerme',
    'Juice=Juice': 'juicejuice',
    'つばきファクトリー': 'tsubaki',
    'BEYOOOOONDS': 'beyonds'
  };

  static async fetchEvents(): Promise<{ success: boolean; error?: string; data?: any[] }> {
    try {
      const response = await fetch(this.API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error('Failed to fetch event data');
      }

      const events = await response.json();
      
      const formattedEvents = events.map((event: any) => {
        const utcDate = new Date(event['Start Date']);
        const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
        const startDate = jstDate.toISOString().split('T')[0];
        const startTime = event['Start Time'].split('T')[1];
        const groupName = event.Group || '';
        const groupId = this.groupNameToId[groupName] || groupName;

        return {
          id: crypto.randomUUID(),
          title: event.Subject,
          start: `${startDate}T${startTime}`,
          end: `${startDate}T${startTime}`,
          groupId: groupId,
          location: event.Location,
          description: event.Description
        };
      });

      return {
        success: true,
        data: formattedEvents
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch event data'
      };
    }
  }
}
