import { atom, atomFamily } from 'recoil';
import { workspaceInterface } from '@/types/AdminPanel/workspace';

// Recoil state for storing workspace data.
export const WorkspaceRStateAtomFamily = atomFamily<
	workspaceInterface[],
	string
>({
	key: 'WorkspaceRStateAtomFamily_key',
	default: [],
});

// Recoil state for storing workspace data.
export const WorkspacesRStateAtom = atom<string[]>({
	key: 'WorkspacesRStateAtom_key',
	default: [],
});
