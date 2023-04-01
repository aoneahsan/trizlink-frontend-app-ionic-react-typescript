import { zConsoleError } from '@/utils/helpers';
import MESSAGES from '@/utils/messages';

export enum ErrorCodeEnum {
  RequestFailed = 'RequestFailed',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

interface ZCustomErrorProps {
  message?: string;
  componentName?: string;
  errorCode?: ErrorCodeEnum;
}

export class ZCustomError extends Error {
  public componentName;
  public errorCode;

  constructor(props?: ZCustomErrorProps) {
    const {
      message = MESSAGES.GENERAL.FAILED,
      componentName = 'App',
      errorCode = ErrorCodeEnum.RequestFailed,
    } = props || {};
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ZCustomError);
    }

    this.message = message;
    this.componentName = componentName;
    this.name = `[ZCustomError] - Error Message: ${message}`;
    this.errorCode = errorCode;
  }
}

export const reportCustomError = (errData: unknown, message?: string): void => {
  try {
    // we will do some other logic as well, like sentry or datadog
    zConsoleError({
      err: errData,
      message: `[reportCustomError] - ${message || ''}`,
    });
  } catch (error) {
    zConsoleError({ err: error });
  }
};

export const throwZCustomErrorRequestFailed = (
  message = MESSAGES.GENERAL.FAILED
): never => {
  throw new ZCustomError({ message });
};

export const throwZCustomErrorUnAuthenticated = (): never => {
  return throwZCustomErrorRequestFailed(MESSAGES.GENERAL.UNAUTHENTICATED);
};
