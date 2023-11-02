import { ZPrivateRoutePath } from './../utils/constants/RoutesConstants';
import { useLocation } from 'react-router';
import { useContext } from 'react';
import { IonRouterContext } from '@ionic/react';
import {
  emptyVoidReturnFunction,
  showZCapErrorDialogAlert,
  zConsoleError
} from '@/utils/helpers';

export const useZNavigate = (): {
  zNavigateGoBack: () => void;
  zNavigatePushRoute: (_url: string) => void;
} => {
  try {
    const routerContext = useContext(IonRouterContext);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const zNavigatePushRoute = (_url: string) => {
      routerContext.push(_url);
    };
    const zNavigateGoBack = (): void => {
      routerContext.canGoBack() && routerContext.nativeBack();
    };

    return { zNavigateGoBack, zNavigatePushRoute };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });
    return {
      zNavigateGoBack: emptyVoidReturnFunction,
      zNavigatePushRoute: emptyVoidReturnFunction
    };
  }
};

/**
 * The useZPrivateRouteChecker hook serves as a utility for identifying private routes.
 * @returns an object with contains zIsPrivateRoute of type boolean.
 */
export const useZPrivateRouteChecker = (): { zIsPrivateRoute: boolean } => {
  try {
    const location = useLocation();

    const zIsPrivateRoute = location?.pathname?.startsWith(ZPrivateRoutePath);

    return { zIsPrivateRoute };
  } catch (error) {
    return { zIsPrivateRoute: false };
  }
};
