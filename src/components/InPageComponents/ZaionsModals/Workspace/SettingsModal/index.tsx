/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	checkmarkOutline,
	pricetagOutline,
	settingsOutline,
	timeOutline,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonContent,
	ZIonHeader,
	ZIonText,
	ZIonSegment,
	ZIonSegmentButton,
	ZIonIcon,
	ZIonGrid,
	ZIonRow,
	ZIonCol,
} from '@/components/ZIonComponents';
import ZTimetableTab from './TimetableTab';
import { workspaceSettingsModalTabEnum } from '@/types/AdminPanel/workspace';
import ZLabelsTab from './LabelsTab';
import ZSettingsTab from './SettingsTab';
import ZApprovalTab from './ApprovalsTab';

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

const ZWorkspacesSettingModal: React.FC<{
	Tab: workspaceSettingsModalTabEnum;
}> = ({ Tab }) => {
	// Component state
	const [compState, setCompState] = useState<{
		activeTab: workspaceSettingsModalTabEnum;
	}>({
		activeTab: Tab,
	});

	return (
		<>
			{/* header  */}
			<ZIonHeader>
				<div className='py-1 w-full ion-text-center zaions__primary_bg'>
					<ZIonText className='text-3xl font-bold' color='light'>
						Zaions
					</ZIonText>
				</div>
				<ZIonSegment scrollable={true} value={compState.activeTab}>
					{/* Timetable */}
					<ZIonSegmentButton
						value={workspaceSettingsModalTabEnum.timetable}
						className='text-transform-initial ion-text-center'
						onClick={() => {
							setCompState((oldValues) => ({
								...oldValues,
								activeTab: workspaceSettingsModalTabEnum.timetable,
							}));
						}}
					>
						<ZIonIcon icon={timeOutline} className='pt-1' />
						<ZIonText className='pb-3'>Timetable</ZIonText>
					</ZIonSegmentButton>

					{/* Labels */}
					<ZIonSegmentButton
						value={workspaceSettingsModalTabEnum.labels}
						className='text-transform-initial ion-text-center'
						onClick={() => {
							setCompState((oldValues) => ({
								...oldValues,
								activeTab: workspaceSettingsModalTabEnum.labels,
							}));
						}}
					>
						<ZIonIcon icon={pricetagOutline} className='pt-1' />
						<ZIonText className='pb-3'>Labels</ZIonText>
					</ZIonSegmentButton>

					{/* Settings */}
					<ZIonSegmentButton
						value={workspaceSettingsModalTabEnum.settings}
						className='text-transform-initial ion-text-center'
						onClick={() => {
							setCompState((oldValues) => ({
								...oldValues,
								activeTab: workspaceSettingsModalTabEnum.settings,
							}));
						}}
					>
						<ZIonIcon icon={settingsOutline} className='pt-1' />
						<ZIonText className='pb-3'>Settings</ZIonText>
					</ZIonSegmentButton>

					{/* Approvals */}
					<ZIonSegmentButton
						value={workspaceSettingsModalTabEnum.approvals}
						className='text-transform-initial ion-text-center'
						onClick={() => {
							setCompState((oldValues) => ({
								...oldValues,
								activeTab: workspaceSettingsModalTabEnum.approvals,
							}));
						}}
					>
						<ZIonIcon icon={checkmarkOutline} className='pt-1' />
						<ZIonText className='pb-3'>Approvals</ZIonText>
					</ZIonSegmentButton>
				</ZIonSegment>
			</ZIonHeader>

			{/* Content */}
			<ZIonContent>
				<ZIonGrid>
					<ZIonRow>
						{compState.activeTab === workspaceSettingsModalTabEnum.timetable ? (
							<ZTimetableTab />
						) : compState.activeTab === workspaceSettingsModalTabEnum.labels ? (
							<ZLabelsTab />
						) : compState.activeTab ===
						  workspaceSettingsModalTabEnum.settings ? (
							<ZSettingsTab />
						) : compState.activeTab ===
						  workspaceSettingsModalTabEnum.approvals ? (
							<ZApprovalTab />
						) : (
							''
						)}
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</>
	);
};

export default ZWorkspacesSettingModal;
