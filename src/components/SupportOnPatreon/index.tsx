import CONSTANTS from '@/utils/constants';
import React from 'react';
import { ZIonButton } from '../ZIonComponents';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import { Browser } from '@capacitor/browser';

const SupportOnPatreon: React.FC = () => {
  const [compState, setCompState] = React.useState({
    hide: false
  });
  const isLg = useMediaQuery({ query: '(min-width: 1024px)' });

  const openSupportLink = async () => {
    try {
      await Browser.open({
        url: CONSTANTS.ProductExternalURL.patreonLink,
        presentationStyle: 'fullscreen',
        windowName: '_blank'
      });
    } catch (error) {}
  };

  return (
    <>
      {!compState.hide ? (
        <div
          className={classNames(
            'relative inline-block pb-4 mx-6 my-5 work-in-progress-notice',
            {
              'px-12 pt-6': isLg,
              'px-2 pt-12': !isLg
            }
          )}>
          <span
            onClick={() => {
              setCompState({ ...compState, hide: true });
            }}
            className='absolute top-1 right-1 p-2 cursor-pointer text-[16px] bg-white rounded-full z-10 px-3'>
            Close
          </span>
          <h2
            className={classNames('mb-4 text-wrap cursor-pointer', {
              'text-[22px]': isLg,
              'text-[20px]': !isLg
            })}
            onClick={() => {
              void openSupportLink();
            }}>
            Please Note: It's a work in-progress, right now, it's just a
            structure and not connected to actual account data, we need
            investment to continue work on the remaining features.
          </h2>
          <ZIonButton
            onClick={() => {
              void openSupportLink();
            }}
            size={isLg ? 'large' : 'default'}
            className='cursor-pointer'>
            Support Trizlink and Get this Feature
          </ZIonButton>
        </div>
      ) : null}
    </>
  );
};

export default SupportOnPatreon;
