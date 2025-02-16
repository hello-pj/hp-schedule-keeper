
import { Group } from '@/types';

export const groups: Group[] = [
  {
    id: 'morningmusume',
    name: 'モーニング娘。',
    color: '#E60012',
    isActive: true,
  },
  {
    id: 'angerme',
    name: 'アンジュルム',
    color: '#2CA9E1',
    isActive: true,
  },
  {
    id: 'juicejuice',
    name: 'Juice=Juice',
    color: '#F39800',
    isActive: true,
  },
  {
    id: 'tsubaki',
    name: 'つばきファクトリー',
    color: '#E4007F',
    isActive: true,
  },
  {
    id: 'beyonds',
    name: 'BEYOOOOONDS',
    color: '#8FC31F',
    isActive: true,
  },
];

export const mockEvents = [
  {
    id: '1',
    title: 'モーニング娘。コンサート',
    start: '2024-03-20T18:00:00',
    end: '2024-03-20T21:00:00',
    groupId: 'morningmusume',
    description: '春のコンサートツアー2024',
    location: '日本武道館',
  },
  {
    id: '2',
    title: 'アンジュルムファンミーティング',
    start: '2024-03-22T14:00:00',
    end: '2024-03-22T16:00:00',
    groupId: 'angerme',
    description: 'スペシャルファンミーティング',
    location: 'ベルサール飯田橋',
  },
  {
    id: '3',
    title: 'Juice=Juice握手会',
    start: '2024-03-25T13:00:00',
    end: '2024-03-25T17:00:00',
    groupId: 'juicejuice',
    description: 'ニューシングル発売記念イベント',
    location: 'パシフィコ横浜',
  },
];
