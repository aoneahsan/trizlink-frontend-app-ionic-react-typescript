/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import VALIDATOR from 'validator';
import { settingsOutline } from 'ionicons/icons';
import { Formik } from 'formik';
import classNames from 'classnames';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import AddNotes from '@/components/UserDashboard/AddNotes';
import Tags from '@/components/UserDashboard/Tags';
import RotatorABTesting from '@/components/UserDashboard/RotatorABTesting';
import GeoLocation from '@/components/UserDashboard/GeoLocation';
import LinkExpiration from '@/components/UserDashboard/LinkExpiration';
import LinkPassword from '@/components/UserDashboard/Password';
import LinkFavIcon from '@/components/UserDashboard/Favicon';
import GDPRPopup from '@/components/UserDashboard/GDPRPopup';
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonFooter,
  ZIonButton
} from '@/components/ZIonComponents';
import ZaionsCustomYourLink from '@/components/UserDashboard/shortUrlCustomYourLink';
import LinksPixelsAccount from '@/components/UserDashboard/LinksPixelsAccount';
import UTMTagTemplates from '@/components/UserDashboard/UTMTagTemplates';
import DomainName from '@/components/UserDashboard/DomainName';
import {
  useZGetRQCacheData,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import MESSAGES from '@/utils/messages';
import {
  extractInnerData,
  validateField,
  zJsonParse,
  zStringify
} from '@/utils/helpers';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE
} from '@/utils/enums';
import CONSTANTS from '@/utils/constants';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type ABTestingRotatorInterface,
  type GeoLocationRotatorInterface,
  folderState
} from '@/types/AdminPanel/index.type';
import { reportCustomError } from '@/utils/customErrorType';
import NewLinkFolder from '@/components/UserDashboard/NewLinkFolder';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { type LinkInBioType } from '@/types/AdminPanel/linkInBioType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { showSuccessNotification } from '@/utils/notification';

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

const LinkInBioShareSettings: React.FC = () => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);

  const { linkInBioId, workspaceId } = useParams<{
    linkInBioId?: string;
    workspaceId?: string;
  }>();

  // #region Custom hooks.
  const { isLgScale, isMdScale } = useZMediaQueryScale();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  // #endregion

  // #region APIS
  // fetching link-in-bio with the linkInBioId data from backend.
  const { data: selectedLinkInBio, isFetching: isSelectedLinkInBioFetching } =
    useZRQGetRequest<LinkInBioType>({
      _url: API_URL_ENUM.linkInBio_update_delete,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET,
        workspaceId ?? '',
        linkInBioId ?? ''
      ],
      _authenticated: true,
      _itemsIds: [linkInBioId ?? '', workspaceId ?? ''],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.linkInBio.linkInBioId,
        CONSTANTS.RouteParams.workspace.workspaceId
      ],
      _shouldFetchWhenIdPassed: !(
        linkInBioId !== undefined && (linkInBioId?.trim()?.length ?? 0) > 0
      ),
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  // Update Link-in-bio API.
  const { mutateAsync: UpdateLinkInBio } = useZRQUpdateRequest({
    _url: API_URL_ENUM.linkInBio_update_delete
  });

  // #endregion

  // #region Functions.
  // Formik submit handler.
  const FormikSubmissionHandler = async (
    _reqDataStr: string
  ): Promise<void> => {
    try {
      if (_reqDataStr?.trim()?.length > 0) {
        // The update api...
        const _response = await UpdateLinkInBio({
          itemIds: [workspaceId ?? '', linkInBioId ?? ''],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.linkInBio.linkInBioId
          ],
          requestData: _reqDataStr
        });

        if (_response !== undefined) {
          // extract Data from _response.
          const _data = extractInnerData<LinkInBioType>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          // if we have data then show success message.
          if (_data?.id !== undefined && _data?.id !== null) {
            const _oldLinkInBios =
              extractInnerData<LinkInBioType[]>(
                getRQCDataHandler<LinkInBioType[]>({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                    workspaceId ?? ''
                  ]
                }) ?? [],
                extractInnerDataOptionsEnum.createRequestResponseItems
              ) ?? [];

            // Updating all link in bio data in RQ cache.
            await updateRQCDataHandler<LinkInBioType | undefined>({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET,
                workspaceId ?? '',
                linkInBioId ?? ''
              ],
              data: _data,
              id: '',
              extractType: ZRQGetRequestExtractEnum.extractItem,
              updateHoleData: true
            });

            if (_oldLinkInBios?.length > 0) {
              await updateRQCDataHandler<LinkInBioType | undefined>({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.MAIN,
                  workspaceId ?? ''
                ],
                data: _data,
                id: _data?.id
              });
            }
            // Updating current link in bio data in RQ cache.
          }
        }

        showSuccessNotification(MESSAGES.LINK_IN_BIO.CREATED);

        // if __response of the updateLinkInBio api is success this showing success notification else not success then error notification.
        // await validateRequestResponse({
        // resultObj: __response,
        // successNotificationType: notificationTypeEnum.sideNotification,
        // });
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  const isZFetching = isSelectedLinkInBioFetching;

  const formikInitialValues = {
    title: selectedLinkInBio?.title ?? '',
    linkDescription: selectedLinkInBio?.description ?? '',
    featureImg: selectedLinkInBio?.featureImg ?? '',
    password: {
      value: selectedLinkInBio?.password?.value ?? '',
      enabled: selectedLinkInBio?.password?.enabled ?? false
    },
    folderId:
      selectedLinkInBio?.folderId ?? CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
    linkNote: selectedLinkInBio?.notes ?? '',
    tags:
      selectedLinkInBio?.tags !== null && selectedLinkInBio?.tags !== undefined
        ? zJsonParse(String(selectedLinkInBio.tags))
        : [],
    linkExpiration: {
      enabled: selectedLinkInBio?.linkExpirationInfo?.enabled ?? false,
      expirationDate:
        selectedLinkInBio?.linkExpirationInfo?.expirationDate ?? '',
      timezone: selectedLinkInBio?.linkExpirationInfo?.timezone ?? '',
      redirectionLink:
        selectedLinkInBio?.linkExpirationInfo?.redirectionLink ?? ''
    },
    rotatorABTesting: selectedLinkInBio?.abTestingRotatorLinks ?? [],
    geoLocation: selectedLinkInBio?.geoLocationRotatorLinks ?? [],
    shortUrl: {
      domain: selectedLinkInBio?.shortUrl?.domain ?? '',
      url: selectedLinkInBio?.shortUrl?.url ?? ''
    },
    linkPixelsAccount: selectedLinkInBio?.pixelIds ?? [],
    UTMTags: {
      templateId: selectedLinkInBio?.utmTagInfo?.templateId ?? '',
      utmCampaign: selectedLinkInBio?.utmTagInfo?.utmCampaign ?? '',
      utmMedium: selectedLinkInBio?.utmTagInfo?.utmMedium ?? '',
      utmSource: selectedLinkInBio?.utmTagInfo?.utmSource ?? '',
      utmTerm: selectedLinkInBio?.utmTagInfo?.utmTerm ?? '',
      utmContent: selectedLinkInBio?.utmTagInfo?.utmContent ?? ''
    },
    favicon: selectedLinkInBio?.favicon ?? ''

    // complete page fields here
  };

  return (
    <Formik
      // #region ( Initial Values Start  )
      initialValues={formikInitialValues}
      enableReinitialize={true}
      // #endregion ( Initial Values End  )

      // #region ( Handling Validation & Errors Start  )
      validate={values => {
        const errors: {
          target: {
            url?: string;
            phoneNumber?: string;
            username?: string;
            email?: string;
            accountId?: string;
            subject?: string;
            message?: string;
          };
          title?: string;
          password: {
            value?: string;
          };
          linkExpiration: {
            redirectionLink?: string;
          };
          rotatorABTesting: Array<{
            redirectionLink?: string;
            percentage?: string;
          }>;
          geoLocation: Array<{
            redirectionLink?: string;
            country?: string;
          }>;
        } = {
          target: {},
          linkExpiration: {},
          rotatorABTesting: [],
          geoLocation: [],
          password: {}
        };

        // Link Title Validation Starts
        validateField('title', values, errors, VALIDATION_RULE.linkTitle);
        // Link Title Validation End

        // Password Validation Start
        if (values.password.enabled) {
          validateField(
            'value',
            values?.password,
            errors?.password,
            VALIDATION_RULE.password
          );
        }
        // Password Validation End

        // Link Expiration Validation Start
        if (values.linkExpiration.enabled) {
          validateField(
            'redirectionLink',
            values?.linkExpiration,
            errors?.linkExpiration,
            VALIDATION_RULE.url
          );
        }
        //  Link Expiration Validation End

        // Rotator AB Testing Field Validation Start
        if (values.rotatorABTesting.length > 0) {
          errors.rotatorABTesting = values.rotatorABTesting.map(el => ({}));
          values.rotatorABTesting.forEach(
            (el: ABTestingRotatorInterface, index) => {
              if (
                el.redirectionLink === undefined ||
                el.redirectionLink === null ||
                el.redirectionLink?.trim()?.length === 0
              ) {
                errors.rotatorABTesting[index].redirectionLink =
                  MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.REQUIRED_REDIRECTION_LINK;
              } else if (!VALIDATOR.isURL(el.redirectionLink)) {
                errors.rotatorABTesting[index].redirectionLink =
                  MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.INVALID_REDIRECTION_LINK;
              }
              if (
                el.percentage === undefined ||
                el.percentage === null ||
                el.percentage === 0 ||
                isNaN(el.percentage)
              ) {
                errors.rotatorABTesting[index].percentage =
                  MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.REQUIRED_PERCENTAGE;
              }
            }
          );
        }
        // Rotator AB Testing Field Validation End

        // Rotator Geo Location Field Validation Start
        if (values.geoLocation.length > 0) {
          errors.geoLocation = values.geoLocation.map(el => ({}));
          values.geoLocation.forEach(
            (el: GeoLocationRotatorInterface, index) => {
              if (
                el.redirectionLink === undefined ||
                el.redirectionLink === null ||
                el.redirectionLink?.trim()?.length === 0
              ) {
                errors.geoLocation[index].redirectionLink =
                  MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_REDIRECTION_LINK;
              } else if (!VALIDATOR.isURL(el.redirectionLink)) {
                errors.geoLocation[index].redirectionLink =
                  MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.INVALID_REDIRECTION_LINK;
              }
              if (
                el.country === undefined ||
                el.country === null ||
                el.country?.length === 0
              ) {
                errors.geoLocation[index].country =
                  MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_COUNTRY;
              }
            }
          );
        }
        // Rotator Geo Location Field Validation End

        // check for errors if there are any return errors object otherwise return []
        if (
          (errors.target?.url?.trim() ??
            errors.target?.accountId?.trim() ??
            errors.target?.email?.trim() ??
            errors.target?.message?.trim() ??
            errors.target?.username?.trim() ??
            errors.target?.phoneNumber?.trim() ??
            errors.target?.subject?.trim() ??
            errors.linkExpiration?.redirectionLink?.trim() ??
            errors.title?.trim() ??
            errors.password?.value?.trim()) !== null
          // ?? Object.keys(errors.geoLocation).length ??
          // Object.keys(errors.rotatorABTesting).length
        ) {
          return errors;
        } else {
          return [];
        }
      }}
      // #endregion ( Handling Validation & Errors End  )

      onSubmit={async (values, { resetForm }) => {
        await FormikSubmissionHandler(
          zStringify({
            ...selectedLinkInBio,
            theme: zStringify(selectedLinkInBio?.theme),
            settings: zStringify(selectedLinkInBio?.settings),
            title: values.title,
            featureImg: values.featureImg,
            password: zStringify({
              value: values.password.value,
              enabled: values.password.enabled
            }),
            linkExpirationInfo: zStringify({
              redirectionLink: values.linkExpiration.redirectionLink,
              expirationDate: values.linkExpiration.expirationDate,
              timezone: values.linkExpiration.timezone,
              enabled: values.linkExpiration.enabled
            }),
            abTestingRotatorLinks: zStringify(values.rotatorABTesting),
            geoLocationRotatorLinks: zStringify(values.geoLocation),
            description: values.linkDescription,
            folderId: values.folderId,
            notes: values.linkNote,
            pixelIds: zStringify(values.linkPixelsAccount),
            tags: zStringify(values.tags),
            utmTagInfo: zStringify(values.UTMTags),
            createdAt: Date.now().toString(),
            shortUrl: zStringify(values.shortUrl),
            favicon: values.favicon
          })
        );
      }}>
      {({ isSubmitting, isValid, dirty, submitForm }) => {
        return (
          <>
            <ZIonContent color='light'>
              <div className='w-full h-full'>
                {/* Custom your link Grid */}
                <ZIonGrid
                  className={classNames({
                    'my-5': true,
                    'ms-3': isMdScale,
                    'mx-2': !isMdScale
                  })}>
                  <ZIonRow
                    className={classNames({
                      'gap-4': isLgScale,
                      'gap-0': !isLgScale
                    })}>
                    {/* Custom Your Link */}
                    <ZaionsCustomYourLink showSkeleton={isZFetching} />

                    {/* Pixel Account, Utm Tags, Custom Domain */}
                    <ZIonCol
                      sizeXl='5.9'
                      sizeLg='5.8'
                      sizeMd='5.9'
                      sizeSm='12'
                      sizeXs='12'>
                      {/* Pixels */}
                      <LinksPixelsAccount showSkeleton={isZFetching} />

                      {/* UTMTags */}
                      <UTMTagTemplates showSkeleton={isZFetching} />

                      {/* Choose Domain Name */}
                      <DomainName showSkeleton={isZFetching} />
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>

                {/* Advance Options */}
                <ZIonGrid className='ms-3 me-1'>
                  <ZIonRow>
                    <ZIonCol>
                      <ZIonButton
                        // size='large'
                        // size={isMdScale ? 'large' : 'default'}
                        expand='block'
                        disabled={isZFetching}
                        onClick={() => {
                          if (!isZFetching) {
                            setShowAdvanceOptions(oldVal => !oldVal);
                          }
                        }}
                        className={classNames({
                          'ion-text-capitalize': true,
                          'mx-0': !isMdScale
                        })}>
                        <ZIonText className='flex py-2 text-lg ion-no-margin ion-align-items-center'>
                          Advance Options
                        </ZIonText>
                        <ZIonIcon
                          slot='end'
                          icon={settingsOutline}
                          className='w-6 h-6 ms-auto me-1'
                        />
                      </ZIonButton>
                      {showAdvanceOptions && (
                        <ZIonRow className='gap-5 ion-margin-top'>
                          {/* Folder */}
                          <NewLinkFolder
                            _foldersData={[]}
                            _state={folderState.linkInBio}
                          />

                          {/* Add Notes */}
                          <AddNotes />

                          {/* Tags */}
                          <Tags />

                          {/* Rotator - AB Testing */}
                          <RotatorABTesting />

                          {/* Geo Location */}
                          <GeoLocation />

                          {/* Link Expiration */}
                          <LinkExpiration />

                          {/* Link Password */}
                          <LinkPassword />

                          {/* Link Favicon */}
                          <LinkFavIcon />

                          {/* GDPR Popup */}
                          <GDPRPopup />
                        </ZIonRow>
                      )}
                    </ZIonCol>
                  </ZIonRow>
                </ZIonGrid>
              </div>
            </ZIonContent>
            <ZIonFooter>
              <ZIonGrid className='mx-4 mt-3'>
                <ZIonRow>
                  <ZIonCol>
                    <ZIonButton
                      expand='full'
                      onClick={() => {
                        void submitForm();
                      }}
                      disabled={isSubmitting || !isValid || !dirty}>
                      Save Changes
                    </ZIonButton>
                  </ZIonCol>
                </ZIonRow>
              </ZIonGrid>
            </ZIonFooter>
          </>
        );
      }}
    </Formik>
  );
};

export default LinkInBioShareSettings;
