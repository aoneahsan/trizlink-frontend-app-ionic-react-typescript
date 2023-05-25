/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	alertCircleOutline,
	cameraOutline,
	closeOutline,
	eyeOutline,
	syncOutline,
	toggleOutline,
} from 'ionicons/icons';
import { Formik } from 'formik';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonBadge,
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQCreateRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
	extractInnerData,
	getPlatformIcon,
	validateField,
	zStringify,
} from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormConnectPagesEnum,
	workspaceInterface,
} from '@/types/AdminPanel/workspace';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceEditPageModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	return (
		<ZIonContent>
			<Formik initialValues={{}} onSubmit={() => {}}>
				{({ values }) => {
					return (
						<ZIonGrid className='ion-no-padding'>
							<ZIonRow
								className='ion-padding pb-0 h-[200px] zaions-background-set'
								style={{
									background:
										'url(https://d2b57pa8jvjkcd.cloudfront.net/xGF9qraKHpDFhkqdC/JHg2CLhHKG-tom-idea.jpg)',
								}}
							>
								<ZIonCol size='12'>
									<div className='flex ion-align-items-center ion-justify-content-between'>
										<ZIonButton id='z-workspace-hide-profile'>
											<ZIonIcon icon={eyeOutline} className='w-7 h-7' />
										</ZIonButton>
										<ZRTooltip
											anchorSelect='#z-workspace-hide-profile'
											place='right'
											content='Hide profile in feed view'
										/>

										<ZIonButton id='z-workspace-change-cover-image'>
											<ZIonIcon icon={cameraOutline} className='w-7 h-7' />
										</ZIonButton>
										<ZRTooltip
											anchorSelect='#z-workspace-change-cover-image'
											place='left'
											content='Change cover image'
										/>
									</div>
								</ZIonCol>

								<ZIonCol className='flex ion-align-items-end ion-justify-content-between relative'>
									<ZUserAvatarButton className='w-[150px] h-[150px] absolute bottom-[-3rem] border-4 border-white border-solid' />

									<ZIonButton
										className='mb-8'
										id='z-workspace-fetch-new-profile-data'
									>
										<ZIonIcon icon={syncOutline} className='w-7 h-7' />
									</ZIonButton>
									<ZRTooltip
										anchorSelect='#z-workspace-fetch-new-profile-data'
										place='left'
										content='Fetch new profile data'
									/>
								</ZIonCol>
							</ZIonRow>

							<ZIonRow className='mt-4'>
								<ZIonCol size='9.2' className='ms-auto pe-4'>
									<ZIonInput
										value='zaions'
										className='text-lg'
										minHeight='40px'
									/>

									<div className='mt-3 flex ion-align-items-center'>
										<ZIonBadge>
											<ZIonIcon
												icon={getPlatformIcon(
													workspaceFormConnectPagesEnum.facebook
												)}
												className='me-1'
											/>

											<ZIonText>Page</ZIonText>
										</ZIonBadge>

										<ZIonText className='ms-2 text-sm' color='medium'>
											@Zaions
										</ZIonText>
									</div>
								</ZIonCol>
							</ZIonRow>

							<ZIonRow className='py-5 px-4 border-b'>
								<ZIonCol className='flex ion-align-items-center'>
									<ZIonText className='text-xl me-3'>Connection</ZIonText>
									<ZIonBadge
										className='flex ion-align-items-center zaions__warning_set border'
										style={{ borderColor: 'var(--ion-color-warning)' }}
									>
										<ZIonIcon
											icon={alertCircleOutline}
											className='me-2'
											color='warning'
										/>
										<ZIonText color='warning'>Mockup page</ZIonText>
									</ZIonBadge>
								</ZIonCol>

								<ZIonCol className='ion-text-end'>
									<ZIonButton fill='outline' color='dark' className=''>
										Connect
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>

							<ZIonRow className='pt-5 px-4 ion-align-items-center'>
								<ZIonCol>
									<ZIonText className='text-xl me-3 block'>
										Remove from workspace
									</ZIonText>

									<ZIonText className='text-sm me-3 mt-2 block' color='medium'>
										Remove this page from Planable and delete all the posts and
										comments.
									</ZIonText>
								</ZIonCol>

								<ZIonCol className='ion-text-end'>
									<ZIonButton fill='outline' color='danger' className=''>
										Remove
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonGrid>
					);
				}}
			</Formik>
		</ZIonContent>
	);
};

export default ZWorkspaceEditPageModal;
