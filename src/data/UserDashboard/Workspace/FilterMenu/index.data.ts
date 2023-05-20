import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import {
	workspaceFilterAccordionContentEnum,
	workspaceFilterAccordionEnum,
} from '@/types/AdminPanel/workspace';
import {
	alertCircle,
	calendarOutline,
	chatbox,
	chatboxEllipsesOutline,
	chatboxOutline,
	checkmark,
	checkmarkCircle,
	checkmarkCircleOutline,
	cloudDownloadOutline,
	flag,
	imageOutline,
	imagesOutline,
	megaphone,
	navigateCircle,
	navigateCircleOutline,
	pencil,
	personOutline,
	pricetagsOutline,
	time,
	timeOutline,
} from 'ionicons/icons';

export const filterMenuOptions: {
	value: workspaceFilterAccordionEnum;
	label: string;
	icon: string;
	filterItems: {
		filterValue?: string; // which we will pass in api to filter data using this value
		title: string; // display name of the filter
		icon?: string; // icon of the filter item
		color?: ZIonColorType; // color of the icon
	}[];
	filterType: workspaceFilterAccordionContentEnum;
}[] = [
	{
		value: workspaceFilterAccordionEnum.approvalStatus,
		label: 'Approval Status',
		icon: checkmark,
		filterType: workspaceFilterAccordionContentEnum.checkbox,
		filterItems: [
			{ title: 'Approved', icon: checkmarkCircle, color: 'success' },
			{
				title: 'Not Approved',
				icon: checkmarkCircleOutline,
				color: 'success',
			},
			{
				title: 'Partially approved',
				icon: checkmarkCircleOutline,
				color: 'dark',
			},
			{
				title: 'Pending my approval',
				icon: checkmarkCircle,
				color: 'warning',
			},
			{
				title: 'Requested by me',
				icon: checkmarkCircleOutline,
				color: 'warning',
			},
		],
	},

	{
		value: workspaceFilterAccordionEnum.postStatus,
		label: 'Post Status',
		icon: timeOutline,
		filterType: workspaceFilterAccordionContentEnum.checkbox,
		filterItems: [
			{
				title: 'Scheduled',
				icon: time,
				color: 'primary',
			},
			{
				title: 'Not scheduled',
				icon: timeOutline,
				color: 'primary',
			},
			{
				title: 'Published',
				icon: navigateCircle,
				color: 'primary',
			},
			{
				title: 'Not published',
				icon: navigateCircleOutline,
				color: 'primary',
			},
			{
				title: 'No date set',
				icon: time,
				color: 'medium',
			},
			{
				title: 'Marked as published',
				icon: flag,
				color: 'primary',
			},
			{
				title: 'Published as Ad',
				icon: megaphone,
				color: 'primary',
			},
			{
				title: 'Published as Draft',
				icon: pencil,
				color: 'primary',
			},
			{
				title: 'Failed to publish',
				icon: navigateCircle,
				color: 'danger',
			},
			{
				title: 'Incompatible content',
				icon: alertCircle,
				color: 'warning',
			},
			{
				title: 'Imported',
				icon: cloudDownloadOutline,
				color: 'success',
			},
		],
	},

	{
		value: workspaceFilterAccordionEnum.feedbackAndActivity,
		label: 'Feedback & Activity',
		icon: chatboxOutline,
		filterType: workspaceFilterAccordionContentEnum.checkbox,
		filterItems: [
			{
				title: 'Comments',
				icon: chatboxEllipsesOutline,
				color: 'dark',
			},
			{
				title: 'Internal notes',
				icon: chatboxEllipsesOutline,
				color: 'warning',
			},
			{
				title: 'Resolved comments',
				icon: chatboxEllipsesOutline,
				color: 'success',
			},
		],
	},

	{
		value: workspaceFilterAccordionEnum.labels,
		label: 'Labels',
		icon: pricetagsOutline,
		filterType: workspaceFilterAccordionContentEnum.checkbox,
		filterItems: [],
	},

	{
		value: workspaceFilterAccordionEnum.period,
		label: 'Period',
		icon: calendarOutline,
		filterType: workspaceFilterAccordionContentEnum.radio,
		filterItems: [
			{ title: 'Today' },
			{ title: 'This week' },
			{ title: 'This month' },
			{ title: 'Next month' },
			{ title: 'Next 14 days' },
			{ title: 'Custom' },
		],
	},

	{
		value: workspaceFilterAccordionEnum.postType,
		label: 'Post Type',
		icon: imageOutline,
		filterType: workspaceFilterAccordionContentEnum.checkbox,
		filterItems: [{ title: 'Posts' }, { title: 'Stories' }, { title: 'Reels' }],
	},

	{
		value: workspaceFilterAccordionEnum.content,
		label: 'Content',
		icon: imagesOutline,
		filterType: workspaceFilterAccordionContentEnum.checkbox,
		filterItems: [
			{ title: 'Images' },
			{ title: 'Video' },
			{ title: 'GIF' },
			{ title: 'Link Thumbnail' },
			{ title: 'Carousel' },
			{ title: 'Mixed media' },
			{ title: 'No media' },
			{ title: 'No text' },
		],
	},

	{
		value: workspaceFilterAccordionEnum.author,
		label: 'Author',
		icon: personOutline,
		filterType: workspaceFilterAccordionContentEnum.checkbox,
		filterItems: [{ title: 'Muhammad Talha Irshad' }, { title: 'Hamza' }],
	},
];
