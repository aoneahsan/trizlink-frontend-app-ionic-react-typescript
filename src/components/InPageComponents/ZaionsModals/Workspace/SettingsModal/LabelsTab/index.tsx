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
import { WorkspaceSettingsLabelPlaceholder } from '@/assets/images';
import ZWorkspaceSettingPlaceholderComp from '@/components/InPageComponents/ZaionsModals/Workspace/SettingsModal/PlaceholderComp';
import { Formik } from 'formik';
import {
	ZIonBadge,
	ZIonButton,
	ZIonChip,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonList,
	ZIonRouterLink,
	ZIonText,
} from '@/components/ZIonComponents';
import {
	addOutline,
	alertCircleOutline,
	checkmark,
	close,
	closeOutline,
	createOutline,
	trashBinOutline,
} from 'ionicons/icons';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

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

const ZLabelsTab: React.FC = () => {
	return (
		<Formik initialValues={{}} onSubmit={() => {}}>
			{/* <ZWorkspaceSettingPlaceholderComp
				buttonText='Create label'
				image={WorkspaceSettingsLabelPlaceholder}
				title={
					<span>
						Create labels to categorize posts and <br /> organize your campaigns
						better
					</span>
				}
			/> */}
			{() => {
				return (
					<div className='flex flex-col w-full h-full ion-align-items-center'>
						<ZIonText className='py-2 text-xl'>
							Create and edit your labels below
						</ZIonText>

						<div className='w-[25%]'>
							<ZIonButton className='ion-no-padding' size='small' fill='clear'>
								<ZIonIcon icon={addOutline} className='me-1' />
								<ZIonText className='text-sm pt-[2px]'>Add new label</ZIonText>
							</ZIonButton>
							<ZIonButton
								className='ion-no-padding'
								size='small'
								fill='clear'
								color='medium'
								id='z-workspace-add-label-tooltip'
							>
								<ZIonIcon icon={alertCircleOutline} />
							</ZIonButton>
							<ZRTooltip
								anchorSelect='#z-workspace-add-label-tooltip'
								place='bottom'
								className='z-40'
							>
								<ZIonText>
									Use labels to organize and group your posts around <br />
									campaigns, statuses or categories. A post can <br /> be
									assigned multiple labels. You can easily filter <br /> down
									posts by labels in the Filter & sort menu.
									{/* <br />
									<ZIonRouterLink routerLink='/'>Learn more</ZIonRouterLink> */}
								</ZIonText>
							</ZRTooltip>

							<div className='flex mt-3'>
								<ZIonInput placeholder='Label name' minHeight='2.3rem' />
								<ZIonButton
									height='2.3rem'
									className='mx-1 ion-no-margin ion-no-padding'
									size='small'
									fill='clear'
								>
									<ZIonIcon
										icon={closeOutline}
										color='danger'
										className='w-5 h-5'
									/>
								</ZIonButton>
								<ZIonButton
									height='2.3rem'
									className='mx-1 ion-no-margin ion-no-padding'
									size='small'
									color='success'
									fill='clear'
								>
									<ZIonIcon icon={checkmark} className='w-5 h-5' />
								</ZIonButton>
							</div>

							<ZIonList lines='full' className='mt-1 bg-transparent'>
								<ZIonItem
									minHeight='2rem'
									className='ion-item-start-no-padding'
									style={{
										'--background': 'transparent',
									}}
								>
									<ZIonBadge className='tracking-wider'>label 1</ZIonBadge>
									<ZIonText className='mx-2'>0 posts</ZIonText>

									<ZIonIcon
										slot='end'
										icon={createOutline}
										className='w-5 h-5 cursor-pointer'
										id='z-workspace-add-label-edit'
									/>
									<ZRTooltip
										anchorSelect='#z-workspace-add-label-edit'
										place='left'
										className='z-40 h-[2rem] p-0 text-sm'
									>
										<ZIonText className='text-sm'>Edit label</ZIonText>
									</ZRTooltip>

									<ZIonIcon
										slot='end'
										color='danger'
										icon={trashBinOutline}
										className='w-4 h-4 cursor-pointer ms-2'
										id='z-workspace-add-label-delete'
									/>
									<ZRTooltip
										anchorSelect='#z-workspace-add-label-delete'
										place='left'
										className='z-40 h-[2rem] p-0 text-sm'
									>
										<ZIonText className='text-sm'>Delete label</ZIonText>
									</ZRTooltip>
								</ZIonItem>
							</ZIonList>
						</div>
					</div>
				);
			}}
		</Formik>
	);
};

export default ZLabelsTab;
