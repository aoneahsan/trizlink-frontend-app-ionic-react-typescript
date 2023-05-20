/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Form, Formik, useFormikContext } from 'formik';
import {
	cameraOutline,
	checkmarkCircle,
	closeOutline,
	imageOutline,
	logoFacebook,
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
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
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { validateField, zJsonParse } from '@/utils/helpers';
import { ZaionsInfo } from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	contentStyleInterface,
	workspaceFormConnectPagesEnum,
} from '@/types/AdminPanel/workspace';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { VALIDATION_RULE } from '@/utils/enums';
import { url } from 'inspector';
import ZPlatformColorPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/PlatformColorPopover';
import ZPlatformIconsPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/PlatformIconsPopover';
import {
	ContentStyleData,
	PlatformColorsData,
	PlatformIconsData,
} from '@/data/UserDashboard/Workspace/MockUpPage/index.data';

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
		<>
			<ZIonHeader>
				<ZIonGrid className='w-full'>
					{/*  */}
					<ZIonRow className='ion-align-items-center'>
						{/*  */}
						<ZIonCol className='flex ion-align-items-center ms-3'>
							{/*  */}
							<div
								className='w-10 h-10 rounded flex ion-align-items-center ion-justify-content-center'
								style={{ backgroundColor: color }}
							>
								<ZIonIcon icon={logo} className='w-7 h-7' color='light' />
							</div>
							{/*  */}
							<div className='ms-2'>
								<ZIonText className='block font-bold'>
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

			{/*  */}
			<ZIonContent color='light'>
				<Formik
					initialValues={{
						coverImage: '',
						profilePhoto: '',
						pageName: '',
						username: '',
						location: '',
						subscribersCount: '',
						description: '',
						platformColor: PlatformColorsData[0].colorCode,
						platformIcon: PlatformIconsData.defaultIcons[0].icon,
						contentStyle: contentStyleInterface.default,
					}}
					validate={(values) => {
						const errors = {};

						// Validating PageName field.
						validateField('pageName', values, errors, VALIDATION_RULE.string);

						// returning error object.
						return errors;
					}}
					onSubmit={(values) => {
						console.log({
							log: 'from formik submit function',
							values,
						});
					}}
				>
					{({
						values,
						errors,
						touched,
						isValid,
						handleChange,
						handleBlur,
						setFieldValue,
					}) => {
						return (
							<>
								<Form>
									<ZIonCol>
										{/* Add Cover */}
										<ZIonRow
											className={classNames({
												'mx-3 mt-3 zaions__cursor_pointer': true,
												'h-[230px]':
													pageType === workspaceFormConnectPagesEnum.facebook ||
													pageType === workspaceFormConnectPagesEnum.pinterest,
												'h-[210px]':
													pageType === workspaceFormConnectPagesEnum.twitter,
												hidden:
													pageType ===
														workspaceFormConnectPagesEnum.instagram ||
													pageType === workspaceFormConnectPagesEnum.tiktok ||
													pageType ===
														workspaceFormConnectPagesEnum.universalContent,
												'h-[110px]':
													pageType === workspaceFormConnectPagesEnum.linkedin ||
													pageType ===
														workspaceFormConnectPagesEnum.googleBusiness ||
													pageType === workspaceFormConnectPagesEnum.youtube,
											})}
											style={{
												background:
													values.coverImage.trim().length &&
													`url(${values.coverImage})`,

												backgroundSize: 'cover',
												backgroundPosition: 'center',
												backgroundRepeat: 'no-repeat',
											}}
											onClick={() => {
												presentZFileUploadModal({
													_cssClass: 'file-upload-modal-size',
													_onWillDismiss: (
														ev: CustomEvent<OverlayEventDetail>
													) => {
														if (
															ev.detail.role === ZIonModalActionEnum.success
														) {
															// Getting file data from fileUploadModal and parse it.
															const fileData = zJsonParse(
																String(ev.detail.data)
															) as {
																fileUrl: string;
																filePath: string;
															};

															// setting the url in the formik state (setting coverImage).
															setFieldValue(
																'coverImage',
																fileData.fileUrl,
																false
															);
														}
													},
												});
											}}
										>
											<ZIonCol
												size='12'
												className={classNames({
													'border-dashed border-inherit hover:border-indigo-500 border-[1px] flex ion-align-items-center ion-justify-content-center flex-col py-4 h-full rounded ':
														true,
													zaions__dark_set: values.coverImage.trim().length,
												})}
											>
												<ZIonIcon
													icon={imageOutline}
													className={classNames({
														'w-7 h-7': true,
														zaions_ion_color_light:
															values.coverImage.trim().length,
													})}
												/>
												<ZIonText
													className={classNames({
														'text-base': true,
														zaions_ion_color_light:
															values.coverImage.trim().length,
													})}
												>
													Add Cover (Optional)
												</ZIonText>
											</ZIonCol>
										</ZIonRow>

										{/* Add Profile Picture */}
										<ZIonRow
											className={classNames({
												'mx-3 relative z-50 w-max zaions__cursor_pointer': true,

												'mt-[-6.5rem]':
													pageType === workspaceFormConnectPagesEnum.facebook ||
													pageType ===
														workspaceFormConnectPagesEnum.pinterest ||
													pageType === workspaceFormConnectPagesEnum.linkedin ||
													pageType ===
														workspaceFormConnectPagesEnum.googleBusiness ||
													pageType === workspaceFormConnectPagesEnum.youtube ||
													pageType === workspaceFormConnectPagesEnum.twitter,

												'mt-3':
													pageType ===
														workspaceFormConnectPagesEnum.instagram ||
													pageType === workspaceFormConnectPagesEnum.tiktok,
											})}
										>
											<ZIonCol
												size='12'
												onClick={() => {
													presentZFileUploadModal({
														_cssClass: 'file-upload-modal-size',
														_onWillDismiss: (
															ev: CustomEvent<OverlayEventDetail>
														) => {
															if (
																ev.detail.role === ZIonModalActionEnum.success
															) {
																// Getting file data from fileUploadModal and parse it.
																const fileData = zJsonParse(
																	String(ev.detail.data)
																) as {
																	fileUrl: string;
																	filePath: string;
																};

																// setting the url in the formik state (setting profilePhoto).
																setFieldValue(
																	'profilePhoto',
																	fileData.fileUrl,
																	false
																);
															}
														},
													});
												}}
											>
												<div
													className={classNames({
														'border-dashed border-inherit hover:border-indigo-500 border-[1px] w-[96px] h-[96px] rounded-full flex ion-text-center flex-col ion-align-items-center ion-justify-content-center':
															true,
														zaions__dark_set:
															values.coverImage.trim().length ||
															values.profilePhoto.trim().length,
													})}
													style={{
														backgroundSize: 'cover',
														backgroundPosition: 'center',
														backgroundRepeat: 'no-repeat',
														background:
															values.profilePhoto.trim().length &&
															`url(${values.profilePhoto})`,
													}}
												>
													<ZIonIcon
														icon={cameraOutline}
														className={classNames({
															'w-7 h-7': true,
															'zaions_ion_color_light hidden hover:inline-block':
																values.coverImage.trim().length ||
																values.profilePhoto.trim().length,
														})}
													/>
													<ZIonLabel
														className={classNames({
															zaions__fs_13: true,
															'zaions_ion_color_light hidden hover:block':
																values.coverImage.trim().length ||
																values.profilePhoto.trim().length,
														})}
													>
														Add Profile Picture
													</ZIonLabel>
												</div>
											</ZIonCol>
										</ZIonRow>

										{/***  Add Page Info ***/}
										<ZIonRow className='mx-3 mt-3'>
											{/* pageName */}
											<ZIonCol>
												<ZIonInput
													name='pageName'
													errorText={errors.pageName}
													label='Page name*'
													labelPlacement='floating'
													placeholder={`${ZaionsInfo.name}`}
													onIonChange={handleChange}
													onIonBlur={handleBlur}
													value={values.pageName}
													className={classNames({
														'ion-touched ion-invalid':
															touched.pageName && errors.pageName,
														'ion-touched ion-valid':
															touched.pageName && !errors.pageName,
													})}
												/>
											</ZIonCol>

											{/* username/location/subscriberCount */}
											<ZIonCol
												className={classNames({
													hidden:
														pageType ===
														workspaceFormConnectPagesEnum.universalContent,
												})}
											>
												<ZIonInput
													name={
														pageType ===
														workspaceFormConnectPagesEnum.googleBusiness
															? 'location'
															: pageType ===
															  workspaceFormConnectPagesEnum.youtube
															? 'subscribersCount'
															: 'username'
													}
													label={
														pageType ===
														workspaceFormConnectPagesEnum.googleBusiness
															? 'Location (optional)'
															: pageType ===
															  workspaceFormConnectPagesEnum.youtube
															? 'Subscribers count (optional)'
															: 'Username (optional)'
													}
													labelPlacement='floating'
													placeholder={
														pageType ===
														workspaceFormConnectPagesEnum.googleBusiness
															? 'Your Location'
															: pageType ===
															  workspaceFormConnectPagesEnum.youtube
															? ''
															: `@${ZaionsInfo.name}`
													}
													type={
														pageType === workspaceFormConnectPagesEnum.youtube
															? 'number'
															: 'text'
													}
													onIonChange={handleChange}
													onIonBlur={handleBlur}
													value={
														pageType ===
														workspaceFormConnectPagesEnum.googleBusiness
															? values.location
															: pageType ===
															  workspaceFormConnectPagesEnum.youtube
															? values.subscribersCount
															: values.username
													}
												/>
											</ZIonCol>

											{/* description */}
											{(pageType === workspaceFormConnectPagesEnum.instagram ||
												pageType ===
													workspaceFormConnectPagesEnum.linkedin) && (
												<ZIonCol size='12' className='mt-3'>
													<ZIonTextarea
														name='description'
														label={
															pageType ===
															workspaceFormConnectPagesEnum.instagram
																? 'Page bio (Optional)'
																: pageType ===
																  workspaceFormConnectPagesEnum.linkedin
																? 'Page description (optional)'
																: ''
														}
														// label='Page bio (optional)'
														labelPlacement='floating'
														placeholder='General info, links, and other things related to this page.'
														fill='outline'
														onIonChange={handleChange}
														onIonBlur={handleBlur}
														value={values.description}
													/>
												</ZIonCol>
											)}
										</ZIonRow>

										{/* Platform color & icon selector */}
										{pageType ===
											workspaceFormConnectPagesEnum.universalContent && (
											<>
												<PlatformColorAndIcon />

												<ContentStyle />
											</>
										)}

										{/* Create button */}
										<ZIonRow className='mx-3'>
											<ZIonCol size='3' className='ion-text-end ms-auto'>
												<ZIonButton
													className='text-transform-initial'
													expand='block'
													type='submit'
													disabled={!isValid}
												>
													Create
												</ZIonButton>
											</ZIonCol>
										</ZIonRow>
									</ZIonCol>
								</Form>
							</>
						);
					}}
				</Formik>
			</ZIonContent>
		</>
	);
};

// Platform Color & Icon
const PlatformColorAndIcon: React.FC = () => {
	const { values, setFieldValue } = useFormikContext<{
		platformColor: string;
		platformIcon: string;
	}>();
	//
	const { presentZIonPopover: presentZPlatformColorPopover } = useZIonPopover(
		ZPlatformColorPopover,
		{
			_colorCode: values.platformColor,
		}
	);

	//
	const { presentZIonPopover: presentZPlatformIconsPopover } = useZIonPopover(
		ZPlatformIconsPopover,
		{
			_colorCode: values.platformColor,
			_icon: values.platformIcon,
		}
	);

	return (
		<ZIonRow className='mx-3 mt-3'>
			<ZIonCol>
				<ZIonButton
					className='ion-no-margin text-transform-initial'
					fill='clear'
					color='dark'
					onClick={(event: unknown) => {
						presentZPlatformColorPopover({
							_event: event as Event,
							_cssClass: '',
							_dismissOnSelect: false,
							_onWillDismiss: ({ detail }) => {
								detail.data !== undefined &&
									setFieldValue('platformColor', detail.data, false);
							},
						});
					}}
				>
					<div
						className='w-8 h-8 rounded zaions_secondary_color'
						style={{ backgroundColor: values.platformColor }}
					></div>
					<ZIonText className='ms-3'>Platform color</ZIonText>
				</ZIonButton>
			</ZIonCol>

			{/*  */}
			<ZIonCol>
				<ZIonButton
					className='ion-no-margin text-transform-initial'
					fill='clear'
					color='dark'
					onClick={(event: unknown) => {
						presentZPlatformIconsPopover({
							_event: event as Event,
							_cssClass: '',
							_dismissOnSelect: false,
							_onWillDismiss: ({ detail }) => {
								detail.data !== undefined &&
									setFieldValue('platformIcon', detail.data, false);
							},
						});
					}}
				>
					<ZIonIcon
						className='w-8 h-8'
						icon={values.platformIcon}
						style={{ color: values.platformColor }}
					/>
					<ZIonText className='ms-3 mt-1'>Platform icon</ZIonText>
				</ZIonButton>
			</ZIonCol>
		</ZIonRow>
	);
};

// Content Style
const ContentStyle: React.FC = () => {
	const { values, setFieldValue } = useFormikContext<{
		contentStyle: contentStyleInterface;
	}>();

	return (
		<ZIonRow className='mx-3 mt-3 ion-align-items-center ion-justify-content-between mb-3'>
			<ZIonCol size='12' className='mb-2'>
				<ZIonText>Content style</ZIonText>
			</ZIonCol>
			{ContentStyleData.map((el, index) => (
				<ZIonCol
					size='2'
					className={classNames({
						'pb-4 rounded border zaions__cursor_pointer': true,
						zaions__bg_white: el.contentStyleType === values.contentStyle,
					})}
					key={index}
					onClick={() =>
						setFieldValue('contentStyle', el.contentStyleType, false)
					}
				>
					{
						<ZIonIcon
							icon={checkmarkCircle}
							color='primary'
							className={classNames({
								'w-6 h-6 ms-auto flex': true,
								'opacity-0': el.contentStyleType !== values.contentStyle,
								'opacity-100': el.contentStyleType === values.contentStyle,
							})}
						/>
					}
					<div className='flex ion-align-items-center ion-justify-content-center flex-col'>
						<ZIonText
							className={classNames(el.titleFontFamily, {
								'text-lg': true,
							})}
						>
							Ab
						</ZIonText>
						<ZIonText
							className={classNames(el.textFontFamily, {
								'text-[14px]': true,
							})}
						>
							default
						</ZIonText>
					</div>
				</ZIonCol>
			))}
		</ZIonRow>
	);
};

export default ZWorkspaceMockupPageModal;
