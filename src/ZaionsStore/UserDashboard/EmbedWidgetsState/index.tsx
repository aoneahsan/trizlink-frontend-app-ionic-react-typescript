// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { EmbedWidgetsType } from '@/types/AdminPanel/linksType';
// Data
import { EmbedWidgetsData } from '@/data/UserDashboard/EmbedWidgets/index.data';

export const EmbedWidgetsState = atom<EmbedWidgetsType[]>({
  key: 'EmbedWidgetsState_key',
  default: EmbedWidgetsData,
});
