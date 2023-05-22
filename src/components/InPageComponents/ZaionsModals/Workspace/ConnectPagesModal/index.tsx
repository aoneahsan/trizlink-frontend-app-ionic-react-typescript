/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';
import {
	alertCircleOutline,
	businessOutline,
	closeOutline,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCard,
	ZIonCardContent,
	ZIonCardSubtitle,
	ZIonCardTitle,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import { CardsByType } from '@/data/UserDashboard/Workspace/ConnectPagesTab/index.data';
import ZWorkspaceConnectPagesCardInfoPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/ConnectPageCardInfoPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormConnectPagesCardEnum,
	workspaceFormConnectPagesEnum,
	WorkspacePageCardInfoPopoverItemType,
} from '@/types/AdminPanel/workspace';
import ZWorkspaceMockupPageModal from '../MockupPageModal';
import { SingleCard } from '@/components/WorkspacesComponents/SingleCard';

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

const ZWorkspaceConnectPagesModal: React.FC<{
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
	pageType: workspaceFormConnectPagesEnum;
}> = ({ dismissZIonModal, pageType }) => {
	// getting the cards accounting to pageType
	const { cards, logo, color } = CardsByType[pageType];

	//
	const { presentZIonModal: presentZWorkspaceMockupPageModal } = useZIonModal(
		ZWorkspaceMockupPageModal,
		{
			pageType: pageType,
			color: color,
			logo: logo,
		}
	);

	return (
		<Formik
			initialValues={{}}
			validate={() => {
				const errors = {};

				return errors;
			}}
			onSubmit={() => {}}
		>
			{() => {
				return (
					<>
						<ZIonHeader>
							<ZIonGrid className='w-full'>
								{/*  */}
								<ZIonRow className='ion-align-items-center'>
									{/*  */}
									<ZIonCol className='flex ion-align-items-center ms-3'>
										{/*  */}
										<div
											className='flex w-10 h-10 rounded ion-align-items-center ion-justify-content-center'
											style={{ backgroundColor: color }}
										>
											<ZIonIcon icon={logo} className='w-7 h-7' color='light' />
										</div>
										{/*  */}
										<div className='ms-2'>
											<ZIonText className='block font-bold'>
												Connect pages
											</ZIonText>
											<ZIonText className='block zaions__fs_13'>
												Select what type of pages you want to connect
											</ZIonText>
										</div>
									</ZIonCol>

									{/*  */}
									<ZIonCol className='ion-text-end'>
										<ZIonButton
											fill='clear'
											onClick={() => {
												dismissZIonModal();
											}}
										>
											<ZIonIcon
												icon={closeOutline}
												className='w-6 h-6'
												color='dark'
											/>
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonHeader>

						<ZIonContent>
							<ZIonGrid className='h-full'>
								<ZIonRow className='flex flex-wrap h-full ion-align-items-center ion-justify-content-center'>
									{/*  */}
									{cards.map((card, index) => {
										return (
											<ZIonCol
												sizeXl='3'
												sizeLg='4'
												sizeMd='5'
												sizeSm='6'
												sizeXs='12'
												key={index}
												className='h-[220px]'
											>
												<SingleCard
													icon={card.cardIcon}
													title={card.title}
													showInfoIcon={card.showInfoIcon}
													infoCardItems={card.infoItems}
													onClick={() => {
														card.type ===
															workspaceFormConnectPagesCardEnum.mockup &&
															presentZWorkspaceMockupPageModal({
																_cssClass: 'workspace-connect-pages-modal-size',
															});
													}}
												/>
											</ZIonCol>
										);
									})}
								</ZIonRow>
							</ZIonGrid>
						</ZIonContent>
					</>
				);
			}}
		</Formik>
	);
};

export default ZWorkspaceConnectPagesModal;
