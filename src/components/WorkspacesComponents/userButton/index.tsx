// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';
import { ellipse } from 'ionicons/icons';

// Custom Imports
import { ZIonAvatar, ZIonIcon, ZIonImg } from '@/components/ZIonComponents';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import CONSTANTS from '@/utils/constants';
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';
import { type ZUIAvatarApiDefaultParamsInterface } from '@/types/ZaionsApis.type';
import { isZNonEmptyString } from '@/utils/helpers';

// Style

// Component Type
interface ZUserAvatarButtonInterface {
  style?: Record<string, unknown>;
  active?: boolean;
  userAvatar?: string;
  className?: string;
  showStatus?: boolean;
  id?: string;
  statusIcon?: string;
  testingselector?: string;
  testinglistselector?: string;
  testingidselector?: string;
  statusIconPosition?: 'top' | 'bottom';
  statusIconColor?: ZIonColorType;
  userAvatarUi?: ZUIAvatarApiDefaultParamsInterface;
  onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLIonButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLIonButtonElement>;
}

const ZUserAvatarButton: React.FC<ZUserAvatarButtonInterface> = ({
  active = false,
  userAvatar,
  userAvatarUi,
  className,
  showStatus = false,
  statusIcon,
  style,
  statusIconPosition = 'top',
  id,
  statusIconColor,
  onClick,
  onMouseEnter,
  onMouseLeave,
  testingselector,
  testingidselector,
  testinglistselector
}) => {
  return (
    <ZIonAvatar
      className={classNames(className, {
        'relative cursor-pointer w-[50px] h-[50px]': true
      })}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      data-tooltip-id={id}
      testingidselector={testingidselector}
      testinglistselector={testinglistselector}
      testingselector={
        isZNonEmptyString(testingselector)
          ? testingselector
          : CONSTANTS.testingSelectors.user.userProfilePopoverButton
      }>
      {showStatus && (
        <div
          className={classNames({
            'absolute w-[38%] h-[38%] flex ion-align-items-center ion-justify-content-center rounded-full zaions__secondary_bg':
              true,
            'top-[-11%] right-[4%]': statusIconPosition === 'top',
            'bottom-[-5%] right-[-1%]': statusIconPosition === 'bottom'
          })}>
          <ZIonIcon
            testingselector={
              isZNonEmptyString(testingselector)
                ? `${testingselector}-status-icon`
                : `${CONSTANTS.testingSelectors.user.userProfilePopoverButton}-status-icon`
            }
            className='w-[60%] h-[70%]'
            icon={statusIcon ?? ellipse}
            color={statusIconColor ?? (active ? 'success' : 'light')}
          />
        </div>
      )}
      <ZIonImg
        testingselector={
          isZNonEmptyString(testingselector)
            ? `${testingselector}-img`
            : `${CONSTANTS.testingSelectors.user.userProfilePopoverButton}-img`
        }
        src={userAvatar ?? getUiAvatarApiUrl({ ...userAvatarUi })}
        className='w-full h-full'
      />
    </ZIonAvatar>
  );
};

export default ZUserAvatarButton;
