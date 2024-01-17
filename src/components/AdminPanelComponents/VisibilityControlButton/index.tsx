/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { caretDownOutline, eyeOffOutline, saveOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonIcon,
  ZIonItem,
  ZIonList
} from '@/components/ZIonComponents';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZVisibilityControlButtonI {
  className?: string;
  draftBtnOnClick?: (event?: unknown) => void;
  privateBtnOnClick?: (event?: unknown) => void;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZVisibilityControlButton: React.FC<ZVisibilityControlButtonI> = ({
  className,
  draftBtnOnClick,
  privateBtnOnClick
}) => {
  const { presentZIonPopover: presentZVisibilityControlPopover } =
    useZIonPopover(ZVisibilityControlPopover, {
      draftBtnOnClick,
      privateBtnOnClick
    });
  return (
    <ZIonButton
      className={className}
      color='primary'
      onClick={(event: unknown) => {
        presentZVisibilityControlPopover({
          _event: event as Event,
          _cssClass: ''
        });
      }}>
      <ZIonIcon
        slot='icon-only'
        icon={caretDownOutline}
      />
    </ZIonButton>
  );
};

export const ZVisibilityControlPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  draftBtnOnClick?: (event?: unknown) => void;
  privateBtnOnClick?: (event?: unknown) => void;
}> = ({ dismissZIonPopover, draftBtnOnClick, privateBtnOnClick }) => {
  return (
    <ZIonList lines='full'>
      <ZIonItem
        button
        minHeight='2.5rem'
        onClick={() => {
          if (draftBtnOnClick !== undefined) {
            draftBtnOnClick();
          }

          dismissZIonPopover();
        }}>
        <ZIonIcon
          icon={saveOutline}
          className='w-6 h-6 my-0 me-4'
          color='secondary'
        />
        Save as draft
      </ZIonItem>

      <ZIonItem
        button
        minHeight='2.5rem'
        onClick={() => {
          if (privateBtnOnClick !== undefined) {
            privateBtnOnClick();
          }

          dismissZIonPopover();
        }}>
        <ZIonIcon
          icon={eyeOffOutline}
          className='w-6 h-6 my-0 me-4'
          color='tertiary'
        />
        Save as private
      </ZIonItem>
    </ZIonList>
  );
};

export default ZVisibilityControlButton;
