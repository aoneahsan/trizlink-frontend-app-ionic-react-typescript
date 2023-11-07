import { daysEnum } from '@/types/AdminPanel/index.type';

export const ZDaysData: Array<{ id?: string; title: string; type: daysEnum }> =
  [
    {
      id: '1',
      title: 'Monday',
      type: daysEnum.monday
    },

    {
      id: '2',
      title: 'Tuesday',
      type: daysEnum.tuesday
    },

    {
      id: '3',
      title: 'Wednesday',
      type: daysEnum.wednesday
    },

    {
      id: '4',
      title: 'Thursday',
      type: daysEnum.thursday
    },

    {
      id: '5',
      title: 'Friday',
      type: daysEnum.friday
    },

    {
      id: '6',
      title: 'Saturday',
      type: daysEnum.saturday
    },

    {
      id: '7',
      title: 'Sunday',
      type: daysEnum.sunday
    },

    {
      id: '8',
      title: 'Week ends',
      type: daysEnum.weekends
    },

    {
      id: '9',
      title: 'Wednesday',
      type: daysEnum.wednesday
    },

    {
      id: '10',
      title: 'All days',
      type: daysEnum.allDays
    }
  ];
