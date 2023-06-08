/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { caretDownCircleOutline } from 'ionicons/icons';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonCol,
	ZIonText,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonAccordionGroup,
	ZIonAccordion,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZLinkIonPanelSettingsSidebarActiveLinkType } from '@/types/AdminPanel/linksType';

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
 * ? Like if you have a type for props it should be pleace Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZaionsLinkSettingPanel: React.FC<{
	activeLink: ZLinkIonPanelSettingsSidebarActiveLinkType;
}> = ({ activeLink }) => {
	return (
		<>
			<ZIonCol
				sizeXl='2.3'
				sizeLg='2.5'
				sizeMd='2.7'
				sizeSm='3.3'
				sizeXs='3.3'
				className='border-end ion-md-hidden'
			>
				<ZIonText className='font-bold ps-2'>Your settings</ZIonText>
				<ZIonList lines='none'>
					{/* Profile */}
					<ZIonItem
						className='ion-no-padding ion-no-margin mb-1'
						routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile}
						color={
							activeLink === ZLinkIonPanelSettingsSidebarActiveLinkType.profile
								? 'light'
								: undefined
						}
					>
						<ZIonText
							className='ps-2'
							color={
								activeLink ===
								ZLinkIonPanelSettingsSidebarActiveLinkType.profile
									? 'primary'
									: undefined
							}
						>
							Profile
						</ZIonText>
					</ZIonItem>

					{/* Integrations */}
					<ZIonItem
						className='ion-no-padding ion-no-margin mb-1'
						routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZIntegration}
						color={
							activeLink ===
							ZLinkIonPanelSettingsSidebarActiveLinkType.integrations
								? 'light'
								: undefined
						}
					>
						<ZIonText
							className='ps-2'
							color={
								activeLink ===
								ZLinkIonPanelSettingsSidebarActiveLinkType.integrations
									? 'primary'
									: undefined
							}
						>
							Integrations
						</ZIonText>
					</ZIonItem>
				</ZIonList>

				{/* Account Settings */}
				<ZIonText className='font-bold ps-2'>Account settings</ZIonText>

				<ZIonAccordionGroup className='mb-4'>
					<ZIonAccordion
						value='talhairshad'
						toggleIcon={caretDownCircleOutline}
						toggleIconSlot='end'
					>
						<ZIonItem
							slot='header'
							className='ion-no-padding ion-no-margin mb-1'
						>
							<ZIonLabel className='ps-2 font-bold' color='medium'>
								talhairshad
							</ZIonLabel>
						</ZIonItem>
						<ZIonList lines='none' slot='content'>
							{/* Account details */}
							<ZIonItem
								className='ion-no-padding ion-no-margin mb-1'
								routerLink={
									ZaionsRoutes.AdminPanel.ZaionsDashboard.ZAccountDetails
								}
								color={
									activeLink ===
									ZLinkIonPanelSettingsSidebarActiveLinkType.accountDetails
										? 'light'
										: undefined
								}
							>
								<ZIonText
									className='ps-2'
									color={
										activeLink ===
										ZLinkIonPanelSettingsSidebarActiveLinkType.accountDetails
											? 'primary'
											: undefined
									}
								>
									Account details
								</ZIonText>
							</ZIonItem>

							{/* Custom domains */}
							<ZIonItem
								className='ion-no-padding ion-no-margin mb-1'
								routerLink={
									ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCustomDomain
								}
								color={
									activeLink ===
									ZLinkIonPanelSettingsSidebarActiveLinkType.customdomain
										? 'light'
										: undefined
								}
							>
								<ZIonText
									className='ps-2'
									color={
										activeLink ===
										ZLinkIonPanelSettingsSidebarActiveLinkType.customdomain
											? 'primary'
											: undefined
									}
								>
									Custom domains
								</ZIonText>
							</ZIonItem>

							{/* Group */}
							<ZIonItem
								className='ion-no-padding ion-no-margin mb-1'
								routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZGroup}
								color={
									activeLink ===
									ZLinkIonPanelSettingsSidebarActiveLinkType.groups
										? 'light'
										: undefined
								}
							>
								<ZIonText
									className='ps-2'
									color={
										activeLink ===
										ZLinkIonPanelSettingsSidebarActiveLinkType.groups
											? 'primary'
											: undefined
									}
								>
									Groups
								</ZIonText>
							</ZIonItem>

							{/* CVS Bulk Shortening */}
							<ZIonItem
								className='ion-no-padding ion-no-margin mb-1'
								routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCSVBulk}
								color={
									activeLink ===
									ZLinkIonPanelSettingsSidebarActiveLinkType.csvBulkShortening
										? 'light'
										: undefined
								}
							>
								<ZIonText
									className='ps-2'
									color={
										activeLink ===
										ZLinkIonPanelSettingsSidebarActiveLinkType.csvBulkShortening
											? 'primary'
											: undefined
									}
								>
									CSV bulk shortening
								</ZIonText>
							</ZIonItem>
						</ZIonList>
					</ZIonAccordion>
				</ZIonAccordionGroup>

				{/* Developer Settings */}
				<ZIonText className='font-bold ps-2'>Developer settings</ZIonText>
				<ZIonList lines='none'>
					{/* API */}
					<ZIonItem
						className='ion-no-padding ion-no-margin mb-1'
						routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZGroup}
						color={
							activeLink === ZLinkIonPanelSettingsSidebarActiveLinkType.api
								? 'light'
								: undefined
						}
					>
						<ZIonText
							className='ps-2'
							color={
								activeLink === ZLinkIonPanelSettingsSidebarActiveLinkType.api
									? 'light'
									: undefined
							}
						>
							API
						</ZIonText>
					</ZIonItem>
				</ZIonList>
			</ZIonCol>
		</>
	);
};

export default ZaionsLinkSettingPanel;
