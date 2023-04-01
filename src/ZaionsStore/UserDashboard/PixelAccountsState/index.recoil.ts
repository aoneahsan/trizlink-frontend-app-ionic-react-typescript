// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { PixelAccountType } from '@/types/AdminPanel/linksType';
import { PixelAccountPlatformType } from '@/types/AdminPanel/linksType/index';
// Data
import {
  PixelAccountPlatformOptionsData,
  // PixelAccountsData,
} from '@/data/UserDashboard/PixelAccountsData';

export const PixelAccountsRState = atom<PixelAccountType[]>({
  key: 'PixelAccountsRState_key',
  default: [],
});

export const PixelAccountPlatformOptionsRState = atom<
  PixelAccountPlatformType[]
>({
  key: 'PixelAccountPlatformOptionsRState_key',
  default: PixelAccountPlatformOptionsData,
});
