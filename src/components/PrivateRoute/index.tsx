import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import { ZRoutesRedirects } from '@/utils/constants/RoutesConstants';
import { IsAuthenticatedRStateSelector } from '@/ZaionsStore/UserAccount/index.recoil';

const PrivateRoute = ({ Component, ...rest }: any): React.ReactNode => {
  return (
    <Suspense fallback={<ZFallbackIonSpinner />}>
      <PrivateRouteAsync
        {...rest}
        Component={Component}
      />
    </Suspense>
  );
};

const PrivateRouteAsync = ({ Component, ...rest }: any): React.ReactNode => {
  const loggedIn = useRecoilValue(IsAuthenticatedRStateSelector);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /sign in page

    <Route
      {...rest}
      component={(props: any) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={ZRoutesRedirects.UNAUTHENTICATED_USER_REDIRECT} />
        )
      }
    />
  );
};

export default PrivateRoute;
