import { workspaceFormConnectPagesEnum } from '@/types/AdminPanel/workspace/index';
export const workspacePagesDomeData: {
	type: workspaceFormConnectPagesEnum;
	pageName: string;
}[] = [
	{ pageName: 'zaions facebook', type: workspaceFormConnectPagesEnum.facebook },
	{
		pageName: 'zaions instagram',
		type: workspaceFormConnectPagesEnum.instagram,
	},
	{ pageName: 'zaions linkedin', type: workspaceFormConnectPagesEnum.linkedin },
	{
		pageName: 'zaions pinterest',
		type: workspaceFormConnectPagesEnum.pinterest,
	},
	{
		pageName: 'zaions tiktok',
		type: workspaceFormConnectPagesEnum.tiktok,
	},
	{
		pageName: 'zaions youtube',
		type: workspaceFormConnectPagesEnum.youtube,
	},
	{
		pageName: 'zaions twitter',
		type: workspaceFormConnectPagesEnum.twitter,
	},
	{
		pageName: 'zaions googleBusiness',
		type: workspaceFormConnectPagesEnum.googleBusiness,
	},
	{
		pageName: 'zaions universalContent',
		type: workspaceFormConnectPagesEnum.universalContent,
	},
];
