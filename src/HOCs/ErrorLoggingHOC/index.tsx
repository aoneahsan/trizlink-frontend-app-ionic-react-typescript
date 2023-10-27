/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
import { useEffect } from 'react';
// import { init as sentryCapacitorInit } from '@sentry/capacitor';
import { init as sentryReactInit, BrowserTracing } from '@sentry/react';
import { ENVS } from '@/utils/envKeys';

/**
 * Functional Component
 * About: in this component i will add error logging logic, to log app errors in third party services to track app performance and errors.
 * @type {*}
 * */

// Types
interface IErrorLoggingHOC {
  children: React.ReactNode;
}

const ErrorLoggingHOC: React.FC<IErrorLoggingHOC> = ({ children }) => {
  useEffect(() => {
    const _sentryDNS = ENVS.sentryErrorLoggingDNS;
    if (_sentryDNS) {
      sentryReactInit({
        dsn: _sentryDNS,
        dist: '1',
        tracesSampleRate: 1.0,
        integrations: [new BrowserTracing()],
        enabled: true,
        enableTracing: true,
        environment: window.location.host
      });
    }
  }, []);
  return <>{children}</>;
};

export default ErrorLoggingHOC;
