// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { ShortUrlLinkOptionType } from '@/types/AdminPanel/linksType';
// Data
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';

export const ZaionsShortUrlLinkOptionData = atom<ShortUrlLinkOptionType[]>({
  key: 'ZaionsCreateNewLink_key',
  default: LinkTypeOptionsData,
});
