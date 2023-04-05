// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { LinkFolderType } from '@/types/AdminPanel/linksType';

// Data

export const ShortLinksFolderRStateAtom = atom<LinkFolderType[]>({
	key: 'ShortLinksFolderRStateAtom_key',
	default: [],
});
