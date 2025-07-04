import {
  checkmarkCircleOutline,
  checkmarkDoneCircleOutline,
  ellipseOutline,
  shieldCheckmarkOutline,
  starOutline
} from 'ionicons/icons';
import React from 'react';

//
import { ZIonBadge, ZIonIcon, ZIonText } from '@/components/ZIonComponents';

//
import {
  type ApprovalCardInterface,
  workspaceApprovalCardEnum
} from '@/types/AdminPanel/workspace';

export const WorkspaceApprovalCards: ApprovalCardInterface[] = [
  {
    icon: ellipseOutline,
    subtitle: 'Approvals are disabled and not needed for publishing',
    title: 'None',
    cardType: workspaceApprovalCardEnum.none
  },
  {
    icon: checkmarkCircleOutline,
    subtitle: 'Approvals are enabled, but not required for publishing',
    title: 'Optional',
    cardType: workspaceApprovalCardEnum.optional
  },
  {
    icon: checkmarkDoneCircleOutline,
    subtitle: 'A member has to approve the content before publishing',
    title: (
      <>
        Required
        <ZIonBadge className='flex gap-1 ion-align-items-center'>
          <ZIonIcon icon={starOutline} />
          <ZIonText className='pt-1'>Pro</ZIonText>
        </ZIonBadge>
      </>
    ),
    cardType: workspaceApprovalCardEnum.required
  },
  {
    icon: shieldCheckmarkOutline,
    subtitle: '2+ members need to approve content before publishing',
    title: (
      <>
        Multi-level
        <ZIonBadge
          className='flex gap-1 ion-align-items-center'
          color='warning'>
          <ZIonIcon
            icon={starOutline}
            color='light'
          />
          <ZIonText
            className='pt-1'
            color='light'>
            ENT
          </ZIonText>
        </ZIonBadge>
      </>
    ),
    cardType: workspaceApprovalCardEnum.multiLevel
  }
];
