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

export enum ProjectHeaderActiveLinkEnum {
	boards = 'boards',
	roadmap = 'roadmap',
	changelog = 'changelog',
}

// Interfaces
export interface ZProjectInterface {
	id?: string;
	firstBoardId?: string;
	projectName: string;
	subDomain: string;
	image: {
		fileUrl?: string;
		filePath?: string;
	};
	accentColor?: string;
	squaredIcon?: {
		fileUrl?: string;
		filePath?: string;
	};
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

export interface ZProjectBoardIdeasInterface {
	id?: string;
	title: string;
	description: string;
	status?: ProjectBoardStatusEnum;
	internalNotes?: string;
	image: {
		fileUrl?: string;
		filePath?: string;
	};
	tags: string[];
}

export interface ZBoardStatusInterface {
	id?: string;
	title: string;
	description: string;
	color: string;
	isActive?: boolean;
	isDefault?: boolean;
	isEditable?: boolean;
	isDeletable?: boolean;

	// for frontend
	editMode?: boolean;
}

// Types
