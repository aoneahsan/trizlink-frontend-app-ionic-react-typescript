/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { Suspense, lazy, useMemo } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { type RefresherEventDetail } from '@ionic/core';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import {
  ZIonCol,
  ZIonContent,
  ZIonGrid,
  ZIonRefresher,
  ZIonRow
} from '@/components/ZIonComponents';
import { ZFallbackIonSpinner2 } from '@/components/CustomComponents/FallbackSpinner';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  AdminPanelSidebarMenuPageEnum,
  messengerPlatformsBlockEnum
} from '@/types/AdminPanel/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, ZWSTypeEum } from '@/utils/enums';
import {
  type LinkTargetType,
  type ShortLinkType
} from '@/types/AdminPanel/linksType';
import CONSTANTS from '@/utils/constants';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  _getQueryKey,
  isZNonEmptyString,
  isZNonEmptyStrings,
  zGenerateShortLink
} from '@/utils/helpers';
import {
  call,
  callOutline,
  chatbubbleEllipsesOutline,
  chatbubbleOutline,
  chatbubblesOutline,
  link,
  logoSkype,
  logoWechat,
  logoWhatsapp,
  mailOutline,
  sendOutline
} from 'ionicons/icons';
import ZRCBars from '@/components/CustomComponents/Charts/Bars';
import PACountryBlock from '@/components/AdminPanelComponents/Analytics/PACountryBlock';
import PAReferersBlock from '@/components/AdminPanelComponents/Analytics/PAReferersBlock';
import PABrowserBlock from '@/components/AdminPanelComponents/Analytics/PABrowserBlock';
import PADevicesBlock from '@/components/AdminPanelComponents/Analytics/PADeviceBlock';
import PAUtmBlock from '@/components/AdminPanelComponents/Analytics/PAUtmBlock';
import PAPixelBlock from '@/components/AdminPanelComponents/Analytics/PAPixelBlock';

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

const AdminPanelSidebarMenu = lazy(
  () => import('@/components/AdminPanelComponents/Sidebar/ExpendableMenu')
);

const ZAdminPanelTopBar = lazy(
  () => import('@/components/AdminPanelComponents/TopBar')
);

const PageAnalyticsHeader = lazy(
  () => import('@/components/AdminPanelComponents/Analytics/PAHeader')
);

const PageAnalyticsTimeFilter = lazy(
  () => import('@/components/AdminPanelComponents/Analytics/PATimeFilter')
);

const PageAnalyticsInfoBlocks = lazy(
  () => import('@/components/AdminPanelComponents/Analytics/PAInfoBlocks')
);

const ZShortLinkAnalytics: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId } = useParams<{
    editLinkId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Custom hooks.
  const { is2XlScale, isMdScale, isLgScale, isSmScale } = useZMediaQueryScale(); // media query hook.
  //   #endregion

  // #region Recoils.
  // Recoil state that control the dashboard.
  const ZDashboardState = useRecoilValue(ZDashboardRState);

  // #endregion

  // #region Apis.

  // #endregion

  // #region Functions.
  // IonRefresher refresh handler
  const handleRefresh = async (
    event: CustomEvent<RefresherEventDetail>
  ): Promise<void> => {
    try {
      //   await invalidedQueries();
      event.detail.complete();
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <ZIonPage pageTitle='Zaions short-link analytics page'>
      {/* Content */}
      <ZIonContent>
        {/* IonRefresher */}
        <ZIonRefresher
          onIonRefresh={event => {
            void handleRefresh(event);
          }}
        />

        {/* Grid-1 */}
        <ZIonGrid
          className={classNames({
            'h-screen ion-no-padding': true,
            'max-w-[200rem] mx-auto': false
          })}>
          {/* Row-1 */}
          <ZIonRow className='h-full'>
            {/* Col-1 Side bar */}
            <Suspense
              fallback={
                <ZIonCol
                  size='.8'
                  className='h-full zaions__medium_bg zaions-transition'>
                  <ZFallbackIonSpinner2 />
                </ZIonCol>
              }>
              <AdminPanelSidebarMenu
                activePage={AdminPanelSidebarMenuPageEnum.shortLink}
              />
            </Suspense>

            {/* Col-2 Right-side Main Container */}
            <ZIonCol
              sizeXl={
                ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
                  ? is2XlScale
                    ? '10.5'
                    : '10'
                  : is2XlScale
                  ? '11.4'
                  : '11.2'
              }
              sizeLg={
                ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
                  ? is2XlScale
                    ? '10.5'
                    : '10'
                  : is2XlScale
                  ? '11.4'
                  : '11.2'
              }
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'
              className='h-screen zaions-transition'>
              <ZIonGrid
                className={classNames({
                  'h-full ion-no-padding': true,
                  'mt-2': !isLgScale
                })}>
                {/* Col-2 Row-1 Top bar. */}
                <Suspense
                  fallback={
                    <ZIonRow className='h-[4rem] px-3 zaions__light_bg'>
                      <ZFallbackIonSpinner2 />
                    </ZIonRow>
                  }>
                  <ZAdminPanelTopBar workspaceId={workspaceId} />
                </Suspense>

                {/* Col-2 Row-2 */}
                <ZIonRow className='h-[calc(100%-4rem)] w-full'>
                  {/* Col-2 Row-2 col-1 */}
                  <ZIonCol
                    className='h-full zaions-transition'
                    sizeXl='12'
                    sizeLg='12'
                    sizeMd='12'
                    sizeSm='12'
                    sizeXs='12'>
                    {!isSmScale ? (
                      <ZInpageMainContent />
                    ) : (
                      <ZCustomScrollable
                        className={classNames({
                          'flex flex-col w-full h-full px-3 pt-3': true,
                          'gap-10': isMdScale,
                          'gap-5': !isMdScale
                        })}
                        scrollY={true}>
                        <ZInpageMainContent />
                      </ZCustomScrollable>
                    )}
                  </ZIonCol>
                </ZIonRow>
              </ZIonGrid>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </ZIonContent>
    </ZIonPage>
  );
};

const ZInpageMainContent: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  const { workspaceId, shareWSMemberId, wsShareId, editLinkId } = useParams<{
    editLinkId?: string;
    workspaceId?: string;
    shareWSMemberId?: string;
    wsShareId?: string;
  }>();

  // #region Custom hooks.
  const { isMdScale, isSmScale } = useZMediaQueryScale(); // media query hook.
  // const { zInvalidateReactQueries } = useZInvalidateReactQueries();
  // #endregion

  // #region Apis.
  // get short link data api.
  const { data: selectedShortLink, isFetching: isSelectedShortLinkFetching } =
    useZRQGetRequest<ShortLinkType>({
      _url: API_URL_ENUM.shortLinks_update_delete,
      _key: [
        CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.GET,
        workspaceId ?? '',
        editLinkId ?? ''
      ],
      _itemsIds: [workspaceId ?? '', editLinkId ?? ''],
      _urlDynamicParts: [
        CONSTANTS.RouteParams.workspace.workspaceId,
        CONSTANTS.RouteParams.shortLink.shortLinkId
      ],
      _shouldFetchWhenIdPassed: !(
        editLinkId !== undefined &&
        (editLinkId?.trim()?.length ?? 0) > 0 &&
        workspaceId !== undefined &&
        (workspaceId?.trim()?.length ?? 0) > 0
      ),
      _extractType: ZRQGetRequestExtractEnum.extractItem,
      _showLoader: false
    });

  const { data: selectedShortLinkAnalyticsData } = useZRQGetRequest({
    _url: API_URL_ENUM.sl_analytics_list,
    _key: _getQueryKey({
      keys: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.ANALYTICS],
      additionalKeys: [workspaceId, wsShareId, shareWSMemberId, editLinkId]
    }),
    _itemsIds: _getQueryKey({
      keys: [
        isZNonEmptyString(workspaceId)
          ? ZWSTypeEum.personalWorkspace
          : isZNonEmptyString(wsShareId) && isZNonEmptyString(shareWSMemberId)
          ? ZWSTypeEum.shareWorkspace
          : ''
      ],
      additionalKeys: [workspaceId, shareWSMemberId, editLinkId]
    }),
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.type,
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.shortLink.shortLinkId
    ],
    _shouldFetchWhenIdPassed: !(
      isZNonEmptyStrings([wsShareId, shareWSMemberId, editLinkId]) ||
      isZNonEmptyStrings([workspaceId, editLinkId])
    )
  });

  console.log({ selectedShortLinkAnalyticsData });

  // #endregion

  //
  const _shortLink = useMemo(() => {
    let _generateShortLink: string | undefined = '';
    if (
      isZNonEmptyString(selectedShortLink?.shortUrlDomain) &&
      isZNonEmptyString(selectedShortLink?.shortUrlPath)
    ) {
      _generateShortLink = zGenerateShortLink({
        domain: selectedShortLink?.shortUrlDomain,
        urlPath: selectedShortLink?.shortUrlPath
      });
    }

    return _generateShortLink;
  }, [selectedShortLink?.shortUrlDomain, selectedShortLink?.shortUrlPath]);

  const _linkTarget = useMemo(() => {
    let _text;
    const _target = selectedShortLink?.target as LinkTargetType;

    switch (selectedShortLink?.type) {
      case messengerPlatformsBlockEnum.link:
      case messengerPlatformsBlockEnum.messenger:
        _text = _target?.url;
        break;

      case messengerPlatformsBlockEnum.whatsapp:
      case messengerPlatformsBlockEnum.call:
      case messengerPlatformsBlockEnum.sms:
        _text = _target?.phoneNumber;
        break;

      case messengerPlatformsBlockEnum.telegram:
      case messengerPlatformsBlockEnum.skype:
        _text = _target?.username;
        break;

      case messengerPlatformsBlockEnum.wechat:
      case messengerPlatformsBlockEnum.viber:
      case messengerPlatformsBlockEnum.line:
        _text = _target?.username;
        break;
      case messengerPlatformsBlockEnum.email:
        _text = _target?.email;
        break;
    }

    return _text;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShortLink?.type]);

  const _linkIcon = useMemo(() => {
    let _icon = '';

    switch (selectedShortLink?.type) {
      case messengerPlatformsBlockEnum.link:
        _icon = link;
        break;

      case messengerPlatformsBlockEnum.messenger:
        _icon = chatbubbleEllipsesOutline;
        break;

      case messengerPlatformsBlockEnum.whatsapp:
        _icon = logoWhatsapp;
        break;

      case messengerPlatformsBlockEnum.sms:
        _icon = chatbubblesOutline;
        break;

      case messengerPlatformsBlockEnum.call:
        _icon = call;
        break;

      case messengerPlatformsBlockEnum.telegram:
        _icon = sendOutline;
        break;

      case messengerPlatformsBlockEnum.skype:
        _icon = logoSkype;
        break;

      case messengerPlatformsBlockEnum.wechat:
        _icon = logoWechat;
        break;

      case messengerPlatformsBlockEnum.viber:
        _icon = callOutline;
        break;

      case messengerPlatformsBlockEnum.line:
        _icon = chatbubbleOutline;
        break;

      case messengerPlatformsBlockEnum.email:
        _icon = mailOutline;
        break;
    }

    return _icon;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShortLink?.type]);

  const options = useMemo(
    () => ({
      indexAxis: 'x' as const,
      elements: {
        bar: {
          borderWidth: 1
        }
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom' as const
        },
        title: {
          display: true,
          text: 'Clicks'
        },
        interaction: {
          mode: 'index' as const,
          intersect: true
        }
      }
    }),
    []
  );

  const labels = useMemo(
    () => ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    []
  );

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          // fill: true,
          label: 'clicks',
          data: [1, 2, 3, 4, 5, 6, 10],
          stack: 'Stack 1'
        }
      ]
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const isZFetching = isSelectedShortLinkFetching;

  return (
    <div
      className={classNames({
        'flex flex-col ion-no-margin ion-no-padding': true,
        'gap-4': isMdScale,
        'gap-3 py-3 px-2': !isMdScale
      })}>
      <Suspense
        fallback={
          <ZIonRow
            className={classNames({
              'zaions__light_bg ion-align-items-center': true,
              'ion-padding rounded-lg border': isSmScale,
              'ion-padding-vertical': !isSmScale
            })}>
            <ZFallbackIonSpinner2 />
          </ZIonRow>
        }>
        <PageAnalyticsHeader
          shortLink={_shortLink}
          showSkeleton={isZFetching}
          createdAtDate={selectedShortLink?.createdAt}
          createdAtText={selectedShortLink?.title}
          linkTarget={_linkTarget ?? ''}
          favicon={_linkIcon}
        />
      </Suspense>

      {/* Time filters */}
      <Suspense fallback={<ZFallbackIonSpinner2 />}>
        <PageAnalyticsTimeFilter />
      </Suspense>

      {/* Info blocks */}
      <Suspense fallback={<ZFallbackIonSpinner2 />}>
        <PageAnalyticsInfoBlocks />
      </Suspense>

      {/*  */}
      <ZIonRow
        className={classNames({
          'zaions__light_bg ion-align-items-center shadow-md my-4': true,
          'ion-padding rounded-lg border': isSmScale,
          'ion-padding-vertical': !isSmScale
        })}>
        <Suspense fallback={<ZFallbackIonSpinner2 />}>
          <ZRCBars
            options={options}
            data={data}
          />
        </Suspense>
      </ZIonRow>

      <ZIonRow className='my-4 gap-y-5 ion-justify-content-between'>
        {/*  */}
        <ZIonCol
          sizeXl='5.9'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className=''>
          <PACountryBlock />
        </ZIonCol>

        {/*  */}
        <ZIonCol
          sizeXl='5.9'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className=''>
          <PAReferersBlock />
        </ZIonCol>

        {/*  */}
        <ZIonCol
          sizeXl='5.9'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'>
          <PABrowserBlock />
        </ZIonCol>

        {/*  */}
        <ZIonCol
          sizeXl='5.9'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'>
          <PADevicesBlock />
        </ZIonCol>

        {/*  */}
        <ZIonCol
          sizeXl='5.9'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'>
          <PAUtmBlock />
        </ZIonCol>

        {/*  */}
        <ZIonCol
          sizeXl='5.9'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'>
          <PAPixelBlock />
        </ZIonCol>
      </ZIonRow>
    </div>
  );
};

export default ZShortLinkAnalytics;
