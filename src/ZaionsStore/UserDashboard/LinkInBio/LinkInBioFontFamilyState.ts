// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { type LinkInBioThemeFontFamilyInterface } from '@/types/AdminPanel/linkInBioType';

// Data
import { ZaionsShortLinkData } from '@/data/UserDashboard/LinkInBio/FontFamily/index.data';

export const LinkInBioFontFamilyRState = atom<
  LinkInBioThemeFontFamilyInterface[]
>({
  key: 'LinkInBioFontFamilyRState_key',
  default: ZaionsShortLinkData
});
