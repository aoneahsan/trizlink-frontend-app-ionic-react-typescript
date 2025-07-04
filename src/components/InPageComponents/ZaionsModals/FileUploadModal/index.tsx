// Core Imports
import React, { useMemo, useState } from 'react';
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
  ZIonIcon
} from '@/components/ZIonComponents';
import {
  useZRQCreateRequest,
  useZRQUpdateRequest
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
  uploadModalLink
} from '@/assets/images';

// Recoil States

// Types
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';

// Styles
import classes from './styles.module.css';
import { ZIonModalActionEnum } from '@/types/ZaionsApis.type';
import { closeOutline } from 'ionicons/icons';
import { PRODUCT_NAME } from '@/utils/constants';

// Inpage types
enum uploadFileModalTabEnum {
  upload = 'upload',
  url = 'url',
  screenshot = 'screenshot',
  galleryGiphy = 'galleryGiphy',
  galleryPexels = 'galleryPexels',
  galleryPixabay = 'galleryPixabay',
  galleryUnsplash = 'galleryUnsplash',
  galleryTenor = 'galleryTenor'
}

enum galleryEnum {
  giphy = 'giphy',
  pexels = 'pexels',
  pixabay = 'pixabay',
  unsplash = 'unsplash',
  tenor = 'tenor'
}

const zIonButtonStyle = { '--border-radius': '0', '--box-shadow': 'none' };

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
        <ZIonGrid className='h-full ion-no-padding'>
          <ZIonRow className='h-full'>
            <ZIonCol
              size='3'
              className='h-full zaions__light_bg ion-padding-vertical'>
              {/* Title */}
              <ZIonText
                color='dark'
                className='flex ion-justify-content-center ion-align-items-center ion-padding-vertical ion-margin-top'>
                <h5 className='font-bold ion-no-margin me-2'>
                  Select an option
                </h5>
                <h6 className='ion-no-margin text-[14px] mt-1'>
                  <ZIonRouterLink>(help)</ZIonRouterLink>
                </h6>
              </ZIonText>

              {/* Links */}
              <ZIonList className='mt-3 ion-no-padding ion-no-margin zaions__light_bg'>
                {/* 📁 Upload */}
                <ZIonItem
                  className='cursor-pointer ion-no-padding'
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
                    setCompState(oldValues => ({
                      ...oldValues,
                      currentTab: uploadFileModalTabEnum.upload
                    }));
                  }}>
                  <div className='ms-auto w-[80%]'>
                    <ZIonText>📁 Upload</ZIonText>
                  </div>
                </ZIonItem>

                {/* 🔎 From URL */}
                <ZIonItem
                  className='mt-2 cursor-pointer ion-no-padding'
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
                    setCompState(oldValues => ({
                      ...oldValues,
                      currentTab: uploadFileModalTabEnum.url
                    }));
                  }}>
                  <div className='ms-auto w-[80%]'>
                    <ZIonText>🔎 From URL</ZIonText>
                  </div>
                </ZIonItem>

                {/* 📸 Screenshot */}
                <ZIonItem
                  className='mt-2 cursor-pointer ion-no-padding'
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
                    setCompState(oldValues => ({
                      ...oldValues,
                      currentTab: uploadFileModalTabEnum.screenshot
                    }));
                  }}>
                  <div className='ms-auto w-[80%]'>
                    <ZIonText className='mx-auto'>📸 Screenshot</ZIonText>
                  </div>
                </ZIonItem>

                {/* 🎉 Giphy */}
                <ZIonItem
                  className='mt-2 cursor-pointer ion-no-padding'
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
                    setCompState(oldValues => ({
                      ...oldValues,
                      currentTab: uploadFileModalTabEnum.galleryGiphy
                    }));
                  }}>
                  <div className='ms-auto w-[80%]'>
                    <ZIonText className='mx-auto'>🎉 Giphy</ZIonText>
                  </div>
                </ZIonItem>

                {/* 🗻 Pexels */}
                <ZIonItem
                  className='mt-2 cursor-pointer ion-no-padding'
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
                    setCompState(oldValues => ({
                      ...oldValues,
                      currentTab: uploadFileModalTabEnum.galleryPexels
                    }));
                  }}>
                  <div className='ms-auto w-[80%]'>
                    <ZIonText className='mx-auto'>🗻 Pexels</ZIonText>
                  </div>
                </ZIonItem>

                {/* 🍴 Pixabay */}
                <ZIonItem
                  className='mt-2 cursor-pointer ion-no-padding'
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
                    setCompState(oldValues => ({
                      ...oldValues,
                      currentTab: uploadFileModalTabEnum.galleryPixabay
                    }));
                  }}>
                  <div className='ms-auto w-[80%]'>
                    <ZIonText className='mx-auto'>🍴 Pixabay</ZIonText>
                  </div>
                </ZIonItem>

                {/* 🌍 Unsplash */}
                <ZIonItem
                  className='mt-2 cursor-pointer ion-no-padding'
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
                    setCompState(oldValues => ({
                      ...oldValues,
                      currentTab: uploadFileModalTabEnum.galleryUnsplash
                    }));
                  }}>
                  <div className='ms-auto w-[80%]'>
                    <ZIonText className='mx-auto'>🌍 Unsplash</ZIonText>
                  </div>
                </ZIonItem>

                {/* 👋 Tenor */}
                <ZIonItem
                  className='mt-2 cursor-pointer ion-no-padding'
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
                    setCompState(oldValues => ({
                      ...oldValues,
                      currentTab: uploadFileModalTabEnum.galleryTenor
                    }));
                  }}>
                  <div className='ms-auto w-[80%]'>
                    <ZIonText className='mx-auto'>👋 Tenor</ZIonText>
                  </div>
                </ZIonItem>
              </ZIonList>
            </ZIonCol>
            <ZIonCol
              size='9'
              className={classNames({
                'h-full ion-padding-bottom': true,
                'flex flex-col ion-justify-content-center ion-align-items-center':
                  [
                    uploadFileModalTabEnum.screenshot,
                    uploadFileModalTabEnum.upload,
                    uploadFileModalTabEnum.url
                  ].includes(compState.currentTab)
              })}>
              {/* Close modal button */}
              <div className='w-full pb-2 ion-text-end ion-no-margin'>
                <ZIonButton
                  fill='clear'
                  className='mt-2 ion-no-padding me-3'
                  onClick={() => {
                    dismissZIonModal();
                  }}>
                  <ZIonIcon
                    icon={closeOutline}
                    size='large'
                  />
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
          <ZIonRow className='mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
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
    _authenticated: true,
    _contentType: zAxiosApiRequestContentType.FormData
  });

  // Delete file api.
  const { mutateAsync: deleteSingleFile } = useZRQUpdateRequest({
    _url: API_URL_ENUM.deleteSingleFile
  });

  const uploadFileToBackend = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);

    // Uploading image to backend
    const result = await uploadSingleFile(formData);

    // storing the url get from result in component state
    setUploadTabState(oldValues => ({
      ...oldValues,
      file: {
        ...oldValues.file,
        fileUrl: result?.data.fileUrl,
        filePath: result?.data.filePath,
        isFileFetch: true
      }
    }));
  };

  // Delete file handler or try again handler
  const singleFileDeleteHandler = async (): Promise<void> => {
    try {
      if (uploadTabState?.file?.filePath !== undefined) {
        // Deleting the file from storage
        await deleteSingleFile({
          requestData: zStringify({ filePath: uploadTabState.file?.filePath }),
          itemIds: [],
          urlDynamicParts: []
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
  const singleFileTryAgainHandler = async (): Promise<void> => {
    try {
      if (uploadTabState?.file?.filePath !== undefined) {
        // Deleting the file from storage
        await deleteSingleFile({
          requestData: zStringify({ filePath: uploadTabState.file?.filePath }),
          itemIds: [],
          urlDynamicParts: []
        });

        //
        setUploadTabState(oldValues => ({
          ...oldValues,
          filePath: '',
          fileUrl: '',
          isFileFetch: false
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  // #region Comp Constants
  const formikInitialValues = useMemo(
    () => ({
      border:
        uploadTabState?.file?.isFileFetch === true ? '' : '1px dashed #000'
    }),
    [uploadTabState?.file?.isFileFetch]
  );

  // #endregion

  return (
    <ReactDropzone
      onDrop={event => {
        void uploadFileToBackend(event[0]);
      }}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          className={classNames({
            'w-[90%] h-[80%]': true,
            'flex flex-col ion-align-items-center ion-justify-content-center h-[90%] rounded cursor-pointer':
              uploadTabState?.file?.isFileFetch === false,
            zaions__success_set: isDragActive,
            zaions__primary_set: !isDragActive
          })}
          style={formikInitialValues}
          {...getRootProps()}>
          {uploadTabState?.file?.isFileFetch === false && (
            <>
              <input {...getInputProps()} />
              <ZIonText className='ion-no-margin'>
                <ZIonImg
                  src={uploadModalFolder}
                  alt='send icon'
                  className='w-[15rem]'
                />
              </ZIonText>
              <ZIonText color='dark'>
                <h5 className='font-bold'>
                  Drag & drop your image here or{' '}
                  <ZIonText color='primary'>Browse</ZIonText>
                </h5>
              </ZIonText>
              <div className='flex flex-col ion-align-items-center ion-justify-content-center'>
                <ZIonText
                  color='medium'
                  className='mt-2 font-bold'>
                  (5MB maximum - JPG, GIF, PNG)
                </ZIonText>
              </div>
            </>
          )}

          {uploadTabState?.file?.isFileFetch === true && (
            <>
              <div className='w-[70%] h-[400px] mx-auto my-3'>
                <ZIonImg
                  src={uploadTabState.file?.fileUrl}
                  alt='send icon'
                  className='w-full h-full'
                />
              </div>
              <div className='w-full my-5 zaions__tertiary_set'>
                <div className='w-[80%] flex ion-align-item-center ion-justify-content-between mx-auto py-2'>
                  <ZIonButton
                    color='danger'
                    className='normal-case'
                    onClick={() => {
                      void singleFileDeleteHandler();
                    }}>
                    Cancel
                  </ZIonButton>
                  <ZIonButton
                    color='secondary'
                    className='normal-case'
                    onClick={() => {
                      void singleFileTryAgainHandler();
                    }}>
                    Try Again
                  </ZIonButton>
                  <ZIonButton
                    color='success'
                    className='normal-case'
                    onClick={() => {
                      dismissZIonModal(
                        zStringify({
                          fileUrl: uploadTabState.file?.fileUrl,
                          filePath: uploadTabState.file?.filePath
                        }),
                        ZIonModalActionEnum.success
                      );
                    }}>
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
    <div className='flex flex-col w-full h-full mt-2 rounded ion-align-items-center ion-justify-content-start'>
      <ZIonText className='ion-no-margin'>
        <ZIonImg
          src={uploadModalLink}
          alt='send icon'
          className='mb-5 border-radius__50per zaions__primary_set w-[11rem] p-[2rem]'
        />
      </ZIonText>
      <ZIonText
        color='dark'
        className='mb-3'>
        <h5 className='font-bold'>Paste the link of an image 🔗</h5>
      </ZIonText>
      <div className='flex flex-col ion-align-items-center ion-justify-content-center'>
        <ZIonText
          color='medium'
          className='mt-2 font-bold'>
          (5MB maximum - JPG, GIF, PNG)
        </ZIonText>
      </div>
      <div className='flex ion-justify-content-center ion-align-items-center w-[70%] mt-5 pt-2 h-[3.5rem]'>
        <ZIonInput
          className={classNames(classes['file-modal-upload-input'], {
            'zaions__primary_set ion-padding h-full': true
          })}
          placeholder='https://mylink.com'
          color='dark'
          label=''
        />
        <ZIonButton
          className='h-full normal-case ion-no-margin'
          style={zIonButtonStyle}>
          Select
        </ZIonButton>
      </div>
    </div>
  );
};

const ScreenShotTab: React.FC = () => {
  return (
    <div className='flex flex-col w-full h-full mt-2 rounded ion-align-items-center ion-justify-content-start'>
      <ZIonText className='ion-no-margin'>
        <ZIonImg
          src={uploadModalCamera}
          alt='send icon'
          className='mb-5 border-radius__50per zaions__primary_set w-[11rem] p-[2rem]'
        />
      </ZIonText>
      <ZIonText
        color='dark'
        className='mb-3'>
        <h5 className='font-bold'>Take a screenshot of a website 📸</h5>
      </ZIonText>
      <div className='flex flex-col ion-align-items-center ion-justify-content-center'>
        <ZIonText
          color='medium'
          className='mt-2 font-bold'>
          Paste the link of the Website you want to take a screenshot
        </ZIonText>
      </div>
      <div className='flex ion-justify-content-center ion-align-items-center w-[70%] mt-5 pt-2 h-[3.5rem]'>
        <ZIonInput
          className={classNames(classes['file-modal-upload-input'], {
            'zaions__primary_set ion-padding h-full': true
          })}
          placeholder='https://mylink.com'
          color='dark'
          label=''
        />
        <ZIonButton
          className='h-full normal-case ion-no-margin'
          style={zIonButtonStyle}>
          Take a screenshot
        </ZIonButton>
      </div>
    </div>
  );
};

const GalleryTab: React.FC<{ typeOfGallery: galleryEnum }> = ({
  typeOfGallery
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
          className='flex ion-justify-content-center ion-align-items-center w-[70%] h-[3.5rem]'
          size='12'>
          <ZIonInput
            className={classNames(classes['file-modal-upload-input'], {
              'zaions__primary_set ion-padding h-full': true
            })}
            placeholder={searchInputPlaceholder}
            color='dark'
            label=''
          />
          <ZIonButton
            className='h-full normal-case ion-no-margin'
            style={zIonButtonStyle}>
            Search
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
      <ZIonRow className='px-3 mx-auto ion-justify-content-between'>
        {[1, 2, 3, 4, 5, 6].map(el => {
          return (
            <ZIonCol
              className={classNames(classes['zaions-gallery-card'], {
                'zaions__primary_set ion-no-padding mb-3 flex ion-align-items-end cursor-pointer h-[160px] zaions__medium_bg':
                  true
              })}
              size='3.9'
              key={el}>
              <div
                className={classNames(
                  classes['zaions-gallery-card-block-data'],
                  {
                    'w-full zaions__dark_bg_opacity_point_7': true
                  }
                )}>
                <span className='font-bold ps-2'>{PRODUCT_NAME}</span>
              </div>
            </ZIonCol>
          );
        })}
      </ZIonRow>
    </>
  );
};

export default ZaionsFileUploadModal;
