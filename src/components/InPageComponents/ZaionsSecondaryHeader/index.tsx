// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';

// Custom Imports
import {
  ZIonCol,
  ZIonGrid,
  ZIonImg,
  ZIonRouterLink,
  ZIonRow,
  ZIonToolbar
} from '@/components/ZIonComponents';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Global Constants
import { PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images
import { ProductLogo } from '@/assets/images';

const ZaionsSecondaryHeader: React.FC<{ bottomHr?: boolean }> = ({
  bottomHr = true
}) => {
  const { isMdScale } = useZMediaQueryScale();
  return (
    <>
      <ZIonToolbar
        className={classNames({
          'ion-padding-horizontal': isMdScale
        })}>
        <ZIonGrid
          className={classNames('pb-2 mb-2', {
            'ion-no-padding': !isMdScale
          })}>
          <ZIonRow className='pt-1'>
            <ZIonCol className='ion-justify-content-start ion-align-items-center'>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.HomeRoute}
                className='flex'>
                <ZIonImg
                  src={ProductLogo}
                  alt={`${PRODUCT_NAME} Logo`}
                  className={classNames('h-[3.5rem] w-max pt-2 mb-1', {
                    'ion-padding-horizontal ms-5': isMdScale
                  })}
                />
              </ZIonRouterLink>
              <ZIonRow className='p-0 m-0'>
                <ZIonCol
                  sizeXl='11.2'
                  sizeLg='11.2'
                  sizeMd='11.2'
                  sizeSm='12'
                  sizeXs='12'
                  className='pt-0 mx-auto'>
                  {bottomHr && <hr className='mt-2 zaions__color_gray' />}
                </ZIonCol>
              </ZIonRow>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </ZIonToolbar>
    </>
  );
};

export default ZaionsSecondaryHeader;
