/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { ellipse, helpCircleOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZHelpCenterPopover from '@/components/InPageComponents/ZaionsPopovers/HelpCenterPopover';
import {
  ZIonButton,
  ZIonIcon,
  ZIonItem,
  ZIonModal,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';

const ZHelpButton: React.FC = () => {
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);

  // #region Custom hooks.
  const { isMdScale, isLgScale } = useZMediaQueryScale();
  // #endregion

  // #region Popovers.
  const { presentZIonPopover: presentZHelpCenterPopover } =
    useZIonPopover(ZHelpCenterPopover);
  // #endregion

  // #region Functions
  const closeSheetModal = useCallback(() => {
    setIsSheetModalOpen(() => false);
  }, []);
  // #endregion

  return (
    <>
      <ZIonButton
        color='tertiary'
        size='small'
        expand={!isMdScale ? 'block' : undefined}
        height={isLgScale ? '2.3rem' : '1.9rem'}
        className={classNames({
          'text-xs': !isLgScale
        })}
        testingselector={CONSTANTS.testingSelectors.topBar.helpBtn}
        onClick={(event: unknown) => {
          if (isMdScale) {
            presentZHelpCenterPopover({
              _event: event as Event,
              _cssClass: 'z-help-center-popover-size',
              _dismissOnSelect: false
            });
          } else {
            setIsSheetModalOpen(() => true);
          }
        }}>
        <ZIonIcon
          icon={helpCircleOutline}
          className='w-7 h-7'
        />
      </ZIonButton>

      {/* Sheet Modal shown below Md screen */}
      <ZIonModal
        isOpen={isSheetModalOpen}
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        className='z-ion-height-auto'
        onDidDismiss={() => {
          closeSheetModal();
        }}>
        <div className='px-3 pt-4'>
          <ZIonText
            className='block mt-2 mb-2 text-xs tracking-widest'
            color='medium'>
            APP STATUS
          </ZIonText>
        </div>

        {/* All Systems Operational */}
        <ZIonItem
          lines='full'
          minHeight='2.3rem'
          className='cursor-pointer ion-activatable'
          testingselector={
            CONSTANTS.testingSelectors.topBar.helpSheetModal
              .allSystemsOperations
          }>
          <ZIonIcon
            icon={ellipse}
            className='w-3 h-3'
            color='success'
          />
          <ZIonText className='block text-sm tracking-wide ms-2'>
            All Systems Operational
          </ZIonText>
        </ZIonItem>
      </ZIonModal>
    </>
  );
};

export default ZHelpButton;
