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
	ZIonCard,
	ZIonCardContent,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import { checkmarkCircleOutline } from 'ionicons/icons';

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

const ZApprovalTab: React.FC = () => {
	return (
		<ZIonGrid>
			<ZIonRow>
				<ZIonCol>
					<ZIonRow>
						<ZIonCard>
							<ZIonCardContent>
								<ZIonIcon icon={checkmarkCircleOutline} className='w-8 h-8' />
								<ZIonText className='mt-2 d-block fs-5' color='dark'>
									None
								</ZIonText>
								<ZIonText className='d-block'>
									Approvals are disabled and not needed for publishing
								</ZIonText>
							</ZIonCardContent>
						</ZIonCard>
					</ZIonRow>
				</ZIonCol>
				<ZIonCol></ZIonCol>
				<ZIonCol></ZIonCol>
				<ZIonCol></ZIonCol>
			</ZIonRow>
		</ZIonGrid>
	);
};

export default ZApprovalTab;
