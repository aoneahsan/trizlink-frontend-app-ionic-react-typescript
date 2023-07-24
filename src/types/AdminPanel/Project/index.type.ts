import { UserAccountType } from './../../UserAccount/index.type';
import { ZCommentInterface } from '../index.type';

// Enums
export enum ProjectCreatePageTabEnum {
	detailForm = 'detailForm',
	board = 'board',
	ideas = 'ideas',
	roadMap = 'roadMap',
}

export enum ProjectBoardStatusEnum {
	all = 'all',
	notDone = 'notDone',
	notSet = 'notSet',
	done = 'done',
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
	statusUniqueId?: string;
	internalNotes?: string;
	image: {
		fileUrl?: string;
		filePath?: string;
	};
	user: UserAccountType;
	isCompleted?: boolean;
	comments: ZCommentInterface[];
	tags: string[];
	votesCount?: number;
	commentsCount?: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface ZBoardStatusInterface {
	id?: string;
	title: string;
	color: string;
	description?: string;
	isActive?: boolean;
	isDefault?: boolean;
	isEditable?: boolean;
	isDeletable?: boolean;

	// for frontend
	editMode?: boolean;
}

export interface ZBoardIdeaVoteInterface {
	success: boolean;
	voteWasAdded: boolean;
	totalVotes: number;
}

// Types
