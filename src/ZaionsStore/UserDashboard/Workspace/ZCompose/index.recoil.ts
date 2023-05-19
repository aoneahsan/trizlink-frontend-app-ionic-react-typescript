import { atom } from 'recoil';

// Recoil state for storing workspace data.
export const WorkspaceComposeModalRStateAtom = atom<{ isOpen: boolean }>({
	key: 'WorkspaceComposeModalRStateAtom_key',
	default: { isOpen: false },
});
