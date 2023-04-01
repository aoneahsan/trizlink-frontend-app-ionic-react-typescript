// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { UTMTagTemplateType } from '@/types/AdminPanel/linksType';
// Data
import { UTMTagTemplatesData } from '@/data/UserDashboard/UTMTagTemplatesData';

export const UTMTagTemplatesState = atom<UTMTagTemplateType[]>({
  key: 'UTMTagTemplatesState_key',
  default: UTMTagTemplatesData,
});
