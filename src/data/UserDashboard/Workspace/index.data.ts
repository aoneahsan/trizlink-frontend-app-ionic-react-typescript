import { workspaceFormConnectPagesEnum } from '@/types/AdminPanel/workspace/index';
export const workspacePagesDomeData: Array<{
  type: workspaceFormConnectPagesEnum;
  pageName: string;
}> = [
  { pageName: 'zaions facebook', type: workspaceFormConnectPagesEnum.facebook },
  {
    pageName: 'zaions instagram',
    type: workspaceFormConnectPagesEnum.instagram
  },
  { pageName: 'zaions linkedin', type: workspaceFormConnectPagesEnum.linkedin },
  {
    pageName: 'zaions pinterest',
    type: workspaceFormConnectPagesEnum.pinterest
  },
  {
    pageName: 'zaions tiktok',
    type: workspaceFormConnectPagesEnum.tiktok
  },
  {
    pageName: 'zaions youtube',
    type: workspaceFormConnectPagesEnum.youtube
  },
  {
    pageName: 'zaions twitter',
    type: workspaceFormConnectPagesEnum.twitter
  },
  {
    pageName: 'zaions googleBusiness',
    type: workspaceFormConnectPagesEnum.googleBusiness
  },
  {
    pageName: 'zaions universalContent',
    type: workspaceFormConnectPagesEnum.universalContent
  }
];

export const DefaultTimeSlotColors = [
  { id: '1', color: '#fbe085' },
  { id: '2', color: '#00a8ff' },
  { id: '3', color: '#9c88ff' },
  { id: '4', color: '#fbc531' },
  { id: '5', color: '#4cd137' },
  { id: '6', color: '#487eb0' },
  { id: '7', color: '#e84118' }
];
