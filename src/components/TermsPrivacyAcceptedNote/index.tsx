import { PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import React from 'react';
import { ZIonRouterLink, ZIonText } from '../ZIonComponents';

const TermsPrivacyAcceptedNote: React.FC<{ isRegisterPage: boolean }> = ({
  isRegisterPage
}) => {
  return (
    <div className='mt-3 mb-4 ion-text-center'>
      <ZIonText
        className='text-[14px] '
        color='medium'>
        By {isRegisterPage ? 'creating ' : 'signing in with '} an account, you
        agree to <br /> {PRODUCT_NAME}
        &apos;s{' '}
        <ZIonRouterLink
          routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}
          className='underline'
          color='medium'>
          Terms of Service
        </ZIonRouterLink>
        ,{' '}
        <ZIonRouterLink
          routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}
          className='underline'
          color='medium'>
          Privacy Policy
        </ZIonRouterLink>{' '}
        and{' '}
        <ZIonRouterLink
          routerLink={ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute}
          className='underline'
          color='medium'>
          Acceptable Use Policy
        </ZIonRouterLink>
        .
      </ZIonText>
    </div>
  );
};

export default TermsPrivacyAcceptedNote;
