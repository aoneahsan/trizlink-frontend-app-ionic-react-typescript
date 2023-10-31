// Core Imports
import React, { useState } from 'react';

// Packages Imports
import { addOutline, notificationsOutline, star } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports
import {
  ZIonButton,
  ZIonButtons,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonRow,
  ZIonText,
  ZIonTextareaShort
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

const ZWorkspaceCommentBox: React.FC<{
  className?: string;
  style?: Record<string, unknown>;
}> = ({ className, style }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);

  return (
    <ZIonRow
      className={classNames(className, {
        'rounded px-2 py-1 bg-white': true
      })}
      style={style}>
      {/* absolute w-full bottom-0 start-0 */}
      {!showCommentBox && (
        <ZIonCol
          size='12'
          className='flex py-0 ion-align-items-center'
          onClick={() => {
            setShowCommentBox(true);
          }}>
          <div className='flex w-max ion-align-items-center'>
            <ZUserAvatarButton className='w-[24px!important] h-[24px!important]' />

            <div className='ms-2'>
              <ZIonText
                className='text-sm'
                color='medium'>
                Comments...
              </ZIonText>
            </div>
          </div>

          <div className='w-[70%] flex ion-justify-content-end'></div>
        </ZIonCol>
      )}

      {showCommentBox && (
        <ZIonCol
          size='12'
          className='py-0 text-sm leading-6 ms-auto'>
          <div className='flex w-full ion-align-items-center'>
            <ZUserAvatarButton className='w-[24px!important] h-[24px!important]' />

            <div className='flex ms-auto'>
              <ZIonText className='flex text-sm ion-align-items-center'>
                Internal note
                <ZIonIcon
                  icon={star}
                  color='secondary'
                  className='ms-2 me-3 pb-[2px]'
                />
              </ZIonText>

              {/*  */}
              <ZRCSwitch id='z-workspace-post-comments-visibility' />
              <ZRTooltip
                anchorSelect='#z-workspace-post-comments-visibility'
                place='top'
                content='Everyone can see this comments'
              />
            </div>
          </div>

          <div className='w-full mt-2'>
            <ZIonItem
              lines='full'
              color='light'
              className='rounded'>
              <ZIonTextareaShort
                label='Comments...'
                labelPlacement='floating'
                autoGrow={true}
                color='medium'
              />
            </ZIonItem>
          </div>

          <div className='flex w-full mt-2 ion-justify-content-between'>
            <div className='flex ion-align-items-center'>
              <ZIonText className='flex ion-align-items-center'>
                <ZIonIcon
                  icon={notificationsOutline}
                  className='me-1'
                />
                Notify 0 users
              </ZIonText>

              <ZIonButton
                fill='default'
                className='ion-no-padding ms-2'>
                <ZIonIcon icon={addOutline} />
              </ZIonButton>
            </div>

            <ZIonButtons>
              <ZIonButton
                className='normal-case'
                onClick={() => {
                  setShowCommentBox(false);
                }}>
                Cancel
              </ZIonButton>
              <ZIonButton
                className='normal-case'
                fill='outline'
                color='medium'
                id='z-workspace-post-comments-save'>
                Post
              </ZIonButton>
              <ZRTooltip
                anchorSelect='#z-workspace-post-comments-save'
                place='top'
                content='Ctrl + Enter'
              />
            </ZIonButtons>
          </div>
        </ZIonCol>
      )}
    </ZIonRow>
  );
};

export default ZWorkspaceCommentBox;
