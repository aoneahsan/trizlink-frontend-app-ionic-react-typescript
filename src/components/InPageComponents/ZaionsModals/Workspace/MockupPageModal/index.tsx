/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import { cameraOutline, closeOutline, imageOutline } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonInput,
	ZIonLabel,
	ZIonRow,
	ZIonText,
	ZIonTextarea,
} from '@/components/ZIonComponents';
import ZaionsFileUploadModal from '@/components/InPageComponents/ZaionsModals/FileUploadModal';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { zJsonParse } from '@/utils/helpers';
import { ZaionsInfo } from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceFormConnectPagesEnum } from '@/types/AdminPanel/workspace';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

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

const ZWorkspaceMockupPageModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
	pageType: workspaceFormConnectPagesEnum;
	color: string;
	logo: string;
}> = ({ dismissZIonModal, pageType, color, logo }) => {
	// File upload modal
	const { presentZIonModal: presentZFileUploadModal } = useZIonModal(
		ZaionsFileUploadModal
	);

	return (
		<Formik
			initialValues={{}}
			validate={() => {
				const errors = {};

				return errors;
			}}
			onSubmit={() => {}}
		>
			{() => {
				return (
					<>
						<ZIonHeader>
							<ZIonGrid className='w-100'>
								{/*  */}
								<ZIonRow className='ion-align-items-center'>
									{/*  */}
									<ZIonCol className='d-flex ion-align-items-center ms-3'>
										{/*  */}
										<div
											className='w-10 h-10 rounded d-flex ion-align-items-center ion-justify-content-center'
											style={{ backgroundColor: color }}
										>
											<ZIonIcon icon={logo} className='w-7 h-7' color='light' />
										</div>
										{/*  */}
										<div className='ms-2'>
											<ZIonText className='d-block fw-bold'>
												Create a mockup page
											</ZIonText>
										</div>
									</ZIonCol>

									{/*  */}
									<ZIonCol className='ion-text-end'>
										<ZIonButton
											fill='clear'
											onClick={() => {
												dismissZIonModal();
											}}
										>
											<ZIonIcon
												icon={closeOutline}
												className='w-6 h-6'
												color='dark'
											/>
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonHeader>

						<ZIonCol>
							{/* Add Cover */}
							<ZIonRow
								className={classNames({
									'mx-3 mt-3': true,
									'h-[230px]':
										pageType === workspaceFormConnectPagesEnum.facebook ||
										pageType === workspaceFormConnectPagesEnum.pinterest,
									'h-[210px]':
										pageType === workspaceFormConnectPagesEnum.twitter,
									'd-none':
										pageType === workspaceFormConnectPagesEnum.instagram ||
										pageType === workspaceFormConnectPagesEnum.tiktok,
									'h-[110px]':
										pageType === workspaceFormConnectPagesEnum.linkedin ||
										pageType === workspaceFormConnectPagesEnum.googleBusiness ||
										pageType === workspaceFormConnectPagesEnum.youtube,
								})}
								onClick={() => {
									presentZFileUploadModal({
										_cssClass: 'file-upload-modal-size',
										_onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
											if (ev.detail.role === ZIonModalActionEnum.success) {
												// Getting file data from fileUploadModal and parse it.
												const fileData = zJsonParse(String(ev.detail.data)) as {
													fileUrl: string;
													filePath: string;
												};

												// setting the url in the formik state.
												// setFieldValue('featureImg', fileData.fileUrl, false);
											}
										},
									});
								}}
							>
								<ZIonCol
									size='12'
									className='border-dashed border-inherit hover:border-indigo-500 border-[1px] flex ion-align-items-center ion-justify-content-center flex-column py-4 h-100 rounded'
								>
									<ZIonIcon icon={imageOutline} className='w-7 h-7' />
									<ZIonText className='fs-6'>Add Cover (Optional)</ZIonText>
								</ZIonCol>
							</ZIonRow>

							{/* Add Profile Picture */}
							<ZIonRow
								className={classNames({
									'mx-3 position-relative z-50 w-max': true,

									'mt-[-6.5rem]':
										pageType === workspaceFormConnectPagesEnum.facebook ||
										pageType === workspaceFormConnectPagesEnum.pinterest ||
										pageType === workspaceFormConnectPagesEnum.linkedin ||
										pageType === workspaceFormConnectPagesEnum.googleBusiness ||
										pageType === workspaceFormConnectPagesEnum.youtube ||
										pageType === workspaceFormConnectPagesEnum.twitter,

									'mt-3':
										pageType === workspaceFormConnectPagesEnum.instagram ||
										pageType === workspaceFormConnectPagesEnum.tiktok,
								})}
							>
								<ZIonCol size='12'>
									<div className='border-dashed border-inherit hover:border-indigo-500 border-[1px] w-[96px] h-[96px] rounded-circle flex ion-text-center flex-column ion-align-items-center ion-justify-content-center'>
										<ZIonIcon icon={cameraOutline} className='w-7 h-7' />
										<ZIonLabel className='zaions__fs_13'>
											Add Profile Picture
										</ZIonLabel>
									</div>
								</ZIonCol>
							</ZIonRow>

							{/* Add Page Info */}
							<ZIonRow className='mx-3 mt-3'>
								<ZIonCol>
									<ZIonInput
										name='pageName'
										label='Page name*'
										labelPlacement='floating'
										placeholder={`${ZaionsInfo.name}`}
										// onIonChange={handleChange}
										// onIonBlur={handleBlur}
										// value={values.vcard?.firstName}
									/>
								</ZIonCol>
								<ZIonCol>
									<ZIonInput
										name='userName'
										// label='Username (optional)'
										label={
											pageType === workspaceFormConnectPagesEnum.googleBusiness
												? 'Location (optional)'
												: pageType === workspaceFormConnectPagesEnum.youtube
												? 'Subscribers count (optional)'
												: 'Username (optional)'
										}
										labelPlacement='floating'
										placeholder={
											pageType === workspaceFormConnectPagesEnum.googleBusiness
												? 'Your Location'
												: pageType === workspaceFormConnectPagesEnum.youtube
												? ''
												: `@${ZaionsInfo.name}`
										}
										// placeholder={`@${ZaionsInfo.name}`}
										type={
											pageType === workspaceFormConnectPagesEnum.youtube
												? 'number'
												: 'text'
										}
										// onIonChange={handleChange}
										// onIonBlur={handleBlur}
										// value={values.vcard?.firstName}
									/>
								</ZIonCol>

								{(pageType === workspaceFormConnectPagesEnum.instagram ||
									pageType === workspaceFormConnectPagesEnum.linkedin) && (
									<ZIonCol size='12' className='mt-3'>
										<ZIonTextarea
											name='description'
											label={
												pageType === workspaceFormConnectPagesEnum.instagram
													? 'Page bio (Optional)'
													: pageType === workspaceFormConnectPagesEnum.linkedin
													? 'Page description (optional)'
													: ''
											}
											// label='Page bio (optional)'
											labelPlacement='floating'
											placeholder='General info, links, and other things related to this page.'
											fill='outline'
											// onIonChange={handleChange}
											// onIonBlur={handleBlur}
											// value={values.vcard?.firstName}
										/>
									</ZIonCol>
								)}
							</ZIonRow>

							<ZIonRow className='mx-3'>
								<ZIonCol size='3' className='ion-text-end ms-auto'>
									<ZIonButton className='text-transform-initial' expand='block'>
										Create
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonCol>
					</>
				);
			}}
		</Formik>
	);
};

export default ZWorkspaceMockupPageModal;
