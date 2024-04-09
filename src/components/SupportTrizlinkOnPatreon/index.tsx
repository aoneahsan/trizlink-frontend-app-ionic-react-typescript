import CONSTANTS from '@/utils/constants';
import React from 'react';
import { ZIonButton } from '../ZIonComponents';

const SupportTrizlinkOnPatreon: React.FC = () => {
  const [compState, setCompState] = React.useState({
    hide: false
  });

  return (
    <>
      {!compState.hide ? (
        <div className='relative inline-block px-12 pt-6 pb-4 mx-6 my-5 work-in-progress-notice'>
          <span
            onClick={() => {
              setCompState({ ...compState, hide: true });
            }}
            className='absolute top-1 right-1 p-2 cursor-pointer text-[16px] bg-white rounded-full z-10 px-3'>
            Close
          </span>
          <h2
            className='mb-4 text-[22px] text-wrap cursor-pointer'
            onClick={() => {
              window.open(CONSTANTS.ProductExternalURL.patreonLink, '_blank');
            }}>
            Please Note: It's a work in-progress, right now, it's just a
            structure and not connected to actual account data, we need
            investment to continue work on the remaining features.
          </h2>
          <ZIonButton
            href={CONSTANTS.ProductExternalURL.patreonLink}
            target={'_blank'}
            size='large'>
            Support Trizlink and Get this Feature
          </ZIonButton>
        </div>
      ) : null}
    </>
  );
};

export default SupportTrizlinkOnPatreon;
