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
  ZIonRow
} from '@/components/ZIonComponents';

// Global Constants
import { PRODUCT_NAME } from '@/utils/constants';

// Images
import { ProductLogo } from '@/assets/images';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

const ZaionsSecondaryHeader: React.FC<{ bottomHr?: boolean }> = ({
  bottomHr = true
}) => {
  return (
    <>
      <IonToolbar className='mb-10 shadow-md ion-padding-horizontal'>
        <ZIonGrid className='p-0'>
          <ZIonRow>
            <ZIonCol className='ion-justify-content-start ion-no-padding ion-align-items-center'>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.HomeRoute}
                className='flex'>
                <ZIonImg
                  src={ProductLogo}
                  alt={`${PRODUCT_NAME} Logo`}
                  className='h-[4rem] w-max ms-5 ion-padding-horizontal pt-2 mb-1'
                />
              </ZIonRouterLink>
            </ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      </IonToolbar>
    </>
  );
};

export default ZaionsSecondaryHeader;
