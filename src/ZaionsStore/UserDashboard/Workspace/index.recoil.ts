import { atomFamily } from 'recoil';
import { workspaceInterface } from '@/types/AdminPanel/workspace';

// Recoil state for storing workspace data.
export const WorkspaceRStateAtom = atomFamily<workspaceInterface[], string>({
	key: 'WorkspaceRStateAtom_key',
	default: [],
});
