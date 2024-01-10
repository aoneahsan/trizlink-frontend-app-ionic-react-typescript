// Core Imports
import React from 'react';

// Packages Import
import { closeOutline } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports
import {
  ZIonButton,
  ZIonContent,
  ZIonIcon,
  ZIonImg,
  ZIonInput,
  ZIonText
} from '@/components/ZIonComponents';
import { Formik } from 'formik';
import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

// Global Constants
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import {
  createRedirectRoute,
  extractInnerData,
  validateField,
  zStringify
} from '@/utils/helpers';
import CONSTANTS from '@/utils/constants';

// Images
import { ProductFavicon } from '@/assets/images';

// Recoil States
import { ZaionsLinkInBioDefaultData } from '@/data/UserDashboard/LinkInBio/index.data';

// Types
import {
  ZLinkInBioPageEnum,
  type LinkInBioType,
  ZLinkInBioRHSComponentEnum
} from '@/types/AdminPanel/linkInBioType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { ENVS } from '@/utils/envKeys';
import { planFeaturesEnum } from '@/types/AdminPanel/index.type';
import { useSetRecoilState } from 'recoil';
import { ZUserCurrentLimitsRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';

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
  shareWSMemberId: string;
  wsShareId: string;
}> = ({
  dismissZIonModal,
  zNavigatePushRoute,
  workspaceId,
  wsShareId,
  shareWSMemberId
}) => {
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  const setZUserCurrentLimitsRState = useSetRecoilState(
    ZUserCurrentLimitsRStateAtom
  );

  // Create new link-in-bio API.
  const { mutateAsync: createLinkInBioMutate } =
    useZRQCreateRequest<LinkInBioType>({
      _url: API_URL_ENUM.linkInBio_create_list,
      _itemsIds:
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim()?.length > 0
          ? [workspaceId, ZWSTypeEum.personalWorkspace]
          : wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ? [shareWSMemberId, ZWSTypeEum.shareWorkspace]
          : [],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.workspace.type
      ]
    });

  const FormikSubmitHandler = async (data: string): Promise<void> => {
    try {
      if (data?.length > 0) {
        const _response = await createLinkInBioMutate(data);

        if (_response !== undefined && _response !== null) {
          const _data = extractInnerData<LinkInBioType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== null && _data?.id !== undefined) {
            const _libCacheData =
              getRQCDataHandler<LinkInBioType[]>({
                key:
                  workspaceId !== undefined &&
                  workspaceId !== null &&
                  workspaceId?.trim()?.length > 0
                    ? [
                        CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                        workspaceId
                      ]
                    : wsShareId !== undefined &&
                      wsShareId !== null &&
                      wsShareId?.trim()?.length > 0 &&
                      shareWSMemberId !== undefined &&
                      shareWSMemberId !== null &&
                      shareWSMemberId?.trim()?.length > 0
                    ? [
                        CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                        wsShareId,
                        shareWSMemberId
                      ]
                    : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN]
              }) ?? [];

            const _oldLinkInBios =
              extractInnerData<LinkInBioType[]>(
                _libCacheData,
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // added LinkInBio to all LinkInBios data in cache.
            const _updatedLinkInBios = [..._oldLinkInBios, _data];

            // Updating all shortLinks data in RQ cache.
            await updateRQCDataHandler<LinkInBioType[] | undefined>({
              key:
                workspaceId !== undefined &&
                workspaceId !== null &&
                workspaceId?.trim()?.length > 0
                  ? [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                      workspaceId
                    ]
                  : wsShareId !== undefined &&
                    wsShareId !== null &&
                    wsShareId?.trim()?.length > 0 &&
                    shareWSMemberId !== undefined &&
                    shareWSMemberId !== null &&
                    shareWSMemberId?.trim()?.length > 0
                  ? [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                      wsShareId,
                      shareWSMemberId
                    ]
                  : [CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN],
              data: _updatedLinkInBios,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItems,
              updateHoleData: true
            });

            setZUserCurrentLimitsRState(oldValues => ({
              ...oldValues,
              [planFeaturesEnum.linkInBio]: _updatedLinkInBios?.length
            }));

            // after dismissing redirecting to edit link-in-bio-page
            zNavigatePushRoute !== undefined &&
              zNavigatePushRoute(
                createRedirectRoute({
                  url: ZaionsRoutes.AdminPanel.LinkInBio.Edit,
                  params: [
                    CONSTANTS.RouteParams.workspace.workspaceId,
                    CONSTANTS.RouteParams.linkInBio.linkInBioId
                  ],
                  values: [workspaceId, _data?.id ?? ''],
                  routeSearchParams: {
                    page: ZLinkInBioPageEnum.design,
                    step: ZLinkInBioRHSComponentEnum.theme
                  }
                })
              );

            // After api and recoil storing dismissing modal
            dismissZIonModal();
          }
        }
      }
    } catch (error) {}
  };

  // #region Comp Constants
  const formikInitialValues = {
    linkInBioTitle: '',
    shortUrlDomain: ENVS.defaultShortUrlDomain
  };
  // #endregion

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
        <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
          <ZIonImg
            src={ProductFavicon}
            className='w-12 h-12 mx-auto'
          />
        </div>

        <ZIonText
          color='dark'
          className='mt-3 text-xl font-bold'>
          Create a new Link-in-bio
        </ZIonText>

        <Formik
          initialValues={formikInitialValues}
          validate={values => {
            const errors = {};
            validateField('linkInBioTitle', values, errors);
            return errors;
          }}
          onSubmit={async values => {
            try {
              // Making an api call creating new link in bio
              const zStringifyData = zStringify({
                linkInBioTitle: values.linkInBioTitle,
                shortUrlDomain: values.shortUrlDomain,
                theme: zStringify(ZaionsLinkInBioDefaultData.theme), // passing default data with title
                folderId: CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
                tags: zStringify([])
              });
              await FormikSubmitHandler(zStringifyData);
            } catch (error) {
              reportCustomError(error);
            }
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            submitForm
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
                    touched?.linkInBioTitle === true
                      ? errors.linkInBioTitle
                      : undefined
                  }
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formModal.titleInput
                  }
                  className={classNames({
                    'mt-5 ion-text-start': true,
                    'ion-touched': touched?.linkInBioTitle === true,
                    'ion-invalid': errors.linkInBioTitle,
                    'ion-valid':
                      touched?.linkInBioTitle === true &&
                      (errors.linkInBioTitle === undefined ||
                        errors.linkInBioTitle === null)
                  })}
                />

                <ZIonButton
                  expand='block'
                  className='mt-4'
                  onClick={() => {
                    void submitForm();
                  }}
                  testingselector={
                    CONSTANTS.testingSelectors.linkInBio.formModal.submitFormBtn
                  }>
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
