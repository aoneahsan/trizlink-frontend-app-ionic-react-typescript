// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { LinkInBioPredefinedThemeType } from 'types/AdminPanel/linkInBioType';

// Data

export const LinkInBioPredefinedThemeRState = atom<
  LinkInBioPredefinedThemeType[]
>({
  key: 'LinkInBioPredefinedThemeRState_key',
  default: [],
});
