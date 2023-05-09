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
	ZIonButton,
	ZIonCol,
	ZIonFooter,
	ZIonRow,
} from '@/components/ZIonComponents';
import ZWorkspaceFromConnectPagesCard from '@/components/WorkspacesComponents/ConnectPagesCard';
import { workspaceFormConnectPagesEnum } from '@/types/AdminPanel/workspace';

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

const ZWorkspaceFormConnectPagesTab: React.FC = () => {
	return (
		<>
			<ZIonCol className='mt-4' size='8.5'>
				<ZIonRow className='ion-align-items-center ion-justify-content-center mx-auto'>
					{/* Facebook */}
					<ZIonCol size='3'>
						<ZWorkspaceFromConnectPagesCard
							pageType={workspaceFormConnectPagesEnum.facebook}
						/>
					</ZIonCol>

					{/* Twitter */}
					<ZIonCol size='3'>
						<ZWorkspaceFromConnectPagesCard
							pageType={workspaceFormConnectPagesEnum.twitter}
						/>
					</ZIonCol>

					{/* Instagram */}
					<ZIonCol size='3'>
						<ZWorkspaceFromConnectPagesCard
							pageType={workspaceFormConnectPagesEnum.instagram}
						/>
					</ZIonCol>

					{/* Linkedin */}
					<ZIonCol size='3'>
						<ZWorkspaceFromConnectPagesCard
							pageType={workspaceFormConnectPagesEnum.linkedin}
						/>
					</ZIonCol>

					{/* Google Business Profile */}
					<ZIonCol size='3'>
						<ZWorkspaceFromConnectPagesCard
							pageType={workspaceFormConnectPagesEnum.googleBusiness}
						/>
					</ZIonCol>

					{/* Youtube */}
					<ZIonCol size='3'>
						<ZWorkspaceFromConnectPagesCard
							pageType={workspaceFormConnectPagesEnum.youtube}
						/>
					</ZIonCol>

					{/* Tiktok */}
					<ZIonCol size='3'>
						<ZWorkspaceFromConnectPagesCard
							pageType={workspaceFormConnectPagesEnum.tiktok}
						/>
					</ZIonCol>

					{/* Pinterest */}
					<ZIonCol size='3'>
						<ZWorkspaceFromConnectPagesCard
							pageType={workspaceFormConnectPagesEnum.pinterest}
						/>
					</ZIonCol>

					{/* Universal Content */}
					<ZIonCol size='3'>
						<ZWorkspaceFromConnectPagesCard
							pageType={workspaceFormConnectPagesEnum.universalContent}
						/>
					</ZIonCol>
				</ZIonRow>
			</ZIonCol>

			{/*  */}
			<ZIonFooter className='flex align-items-center mt-20 ' collapse='fade'>
				{/* Next button */}
				<ZIonCol size='12' className='mt-4 pt-3'>
					<div className='w-3/12 mx-auto'>
						<ZIonButton expand='block' className='text-transform-initial'>
							Invite Later
						</ZIonButton>

						<ZIonButton
							expand='block'
							fill='outline'
							className='text-transform-initial mt-3'
						>
							Go Back
						</ZIonButton>
					</div>
				</ZIonCol>
			</ZIonFooter>
		</>
	);
};

export default ZWorkspaceFormConnectPagesTab;
