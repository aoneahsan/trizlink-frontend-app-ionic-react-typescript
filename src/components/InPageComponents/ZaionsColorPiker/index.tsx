/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  ZIonIcon,
  ZIonInput,
  ZIonItem,
  ZIonSkeletonText
} from '@/components/ZIonComponents';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type FormikSetFieldValueEventVoidType } from '@/types/ZaionsFormik.type';
import { closeCircleOutline } from 'ionicons/icons';

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

interface ZaionsColorPikerType {
  value: string;
  name: string;
  showCloseIcon?: boolean;
  showSkeleton?: boolean;
  minHeight?: string;
  setDefaultColor?: string;
  testingselector?: string;
  testinglistselector?: string;
  setFieldValueFn?: FormikSetFieldValueEventVoidType;
  closeIconOnChangeFn?: React.MouseEventHandler<HTMLIonIconElement>;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZaionsColorPiker: React.FC<ZaionsColorPikerType> = ({
  name,
  value,
  setFieldValueFn,
  showCloseIcon = false,
  showSkeleton = false,
  minHeight = '40px',
  setDefaultColor = '#000', // if color is values is empty the when color is be set.
  testingselector,
  testinglistselector,
  closeIconOnChangeFn
}) => {
  if (showSkeleton) {
    return <ZaionsColorPikerSkeleton />;
  }

  return (
    <ZIonItem
      className='flex mt-3 ion-no-padding ion-align-items-start z-inner-padding-end-0'
      lines='none'
      minHeight={minHeight}
      testingselector={testingselector}
      testinglistselector={testinglistselector}>
      <div className='flex w-full'>
        <input
          type='color'
          name={name}
          className='zaions-color-piker'
          value={value}
          onChange={({ target }) => {
            setFieldValueFn !== undefined &&
              setFieldValueFn(name, target?.value ?? setDefaultColor, false);
          }}
        />
        <ZIonInput
          type='text'
          className='ms-2 text-[18px] zaions__bg_white ion-padding-start-point-8rem'
          value={value}
          aria-label='color piker input'
          fill='outline'
          minHeight={minHeight}
          onIonChange={({ target }) => {
            setFieldValueFn !== undefined &&
              setFieldValueFn(name, target?.value ?? setDefaultColor, false);
          }}
        />
        {showCloseIcon && (
          <ZIonIcon
            icon={closeCircleOutline}
            color='primary'
            className='w-8 h-8 mt-1 cursor-pointer ms-2'
            onClick={closeIconOnChangeFn}
          />
        )}
      </div>
    </ZIonItem>
  );
};

const ZaionsColorPikerSkeleton: React.FC = React.memo(() => {
  return (
    <ZIonItem
      className='flex w-full mt-3 ion-no-padding ion-align-items-center z-inner-padding-end-0'
      lines='none'
      minHeight='40px'>
      <div className='flex w-full'>
        <ZIonSkeletonText
          width='2.5rem'
          height='40px'
          className='me-2'
          animated={true}
        />
        <ZIonSkeletonText
          width='35%'
          height='40px'
          className='rounded'
          animated={true}
        />
      </div>
    </ZIonItem>
  );
});

ZaionsColorPikerSkeleton.displayName = 'ZaionsColorPikerSkeleton';

export default ZaionsColorPiker;
