/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { alertCircle } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonCol,
	ZIonContent,
	ZIonGrid,
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

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { workspaceFormConnectPagesEnum } from '@/types/AdminPanel/workspace';

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

const ZWorkspaceConnectPagesCardInfoPopover: React.FC<{
	showTitle: boolean;
	title: string;
	text: string;
	items: { itemIcon: string; itemTitle: string; itemSubtitle: string }[];
}> = ({ showTitle, title, items, text }) => {
	return (
		<ZIonContent className='ion-padding'>
			{showTitle && (
				<ZIonText className='text-[15px] fw-bold d-block'>
					{/* There are 3 different types of IG profiles: */} {title}
				</ZIonText>
			)}

			<ZIonGrid className=''>
				{items.length &&
					items.map((item) => (
						<ZIonRow className='gap-1 mt-2 ion-align-items-center'>
							<ZIonCol size='max-content'>
								<ZIonIcon icon={item.itemIcon} className='w-6 h-6' />
							</ZIonCol>
							<ZIonCol>
								<ZIonText className='d-block fw-bold text-[13px]'>
									{item.itemTitle}
								</ZIonText>
								<ZIonText className='d-block text-[13px]'>
									{item.itemSubtitle}
								</ZIonText>
							</ZIonCol>
						</ZIonRow>
					))}

				<div className='gap-1 mt-3 d-flex ion-align-items-center'>
					<ZIonIcon icon={alertCircle} color='primary' />{' '}
					<ZIonText className='text-[13px]'>
						{/* See our help article for more details. */} {text}
					</ZIonText>
				</div>
			</ZIonGrid>
		</ZIonContent>
	);
};

export default ZWorkspaceConnectPagesCardInfoPopover;
