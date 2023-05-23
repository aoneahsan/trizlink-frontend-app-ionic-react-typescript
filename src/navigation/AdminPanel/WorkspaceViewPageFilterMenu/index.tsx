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
	ZIonAccordion,
	ZIonAccordionGroup,
	ZIonCheckbox,
	ZIonCol,
	ZIonContent,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonMenu,
	ZIonRadio,
	ZIonRadioGroup,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import CONSTANTS from '@/utils/constants';
import {
	alertCircle,
	arrowUpOutline,
	chatbubbleEllipsesOutline,
	chatbubbleOutline,
	checkmarkCircle,
	checkmarkCircleOutline,
	checkmarkOutline,
	cloudDownload,
	cloudDownloadOutline,
	eyeOffOutline,
	fileTrayFullOutline,
	fileTrayStackedOutline,
	flag,
	flagOutline,
	megaphone,
	navigateCircle,
	navigateCircleOutline,
	pencil,
	searchOutline,
	send,
	time,
	timeOutline,
} from 'ionicons/icons';
import { filterMenuOptions } from '@/data/UserDashboard/Workspace/FilterMenu/index.data';
import { workspaceFilterAccordionContentEnum } from '@/types/AdminPanel/workspace';

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

const ZWorkspaceViewPageFilterMenu: React.FC = () => {
	return (
		<ZIonMenu
			contentId={CONSTANTS.MENU_IDS.ADMIN_PAGE_WORKSPACE_VIEW_FILTER_MENU_ID}
			side='end'
			menuId={CONSTANTS.MENU_IDS.ADMIN_PAGE_WORKSPACE_VIEW_FILTER_MENU_ID}
		>
			<ZIonContent>
				<ZIonItem lines='full' className='font-bold text-xl' minHeight='66px'>
					Filter & sort
				</ZIonItem>

				<ZIonRow>
					{/*  */}
					<ZIonCol size='12' className='border-bottom pb-4'>
						<ZIonLabel
							className='text-xs block mt-2 mb-1 ms-2 tracking-widest'
							color='medium'
						>
							SORT BY:
						</ZIonLabel>

						{/*  */}
						<ZIonAccordionGroup>
							<ZIonAccordion value='f'>
								<ZIonItem
									slot='header'
									lines='full'
									minHeight='46px'
									color='light'
								>
									<ZIonIcon icon={arrowUpOutline} className='w-4 h-4' />
									<ZIonText className='text-sm pt-1 ms-2'>
										First scheduled date
									</ZIonText>
								</ZIonItem>
								<div
									className='ion-padding zaions__light_bg mt-1'
									slot='content'
								>
									<ZIonRadioGroup>
										{/* First scheduled date */}
										<div className='pb-2'>
											<ZIonRadio
												value='FirstScheduledDate'
												labelPlacement='end'
												className='text-sm'
											>
												First scheduled date
											</ZIonRadio>
										</div>

										{/* Last scheduled date */}
										<div className='pb-2'>
											<ZIonRadio
												value='LastScheduledDate'
												labelPlacement='end'
												className='text-sm'
											>
												Last scheduled date
											</ZIonRadio>
										</div>

										{/* Last created */}
										<div className='pb-2'>
											<ZIonRadio
												value='LastCreated'
												labelPlacement='end'
												className='text-sm'
											>
												Last created
											</ZIonRadio>
										</div>

										{/* First created */}
										<div className='pb-2'>
											<ZIonRadio
												value='FirstCreated'
												labelPlacement='end'
												className='text-sm'
											>
												First created
											</ZIonRadio>
										</div>

										{/* Recent comments */}
										<div className='pb-2'>
											<ZIonRadio
												value='RecentComments'
												labelPlacement='end'
												className='text-sm'
											>
												Recent comments
											</ZIonRadio>
										</div>

										{/* Last activity */}
										<div className='pb-2'>
											<ZIonRadio
												value='LastActivity'
												labelPlacement='end'
												className='text-sm'
											>
												Last activity
											</ZIonRadio>
										</div>

										{/* Custom order */}
										<div className='pb-2'>
											<ZIonRadio
												value='CustomOrder'
												labelPlacement='end'
												className='text-sm'
											>
												Custom order
											</ZIonRadio>
										</div>
									</ZIonRadioGroup>
								</div>
							</ZIonAccordion>
						</ZIonAccordionGroup>
					</ZIonCol>

					{/* FILTER BY: */}
					<ZIonCol size='12' className='border-bottom pb-4'>
						<ZIonLabel
							className='text-xs block mt-2 mb-1 ms-2 tracking-widest'
							color='medium'
						>
							FILTER BY:
						</ZIonLabel>

						{/* Z Ion Accordion Group */}
						<ZIonAccordionGroup>
							{filterMenuOptions.map((el, index) => {
								return (
									<ZIonAccordion value={el.value} key={index} className='mt-2'>
										<ZIonItem
											slot='header'
											lines='none'
											minHeight='46px'
											color='light'
										>
											<ZIonIcon icon={el.icon} className='w-4 h-4' />
											<ZIonText className='text-sm pt-1 ms-2'>
												{el.label}
											</ZIonText>
										</ZIonItem>
										<div
											className='ion-padding zaions__light_bg mt-1'
											slot='content'
										>
											{/* here we are looping the filter items, first we are checking if we have filter items, if we have filter items then we are checking that what type of items are they checkbox, ratio, etc. accounting to type we are showing content.  */}
											{el.filterItems.length ? (
												// checking id el.filterType is workspaceFilterAccordionContentEnum.checkbox then show this content
												el.filterType ===
												workspaceFilterAccordionContentEnum.checkbox ? (
													el.filterItems.map((_item, checkboxIndex) => {
														return (
															<div className='pb-2' key={checkboxIndex}>
																<ZIonCheckbox
																	labelPlacement='end'
																	className='text-sm ion-align-items-center'
																	value={el.value}
																>
																	<ZIonLabel className='text-sm ion-align-items-center flex'>
																		{_item.icon && (
																			<ZIonIcon
																				className='w-5 h-5'
																				icon={_item.icon}
																				color={_item.color}
																			/>
																		)}
																		<ZIonText className='ms-1'>
																			{_item.title}
																		</ZIonText>
																	</ZIonLabel>
																</ZIonCheckbox>
															</div>
														);
													})
												) : // else checking if el.filterType is workspaceFilterAccordionContentEnum.radio then show this content
												el.filterType ===
												  workspaceFilterAccordionContentEnum.radio ? (
													<ZIonRadioGroup>
														{el.filterItems.map((_item, ratioIndex) => {
															return (
																<div className='pb-2' key={ratioIndex}>
																	<div className='pb-2'>
																		<ZIonRadio
																			value={_item.title}
																			labelPlacement='end'
																			className='text-sm'
																		>
																			{_item.title}
																		</ZIonRadio>
																	</div>
																</div>
															);
														})}
													</ZIonRadioGroup>
												) : null
											) : (
												// else if el.filterItems is empty then show this content
												<div className='py-3 flex ion-align-items-center ion-justify-content-center flex-col'>
													<ZIonIcon
														icon={fileTrayStackedOutline}
														className='w-7 h-7'
														color='medium'
													/>
													<ZIonText className='mt-2 text-sm' color='medium'>
														No {el.label}
													</ZIonText>
												</div>
											)}
										</div>
									</ZIonAccordion>
								);
							})}
						</ZIonAccordionGroup>
					</ZIonCol>

					<ZIonCol size='12' className='border-bottom py-4'>
						<ZIonItem
							lines='none'
							minHeight='46px'
							color='light'
							className='ion-activatable ion-focusable zaions__cursor_pointer '
						>
							<ZIonIcon icon={searchOutline} className='w-4 h-4' />
							<ZIonText className='text-sm pt-1 ms-2'>Search in posts</ZIonText>
						</ZIonItem>
					</ZIonCol>

					<ZIonCol size='12' className='border-bottom py-4 mb-2'>
						<ZIonItem
							lines='none'
							minHeight='46px'
							color='light'
							className='ion-activatable ion-focusable zaions__cursor_pointer '
						>
							<ZIonIcon icon={eyeOffOutline} className='w-4 h-4' />
							<ZIonText className='text-sm pt-1 ms-2'>
								Hide team only posts
							</ZIonText>
						</ZIonItem>

						<ZIonItem
							lines='none'
							minHeight='46px'
							color='light'
							className='ion-activatable ion-focusable zaions__cursor_pointer mt-2'
						>
							<ZIonIcon icon={fileTrayFullOutline} className='w-4 h-4' />
							<ZIonText className='text-sm pt-1 ms-2'>
								Show archived posts
							</ZIonText>
						</ZIonItem>
					</ZIonCol>
				</ZIonRow>
			</ZIonContent>
		</ZIonMenu>
	);
};

export default ZWorkspaceViewPageFilterMenu;
