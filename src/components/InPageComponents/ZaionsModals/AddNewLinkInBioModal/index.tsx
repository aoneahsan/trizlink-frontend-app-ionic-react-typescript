// Core Imports
import React from 'react';

// Packages Import
import { closeOutline, toggleOutline } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonButton,
	ZIonContent,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonText,
} from '@/components/ZIonComponents';
import { Formik } from 'formik';
import {
	useZGetRQCacheData,
	useZRQCreateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Global Constants
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import {
	createRedirectRoute,
	extractInnerData,
	validateField,
	zStringify,
} from '@/utils/helpers';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images

// Recoil States
import { ZaionsLinkInBioDefaultData } from '@/data/UserDashboard/LinkInBio/index.data';

// Types
import { LinkInBioType } from '@/types/AdminPanel/linkInBioType';
import {
	ZLinkInBioPageEnum,
	ZLinkInBioRHSComponentEnum,
} from '@/types/AdminPanel/linkInBioType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { folderState } from '@/types/AdminPanel/index.type';
import { ProductFavicon } from '@/assets/images';

// Styles

/**
 *
 * link-in-bio add new link-in-bio modal. the user will pass the title and click create link-in-bio of that title will be created and after that it will redirect to editing page of the link-in-bio.
 * @returns
 */
const ZaionsAddLinkInBioModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
	zNavigatePushRoute?: (_url: string) => void;
	workspaceId: string;
}> = ({ dismissZIonModal, zNavigatePushRoute, workspaceId }) => {
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();

	// Create new link-in-bio API.
	const { mutateAsync: createLinkInBioMutate } =
		useZRQCreateRequest<LinkInBioType>({
			_url: API_URL_ENUM.linkInBio_create_list,
			_queriesKeysToInvalidate: [],
			_itemsIds: [workspaceId],
			_urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
		});

	const FormikSubmitHandler = async (data: string) => {
		try {
			if (data) {
				const _response = await createLinkInBioMutate(data);

				if (_response) {
					const _data = extractInnerData<LinkInBioType>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_data && _data.id) {
						const _oldLinkInBios =
							extractInnerData<LinkInBioType[]>(
								getRQCDataHandler<LinkInBioType[]>({
									key: [
										CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
										workspaceId,
									],
								}) as LinkInBioType[],
								extractInnerDataOptionsEnum.createRequestResponseItems
							) || [];

						// added LinkInBio to all LinkInBios data in cache.
						const _updatedLinkInBios = [..._oldLinkInBios, _data];

						// Updating all shortLinks data in RQ cache.
						await updateRQCDataHandler<LinkInBioType[] | undefined>({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
								workspaceId,
							],
							data: _updatedLinkInBios as LinkInBioType[],
							id: '',
							extractType: ZRQGetRequestExtractEnum.extractItems,
							updateHoleData: true,
						});

						// after dismissing redirecting to edit link-in-bio-page
						zNavigatePushRoute &&
							zNavigatePushRoute(
								createRedirectRoute({
									url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
									params: [
										CONSTANTS.RouteParams.workspace.workspaceId,
										CONSTANTS.RouteParams.linkInBio.linkInBioId,
									],
									values: [workspaceId, _data.id],
									routeSearchParams: {
										page: ZLinkInBioPageEnum.design,
										step: ZLinkInBioRHSComponentEnum.theme,
									},
								})
							);

						// After api and recoil storing dismissing modal
						dismissZIonModal();
					}
				}
			}
		} catch (error) {}
	};

	return (
		<ZIonContent className='ion-padding'>
			{/* Close modal button */}
			<div className='ion-text-end'>
				<ZIonIcon
					icon={closeOutline}
					className='cursor-pointer w-7 h-7'
					testingselector={
						CONSTANTS.testingSelectors.linkInBio.formModal.closeBtn
					}
					onClick={() => {
						dismissZIonModal();
					}}
				/>
			</div>

			{/*  */}
			<div className='flex flex-col ion-text-center ion-justify-content-center'>
				{/* <div className='flex mx-auto mb-2 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter zaions__primary_bg'>
					<ZIonIcon
						icon={toggleOutline}
						className='w-8 h-8 mx-auto'
						color='light'
					/>
				</div> */}

				<div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
					<ZIonImg src={ProductFavicon} className='w-10 h-10 mx-auto' />
				</div>

				<ZIonText color='dark' className='text-xl font-bold mt-3'>
					Create a new Link-in-bio
				</ZIonText>

				<Formik
					initialValues={{
						linkInBioTitle: '',
					}}
					validate={(values) => {
						const errors = {};
						validateField('linkInBioTitle', values, errors);
						return errors;
					}}
					onSubmit={async (values) => {
						try {
							if (values && values.linkInBioTitle) {
								// Making an api call creating new link in bio
								const zStringifyData = zStringify({
									linkInBioTitle: values.linkInBioTitle,
									theme: zStringify(ZaionsLinkInBioDefaultData.theme), // passing default data with title
									folderId: 1,
								});
								await FormikSubmitHandler(zStringifyData);
							}
						} catch (error) {
							reportCustomError(error);
						}
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						submitForm,
					}) => {
						return (
							<>
								<ZIonInput
									label='Link-in-bio title*'
									labelPlacement='stacked'
									name='linkInBioTitle'
									minHeight='2.3rem'
									placeholder='title'
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values.linkInBioTitle} // the title of the new-link-in-bio
									errorText={
										touched.linkInBioTitle ? errors.linkInBioTitle : undefined
									}
									testingselector={
										CONSTANTS.testingSelectors.linkInBio.formModal.titleInput
									}
									className={classNames({
										'mt-5 ion-text-start': true,
										'ion-touched': touched.linkInBioTitle,
										'ion-invalid': errors.linkInBioTitle,
										'ion-valid':
											touched.linkInBioTitle && !errors.linkInBioTitle,
									})}
								/>

								<ZIonButton
									expand='block'
									className='mt-4'
									onClick={() => void submitForm()}
									testingselector={
										CONSTANTS.testingSelectors.linkInBio.formModal.submitFormBtn
									}
								>
									Create
								</ZIonButton>
							</>
						);
					}}
				</Formik>
			</div>
		</ZIonContent>
	);
};

export default ZaionsAddLinkInBioModal;
