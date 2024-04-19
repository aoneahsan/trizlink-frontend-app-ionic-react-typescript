/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { checkmarkCircle } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonCard,
  ZIonCardContent,
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { WorkspaceApprovalCards } from '@/data/UserDashboard/Workspace/ApprovalPage';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type workspaceApprovalCardEnum } from '@/types/AdminPanel/workspace';

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceApprovalCards: React.FC<{
  workspaceId: string;
  type?: workspaceApprovalCardEnum;
  onClick?: (type: workspaceApprovalCardEnum) => void;
}> = ({ type, onClick, workspaceId }) => {
  // #region Custom hooks
  const { isSmScale, isMdScale } = useZMediaQueryScale();
  // #endregion

  return (
    <ZIonRow
      className={classNames({
        'px-4 pb-5': isMdScale,
        'px-2 pb-3': !isMdScale && isSmScale,
        'px-0 pb-3': !isSmScale
      })}>
      {WorkspaceApprovalCards.map((el, index) => {
        return (
          <ZIonCol
            key={index}
            sizeXl='3'
            sizeLg='4'
            sizeMd='6'
            sizeSm='6'
            sizeXs='12'
            onClick={() => {
              onClick !== undefined && onClick(el.cardType);
            }}>
            <ZIonCard
              testingselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.approvals.card}-${el.cardType}-${workspaceId}`}
              testinglistselector={`${CONSTANTS.testingSelectors.workspace.settingsModal.approvals.card}-${el.cardType}`}
              className={classNames({
                'cursor-pointer border-t-[1px] border-b-[1px] border-s-[1px] border-e-[1px] border-solid h-full':
                  true,
                'zaions-border-color-secondary': el.cardType === type
              })}>
              <ZIonCardContent>
                <div className='flex w-full my-1'>
                  <ZIonIcon
                    icon={el.icon}
                    className='w-8 h-8'
                  />
                  {el.cardType === type && (
                    <ZIonIcon
                      icon={checkmarkCircle}
                      color='success'
                      className='w-8 h-8 ms-auto'
                    />
                  )}
                </div>
                <ZIonText
                  className='flex gap-2 mt-2 text-lg ion-align-items-center'
                  color='dark'>
                  {el.title}
                </ZIonText>
                <ZIonText className='block'>{el.subtitle}</ZIonText>
              </ZIonCardContent>
            </ZIonCard>
          </ZIonCol>
        );
      })}
    </ZIonRow>
  );
};

export default ZWorkspaceApprovalCards;
