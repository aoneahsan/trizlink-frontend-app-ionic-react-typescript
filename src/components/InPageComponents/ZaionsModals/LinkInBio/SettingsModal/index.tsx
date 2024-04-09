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
  ZIonAccordion,
  ZIonAccordionGroup,
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonFooter,
  ZIonIcon,
  ZIonImg,
  ZIonItem,
  ZIonList,
  ZIonRadio,
  ZIonRadioGroup,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import { closeOutline } from 'ionicons/icons';
import CONSTANTS from '@/utils/constants';
import { ProductFaviconSmall } from '@/assets/images';
import classNames from 'classnames';
import {
  useZRQCreateRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import MESSAGES from '@/utils/messages';
import { ZUserSettingTypeEnum } from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  _getQueryKey,
  extractInnerData,
  isZNonEmptyString,
  isZNonEmptyStrings,
  zStringify
} from '@/utils/helpers';
import {
  addBlockModalUIEnum,
  type libFormSettingsInterface
} from '@/types/AdminPanel/linkInBioType';
import { Formik } from 'formik';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import SupportTrizlinkOnPatreon from '@/components/SupportTrizlinkOnPatreon';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

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

const ZLinkInBioFormSettingsModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute?: (_url: string) => void;
  workspaceId?: string;
  shareWSMemberId?: string;
  wsShareId?: string;
}> = ({
  dismissZIonModal,
  zNavigatePushRoute,
  workspaceId,
  shareWSMemberId,
  wsShareId
}) => {
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // #region Apis
  const { data: getLinkInBioFiltersData } =
    useZRQGetRequest<libFormSettingsInterface>({
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _key: _getQueryKey({
        keys: [
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
          ZUserSettingTypeEnum.libFormSettings
        ],
        additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
      }),
      _itemsIds: _getQueryKey({
        keys: [
          isZNonEmptyString(workspaceId)
            ? ZWSTypeEum.personalWorkspace
            : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
            ? ZWSTypeEum.shareWorkspace
            : '',
          ZUserSettingTypeEnum.libFormSettings
        ],
        additionalKeys: [workspaceId, shareWSMemberId]
      }),
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.settings.type,
        CONSTANTS.RouteParams.workspace.workspaceId
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _shouldFetchWhenIdPassed: !(
        isZNonEmptyStrings([workspaceId]) ||
        isZNonEmptyStrings([wsShareId, shareWSMemberId])
      ),
      _showLoader: false
    });

  const { mutateAsync: createLibFormSettingsAsyncMutate } = useZRQCreateRequest(
    {
      _url: API_URL_ENUM.user_setting_list_create,
      _loaderMessage: MESSAGES.SHORT_LINKS.FILTERING,
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.type,
        CONSTANTS.RouteParams.workspace.workspaceId
      ],
      _itemsIds:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [ZWSTypeEum.personalWorkspace, workspaceId]
          : wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ? [ZWSTypeEum.shareWorkspace, shareWSMemberId]
          : []
    }
  );

  // workspace short link filter and short link other settings create api.
  const { mutateAsync: updateLibFormSettingsAsyncMutate } = useZRQUpdateRequest(
    {
      _url: API_URL_ENUM.user_setting_delete_update_get,
      _loaderMessage: MESSAGES.SHORT_LINKS.FILTERING
    }
  );
  // #endregion

  // #region Functions
  const formikSubmitHandler = async (value: string): Promise<void> => {
    try {
      let _response;
      if (isZNonEmptyString(getLinkInBioFiltersData?.id)) {
        _response = await updateLibFormSettingsAsyncMutate({
          itemIds: _getQueryKey({
            keys: [
              isZNonEmptyString(workspaceId)
                ? ZWSTypeEum.personalWorkspace
                : isZNonEmptyString(wsShareId) &&
                  isZNonEmptyString(shareWSMemberId)
                ? ZWSTypeEum.shareWorkspace
                : '',
              ZUserSettingTypeEnum.libFormSettings
            ],
            additionalKeys: [workspaceId, shareWSMemberId]
          }),
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.type,
            CONSTANTS.RouteParams.settings.type,
            CONSTANTS.RouteParams.workspace.workspaceId
          ],
          requestData: value
        });
      } else {
        _response = await createLibFormSettingsAsyncMutate(value);
      }

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<libFormSettingsInterface>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.id !== undefined && _data?.id !== null) {
          await updateRQCDataHandler<libFormSettingsInterface | undefined>({
            key: _getQueryKey({
              keys: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.SWS_GET,
                ZUserSettingTypeEnum.libFormSettings
              ],
              additionalKeys: [workspaceId, wsShareId, shareWSMemberId]
            }),
            data: _data,
            id: '',
            extractType: ZRQGetRequestExtractEnum.extractItem,
            updateHoleData: true
          });

          showSuccessNotification(MESSAGES.LINK_IN_BIO.FORM_SETTINGS.UPDATED);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  const FormikInitialValues = {
    addBlockModal: {
      Ui:
        getLinkInBioFiltersData?.settings?.addBlockModal?.Ui ??
        addBlockModalUIEnum.minimalistic
    }
  };

  return (
    <>
      <SupportTrizlinkOnPatreon />
      <Formik
        initialValues={FormikInitialValues}
        enableReinitialize
        onSubmit={values => {
          const zStringifyData = zStringify({
            type: ZUserSettingTypeEnum.libFormSettings,
            settings: zStringify({ addBlockModal: values.addBlockModal })
          });
          void formikSubmitHandler(zStringifyData);
        }}>
        {({ values, setFieldValue, submitForm, isValid, dirty }) => {
          return (
            <>
              <ZIonContent className='ion-padding'>
                <div className='ion-text-end'>
                  <ZIonIcon
                    icon={closeOutline}
                    className='w-6 h-6 cursor-pointer'
                    testingselector={
                      CONSTANTS.testingSelectors.linkInBio.formPage.design
                        .blocks.addModal.closeModalBtn
                    }
                    onClick={() => {
                      dismissZIonModal();
                    }}
                  />
                </div>

                <div className='flex flex-col ion-text-center ion-justify-content-center'>
                  <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
                    <ZIonImg
                      src={ProductFaviconSmall}
                      className='mx-auto w-11 h-11'
                    />
                  </div>

                  <ZIonText
                    color='dark'
                    className='block mt-3 text-xl font-bold ion-text-center'>
                    Link In Bio Form Page Settings
                  </ZIonText>
                </div>

                <div className='w-full h-auto mt-3'>
                  <ZIonAccordionGroup>
                    <ZIonAccordion value='blockForm'>
                      <ZIonItem
                        minHeight='2.5rem'
                        slot='header'
                        lines='none'
                        color='light'
                        className='ps-1 h-[2.5rem] flex overflow-hidden rounded-lg cursor-pointer mx-auto w-[104.6%] ion-activatable'
                        testingselector={
                          CONSTANTS.testingSelectors.pixels.listPage
                            .filterSidebar.columnAccordionHead
                        }
                        // style={zIonItemStyle}
                      >
                        <ZIonText
                          className={classNames({
                            'text-sm ion-no-margin font-semibold': true
                          })}
                          color='dark'>
                          Add Block Model Type
                        </ZIonText>
                      </ZIonItem>

                      <div
                        className='py-2 ms-1 zaions__light_bg'
                        slot='content'>
                        <ZIonRadioGroup
                          value={values.addBlockModal.Ui}
                          onIonChange={({ target }) => {
                            void setFieldValue(
                              'addBlockModal.Ui',
                              target.value,
                              false
                            );
                          }}>
                          <ZIonList
                            lines='none'
                            className='px-2 z-bg-transparent'>
                            <ZIonItem className='overflow-hidden rounded-md'>
                              <ZIonRadio
                                value={addBlockModalUIEnum.minimalistic}
                                className='io'>
                                Minimalistic UI
                              </ZIonRadio>
                            </ZIonItem>
                            <ZIonItem className='mt-2 overflow-hidden rounded-md'>
                              <ZIonRadio value={addBlockModalUIEnum.advance}>
                                Advance UI
                              </ZIonRadio>
                            </ZIonItem>
                          </ZIonList>
                        </ZIonRadioGroup>
                      </div>
                    </ZIonAccordion>
                  </ZIonAccordionGroup>
                </div>
              </ZIonContent>

              <ZIonFooter>
                <ZIonRow className='mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
                  <ZIonCol>
                    <ZIonButton
                      fill='outline'
                      size='default'
                      className='ion-text-capitalize'
                      onClick={() => {
                        dismissZIonModal();
                      }}>
                      Close
                    </ZIonButton>
                  </ZIonCol>

                  <ZIonCol className='flex gap-2 ion-justify-content-end ion-align-items-center'>
                    <ZIonButton
                      size='default'
                      disabled={!isValid || !dirty}
                      className='ion-text-capitalize'
                      onClick={() => {
                        void submitForm();
                      }}>
                      Save
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              </ZIonFooter>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default ZLinkInBioFormSettingsModal;
