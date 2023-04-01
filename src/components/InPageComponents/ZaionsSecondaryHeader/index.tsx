// Core Imports
import React from 'react';

// Packages Imports
import { IonToolbar } from '@ionic/react';

// Custom Imports
import {
  ZIonCol,
  ZIonGrid,
  ZIonImg,
  ZIonRouterLink,
  ZIonRow,
} from '@/components/ZIonComponents';

// Global Constants
import { PRODUCT_NAME } from '@/utils/constants';

// Images
import { ProductLogo } from '@/assets/images';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

const ZaionsSecondaryHeader: React.FC<{ bottomHr?: boolean }> = ({
  bottomHr = true,
}) => {
  return (
    <>
      <IonToolbar className='ion-padding-horizontal'>
        <ZIonGrid className='mb-2 pb-2'>
          <ZIonRow className='pt-1'>
            <ZIonCol
              className={`ion-justify-content-start ion-align-items-center`}
            >
              <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                <ZIonImg
                  src={ProductLogo}
                  alt={`${PRODUCT_NAME} Logo`}
                  className={`logo ms-5 ion-padding-horizontal pt-2 mb-1`}
                />
              </ZIonRouterLink>
              <ZIonRow className='p-0 m-0'>
                <ZIonCol></ZIonCol>
                <ZIonCol size='11.2' className='pt-0'>
                  {bottomHr && <hr className='mt-2 zaions__color_gray' />}
                </ZIonCol>
                <ZIonCol></ZIonCol>
              </ZIonRow>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </IonToolbar>
    </>
  );
};

export default ZaionsSecondaryHeader;
