import { notificationTypeEnum } from '@/utils/enums';

export enum zNotificationSlotEnum {
	success = 'success',
	error = 'error',
}

export interface zNotificationInterface {
	message: string;
	notificationType: notificationTypeEnum;
	slot: zNotificationSlotEnum;
}

export interface useZMediaQueryScaleReturnInterface {
	isXlScale: boolean;
	isLgScale: boolean;
	isMdScale: boolean;
	isSmScale: boolean;
	isXsScale: boolean;
	is1300pxScale: boolean;
	is1200pxScale: boolean;
	is1250pxScale: boolean;
	is1150pxScale: boolean;
	is1100pxScale: boolean;
}
