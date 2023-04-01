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
import { ZIonContent, ZIonGrid } from '@/components/ZIonComponents';
import PageAnalyticsHeader from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/PageAnalytics/PAHeader';
import PageAnalyticsTimeFilter from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/PageAnalytics/PATimeFilter';

import { useZMediaQueryScale } from 'ZaionsHooks/ZGenericHooks';
import PageAnalyticsStateBlock from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/PageAnalytics/PAStateBlock';
import PageAnalyticsInfoBlocks from '@/pages/AdminPanel/LinkInBio/LinkInBioForm/PageAnalytics/PAInfoBlocks';

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
import {
  linkInBioPageAnalyticsBrowsersBlock,
  linkInBioPageAnalyticsClickBlock,
  linkInBioPageAnalyticsCountriesBlock,
  linkInBioPageAnalyticsDeviceBlock,
  linkInBioPageAnalyticsOperatingSystemBlock,
  linkInBioPageAnalyticsReferersBlock,
  linkInBioPageAnalyticsRetargetingPixelsBlock,
  linkInBioPageAnalyticsUtmTagBlock,
} from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const LinkInBioPageAnalytics: React.FC = () => {
  const { isSmScale } = useZMediaQueryScale();
  return (
    <>
      <ZIonContent color='light'>
        {/* Main Grid */}
        <ZIonGrid
          // className='ion-padding ion-margin'
          className={classNames({
            'ion-padding ion-margin': isSmScale,
          })}
        >
          {/* Header  */}
          <PageAnalyticsHeader />

          {/* Time filter */}
          <PageAnalyticsTimeFilter />

          {/* Info Blocks */}
          <PageAnalyticsInfoBlocks />

          {/* Click info block */}
          <PageAnalyticsStateBlock
            bannerTitle='📊 Clicks'
            imageUrl={linkInBioPageAnalyticsClickBlock}
            title='There is not click on your link'
            subTitle='Share your link and get analytics report 🎉'
            tableData={[
              {
                unique: '1',
                value: 'Pakistan',
                visit: '1',
                visitPercentage: '100%',
              },
            ]}
          />

          {/* Countries info block */}
          <PageAnalyticsStateBlock
            bannerTitle='🌎 Countries'
            imageUrl={linkInBioPageAnalyticsCountriesBlock}
            title='There is not click on your link'
            subTitle='Share your link and get analytics report 🌎'
          />

          {/* Browsers info block */}
          <PageAnalyticsStateBlock
            bannerTitle='🔎 Browsers'
            imageUrl={linkInBioPageAnalyticsBrowsersBlock}
            title='There is not click on your link'
            subTitle='Share your link and get analytics report 🔎'
          />

          {/* Operating System info block */}
          <PageAnalyticsStateBlock
            bannerTitle='🧰 Operating system'
            imageUrl={linkInBioPageAnalyticsOperatingSystemBlock}
            title='There is not click on your link'
            subTitle='Share your link and get analytics report 🧰'
          />

          {/* Utm Tag info block */}
          <PageAnalyticsStateBlock
            bannerTitle='🎫 UTMs tags'
            imageUrl={linkInBioPageAnalyticsUtmTagBlock}
            title='Want to add UTMs tags?'
            subTitle='You can add UTMs on the link edition 🏷'
          />

          {/* Referers info block */}
          <PageAnalyticsStateBlock
            bannerTitle='🧭 Referers'
            imageUrl={linkInBioPageAnalyticsReferersBlock}
            title='There is not click on your link'
            subTitle='Share your link and get analytics report 🧭'
          />

          {/* Device info block */}
          <PageAnalyticsStateBlock
            bannerTitle='💻 Device type'
            imageUrl={linkInBioPageAnalyticsDeviceBlock}
            title='There is not click on your link'
            subTitle='Share your link and get analytics report 💻'
          />

          {/* Retargeting Pixels info block */}
          <PageAnalyticsStateBlock
            bannerTitle='🎯 Retargeting Pixels'
            imageUrl={linkInBioPageAnalyticsRetargetingPixelsBlock}
            title='Want to add Retargeting pixels?'
            subTitle='You can add Retargeting Pixels on the link edition 🎯'
          />
        </ZIonGrid>
      </ZIonContent>
    </>
  );
};

export default LinkInBioPageAnalytics;
