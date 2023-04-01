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

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText,
} from 'components/ZIonComponents';
import { useZMediaQueryScale } from 'ZaionsHooks/ZGenericHooks';
import ZRScrollbars from 'components/CustomComponents/ZRScrollBar';
import { useZIonPopover } from 'ZaionsHooks/zionic-hooks';
import { calendar } from 'ionicons/icons';

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
 * About: (link-in-bio page-analytics page header component)
 * @type {*}
 * */

const PageAnalyticsTimeFilter: React.FC = () => {
  const { isLgScale, isSmScale, isMdScale } = useZMediaQueryScale();

  const { presentZIonPopover: presentLinkInBioTimeFilterModal } =
    useZIonPopover(LinkInBiosTimeRangeFilterPopover);

  return (
    <ZIonRow
      className={classNames({
        'zaions__bg_white ion-align-items-center mt-4': true,
        'ion-padding rounded border': isSmScale,
        'ion-padding-vertical': !isSmScale,
      })}
    >
      <ZIonCol
        className={classNames({
          'py-3 ps-3 d-flex ion-align-items-center': true,
          'ion-justify-content-center': !isMdScale,
        })}
        sizeXl='6'
        sizeLg='6'
        sizeMd='6'
        sizeSm='12'
        sizeXs='12'
      >
        <ZIonText color='dark'>
          <h5 className='fw-bold ion-no-margin'>⌚ Filters</h5>
        </ZIonText>
      </ZIonCol>

      {/* Time filter button */}
      <ZIonCol
        className={classNames({
          'ion-text-end': isMdScale,
          'ion-text-center d-flex ion-justify-content-center': !isMdScale,
        })}
        sizeXl='6'
        sizeLg='6'
        sizeMd='6'
        sizeSm='12'
        sizeXs='12'
      >
        {/* Filter by days */}
        <ZIonButton
          fill='outline'
          className={classNames({
            'me-3': isLgScale,
            'w-100': !isMdScale,
          })}
          onClick={(event: unknown) => {
            presentLinkInBioTimeFilterModal({
              _event: event as Event,
              _cssClass: !isMdScale
                ? 'file-upload-modal-size'
                : 'link-in-bio-time-filter-modal-size',
            });
          }}
          expand={!isMdScale ? 'block' : undefined}
        >
          <ZIonIcon slot='start' icon={calendar} />
          All Time
        </ZIonButton>
      </ZIonCol>
    </ZIonRow>
  );
};

const LinkInBiosTimeRangeFilterPopover = () => {
  const { isMdScale } = useZMediaQueryScale();

  return (
    <ZRScrollbars
      style={{
        width: !isMdScale ? '87.6vw' : 200,
        height: !isMdScale ? '94vh' : 300,
      }}
    >
      <div className='ion-padding-horizontal'>
        <ZIonButton color={'secondary'} expand='block' className='mx-2 my-3'>
          All Time
        </ZIonButton>
        <ZIonButton color={'secondary'} expand='block' className='mx-2 my-3'>
          Today
        </ZIonButton>
        <ZIonButton color={'secondary'} expand='block' className='mx-2 my-3'>
          Last 7 days
        </ZIonButton>
        <ZIonButton color={'secondary'} expand='block' className='mx-2 my-3'>
          Last 30 days
        </ZIonButton>
        <ZIonButton color={'secondary'} expand='block' className='mx-2 my-3'>
          This month
        </ZIonButton>
        <ZIonButton color={'secondary'} expand='block' className='mx-2 my-3'>
          Last month
        </ZIonButton>
        <ZIonButton color={'secondary'} expand='block' className='mx-2 my-3'>
          Custom Range
        </ZIonButton>
      </div>
    </ZRScrollbars>
  );
};

export default PageAnalyticsTimeFilter;
