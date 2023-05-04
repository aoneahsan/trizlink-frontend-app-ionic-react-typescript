// Packages Imports
import { atom } from 'recoil';

// Custom
// Type
import { FolderInterface, LinkFolderType } from '@/types/AdminPanel/linksType';

// Data

export const LinkInBioFolderFormattedRState = atom<FolderInterface[]>({
	key: 'LinkInBioFolderFormattedRState_key',
	default: [],
});

export const LinkInBioFolderRState = atom<LinkFolderType[]>({
	key: 'LinkInBioFolderRState_key',
	default: [],
});
