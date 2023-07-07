import { ZProjectInterface } from '@/types/AdminPanel/Project/index.type';
import { atom } from 'recoil';
//

// If user create new project this recoil state will store the data that user entry to show data in preview window browser component which is present in CreateProject page. // we don't need it know because we are handling it with formik.
export const ZNewProjectRStateAtom = atom<ZProjectInterface>({
	key: 'ZNewProjectRStateAtom_key',
	default: {
		projectName: '',
		subDomain: '',
		image: '',
		featureRequests: 'Feature requests',
		completedRecently: '',
		inProgress: '',
		plannedNext: '',
	},
});
