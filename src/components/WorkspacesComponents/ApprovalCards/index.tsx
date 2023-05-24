/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

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
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { WorkspaceApprovalCards } from '@/data/UserDashboard/Workspace/ApprovalPage';
import { checkmarkCircle } from 'ionicons/icons';
import { workspaceApprovalCardEnum } from '@/types/AdminPanel/workspace';
import classNames from 'classnames';

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceApprovalCards: React.FC<{
	type?: workspaceApprovalCardEnum;
	onClick?: (type: workspaceApprovalCardEnum) => void;
}> = ({ type, onClick }) => {
	return (
		<ZIonRow className='px-4'>
			{WorkspaceApprovalCards.map((el, index) => {
				return (
					<ZIonCol
						key={index}
						sizeXl='3'
						sizeLg='4'
						sizeMd='6'
						sizeSm='6'
						sizeXs='12'
						onClick={() => onClick && onClick(el.cardType)}
					>
						<ZIonCard
							className={classNames({
								'zaions__cursor_pointer border-t-[1px] border-b-[1px] border-s-[1px] border-e-[1px] border-solid':
									true,
								'zaions-border-color-secondary': el.cardType === type,
							})}
						>
							<ZIonCardContent>
								<div className='w-full flex my-1'>
									<ZIonIcon icon={el.icon} className='w-8 h-8' />
									{el.cardType === type && (
										<ZIonIcon
											icon={checkmarkCircle}
											color='success'
											className='w-8 h-8 ms-auto'
										/>
									)}
								</div>
								<ZIonText
									className='mt-2 flex ion-align-items-center gap-2 text-lg'
									color='dark'
								>
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
