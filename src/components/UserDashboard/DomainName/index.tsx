// Core Imports
import React, { useEffect } from 'react';

// Packages Import
import {
  alertCircleOutline,
  checkmarkOutline,
  laptopOutline
} from 'ionicons/icons';
import { useRecoilValue } from 'recoil';
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import { useParams } from 'react-router';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonInput,
  ZIonSkeletonText,
  ZIonButton,
  ZIonSelect,
  ZIonSelectOption
} from '@/components/ZIonComponents';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

// Global Constants
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import {
  useZGetRQCacheData,
  useZRemoveRQCacheData,
  useZRQGetRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';

// Images

// Recoil States
import { DefaultDomainsState } from '@/ZaionsStore/UserDashboard/CustomDomainState';

// Types
import { type ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

// Styles

const DomainName: React.FC<{ showSkeleton?: boolean }> = ({
  showSkeleton = false
}) => {
  const DefaultDomains = useRecoilValue(DefaultDomainsState);
  const {
    initialValues,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldError,
    setFieldValue
  } = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  const { isSmScale } = useZMediaQueryScale();
  const { removeRQCDataHandler } = useZRemoveRQCacheData();
  const { getRQCDataHandler } = useZGetRQCacheData();

  // getting workspace and shortlink ids from url with the help of useParams.
  const { editLinkId, workspaceId } = useParams<{
    workspaceId: string;
    editLinkId: string;
  }>();

  const { data: zIsPathAvailable, refetch: refetchZIsPathAvailable } =
    useZRQGetRequest<{ isAvailable: boolean; message: string; value: string }>({
      _url: API_URL_ENUM.shortLinks_is_path_available,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.IS_PATH_AVAILABLE,
        workspaceId
      ],
      _shouldFetchWhenIdPassed: !(
        values?.shortUrlPath !== undefined &&
        values?.shortUrlPath?.trim()?.length === 6 &&
        initialValues?.shortUrlPath !== values?.shortUrlPath
      ),
      _itemsIds: [workspaceId, values?.shortUrlPath ?? ''],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.shortLink.path
      ],
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });

  const isZEditMode = editLinkId?.trim()?.length > 0;

  useEffect(() => {
    try {
      if (
        zIsPathAvailable?.isAvailable === false &&
        (zIsPathAvailable?.message).length > 0 &&
        zIsPathAvailable?.value === values.shortUrlPath
      ) {
        setFieldError('shortUrlPath', zIsPathAvailable?.message);
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zIsPathAvailable?.isAvailable]);

  if (showSkeleton) {
    return <DomainNameSkeleton />;
  }

  return (
    <>
      {/* Row-1 */}
      <ZIonRow className='pt-2 mt-4 border-bottom zaions__bg_white ion-align-items-center'>
        {/* Col-1 */}
        <ZIonCol className='flex px-3 py-1 ion-align-items-center'>
          {/* Icon */}
          <ZIonIcon
            icon={laptopOutline}
            size='large'
          />

          {/* Text */}
          <ZIonText className='font-bold ion-no-margin ps-2'>
            Choose domain name
            <ZIonRouterLink
              routerLink={ZaionsRoutes.HomeRoute}
              className='ms-1'>
              (help)
            </ZIonRouterLink>
          </ZIonText>
        </ZIonCol>

        {isZEditMode ? (
          <ZIonCol size='max-content'>
            <ZIonIcon
              icon={alertCircleOutline}
              className='w-6 h-6 cursor-pointer me-2'
              id='z-short-link-domain-edit-tooltip'
              color='warning'
            />

            <ZRTooltip
              anchorSelect='#z-short-link-domain-edit-tooltip'
              place='left'>
              <ZIonText>
                Short Link “Domain & Path” can not be <br /> changed once it’s
                created.
              </ZIonText>
            </ZRTooltip>
          </ZIonCol>
        ) : null}
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='px-3 pt-5 pb-3 zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol
          className={classNames({
            'pr-2': isSmScale,
            'mb-4': !isSmScale
          })}
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'>
          {/* Select */}
          <ZIonSelect
            name='shortUrlDomain'
            label='Select Domain'
            labelPlacement='stacked'
            fill='outline'
            minHeight='2.3rem'
            interface='popover'
            disabled={isZEditMode}
            value={values?.shortUrlDomain}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.customDomain
                .domainSelector
            }
            onIonChange={e => {
              if (!isZEditMode) {
                handleChange(e);
              }
            }}
            onIonBlur={e => {
              if (!isZEditMode) {
                handleBlur(e);
              }
            }}>
            {DefaultDomains?.map((el, index) => {
              return (
                <ZIonSelectOption
                  key={index}
                  value={el.id}>
                  {el.name}
                </ZIonSelectOption>
              );
            })}
          </ZIonSelect>
        </ZIonCol>

        {/* Col-2 */}
        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'
          className='flex'>
          {/* Customize input */}
          <ZIonInput
            name='shortUrlPath'
            label='Customize'
            labelPlacement='stacked'
            fill='outline'
            minHeight='2.3rem'
            maxlength={6}
            counter={true}
            disabled={isZEditMode}
            value={values?.shortUrlPath}
            errorText={
              touched?.shortUrlPath !== undefined
                ? errors?.shortUrlPath
                : undefined
            }
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.customDomain
                .customizeInput
            }
            onIonChange={e => {
              if (!isZEditMode) {
                handleChange(e);
                void setFieldValue('isShortUrlPathValid', false, false);
                const _oldValue = getRQCDataHandler({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS
                      .IS_PATH_AVAILABLE,
                    workspaceId
                  ]
                });

                if (_oldValue !== undefined) {
                  removeRQCDataHandler({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS
                        .IS_PATH_AVAILABLE,
                      workspaceId
                    ]
                  });
                }
              }
            }}
            onIonBlur={e => {
              if (!isZEditMode) {
                handleBlur(e);

                if (
                  zIsPathAvailable?.isAvailable === false &&
                  (errors.shortUrlPath?.trim()?.length === 0 ||
                    errors.shortUrlPath === undefined ||
                    errors.shortUrlPath === null)
                ) {
                  setFieldError(
                    'shortUrlPath',
                    zIsPathAvailable?.message ?? 'Error Occurred'
                  );
                }
              }
            }}
            helperText={
              !isZEditMode
                ? touched?.shortUrlPath === true
                  ? values?.shortUrlPath?.trim().length === 6
                    ? zIsPathAvailable?.isAvailable === true
                      ? 'Path is available.'
                      : 'click the check button to check if available.'
                    : 'Path must be 6 character long.'
                  : 'Enter a custom path (6 characters).'
                : undefined
            }
            className={classNames({
              'p-0': true,
              'zaions_ion_color_success z_border_color_success ion-valid':
                touched?.shortUrlPath === true &&
                zIsPathAvailable?.isAvailable === true &&
                (errors.shortUrlPath?.trim()?.length === 0 ||
                  errors.shortUrlPath === undefined ||
                  errors.shortUrlPath === null) &&
                values?.shortUrlPath?.trim().length === 6,

              //
              'ion-touched': touched?.shortUrlPath,

              //
              'ion-invalid zaions_ion_color_danger z_border_color_danger':
                touched?.shortUrlPath === true &&
                errors?.shortUrlPath !== undefined &&
                errors?.shortUrlPath !== null &&
                errors?.shortUrlPath?.trim()?.length > 0
            })}
          />

          {values?.shortUrlPath !== null &&
            values?.shortUrlPath !== undefined &&
            values?.shortUrlPath?.trim()?.length > 0 &&
            initialValues?.shortUrlPath !== values?.shortUrlPath && (
              <ZIonButton
                className='ion-no-margin ms-1'
                height='2.2rem'
                id='z-shortlink-check-domain-url-path-available-tooltip'
                disabled={
                  errors?.shortUrlPath !== null &&
                  errors?.shortUrlPath !== undefined &&
                  errors?.shortUrlPath?.trim()?.length > 0
                }
                testingselector={
                  CONSTANTS.testingSelectors.shortLink.formPage.customDomain
                    .customizeCheckBtn
                }
                onClick={() => {
                  void (async () => {
                    try {
                      if (
                        values?.shortUrlPath !== null &&
                        values?.shortUrlPath !== undefined &&
                        values?.shortUrlPath?.trim()?.length > 0 &&
                        initialValues?.shortUrlPath !== values?.shortUrlPath
                      ) {
                        await refetchZIsPathAvailable();
                      }
                    } catch (error) {
                      reportCustomError(error);
                    }
                  })();
                }}>
                <ZIonIcon icon={checkmarkOutline} />
              </ZIonButton>
            )}

          <ZRTooltip
            anchorSelect='#z-shortlink-check-domain-url-path-available-tooltip'
            place='top'
            content='Check'
          />
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

// Skeleton
export const DomainNameSkeleton: React.FC = React.memo(() => {
  return (
    <>
      {/* Row-1 */}
      <ZIonRow className='pt-2 mt-4 border-bottom zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol className='flex px-3 py-1 ion-align-items-center'>
          {/* Icon */}
          <ZIonIcon
            icon={laptopOutline}
            size='large'
          />

          {/* Text */}
          <ZIonText className='font-bold ion-no-margin ps-2'>
            Choose domain name
            <ZIonRouterLink
              routerLink={ZaionsRoutes.HomeRoute}
              className='ms-1'>
              (help)
            </ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='px-3 pt-2 pb-3 zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol className='pr-2'>
          {/* Select */}
          <ZIonSkeletonText
            className='mt-3'
            width='100%'
            height='40px'
          />
        </ZIonCol>

        {/* Col-2 */}
        <ZIonCol>
          {/* Customize input */}
          <ZIonSkeletonText
            className='mt-3'
            width='100%'
            height='40px'
            animated={true}
          />
        </ZIonCol>
      </ZIonRow>
    </>
  );
});
DomainNameSkeleton.displayName = 'DomainNameSkeleton';

export default DomainName;
