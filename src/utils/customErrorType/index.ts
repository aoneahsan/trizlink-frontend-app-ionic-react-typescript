import { zConsoleError } from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import { captureException } from '@sentry/react';

export enum ErrorCodeEnum {
  RequestFailed = 'RequestFailed',
  UNAUTHENTICATED = 'UNAUTHENTICATED'
}

interface ZCustomErrorProps {
  message?: string;
  componentName?: string;
  errorCode?: ErrorCodeEnum;
  errorData?: any;
}

export class ZCustomError extends Error {
  public componentName;
  public errorCode;
  public errorData;

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  constructor(props?: ZCustomErrorProps) {
    const {
      message = MESSAGES.GENERAL.FAILED,
      componentName = 'App',
      errorCode = ErrorCodeEnum.RequestFailed,
      errorData = {}
    } = props ?? {};
    super(message);

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ZCustomError);
    }

    this.message = message;
    this.componentName = componentName;
    this.name = `[ZCustomError] - Error Message: ${message}`;
    this.errorCode = errorCode;
    this.errorData = errorData;
  }
}

export const reportCustomError = (
  errData: unknown,
  message?: string,
  showInConsole = true
): void => {
  try {
    const _data = {
      err: errData,
      message: `[reportCustomError] - ${message ?? ''}`
    };

    if (showInConsole) {
      // we will do some other logic as well, like sentry or datadog
      zConsoleError(_data);
    }

    captureException(
      new ZCustomError({ message: _data.message, errorData: _data })
    );
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
