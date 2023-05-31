// Core Imports
import React, { useEffect } from 'react';

// Packages Import
import { apertureOutline } from 'ionicons/icons';
import { useRecoilState } from 'recoil';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonImg,
} from '@/components/ZIonComponents';
import { ZIonButton } from '@/components/ZIonComponents';

// Global Constants
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS, { Platforms } from '@/utils/constants';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import { formatReactSelectOptionsArray } from '@/utils/helpers';

// Images

// Recoil States
import { PixelAccountsRState } from '@/ZaionsStore/UserDashboard/PixelAccountsState/index.recoil';

// Types
import {
	PixelAccountType,
	PixelPlatformsEnum,
	ZaionsShortUrlOptionFieldsValuesInterface,
} from '@/types/AdminPanel/linksType';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { useFormikContext } from 'formik';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsAddPixelAccount from '@/components/InPageComponents/ZaionsModals/AddPixelsAccount';

// Styles

const selectOptionComponent = (_el: PixelAccountType) => {
	return (
		<div className='flex ion-align-items-center' key={_el.id}>
			<ZIonImg
				src={Platforms[_el.platform as PixelPlatformsEnum]}
				style={{ width: '30px' }}
				className='pe-3'
			/>{' '}
			{_el.title}
		</div>
	);
};

const LinkPixelsAccount: React.FC = () => {
	const [pixelAccountsState, setPixelAccountsState] =
		useRecoilState(PixelAccountsRState);

	const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
		ZaionsAddPixelAccount
	);

	const {
		values: { linkPixelsAccount },
		setFieldValue,
	} = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();
	const { data: pixelAccountsData } = useZRQGetRequest<PixelAccountType[]>({
		_url: API_URL_ENUM.userPixelAccounts_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PIXEL_ACCOUNT.MAIN],
	});

	useEffect(() => {
		if (pixelAccountsData) {
			setPixelAccountsState(pixelAccountsData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pixelAccountsData]);

	return (
		<>
			<ZIonRow className='border-bottom zaions__bg_white'>
				<ZIonCol className='flex px-2 py-2 ion-align-items-center'>
					<ZIonIcon icon={apertureOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Add Pixels ID{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>
			<ZIonRow className='zaions__bg_white'>
				<ZIonCol>
					<ZaionsRSelect
						className='pb-0 mx-2 ion-padding'
						isMulti
						options={
							pixelAccountsState
								? pixelAccountsState.map((el) => {
										return { value: el.id, label: selectOptionComponent(el) };
								  })
								: []
						}
						name='linkPixelsAccount'
						onChange={(_values) => {
							setFieldValue(
								'linkPixelsAccount',
								_values.map((el) => el.value) as string[],
								false
							);
						}}
						value={
							formatReactSelectOptionsArray(
								linkPixelsAccount,
								pixelAccountsData as ZGenericObject[],
								'id',
								'title'
							) || []
						}
					/>
					<ZIonButton
						fill='clear'
						className='ion-text-capitalize ion-no-margin ion-margin-start'
						size='small'
						onClick={() => {
							presentZAddPixelAccount({
								_cssClass: 'pixel-account-modal-size',
							});
						}}
					>
						Add a new pixel
					</ZIonButton>
				</ZIonCol>
			</ZIonRow>
		</>
	);
};

export default React.memo(LinkPixelsAccount);
