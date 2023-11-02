// Core Imports
import React from 'react';

// Packages Imports
import { IonToolbar } from '@ionic/react';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import {
  ZIonText,
  ZIonRouterLink,
  ZIonMenu,
  ZIonTitle,
  ZIonImg,
  ZIonContent,
  ZIonHeader,
  ZIonButton
} from '@/components/ZIonComponents';

// Global Constants
import {
  BRACKPOINT_LG,
  BRACKPOINT_MD,
  CONTENT_ID,
  PRODUCT_NAME
} from '@/utils/constants';

import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles
import classes from './styles.module.css';
import { ProductLogo } from '@/assets/images';
import { type PAGE_MENU_SIDE } from '@/utils/enums';

interface SideBarMenuPropsType {
  menuSide?: PAGE_MENU_SIDE;
}

// Functional Component
const SideBarMenu: React.FC<SideBarMenuPropsType> = ({ menuSide }) => {
  const isLgScale = useMediaQuery({
    query: `(max-width: ${BRACKPOINT_LG})`
  });
  const isMdScale = useMediaQuery({
    query: `(max-width: ${BRACKPOINT_MD})`
  });
  return (
    <>
      {isLgScale || isMdScale ? (
        <ZIonMenu
          contentId={CONTENT_ID}
          menuId='sidebarmenu'
          side={menuSide ?? 'start'}>
          <ZIonHeader>
            <IonToolbar className='py-1'>
              {/* <ZIonTitle>{PRODUCT_NAME}</ZIonTitle> */}
              <ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
                <ZIonImg
                  src={ProductLogo}
                  className='mx-auto pe-3'
                  style={{ width: '100px' }}
                />
              </ZIonRouterLink>
            </IonToolbar>
          </ZIonHeader>
          <ZIonContent className='ion-padding'>
            <div className='pb-1 ion-margin-bottom'>
              <ZIonTitle
                className='mb-2 font-bold ps-0'
                color={'tertiary'}>
                Why {PRODUCT_NAME}?
              </ZIonTitle>

              <ZIonRouterLink
                routerLink={ZaionsRoutes.WhyZaions.Zaions101Route}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>{PRODUCT_NAME} 101</ZIonText>
              </ZIonRouterLink>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.WhyZaions.ZaionsIntegrationApiRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>Integrations & API</ZIonText>
              </ZIonRouterLink>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.WhyZaions.ZaionsEnterpriseClassRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>Enterprise Class</ZIonText>
              </ZIonRouterLink>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>Pricing</ZIonText>
              </ZIonRouterLink>
            </div>

            <div className='pb-1 ion-margin-bottom'>
              <ZIonTitle
                className='mb-2 font-bold ps-0'
                color={'tertiary'}>
                Products
              </ZIonTitle>

              <ZIonRouterLink
                routerLink={ZaionsRoutes.Products.ZaionsLinkManagmentRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>Link Management</ZIonText>
              </ZIonRouterLink>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.Products.ZaionsQRCodeRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>QR Codes</ZIonText>
              </ZIonRouterLink>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.Products.ZaionsLinkInBioRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>Link-in-bio</ZIonText>
              </ZIonRouterLink>
            </div>

            <div className='pb-1 ion-margin-bottom'>
              <ZIonTitle
                className='mb-2 font-bold ps-0'
                color={'tertiary'}>
                Resources
              </ZIonTitle>

              <ZIonRouterLink
                routerLink={ZaionsRoutes.HomeRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>Developers</ZIonText>
              </ZIonRouterLink>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.Resources.ZaionsResourceLibraryRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>Resource Library</ZIonText>
              </ZIonRouterLink>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.Resources.ZaionsBlogsRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>Blog</ZIonText>
              </ZIonRouterLink>
              <ZIonRouterLink
                routerLink={ZaionsRoutes.HomeRoute}
                color={'dark'}
                className='block mb-2'>
                <ZIonText className='text-[16px]'>Support</ZIonText>
              </ZIonRouterLink>
            </div>

            {isMdScale && (
              <div className='px-1 pb-2 '>
                {isMdScale && (
                  <ZIonRouterLink routerLink={ZaionsRoutes.LoginRoute}>
                    {' '}
                    <ZIonButton
                      expand='block'
                      className={'mb-4 font-bold'}
                      fill='clear'>
                      Login
                    </ZIonButton>
                  </ZIonRouterLink>
                )}
                {isMdScale && (
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}>
                    {' '}
                    <ZIonButton
                      expand='block'
                      className={`mb-4 ${classes.zaions__sidebar_signupbtn}`}
                      fill='clear'>
                      Sign up Free
                    </ZIonButton>
                  </ZIonRouterLink>
                )}
                {isMdScale && (
                  <ZIonRouterLink
                    routerLink={ZaionsRoutes.DiscoverEnterpriseRoute}>
                    {' '}
                    <ZIonButton
                      expand='block'
                      className={'mb-4'}>
                      Get a Quote
                    </ZIonButton>
                  </ZIonRouterLink>
                )}
              </div>
            )}
          </ZIonContent>
        </ZIonMenu>
      ) : (
        ''
      )}
    </>
  );
};

// Exports
export default SideBarMenu;
