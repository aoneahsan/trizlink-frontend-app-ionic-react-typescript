// Core Imports
import React from 'react';

// Packages Imports
import { linkOutline, refreshCircleOutline } from 'ionicons/icons';
import {
  type InputChangeEventDetail,
  type IonInputCustomEvent
} from '@ionic/core';

// Custom Imports
import {
  ZIonButton,
  ZIonIcon,
  ZIonImg,
  ZIonInput,
  ZIonItem
} from '@/components/ZIonComponents';
import classNames from 'classnames';

// Styles

// Component Type
interface LinkInBioLinkFieldInterface {
  placeholder?: string;
  showRefreshBtn?: boolean;
  name?: string;
  className?: string;
  showImageInSlot?: boolean;
  slotImageUrl?: string;
  value?: string | number | null;
  testinglistselector?: string;
  testingselector?: string;
  onIonChange?: (event: IonInputCustomEvent<InputChangeEventDetail>) => void;
  onIonBlur?: <A extends Event>(event: A) => void;
  RefreshBtnClickFn?: React.MouseEventHandler<HTMLIonButtonElement>;
}

const LinkInBioLinkField: React.FC<LinkInBioLinkFieldInterface> = ({
  placeholder = 'https://yourlink.com',
  showRefreshBtn = true,
  value,
  name,
  showImageInSlot = false,
  slotImageUrl,
  className,
  testinglistselector,
  testingselector,
  RefreshBtnClickFn,
  onIonChange,
  onIonBlur
}) => {
  const refreshBtnStyle = {
    '--background-hover-opacity': '0'
  };
  return (
    <ZIonItem
      className={classNames(className, {
        'ion-align-items-start ion-item-start-no-padding': true
      })}
      lines='none'
      testingselector={`${testingselector}-item`}
      testinglistselector={`${testinglistselector}-item`}>
      {!showImageInSlot && slotImageUrl?.trim() === null && (
        <ZIonIcon
          icon={linkOutline}
          slot='start'
          className='w-7 h-7 me-2'
          testingselector={`${testingselector}-icon`}
          testinglistselector={`${testinglistselector}-icon`}
        />
      )}

      {showImageInSlot && slotImageUrl?.trim() !== null && (
        <ZIonImg
          className='w-[25px]'
          src={slotImageUrl}
          slot='start'
          testingselector={`${testingselector}-image`}
          testinglistselector={`${testinglistselector}-image`}
        />
      )}

      <ZIonInput
        aria-label='url'
        type='url'
        name={name}
        minHeight='40px'
        counter={false}
        placeholder={placeholder}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        value={value}
        className='ion-padding-start-point-8rem ion-padding-end-point-2rem'
        testingselector={`${testingselector}-input`}
        testinglistselector={`${testinglistselector}-input`}>
        {/* <ZIonIcon
          slot='end'
          icon={refreshCircleOutline}
          className='w-7 h-7'
          aria-hidden='true'
          color='primary'
        /> */}
        {showRefreshBtn && (
          <ZIonButton
            fill='clear'
            color='dark'
            slot='end'
            height='100%'
            className='ion-no-padding ms-2'
            onClick={RefreshBtnClickFn}
            testingselector={`${testingselector}-refresh-btn`}
            testinglistselector={`${testinglistselector}-refresh-btn`}
            style={refreshBtnStyle}>
            <ZIonIcon
              icon={refreshCircleOutline}
              className='w-7 h-7'
              color='primary'
            />
          </ZIonButton>
        )}
      </ZIonInput>
    </ZIonItem>
  );
};

export default LinkInBioLinkField;
