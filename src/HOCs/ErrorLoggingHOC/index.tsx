/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';
import {
  init as sentryReactInit,
  browserTracingIntegration
} from '@sentry/react';
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
    if (_sentryDNS !== undefined || _sentryDNS !== null) {
      sentryReactInit({
        dsn: _sentryDNS,
        dist: '1',
        integrations: [browserTracingIntegration()],
        enabled: true,
        enableTracing: true,
        environment: window.location.host,
        // Performance Monitoring
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          'localhost',
          /^https:\/\/zaions\.com\/api/,
          /^https:\/\/trizlink\.com\//
        ],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
      });
    }
  }, []);
  return <>{children}</>;
};

export default ErrorLoggingHOC;
