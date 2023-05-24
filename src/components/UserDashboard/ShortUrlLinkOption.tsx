// Core Imports
import React from 'react';

// Packages Import
import {} from '@ionic/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonIcon,
	ZIonGrid,
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States
import classes from './styles.module.css';
import { ZaionsShortUrlLinkOptionData } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortUrlLinkOption.recoil';
import {
	NewShortLinkFormState,
	NewShortLinkSelectTypeOption,
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';

// Types
import {
	ShortUrlLinkOptionType,
	ZaionsShortUrlOptionFieldsValuesInterface,
} from '@/types/AdminPanel/linksType';
import { useFormikContext } from 'formik';
import { reportCustomError } from '@/utils/customErrorType';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';

// Styles

const ShortUrlLinkOptions: React.FC = () => {
	const ShortUrlLinkOptionData = useRecoilValue<ShortUrlLinkOptionType[]>(
		ZaionsShortUrlLinkOptionData
	);
	const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);
	const newShortLinkTypeOptionData = useRecoilValue(
		NewShortLinkSelectTypeOption
	);

	const { setFieldValue } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const shortLinkTypeOptionChangeHandler = (
		_type: messengerPlatformsBlockEnum
	) => {
		try {
			if (_type === newShortLinkTypeOptionData?.type) {
				return;
			}
			setFieldValue('target', {}, false);
			setNewShortLinkFormState((oldVal) => ({
				...oldVal,
				type: _type,
				target: {
					url: null,
					accountId: null,
					message: null,
					email: null,
					subject: null,
					phoneNumber: null,
					username: null,
				},
			}));
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<>
			{/* <Dropdown>
				<Dropdown.Toggle
					id='dropdown-custom-components'
					className={`${classes.zaions__dropdown_toggle} text-primary flex ion-align-items-center`}
				>
					{newShortLinkTypeOptionData && (
						<>
							{newShortLinkTypeOptionData.icon.iconName && (
								<ZIonIcon
									icon={newShortLinkTypeOptionData.icon.iconName}
									size={'large'}
									color='primary'
								></ZIonIcon>
							)}
							<ZIonText
								className='ion-margin-start ion-margin-end ion-padding-end'
								color={'dark'}
							>
								<h6 className='font-bold ion-no-margin d-inline'>
									{newShortLinkTypeOptionData.text}
								</h6>
							</ZIonText>
						</>
					)}
					{!newShortLinkTypeOptionData && <>Invalid Option Type Selected.</>}
				</Dropdown.Toggle>
				<Dropdown.Menu className={`ms-auto ${classes.zaions_shorturl_options}`}>
					<ZIonGrid>
						<ZIonRow className='w-full'>
							{ShortUrlLinkOptionData.map((el) => {
								return (
									<ZIonCol size='5' key={el.id}>
										<ZIonText
											className={`flex gap-3 ion-align-items-center ion-margin-bottom ${classes.zaions_cursor__pointer}`}
											onClick={() => {
												shortLinkTypeOptionChangeHandler(el.type);
											}}
										>
											<h4 className='ion-no-margin'>
												<ZIonIcon icon={el.icon.iconName}></ZIonIcon>
											</h4>
											{el.text}
										</ZIonText>
									</ZIonCol>
								);
							})}
						</ZIonRow>
					</ZIonGrid>
				</Dropdown.Menu>
			</Dropdown> */}
		</>
	);
};

export default ShortUrlLinkOptions;
