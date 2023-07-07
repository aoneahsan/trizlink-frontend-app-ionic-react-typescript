// Enums
export enum ProjectCreatePageTabEnum {
	detailForm = 'detailForm',
	board = 'board',
	ideas = 'ideas',
	roadMap = 'roadMap',
}

// Interfaces
export interface ZProjectInterface {
	id?: string;
	projectName: string;
	subDomain: string;
	image: string;
	featureRequests: string;
	completedRecently: string;
	inProgress: string;
	plannedNext: string;

	currentTab?: ProjectCreatePageTabEnum; // just for frontend
}

// Types
