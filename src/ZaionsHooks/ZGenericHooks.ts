import {
	useZIonToastSuccess,
	useZIonToastDanger,
	useZIonSuccessAlert,
	useZIonErrorAlert,
} from '@/ZaionsHooks/zionic-hooks';
import { notificationTypeEnum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import {
	useZMediaQueryScaleReturnInterface,
	zNotificationInterface,
	zNotificationSlotEnum,
} from '@/types/CustomHooks/zgeneric-hooks.type';
import { useMediaQuery } from 'react-responsive';
import {
	BRACKPOINT_MD,
	BRACKPOINT_XL,
	BRACKPOINT_LG,
	BRACKPOINT_SM,
	BRACKPOINT_XS,
} from '@/utils/constants';

export const useZNotification = () => {
	const { presentZIonToastDanger } = useZIonToastDanger();
	const { presentZIonToastSuccess } = useZIonToastSuccess();

	const { presentZIonSuccessAlert } = useZIonSuccessAlert();
	const { presentZIonErrorAlert } = useZIonErrorAlert();

	const presentZNotification = async ({
		message,
		notificationType,
		slot,
	}: zNotificationInterface) => {
		try {
			switch (notificationType) {
				case notificationTypeEnum.toast:
					if (slot === zNotificationSlotEnum.error) {
						return await presentZIonToastDanger(message);
					} else {
						return await presentZIonToastSuccess(message);
					}

				case notificationTypeEnum.sideNotification:
					if (slot === zNotificationSlotEnum.error) {
						return showErrorNotification(message);
					} else {
						return showSuccessNotification(message);
					}

				case notificationTypeEnum.alert:
					if (slot === zNotificationSlotEnum.success) {
						return await presentZIonSuccessAlert();
					} else if (slot === zNotificationSlotEnum.error) {
						return await presentZIonErrorAlert();
					}
					break;

				default:
					if (slot === zNotificationSlotEnum.error) {
						return await presentZIonToastDanger(message);
					} else {
						return await presentZIonToastSuccess(message);
					}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return { presentZNotification };
};

// Media Scale hook
export const useZMediaQueryScale = (): useZMediaQueryScaleReturnInterface => {
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});

	const is1300pxScale = useMediaQuery({
		query: `(min-width: 1300px)`,
	});

	const is1250pxScale = useMediaQuery({
		query: `(min-width: 1250px)`,
	});

	const is1200pxScale = useMediaQuery({
		query: `(min-width: 1200px)`,
	});

	const is1150pxScale = useMediaQuery({
		query: `(min-width: 1150px)`,
	});

	const is1100pxScale = useMediaQuery({
		query: `(min-width: 1100px)`,
	});

	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});

	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	const isSmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});

	const isXsScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XS})`,
	});

	return {
		isXlScale,
		isLgScale,
		isMdScale,
		isSmScale,
		isXsScale,
		is1300pxScale,
		is1200pxScale,
		is1250pxScale,
		is1150pxScale,
		is1100pxScale,
	};
};
