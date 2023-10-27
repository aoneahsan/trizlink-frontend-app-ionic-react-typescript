// Core Imports
import React, { useEffect } from 'react';

// Packages Import
import { pricetagOutline } from 'ionicons/icons';
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import isURL from 'validator/lib/isURL';
import { useParams } from 'react-router';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonInput,
  ZIonRow,
  ZIonList,
  ZIonGrid,
  ZIonSkeletonText
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import ZaionsAddUtmTags from '@/components/InPageComponents/ZaionsModals/AddUtmTags';
import { ZIonButton } from '@/components/ZIonComponents';

// Global Constants
import {
  formatReactSelectOption,
  stringifyZQueryString,
  zAddUrlProtocol,
  zExtractUrlParts
} from '@/utils/helpers';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';

// Images

// Recoil States

// Types
import {
  UTMTagTemplateType,
  ZaionsShortUrlOptionFieldsValuesInterface
} from '@/types/AdminPanel/linksType';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import ZCan from '@/components/Can';

// Styles

const UTMTagTemplates: React.FC<{ showSkeleton?: boolean }> = ({
  showSkeleton = false
}) => {
  // getting link-in-bio and workspace ids from url with the help of useParams.
  const { editLinkId, workspaceId, shareWSMemberId, wsShareId } = useParams<{
    editLinkId: string;
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  const { values, setFieldValue, handleBlur, handleChange } =
    useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  // #region Custom hooks
  const { isSmScale } = useZMediaQueryScale();
  // #endregion

  // #region Modals & Popovers.
  const { presentZIonModal: presentUtmTagsModal } = useZIonModal(
    ZaionsAddUtmTags,
    { workspaceId, shareWSMemberId, wsShareId }
  );
  // #endregion

  // #region APIS.
  // If owned workspace then this api will fetch current owned workspace utm tags data.
  const { data: _UTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.userAccountUtmTags_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN, workspaceId],
    _shouldFetchWhenIdPassed: workspaceId ? false : true,
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showLoader: false
  });

  // If share workspace then this api will fetch current share workspace utm tags data.
  const { data: _SWSUTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
    _url: API_URL_ENUM.sws_utm_tag_create_list,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.SWS_MAIN],
    _shouldFetchWhenIdPassed: wsShareId ? false : true,
    _itemsIds: [shareWSMemberId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showLoader: false
  });
  // #endregion

  // #region Functions.
  const selectFromTemplate = (_selectedTemplateId: string) => {
    let __selectedTemp;

    if (workspaceId) {
      __selectedTemp =
        _UTMTagsData &&
        _UTMTagsData.length &&
        _UTMTagsData.find(({ id }) => id === _selectedTemplateId);
    } else if (wsShareId) {
      __selectedTemp =
        _SWSUTMTagsData &&
        _SWSUTMTagsData.length &&
        _SWSUTMTagsData.find(({ id }) => id === _selectedTemplateId);
    }

    if (__selectedTemp) {
      const __selectedUtmTagInfo = {
        templateId: __selectedTemp.id,
        utmCampaign: __selectedTemp.utmCampaign,
        utmContent: __selectedTemp.utmContent,
        utmMedium: __selectedTemp.utmMedium,
        utmSource: __selectedTemp.utmSource,
        utmTerm: __selectedTemp.utmTerm
      };
      setFieldValue('UTMTags', __selectedUtmTagInfo, true);
    }
  };
  // #endregion

  useEffect(() => {
    try {
      const { utmCampaign, utmMedium, utmSource, utmTerm, utmContent } =
        values.UTMTags;
      const _queryParams: { [key: string]: string } = {};
      const _baseURL = zAddUrlProtocol(values?.target?.url || '');

      if (_baseURL && isURL(_baseURL)) {
        const _baseUrlWithoutParams = zExtractUrlParts(_baseURL).origin;

        if (utmCampaign && utmCampaign.length > 0) {
          _queryParams.utm_campaign = utmCampaign;
        }

        if (utmMedium && utmMedium.length > 0) {
          _queryParams.utm_medium = utmMedium;
        }

        if (utmSource && utmSource.length > 0) {
          _queryParams.utm_source = utmSource;
        }

        if (utmTerm && utmTerm.length > 0) {
          _queryParams.utm_term = utmTerm;
        }

        if (utmContent && utmContent.length > 0) {
          _queryParams.utm_content = utmContent;
        }

        const _queryStringParams = stringifyZQueryString(_queryParams);

        setFieldValue(
          'target.url',
          `${_baseUrlWithoutParams}${
            _queryStringParams ? `?${_queryStringParams}` : ''
          }`,
          false
        );
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [
    values.UTMTags.utmCampaign,
    values.UTMTags.utmMedium,
    values.UTMTags.utmContent,
    values.UTMTags.utmSource,
    values.UTMTags.utmTerm
  ]);

  if (showSkeleton) {
    return <UTMTagTemplatesSkeleton />;
  }

  return (
    <>
      {/* Row-1 */}
      <ZIonRow className='pt-1 mt-4 border-bottom zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol className='flex px-3 py-2 ion-align-items-center'>
          {/* Icon */}
          <ZIonIcon
            icon={pricetagOutline}
            size='large'
          />

          {/* Text */}
          <ZIonText className='font-bold ms-2 ion-no-margin'>
            Add UTMs tags
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol>
          {/* List */}
          <ZCan
            shareWSId={wsShareId}
            permissionType={
              wsShareId
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }
            havePermissions={
              wsShareId
                ? [
                    shareWSPermissionEnum.create_sws_utmTag,
                    shareWSPermissionEnum.update_sws_utmTag
                  ]
                : [permissionsEnum.create_utmTag, permissionsEnum.update_utmTag]
            }>
            <ZIonList className='pb-0 zaions__bg_white'>
              {/* List -> Gird */}
              <ZIonGrid className='pt-0 pb-0'>
                {/* List -> Row */}
                <ZIonRow className='px-2 py-0 pb-0'>
                  {/* List -> Row -> Col-1 */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='12'
                    className='pr-2 h-max'>
                    {/* utm campaign input */}
                    <ZIonInput
                      label='UTM Campaign'
                      labelPlacement='stacked'
                      className='mt-3'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      value={values.UTMTags.utmCampaign}
                      name='UTMTags.utmCampaign'
                      placeholder='Enter text'
                      minHeight='40px'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage.utmTags
                          .campaignInput
                      }
                    />
                  </ZIonCol>

                  {/* List -> Row -> Col-2 */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='12'
                    className={classNames({
                      'h-max': true,
                      'mt-2': !isSmScale
                    })}>
                    {/* utm medium input */}
                    <ZIonInput
                      label='UTM Medium'
                      labelPlacement='stacked'
                      className='mt-3'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      value={values.UTMTags.utmMedium}
                      name='UTMTags.utmMedium'
                      placeholder='Enter text'
                      minHeight='40px'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage.utmTags
                          .mediumInput
                      }
                    />
                  </ZIonCol>

                  {/* List -> Row -> Col-3 */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='12'
                    className='pr-2 h-max'>
                    {/* utm source input */}
                    <ZIonInput
                      label='UTM Source'
                      labelPlacement='stacked'
                      className='mt-2'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      value={values.UTMTags.utmSource}
                      name='UTMTags.utmSource'
                      placeholder='Enter text'
                      minHeight='40px'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage.utmTags
                          .sourceInput
                      }
                    />
                  </ZIonCol>

                  {/* List -> Row -> Col-4 */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='12'
                    className='h-max'>
                    {/* utm term input */}
                    <ZIonInput
                      label='UTM Term'
                      labelPlacement='stacked'
                      className='mt-2'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      value={values.UTMTags.utmTerm}
                      name='UTMTags.utmTerm'
                      placeholder='Enter text'
                      minHeight='40px'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage.utmTags
                          .termInput
                      }
                    />
                  </ZIonCol>

                  {/* List -> Row -> Col-5 */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='12'
                    className='pr-2 h-max'>
                    {/* utm content input */}
                    <ZIonInput
                      label='UTM Content'
                      labelPlacement='stacked'
                      className='mt-2'
                      onIonChange={handleChange}
                      onIonBlur={handleBlur}
                      value={values.UTMTags.utmContent}
                      name='UTMTags.utmContent'
                      placeholder='Enter text'
                      minHeight='40px'
                      testingselector={
                        CONSTANTS.testingSelectors.shortLink.formPage.utmTags
                          .contentInput
                      }
                    />
                  </ZIonCol>

                  {/* List -> Row -> Col-6 */}
                  <ZCan
                    shareWSId={wsShareId}
                    permissionType={
                      wsShareId
                        ? permissionsTypeEnum.shareWSMemberPermissions
                        : permissionsTypeEnum.loggedInUserPermissions
                    }
                    havePermissions={
                      wsShareId
                        ? [shareWSPermissionEnum.create_sws_utmTag]
                        : [permissionsEnum.create_utmTag]
                    }>
                    <ZIonCol
                      sizeXl='6'
                      sizeLg='6'
                      sizeMd='6'
                      sizeSm='6'
                      sizeXs='12'
                      className='flex ion-align-items-center ps-2'>
                      {/* Add a template button */}
                      <ZIonButton
                        fill='clear'
                        className='mt-2 text-md ion-text-capitalize ion-no-margin ion-no-padding'
                        size='small'
                        testingselector={
                          CONSTANTS.testingSelectors.shortLink.formPage.utmTags
                            .addTemplateBtn
                        }
                        onClick={() => {
                          presentUtmTagsModal({
                            _cssClass: 'utm-tags-modal-size'
                          });
                        }}>
                        Add a new template
                      </ZIonButton>
                    </ZIonCol>
                  </ZCan>
                </ZIonRow>
              </ZIonGrid>
            </ZIonList>
          </ZCan>

          {/* select from templates. */}
          <ZaionsRSelect
            className={classNames({
              'pt-1 pb-3 pr-2 ps-4': true,
              'w-[50%]': isSmScale,
              'w-full': !isSmScale
            })}
            testingselector={
              CONSTANTS.testingSelectors.shortLink.formPage.utmTags
                .selectTemplateSelector
            }
            options={
              workspaceId
                ? (_UTMTagsData?.map(el => {
                    return { value: el.id, label: el.templateName };
                  }) as ZaionsRSelectOptions[])
                : wsShareId
                ? (_SWSUTMTagsData?.map(el => {
                    return { value: el.id, label: el.templateName };
                  }) as ZaionsRSelectOptions[])
                : []
            }
            name='UTMTags.templateId'
            onChange={_value => {
              if (_value as ZaionsRSelectOptions) {
                selectFromTemplate(
                  (_value as ZaionsRSelectOptions)?.value as string
                );
              }
            }}
            value={
              formatReactSelectOption(
                values?.UTMTags?.templateId as string,
                _UTMTagsData as ZGenericObject[],
                'id',
                'templateName'
              ) || []
            }
          />
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

const UTMTagTemplatesSkeleton: React.FC = React.memo(() => {
  const { isSmScale } = useZMediaQueryScale();
  return (
    <>
      {/* Row-1 */}
      <ZIonRow className='pt-1 mt-4 border-bottom zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol className='flex px-3 py-2 ion-align-items-center'>
          {/* Icon */}
          <ZIonIcon
            icon={pricetagOutline}
            size='large'
          />

          {/* Text */}
          <ZIonText className='font-bold ms-2 ion-no-margin'>
            Add UTMs tags
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      {/* Row-2 */}
      <ZIonRow className='zaions__bg_white'>
        {/* Col-1 */}
        <ZIonCol>
          {/* List */}
          <ZIonList className='pb-0 zaions__bg_white'>
            {/* List -> Gird */}
            <ZIonGrid className='pt-0 pb-0'>
              {/* List -> Row */}
              <ZIonRow className='px-2 py-0 pb-0'>
                {/* List -> Row -> Col-1 */}
                <ZIonCol
                  sizeXl='6'
                  sizeLg='6'
                  sizeMd='6'
                  sizeSm='6'
                  sizeXs='12'
                  className='pr-2 h-max'>
                  {/* utm campaign input */}
                  <ZIonSkeletonText
                    animated={true}
                    className='mt-3'
                    width='100%'
                    height='40px'
                  />
                </ZIonCol>

                {/* List -> Row -> Col-2 */}
                <ZIonCol
                  sizeXl='6'
                  sizeLg='6'
                  sizeMd='6'
                  sizeSm='6'
                  sizeXs='12'
                  className='h-max'>
                  {/* utm medium input */}
                  <ZIonSkeletonText
                    animated={true}
                    className='mt-3'
                    width='100%'
                    height='40px'
                  />
                </ZIonCol>

                {/* List -> Row -> Col-3 */}
                <ZIonCol
                  sizeXl='6'
                  sizeLg='6'
                  sizeMd='6'
                  sizeSm='6'
                  sizeXs='12'
                  className='pr-2 mt-2 h-max'>
                  {/* utm source input */}
                  <ZIonSkeletonText
                    animated={true}
                    className='mt-3'
                    width='100%'
                    height='40px'
                  />
                </ZIonCol>

                {/* List -> Row -> Col-4 */}
                <ZIonCol
                  sizeXl='6'
                  sizeLg='6'
                  sizeMd='6'
                  sizeSm='6'
                  sizeXs='12'
                  className='mt-2 h-max'>
                  {/* utm term input */}
                  <ZIonSkeletonText
                    animated={true}
                    className='mt-3'
                    width='100%'
                    height='40px'
                  />
                </ZIonCol>

                {/* List -> Row -> Col-5 */}
                <ZIonCol
                  sizeXl='6'
                  sizeLg='6'
                  sizeMd='6'
                  sizeSm='6'
                  sizeXs='12'
                  className='pr-2 mt-2 h-max'>
                  {/* utm content input */}
                  <ZIonSkeletonText
                    animated={true}
                    className='mt-3'
                    width='100%'
                    height='40px'
                  />
                </ZIonCol>

                {/* List -> Row -> Col-6 */}
                <ZIonCol
                  sizeXl='6'
                  sizeLg='6'
                  sizeMd='6'
                  sizeSm='6'
                  sizeXs='12'
                  className='flex mt-2 ion-align-items-center ps-2'>
                  {/* Add a template button */}
                  <ZIonButton
                    fill='clear'
                    className='mt-5 text-md ion-text-capitalize ion-no-margin ion-no-padding'
                    size='small'>
                    <ZIonSkeletonText
                      animated={true}
                      className='mt-3'
                      width='140px'
                      height='17px'
                    />
                  </ZIonButton>
                </ZIonCol>
              </ZIonRow>
            </ZIonGrid>
          </ZIonList>

          {/* select from templates. */}
          <ZIonText
            className={classNames({
              'pt-4 pb-3 pr-2 ps-4': true,
              'w-[50%]': isSmScale,
              'w-full': !isSmScale
            })}>
            <ZIonSkeletonText
              animated={true}
              width='93%'
              height='40px'
            />
          </ZIonText>
        </ZIonCol>
      </ZIonRow>
    </>
  );
});

export default UTMTagTemplates;
