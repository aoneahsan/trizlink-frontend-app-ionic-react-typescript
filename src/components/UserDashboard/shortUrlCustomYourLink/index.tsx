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
import { useFormikContext } from 'formik';
import { useRecoilValue } from 'recoil';
import { documentTextOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonCol,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonRouterLink,
	ZIonRow,
	ZIonSkeletonText,
	ZIonText,
	ZIonTextarea,
} from '@/components/ZIonComponents';
import ZaionsFileUploadModal from '@/components/InPageComponents/ZaionsModals/FileUploadModal';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import { zJsonParse } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { uploadImageBg, upload_send } from '@/assets/images';
import CONSTANTS from '@/utils/constants';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZaionsCustomYourLink: React.FC<{ showSkeleton?: boolean }> = ({
	showSkeleton = false,
}) => {
	const zaionsAppSettings = useRecoilValue(ZaionsAppSettingsRState);
	const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const { presentZIonModal: presentZFileUploadModal } = useZIonModal(
		ZaionsFileUploadModal
	);

	if (showSkeleton) {
		return <ZaionsCustomYourLinkSkeleton />;
	}

	return (
		<ZIonCol
			sizeXl='5.8'
			sizeLg='5.8'
			sizeMd='12'
			sizeSm='12'
			sizeXs='12'
			className='py-1 rounded zaions__bg_white'
		>
			{/* Row */}
			<ZIonRow className='border-bottom'>
				{/* Col-1 */}
				<ZIonCol className='flex px-2 py-2 ion-align-items-center'>
					{/* Icon */}
					<ZIonIcon icon={documentTextOutline} size='large' />

					{/* Text */}
					<ZIonText className='mt-1 font-bold ion-no-margin ms-2'>
						Custom your link
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>

			{/* Row-2 */}
			<ZIonRow className='mx-3 my-3'>
				{/* Col-1 Image */}
				<ZIonCol
					size='12'
					className={classNames(classes['zaions-upload-image-box'], {
						'flex ion-justify-content-center ion-align-items-center rounded relative cursor-pointer':
							true,
					})}
					testingSelector={
						CONSTANTS.testingSelectors.shortLink.formPage.customYourLink
							.imageCol
					}
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
									setFieldValue('featureImg', fileData.fileUrl, false);
								}
							},
						});
					}}
					style={{
						background: `url(${
							values.featureImg.trim() ? values.featureImg : uploadImageBg
						})`,
					}}
				>
					<div
						className={classNames(classes['zaions-upload-image-inner-box'], {
							'ion-text-center py-5 rounded absolute': true,
						})}
					>
						<ZIonText className='ion-no-margin'>
							<ZIonImg
								src={upload_send}
								alt='send icon'
								className='mx-auto'
								style={{ width: '10rem' }}
								testingSelector={
									CONSTANTS.testingSelectors.shortLink.formPage.customYourLink
										.image
								}
							/>
						</ZIonText>
						<ZIonText color='light'>
							<h4 className='font-bold'>Upload a new picture</h4>
						</ZIonText>
						<ZIonText color='light'>
							<h5 className='font-bold'>
								(
								{
									zaionsAppSettings.shortLinkSettings.previewImage.dimension
										.width
								}
								x
								{
									zaionsAppSettings.shortLinkSettings.previewImage.dimension
										.height
								}
								)
							</h5>
						</ZIonText>
					</div>
				</ZIonCol>

				{/* Col-2 Title & content input */}
				<ZIonCol size='12' className='pt-5'>
					{/* Link Title */}
					<ZIonInput
						name='title'
						label='Title of you link*'
						labelPlacement='stacked'
						minHeight='40px'
						placeholder='Title of you link*'
						onIonChange={handleChange}
						onIonBlur={handleBlur}
						value={values.title}
						errorText={touched.title ? errors.title : undefined}
						testingSelector={
							CONSTANTS.testingSelectors.shortLink.formPage.customYourLink
								.titleInput
						}
						className={classNames({
							'w-full': true,
							'ion-touched': touched.title,
							'ion-invalid': touched.title && errors.title,
							'ion-valid': touched.title && !errors.title,
						})}
					/>

					{/* Link Description */}
					<ZIonTextarea
						placeholder='Type something here'
						autoGrow={true}
						fill='outline'
						className='mt-5 rounded'
						name='linkDescription'
						onIonChange={handleChange}
						onIonBlur={handleBlur}
						rows={3}
						value={values.linkDescription}
						testingSelector={
							CONSTANTS.testingSelectors.shortLink.formPage.customYourLink
								.descriptionTextarea
						}
					/>
				</ZIonCol>
			</ZIonRow>
		</ZIonCol>
	);
};

const ZaionsCustomYourLinkSkeleton: React.FC = React.memo(() => {
	return (
		<ZIonCol
			sizeXl='5.8'
			sizeLg='5.8'
			sizeMd='12'
			sizeSm='12'
			sizeXs='12'
			className='py-1 rounded h-max zaions__bg_white'
		>
			{/* Row */}
			<ZIonRow className='border-bottom'>
				{/* Col-1 */}
				<ZIonCol className='flex px-2 py-2 ion-align-items-center'>
					{/* Icon */}
					<ZIonIcon icon={documentTextOutline} size='large'></ZIonIcon>

					{/* Text */}
					<ZIonText className='mt-1 font-bold ion-no-margin ms-2'>
						Custom your link
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>

			{/* Row-2 */}
			<ZIonRow className='mx-3 my-3'>
				{/* Col-1 Image */}
				<ZIonCol
					size='12'
					className={classNames(classes['zaions-upload-image-box'], {
						'flex ion-justify-content-center ion-align-items-center rounded relative cursor-pointer':
							true,
					})}
				>
					<ZIonSkeletonText animated={true} width='100%' height='100%' />
				</ZIonCol>

				{/* Col-2 Title & content input */}
				<ZIonCol size='12' className='pt-5'>
					{/* Link Title */}
					<ZIonSkeletonText animated={true} width='100%' height='40px' />

					{/* Link Description */}
					<ZIonText className='block mt-3'>
						<ZIonSkeletonText animated={true} width='100%' height='85px' />
					</ZIonText>
				</ZIonCol>
			</ZIonRow>
		</ZIonCol>
	);
});

export default ZaionsCustomYourLink;
