/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { Formik } from 'formik';
import { useSetRecoilState } from 'recoil';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

import {
	ZIonButton,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { NewShortLinkFormState } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import { replaceParams, validateField } from '@/utils/helpers';
import { VALIDATION_RULE } from '@/utils/enums';
import { IonNote } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import {
	FormMode,
	messengerPlatformsBlockEnum,
} from '@/types/AdminPanel/index.type';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';
import { useParams } from 'react-router';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type Imports go down
 * ? Like if you have a type for props it should be place Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */
const ZaionsCreateShortLinkUrlInput: React.FC<{ className?: string }> = ({
	className,
}) => {
	// getting current workspace id form params.
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

	const { zNavigatePushRoute } = useZNavigate();

	return (
		<Formik
			initialValues={{
				domain: '',
			}}
			validate={(values) => {
				const errors: { domain?: string } = {};

				validateField('domain', values, errors, VALIDATION_RULE.url);

				return errors;
			}}
			onSubmit={(values, { resetForm }) => {
				try {
					if (values.domain) {
						setNewShortLinkFormState((_) => ({
							folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
							shortUrl: {
								domain: CONSTANTS.DEFAULT_VALUES.DEFAULT_CUSTOM_DOMAIN,
							},
							target: { url: values.domain },
							type: messengerPlatformsBlockEnum.link,
							pixelIds: [],
							tags: [],
							formMode: FormMode.ADD,
						}));

						resetForm();
					}
				} catch (error) {
					reportCustomError(error);
				}
			}}
		>
			{({ submitForm, handleChange, handleBlur, errors, values, touched }) => {
				return (
					<>
						<ZIonItem
							className={classNames(className, {
								'ion-item-start-no-padding': true,
								'ion-invalid': touched.domain && errors.domain,
								'ion-valid': touched.domain && !errors.domain,
							})}
							style={{ '--inner-padding-end': '0px' }}
							lines='none'
						>
							<ZIonInputField
								inputFieldProps={{
									className: classNames({
										'rounded-none': true,
										'ion-touched ion-invalid': touched.domain && errors.domain,
										'ion-touched ion-valid': touched.domain && !errors.domain,
									}),
									label: '',
									name: 'domain',
									type: 'email',
									onIonChange: handleChange,
									onIonBlur: handleBlur,
									value: values.domain,
									fill: 'outline',
									placeholder: 'https://yourlink.com',
									style: {
										'--background': '#fff',
										'--padding-start': '11px',
										'--border-radius': '0',
									},
								}}
							/>

							<ZIonButton
								onClick={() => void submitForm()}
								className='ion-no-margin ion-text-capitalize'
								slot='end'
								style={{
									height: '100%',
									'--border-radius': '0',
								}}
							>
								<ZIonIcon icon={searchOutline} className='me-1' />{' '}
								<ZIonText className='pt-1 me-1'>Switch it</ZIonText>
							</ZIonButton>
						</ZIonItem>
						{errors.domain && touched.domain && (
							<div className='ps-1 zaions__fs_14'>
								<IonNote color='danger'>{errors.domain}</IonNote>
							</div>
						)}
					</>
				);
			}}
		</Formik>
	);
};

export default ZaionsCreateShortLinkUrlInput;
