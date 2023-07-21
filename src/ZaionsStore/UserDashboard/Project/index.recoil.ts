import {
	ProjectBoardStatusEnum,
	ZBoardStatusInterface,
	ZProjectBoardIdeasInterface,
	ZProjectBoardInterface,
	ZProjectInterface,
} from '@/types/AdminPanel/Project/index.type';
import { ProjectBoardDefaultData } from '@/utils/constants';
import { atom, selector } from 'recoil';
//

// Recoil state that will hold the all ideas and filter options.
export const ZAllIdeasAndFilterOptionsRStateAtom = atom<{
	allIdeas: ZProjectBoardIdeasInterface[];
	filterOptions: {
		state: string | null;
		order: string;
	};
}>({
	key: 'ZAllIdeasAndFilterOptionsRStateAtom_key',
	default: {
		allIdeas: [],
		filterOptions: {
			state: '',
			order: '',
		},
	},
});

// Selector that will filter ideas.
export const ZFiltratedIdeasRStateSelector = selector<
	ZProjectBoardIdeasInterface[] | null
>({
	key: 'ZFiltratedIdeasRStateSelector_key',
	get: ({ get }) => {
		// Getting all the ideas and filter options
		const { allIdeas: _allIdeas, filterOptions: _ideasFilterOptions } = get(
			ZAllIdeasAndFilterOptionsRStateAtom
		);

		//
		let _filtratedIdeas: ZProjectBoardIdeasInterface[] | undefined = _allIdeas;

		//
		if (_allIdeas?.length > 0) {
			// Filtering status
			if (_ideasFilterOptions?.state !== ProjectBoardStatusEnum.all) {
				if (_ideasFilterOptions?.state || _ideasFilterOptions?.state === null) {
					_filtratedIdeas = _allIdeas.filter(
						(el) => el.statusUniqueId === _ideasFilterOptions.state
					);
				}

				if (_ideasFilterOptions?.state === ProjectBoardStatusEnum.notSet) {
					_filtratedIdeas = _allIdeas.filter(
						(el) => el.statusUniqueId === null
					);
				}
			}
		}

		return _filtratedIdeas;
	},
});

// Recoil state to store current project boards. so we can show it to pleases needed like in board popover etc.
export const ZProjectBoardsRStateAtom = atom<{
	currentBoard: ZProjectBoardInterface;
	allBoards: ZProjectBoardInterface[];
}>({
	key: 'ZProjectBoardsRStateAtom_key',
	default: {
		currentBoard: {
			title: '',
			slug: '',
			pageHeading: '',
			pageDescription: '',
			formCustomization: {
				intoHeading: ProjectBoardDefaultData.formCustomization.intoHeading,
				intoText: ProjectBoardDefaultData.formCustomization.intoText,
				title: ProjectBoardDefaultData.formCustomization.title,
				titlePlaceholder:
					ProjectBoardDefaultData.formCustomization.titlePlaceholder,
				body: ProjectBoardDefaultData.formCustomization.body,
				bodyPlaceholder:
					ProjectBoardDefaultData.formCustomization.bodyPlaceholder,
				footerText: '',
				buttonText: ProjectBoardDefaultData.formCustomization.buttonText,
			},
			defaultStatus: {
				state: ProjectBoardDefaultData.defaultStatus.state,
				hideIdeaWithNoSet:
					ProjectBoardDefaultData.defaultStatus.hideIdeaWithNoSet,
			},
			votingSetting: {
				hideVotingCount: ProjectBoardDefaultData.votingSetting.hideVotingCount,
			},
		},
		allBoards: [],
	},
});

// Recoil state to store current boardStates. so we can show it to pleases needed like in status popover etc.
export const ZProjectBoardStatesRStateAtom = atom<{
	allStatus: ZBoardStatusInterface[];
	currentStatus: ZBoardStatusInterface;
}>({
	key: 'ZProjectBoardStatesRStateAtom_key',
	default: {
		allStatus: [],
		currentStatus: {
			id: ProjectBoardStatusEnum.notDone,
			color: '',
			title: 'Not done',
		},
	},
});
