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
	ZIonSkeletonText,
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
import {
	NewShortLinkFormState,
	NewShortLinkSelectTypeOption,
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
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
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';

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
const ZaionsCreateShortLinkUrlInput: React.FC<{
	className?: string;
	showSkeleton?: boolean;
}> = ({ className, showSkeleton = false }) => {
	// getting current workspace id form params.
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

	const setNewShortLinkTypeOptionDataAtom = useSetRecoilState(
		NewShortLinkSelectTypeOption
	);

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

						const selectedTypeOptionData = LinkTypeOptionsData.find(
							(el) => el.type === messengerPlatformsBlockEnum.link
						);

						if (selectedTypeOptionData) {
							setNewShortLinkTypeOptionDataAtom((_) => ({
								...selectedTypeOptionData,
							}));
						}

						zNavigatePushRoute(
							replaceParams(
								ZaionsRoutes.AdminPanel.ShortLinks.Create,
								CONSTANTS.RouteParams.workspace.workspaceId,
								workspaceId
							)
						);
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
						{!showSkeleton && (
							<ZIonItem
								className={classNames(className, {
									'ion-item-start-no-padding': true,
									'ion-invalid': touched.domain && errors.domain,
									'ion-valid': touched.domain && !errors.domain,
								})}
								style={{ '--inner-padding-end': '0px' }}
								lines='none'
								minHeight='40px'
							>
								<ZIonInput
									className={classNames({
										'rounded-none': true,
										'ion-touched ion-invalid': touched.domain && errors.domain,
										'ion-touched ion-valid': touched.domain && !errors.domain,
									})}
									label=''
									name='domain'
									type='email'
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values.domain}
									fill='outline'
									placeholder='https://yourlink.com'
									style={{
										'--background': '#fff',
										'--padding-start': '3px',
										'--border-radius': '0',
									}}
									minHeight='40px'
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
						)}
						{!showSkeleton && errors.domain && touched.domain && (
							<div className='ps-1 zaions__fs_14'>
								<IonNote color='danger'>{errors.domain}</IonNote>
							</div>
						)}

						{/* Skeleton */}
						{showSkeleton && <ZaionsCreateShortLinkUrlInputSkeleton />}
					</>
				);
			}}
		</Formik>
	);
};

export const ZaionsCreateShortLinkUrlInputSkeleton: React.FC = React.memo(
	() => {
		return (
			<ZIonItem
				className='ion-item-start-no-padding'
				style={{ '--inner-padding-end': '0px' }}
				lines='none'
				minHeight='40px'
			>
				{/* <ZIonInput className='rounded-none' minHeight='40px' /> */}
				<ZIonSkeletonText width='100%' height='40px' animated={true} />

				<ZIonButton
					className='ion-no-margin shadow-none'
					slot='end'
					style={{
						height: '40px',
						'--border-radius': '0',
						'--box-shadow': 'none',
					}}
				>
					<ZIonSkeletonText width='75px' height='20px' animated={true} />
				</ZIonButton>
			</ZIonItem>
		);
	}
);

export default ZaionsCreateShortLinkUrlInput;
