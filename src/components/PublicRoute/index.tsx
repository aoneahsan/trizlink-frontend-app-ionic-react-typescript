import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import { ZRoutesRedirects } from '@/utils/constants/RoutesConstants';
import { IsAuthenticatedRStateSelector } from '@/ZaionsStore/UserAccount/index.recoil';

const PublicRoute = ({
  Component,
  restricted = true,
  ...rest
}: any): React.ReactNode => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Suspense fallback={<ZFallbackIonSpinner />}>
      <PublicRouteAsync
        Comp={Component}
        restricted={restricted}
        {...rest}
      />
    </Suspense>
  );
};
const PublicRouteAsync = ({
  Comp: Component,
  restricted,
  ...rest
}: any): React.ReactNode => {
  const loggedIn = useRecoilValue(IsAuthenticatedRStateSelector);

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      component={(props: any) =>
        loggedIn && Boolean(restricted) ? (
          <Redirect to={ZRoutesRedirects.AUTHENTICATED_USER_REDIRECT} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
