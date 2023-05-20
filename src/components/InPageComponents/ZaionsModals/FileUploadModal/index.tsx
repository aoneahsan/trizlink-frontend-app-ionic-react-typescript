// Core Imports
import React, { useState } from 'react';
// Packages Import
import classNames from 'classnames';
import ReactDropzone from 'react-dropzone';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonContent,
	ZIonGrid,
	ZIonRouterLink,
	ZIonList,
	ZIonItem,
	ZIonImg,
	ZIonInput,
	ZIonButton,
	ZIonIcon,
} from '@/components/ZIonComponents';
import {
	useZRQCreateRequest,
	useZRQUpdateRequest,
} from '@/ZaionsHooks/zreactquery-hooks';

// Global Constants
import { API_URL_ENUM } from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { zStringify } from '@/utils/helpers';

// Images
import {
	uploadModalCamera,
	uploadModalFolder,
	uploadModalLink,
} from '@/assets/images';

// Recoil States

// Types
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';

// Styles
import classes from './styles.module.css';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';
import { closeOutline } from 'ionicons/icons';

// Inpage types
enum uploadFileModalTabEnum {
	upload = 'upload',
	url = 'url',
	screenshot = 'screenshot',
	galleryGiphy = 'galleryGiphy',
	galleryPexels = 'galleryPexels',
	galleryPixabay = 'galleryPixabay',
	galleryUnsplash = 'galleryUnsplash',
	galleryTenor = 'galleryTenor',
}

enum galleryEnum {
	giphy = 'giphy',
	pexels = 'pexels',
	pixabay = 'pixabay',
	unsplash = 'unsplash',
	tenor = 'tenor',
}

const ZaionsFileUploadModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	const [compState, setCompState] = useState<{
		currentTab: uploadFileModalTabEnum;
	}>({ currentTab: uploadFileModalTabEnum.upload });

	// JSX Code
	return (
		<>
			{/**
			 * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in      appSetting and hide if it is `false`
			 * default: false
			 *  */}
			{/* {appSettings.appModalsSetting.actions.showActionInModalHeader && (
        <ZIonHeader>
          <ZIonRow className='ion-align-items-center'>
            <ZIonCol>
              <ZIonButton
                onClick={() => {
                  // Close the Modal
                  dismissZIonModal();
                  SetDefaultShortLinkFormState();
                }}
                color='primary'
                className='ion-text-capitalize'
                fill='outline'
              >
                Close
              </ZIonButton>
            </ZIonCol>
          </ZIonRow>
        </ZIonHeader>
      )} */}

			<ZIonContent>
				<ZIonGrid className='zaions__h100 ion-no-padding'>
					<ZIonRow className='zaions__h100'>
						<ZIonCol
							size='3'
							className='zaions__light_bg zaions__h100 ion-padding-vertical'
						>
							{/* Title */}
							<ZIonText
								color='dark'
								className='flex ion-justify-content-center ion-align-items-center ion-padding-vertical ion-margin-top'
							>
								<h5 className='ion-no-margin me-2 font-bold'>
									Select an option
								</h5>
								<h6 className='ion-no-margin zaions__fs_14 mt-1'>
									<ZIonRouterLink>(help)</ZIonRouterLink>
								</h6>
							</ZIonText>

							{/* Links */}
							<ZIonList className='ion-no-padding ion-no-margin mt-3 zaions__light_bg'>
								{/* 📁 Upload */}
								<ZIonItem
									className='ion-no-padding zaions__cursor_pointer'
									color={
										compState.currentTab === uploadFileModalTabEnum.upload
											? undefined
											: 'light'
									}
									lines={
										compState.currentTab === uploadFileModalTabEnum.upload
											? undefined
											: 'none'
									}
									onClick={() => {
										setCompState((oldValues) => ({
											...oldValues,
											currentTab: uploadFileModalTabEnum.upload,
										}));
									}}
								>
									<div className='ms-auto zaions__w80'>
										<ZIonText>📁 Upload</ZIonText>
									</div>
								</ZIonItem>

								{/* 🔎 From URL */}
								<ZIonItem
									className='ion-no-padding zaions__cursor_pointer mt-2'
									color={
										compState.currentTab === uploadFileModalTabEnum.url
											? undefined
											: 'light'
									}
									lines={
										compState.currentTab === uploadFileModalTabEnum.url
											? undefined
											: 'none'
									}
									onClick={() => {
										setCompState((oldValues) => ({
											...oldValues,
											currentTab: uploadFileModalTabEnum.url,
										}));
									}}
								>
									<div className='ms-auto zaions__w80'>
										<ZIonText>🔎 From URL</ZIonText>
									</div>
								</ZIonItem>

								{/* 📸 Screenshot */}
								<ZIonItem
									className='ion-no-padding zaions__cursor_pointer mt-2'
									color={
										compState.currentTab === uploadFileModalTabEnum.screenshot
											? undefined
											: 'light'
									}
									lines={
										compState.currentTab === uploadFileModalTabEnum.screenshot
											? undefined
											: 'none'
									}
									onClick={() => {
										setCompState((oldValues) => ({
											...oldValues,
											currentTab: uploadFileModalTabEnum.screenshot,
										}));
									}}
								>
									<div className='ms-auto zaions__w80'>
										<ZIonText className='mx-auto'>📸 Screenshot</ZIonText>
									</div>
								</ZIonItem>

								{/* 🎉 Giphy */}
								<ZIonItem
									className='ion-no-padding zaions__cursor_pointer mt-2'
									color={
										compState.currentTab === uploadFileModalTabEnum.galleryGiphy
											? undefined
											: 'light'
									}
									lines={
										compState.currentTab === uploadFileModalTabEnum.galleryGiphy
											? undefined
											: 'none'
									}
									onClick={() => {
										setCompState((oldValues) => ({
											...oldValues,
											currentTab: uploadFileModalTabEnum.galleryGiphy,
										}));
									}}
								>
									<div className='ms-auto zaions__w80'>
										<ZIonText className='mx-auto'>🎉 Giphy</ZIonText>
									</div>
								</ZIonItem>

								{/* 🗻 Pexels */}
								<ZIonItem
									className='ion-no-padding zaions__cursor_pointer mt-2'
									color={
										compState.currentTab ===
										uploadFileModalTabEnum.galleryPexels
											? undefined
											: 'light'
									}
									lines={
										compState.currentTab ===
										uploadFileModalTabEnum.galleryPexels
											? undefined
											: 'none'
									}
									onClick={() => {
										setCompState((oldValues) => ({
											...oldValues,
											currentTab: uploadFileModalTabEnum.galleryPexels,
										}));
									}}
								>
									<div className='ms-auto zaions__w80'>
										<ZIonText className='mx-auto'>🗻 Pexels</ZIonText>
									</div>
								</ZIonItem>

								{/* 🍴 Pixabay */}
								<ZIonItem
									className='ion-no-padding zaions__cursor_pointer mt-2'
									color={
										compState.currentTab ===
										uploadFileModalTabEnum.galleryPixabay
											? undefined
											: 'light'
									}
									lines={
										compState.currentTab ===
										uploadFileModalTabEnum.galleryPixabay
											? undefined
											: 'none'
									}
									onClick={() => {
										setCompState((oldValues) => ({
											...oldValues,
											currentTab: uploadFileModalTabEnum.galleryPixabay,
										}));
									}}
								>
									<div className='ms-auto zaions__w80'>
										<ZIonText className='mx-auto'>🍴 Pixabay</ZIonText>
									</div>
								</ZIonItem>

								{/* 🌍 Unsplash */}
								<ZIonItem
									className='ion-no-padding zaions__cursor_pointer mt-2'
									color={
										compState.currentTab ===
										uploadFileModalTabEnum.galleryUnsplash
											? undefined
											: 'light'
									}
									lines={
										compState.currentTab ===
										uploadFileModalTabEnum.galleryUnsplash
											? undefined
											: 'none'
									}
									onClick={() => {
										setCompState((oldValues) => ({
											...oldValues,
											currentTab: uploadFileModalTabEnum.galleryUnsplash,
										}));
									}}
								>
									<div className='ms-auto zaions__w80'>
										<ZIonText className='mx-auto'>🌍 Unsplash</ZIonText>
									</div>
								</ZIonItem>

								{/* 👋 Tenor */}
								<ZIonItem
									className='ion-no-padding zaions__cursor_pointer mt-2'
									color={
										compState.currentTab === uploadFileModalTabEnum.galleryTenor
											? undefined
											: 'light'
									}
									lines={
										compState.currentTab === uploadFileModalTabEnum.galleryTenor
											? undefined
											: 'none'
									}
									onClick={() => {
										setCompState((oldValues) => ({
											...oldValues,
											currentTab: uploadFileModalTabEnum.galleryTenor,
										}));
									}}
								>
									<div className='ms-auto zaions__w80'>
										<ZIonText className='mx-auto'>👋 Tenor</ZIonText>
									</div>
								</ZIonItem>
							</ZIonList>
						</ZIonCol>
						<ZIonCol
							size='9'
							className={classNames({
								'zaions__h100 ion-padding-bottom': true,
								'flex flex-col ion-justify-content-center ion-align-items-center':
									[
										uploadFileModalTabEnum.screenshot,
										uploadFileModalTabEnum.upload,
										uploadFileModalTabEnum.url,
									].includes(compState.currentTab),
							})}
						>
							{/* Close modal button */}
							<div className='w-full ion-text-end ion-no-margin pb-2'>
								<ZIonButton
									fill='clear'
									className='ion-no-padding me-3 mt-2'
									onClick={() => dismissZIonModal()}
								>
									<ZIonIcon icon={closeOutline} size='large' />
								</ZIonButton>
							</div>

							{/* Upload tab component */}
							{compState.currentTab === uploadFileModalTabEnum.upload && (
								<UploadTab dismissZIonModal={dismissZIonModal} />
							)}

							{/* Link tab component */}
							{compState.currentTab === uploadFileModalTabEnum.url && (
								<LinkTab />
							)}

							{/* screenshot tab component */}
							{compState.currentTab === uploadFileModalTabEnum.screenshot && (
								<ScreenShotTab />
							)}

							{/* Gallery tab giphy component */}
							{compState.currentTab === uploadFileModalTabEnum.galleryGiphy && (
								<GalleryTab typeOfGallery={galleryEnum.giphy} />
							)}

							{/* Gallery tab pexels component */}
							{compState.currentTab ===
								uploadFileModalTabEnum.galleryPexels && (
								<GalleryTab typeOfGallery={galleryEnum.pexels} />
							)}

							{/* Gallery tab pixabay component */}
							{compState.currentTab ===
								uploadFileModalTabEnum.galleryPixabay && (
								<GalleryTab typeOfGallery={galleryEnum.pixabay} />
							)}

							{/* Gallery tab unsplash component */}
							{compState.currentTab ===
								uploadFileModalTabEnum.galleryUnsplash && (
								<GalleryTab typeOfGallery={galleryEnum.unsplash} />
							)}

							{/* Gallery tab tenor component */}
							{compState.currentTab === uploadFileModalTabEnum.galleryTenor && (
								<GalleryTab typeOfGallery={galleryEnum.tenor} />
							)}
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>

			{/**
			 * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in appSetting, and hide if it is `false`
			 * default: true
			 *  */}
			{/* {appSettings.appModalsSetting.actions.showActionInModalFooter && (
        <ZIonFooter>
          <ZIonRow className=' mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
            <ZIonCol>
              <ZIonButton
                fill='outline'
                size='default'
                className='ion-text-capitalize'
                onClick={() => {
                  // Close The Modal
                  dismissZIonModal();
                  SetDefaultShortLinkFormState();
                }}
              >
                Close
              </ZIonButton>
            </ZIonCol>
          </ZIonRow>
        </ZIonFooter>
      )} */}
		</>
	);
};

const UploadTab: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
	//  validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
	// const { validateRequestResponse } = useZValidateRequestResponse();

	const [uploadTabState, setUploadTabState] = useState<{
		file?: {
			isFileFetch?: boolean;
			fileUrl?: string;
			filePath?: string;
		};
	}>({});

	// Upload single file api.
	const { mutateAsync: uploadSingleFile } = useZRQCreateRequest<{
		data: {
			file: unknown;
			fileName: unknown;
			filePath: '';
			fileUrl: '';
		};
	}>({
		_url: API_URL_ENUM.uploadSingleFile,
		authenticated: true,
		_contentType: zAxiosApiRequestContentType.FormData,
	});

	// Delete file api.
	const { mutateAsync: deleteSingleFile } = useZRQUpdateRequest({
		_url: API_URL_ENUM.deleteSingleFile,
	});

	const uploadFileToBackend = async (file: File) => {
		// console.dir({ file });
		const formData = new FormData();
		formData.append('file', file);
		// console.dir({ formData });

		// Uploading image to backend
		const result = await uploadSingleFile(formData);
		// zConsoleLog({ message: 'file uploaded', data: { result } });

		// storing the url get from result in component state
		setUploadTabState((oldValues) => ({
			...oldValues,
			file: {
				...oldValues.file,
				fileUrl: result?.data.fileUrl,
				filePath: result?.data.filePath,
				isFileFetch: true,
			},
		}));

		// Dismiss modal after storing image
		// dismissZIonModal();
	};

	// Delete file handler or try again handler
	const singleFileDeleteHandler = async () => {
		try {
			if (uploadTabState.file?.filePath) {
				// Deleting the file from storage
				await deleteSingleFile({
					requestData: zStringify({ filePath: uploadTabState.file?.filePath }),
					itemIds: [],
					urlDynamicParts: [],
				});

				// After deleting showing success message
				showSuccessNotification(
					MESSAGES.GENERAL.FILE.FILE_DELETED_SUCCESS_MESSAGE
				);

				// Dismiss the modal
				dismissZIonModal();
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	// Try again handler
	const singleFileTryAgainHandler = async () => {
		try {
			if (uploadTabState.file?.filePath) {
				// Deleting the file from storage
				await deleteSingleFile({
					requestData: zStringify({ filePath: uploadTabState.file?.filePath }),
					itemIds: [],
					urlDynamicParts: [],
				});

				//
				setUploadTabState((oldValues) => ({
					...oldValues,
					filePath: '',
					fileUrl: '',
					isFileFetch: false,
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<ReactDropzone
			onDrop={(event) => {
				void uploadFileToBackend(event[0]);
			}}
		>
			{({ getRootProps, getInputProps, isDragActive }) => (
				<div
					className={classNames({
						zaions__w90: true,
						'flex flex-col ion-align-items-center ion-justify-content-center zaions__h90 rounded zaions__cursor_pointer':
							!uploadTabState.file?.isFileFetch,
						zaions__success_set: isDragActive,
						zaions__primary_set: !isDragActive,
					})}
					style={{
						border: uploadTabState.file?.isFileFetch ? '' : '1px dashed #000',
					}}
					{...getRootProps()}
				>
					{!uploadTabState.file?.isFileFetch && (
						<>
							<input {...getInputProps()} />
							<ZIonText className='ion-no-margin'>
								<ZIonImg
									src={uploadModalFolder}
									alt='send icon'
									style={{ width: '15rem' }}
								/>
							</ZIonText>
							<ZIonText color='dark'>
								<h5 className='font-bold'>
									Drag & drop your image here or{' '}
									<ZIonText color='primary'>Browse</ZIonText>
								</h5>
							</ZIonText>
							<div className='flex flex-col ion-align-items-center ion-justify-content-center'>
								<ZIonText color='medium' className='font-bold mt-2'>
									(5MB maximum - JPG, GIF, PNG)
								</ZIonText>
							</div>
						</>
					)}

					{uploadTabState.file?.isFileFetch && (
						<>
							<div
								className='zaions__w70  mx-auto my-3'
								style={{ height: '400px' }}
							>
								<ZIonImg
									src={uploadTabState.file?.fileUrl}
									alt='send icon'
									className='w-full zaions__h100'
								/>
							</div>
							<div className='my-5 w-full zaions__tertiary_set'>
								<div className='zaions__w80 flex ion-align-item-center ion-justify-content-between mx-auto py-2'>
									<ZIonButton
										color='danger'
										className='text-transform-initial'
										onClick={() => {
											void singleFileDeleteHandler();
										}}
									>
										Cancel
									</ZIonButton>
									<ZIonButton
										color='secondary'
										className='text-transform-initial'
										onClick={() => {
											void singleFileTryAgainHandler();
										}}
									>
										Try Again
									</ZIonButton>
									<ZIonButton
										color='success'
										className='text-transform-initial'
										onClick={() => {
											dismissZIonModal(
												zStringify({
													fileUrl: uploadTabState.file?.fileUrl,
													filePath: uploadTabState.file?.filePath,
												}),
												ZIonModalActionEnum.success
											);
										}}
									>
										Done
									</ZIonButton>
								</div>
							</div>
						</>
					)}
				</div>
			)}
		</ReactDropzone>
	);
};

const LinkTab: React.FC = () => {
	return (
		<div className='flex flex-col ion-align-items-center ion-justify-content-start mt-2 zaions__h100 w-full rounded'>
			<ZIonText className='ion-no-margin'>
				<ZIonImg
					src={uploadModalLink}
					alt='send icon'
					style={{ width: '11rem', padding: '2rem' }}
					className='mb-5 border-radius__50per zaions__primary_set'
				/>
			</ZIonText>
			<ZIonText color='dark' className='mb-3'>
				<h5 className='font-bold'>Paste the link of an image 🔗</h5>
			</ZIonText>
			<div className='flex flex-col ion-align-items-center ion-justify-content-center'>
				<ZIonText color='medium' className='font-bold mt-2'>
					(5MB maximum - JPG, GIF, PNG)
				</ZIonText>
			</div>
			<div
				className='flex ion-justify-content-center ion-align-items-center zaions__w70 mt-5 pt-2'
				style={{ height: '3.5rem' }}
			>
				<ZIonInput
					className={classNames(classes['file-modal-upload-input'], {
						'zaions__primary_set ion-padding zaions__h100': true,
					})}
					placeholder='https://mylink.com'
					color='dark'
					label=''
				/>
				<ZIonButton
					className='zaions__h100 ion-no-margin text-transform-initial'
					style={{ '--border-radius': '0', '--box-shadow': 'none' }}
				>
					Select
				</ZIonButton>
			</div>
		</div>
	);
};

const ScreenShotTab: React.FC = () => {
	return (
		<div className='flex flex-col ion-align-items-center ion-justify-content-start mt-2 zaions__h100 w-full rounded'>
			<ZIonText className='ion-no-margin'>
				<ZIonImg
					src={uploadModalCamera}
					alt='send icon'
					style={{ width: '11rem', padding: '2rem' }}
					className='mb-5 border-radius__50per zaions__primary_set'
				/>
			</ZIonText>
			<ZIonText color='dark' className='mb-3'>
				<h5 className='font-bold'>Take a screenshot of a website 📸</h5>
			</ZIonText>
			<div className='flex flex-col ion-align-items-center ion-justify-content-center'>
				<ZIonText color='medium' className='font-bold mt-2'>
					Paste the link of the Website you want to take a screenshot
				</ZIonText>
			</div>
			<div
				className='flex ion-justify-content-center ion-align-items-center zaions__w70 mt-5 pt-2'
				style={{ height: '3.5rem' }}
			>
				<ZIonInput
					className={classNames(classes['file-modal-upload-input'], {
						'zaions__primary_set ion-padding zaions__h100': true,
					})}
					placeholder='https://mylink.com'
					color='dark'
					label=''
				/>
				<ZIonButton
					className='zaions__h100 ion-no-margin text-transform-initial'
					style={{ '--border-radius': '0', '--box-shadow': 'none' }}
				>
					Take a screenshot
				</ZIonButton>
			</div>
		</div>
	);
};

const GalleryTab: React.FC<{ typeOfGallery: galleryEnum }> = ({
	typeOfGallery,
}) => {
	const searchInputPlaceholder =
		typeOfGallery === galleryEnum.pixabay
			? 'Search among millions of pictures powered by Pixabay'
			: typeOfGallery === galleryEnum.giphy
			? 'Search among millions of GIFs powered by Giphy'
			: typeOfGallery === galleryEnum.pexels
			? 'Search among millions of pictures powered by Pexels'
			: typeOfGallery === galleryEnum.unsplash
			? 'Search among millions of pictures powered by Unsplash'
			: typeOfGallery === galleryEnum.tenor
			? 'Search among millions of pictures powered by Tenor'
			: '';
	return (
		<>
			<ZIonRow className='px-3 mb-3 ion-justify-content-center'>
				<ZIonCol
					className='flex ion-justify-content-center ion-align-items-center zaions__w70'
					style={{ height: '3.5rem' }}
					size='12'
				>
					<ZIonInput
						className={classNames(classes['file-modal-upload-input'], {
							'zaions__primary_set ion-padding zaions__h100': true,
						})}
						placeholder={searchInputPlaceholder}
						color='dark'
						label=''
					/>
					<ZIonButton
						className='zaions__h100 ion-no-margin text-transform-initial'
						style={{ '--border-radius': '0', '--box-shadow': 'none' }}
					>
						Search
					</ZIonButton>
				</ZIonCol>
			</ZIonRow>
			<ZIonRow className='px-3 ion-justify-content-between mx-auto'>
				{[1, 2, 3, 4, 5, 6].map((el) => {
					return (
						<ZIonCol
							className={classNames(classes['zaions-gallery-card'], {
								'zaions__primary_set ion-no-padding mb-3 flex ion-align-items-end zaions__cursor_pointer':
									true,
							})}
							style={{
								height: '160px',
								backgroundImage: `url(https://cdn.pixabay.com/photo/2023/03/23/15/43/squirrel-7872248_960_720.jpg)`,
							}}
							size='3.9'
							key={el}
						>
							<div
								className={classNames(
									classes['zaions-gallery-card-block-data'],
									{
										'w-full zaions__dark_bg_opacity_point_7': true,
									}
								)}
							>
								<span className='font-bold ps-2'>Ralphs_Fotos | Pixabay</span>
							</div>
						</ZIonCol>
					);
				})}
			</ZIonRow>
		</>
	);
};

export default ZaionsFileUploadModal;
