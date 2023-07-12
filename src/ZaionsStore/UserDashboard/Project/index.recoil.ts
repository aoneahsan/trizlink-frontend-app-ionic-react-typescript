import {
	ZProjectBoardInterface,
	ZProjectInterface,
} from '@/types/AdminPanel/Project/index.type';
import { atom } from 'recoil';
//

// If user create new project this recoil state will store the data that user entry to show data in preview window browser component which is present in CreateProject page. // we don't need it know because we are handling it with formik.
export const ZNewProjectRStateAtom = atom<ZProjectInterface>({
	key: 'ZNewProjectRStateAtom_key',
	default: {
		projectName: '',
		subDomain: '',
		image: '',
		board: { title: 'Feature requests' },
		completedRecently: '',
		inProgress: '',
		plannedNext: '',
	},
});

// Recoil state to store current project boards. so we can show it to pleases needed like in board popover etc.
export const ZProjectBoardsRStateAtom = atom<{
	currentBoard: ZProjectBoardInterface;
	allBoards: ZProjectBoardInterface[];
}>({
	key: 'ZProjectBoardsRStateAtom_key',
	default: { currentBoard: { title: '' }, allBoards: [] },
});
