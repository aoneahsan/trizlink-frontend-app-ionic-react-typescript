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
	ZIonAccordion,
	ZIonAccordionGroup,
	ZIonCol,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import { addOutline } from 'ionicons/icons';
import { brandColors } from '@/utils/constants';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceInstagramStoriesLayout: React.FC = () => {
	return (
		<ZIonAccordionGroup className='my-4'>
			<ZIonAccordion value='e' toggleIcon={addOutline}>
				<ZIonItem slot='header' color='light'>
					<ZIonLabel className='text-sm'>Stories ()</ZIonLabel>
				</ZIonItem>

				<div className='ion-padding' slot='content'>
					<ZIonRow className='gap-3'>
						<ZIonCol
							size='1.5'
							className='h-[200px] flex cursor-pointer flex-col ion-text-center ion-align-items-center ion-justify-content-center shadow-lg'
						>
							<ZIonIcon icon={addOutline} color='medium' className='w-6 h-6' />
							<ZIonText className='text-lg px-5 mt-3' color='medium'>
								Create new story
							</ZIonText>
						</ZIonCol>
					</ZIonRow>
				</div>
			</ZIonAccordion>
		</ZIonAccordionGroup>
	);
};

export default ZWorkspaceInstagramStoriesLayout;
