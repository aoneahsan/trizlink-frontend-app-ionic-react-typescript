// Enums
export enum ProjectCreatePageTabEnum {
	detailForm = 'detailForm',
	board = 'board',
	ideas = 'ideas',
	roadMap = 'roadMap',
}

export enum ProjectBoardStatusEnum {
	needYourOpinion = 'needYourOpinion',
	planned = 'planned',
	inProgress = 'inProgress',
	done = 'done',
	notNow = 'notNow',
	notSet = 'notSet',
}

// Interfaces
export interface ZProjectInterface {
	id?: string;
	firstBoardId?: string;
	projectName: string;
	subDomain: string;
	image: string;
	board: {
		id?: string;
		title: string;
	};
	completedRecently: string;
	inProgress: string;
	plannedNext: string;

	currentTab?: ProjectCreatePageTabEnum; // just for frontend
}

export interface ZProjectBoardInterface {
	id?: string;
	title: string;
	slug: string;
	pageHeading?: string;
	pageDescription?: string;
	formCustomization: {
		intoHeading?: string;
		intoText?: string;
		title?: string;
		titlePlaceholder?: string;
		body?: string;
		bodyPlaceholder?: string;
		footerText?: string;
		buttonText?: string;
	};
	defaultStatus: {
		state?: ProjectBoardStatusEnum;
		hideIdeaWithNoSet?: boolean;
	};
	votingSetting: {
		hideVotingCount?: boolean;
	};
}

// Types
