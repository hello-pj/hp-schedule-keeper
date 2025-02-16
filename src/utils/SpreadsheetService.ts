
interface SpreadsheetEvent {
  title: string;
  start: string;
  end: string;
  groupId: string;
  location?: string;
  description?: string;
}

export class SpreadsheetService {
  private static SHEET_ID = '1zNS9sCVlxTlacEjfAgvChemQmq9p07TopIsHsHh7Ck4';

  private static groupNameToId: { [key: string]: string } = {
    'モーニング娘。': 'morningmusume',
    'アンジュルム': 'angerme',
    'Juice=Juice': 'juicejuice',
    'つばきファクトリー': 'tsubaki',
    'BEYOOOOONDS': 'beyonds'
  };

  static async fetchEvents(): Promise<{ success: boolean; error?: string; data?: any[] }> {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/gviz/tq?tqx=out:json`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch spreadsheet data');
      }

      const text = await response.text();
      const json = JSON.parse(text.substr(47).slice(0, -2));
      
      if (!json.table || !json.table.rows) {
        throw new Error('Invalid spreadsheet format');
      }

      const events = json.table.rows.slice(1).map((row: any) => {
        const cells = row.c;
        const groupName = cells[3]?.v || '';
        const groupId = this.groupNameToId[groupName] || groupName;

        return {
          id: crypto.randomUUID(),
          title: cells[0]?.v || '',
          start: cells[1]?.v || '',
          end: cells[2]?.v || '',
          groupId: groupId,
          location: cells[4]?.v || '',
          description: cells[5]?.v || ''
        };
      });

      return {
        success: true,
        data: events
      };
    } catch (error) {
      console.error('Error fetching spreadsheet:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch spreadsheet data'
      };
    }
  }
}
