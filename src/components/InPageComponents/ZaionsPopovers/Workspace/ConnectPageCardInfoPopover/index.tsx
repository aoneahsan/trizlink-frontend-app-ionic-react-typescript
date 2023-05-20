/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { alertCircle, logoFacebook } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonItem,
	ZIonList,
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
import {
	PageInfoCardItemTypeEnum,
	workspaceFormConnectPagesEnum,
	WorkspacePageCardInfoPopoverItemType,
} from '@/types/AdminPanel/workspace';
import classNames from 'classnames';

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
	items: WorkspacePageCardInfoPopoverItemType[];
}> = ({ items }) => {
	return (
		<ZIonContent className='ion-padding'>
			<ZIonGrid className=''>
				<ZIonRow className='gap-1 ion-align-items-center'>
					{items.length &&
						items.map((item) => (
							<>
								{item.type === PageInfoCardItemTypeEnum.heading && (
									<ZIonCol size='12'>
										<ZIonText className='text-[15px] font-bold block'>
											{item.text}
										</ZIonText>
									</ZIonCol>
								)}

								{/*  */}
								{item.type === PageInfoCardItemTypeEnum.simpleCard && (
									<ZIonCol size='12'>
										{item.items?.map((_simpleCardItem) => {
											return (
												<>
													<ZIonRow>
														{/*  */}
														<ZIonCol size='max-content'>
															<ZIonIcon
																icon={_simpleCardItem.icon}
																className='w-6 h-6'
															/>
														</ZIonCol>

														{/*  */}
														<ZIonCol>
															<ZIonText className='block font-bold text-[13px]'>
																{_simpleCardItem.heading}
															</ZIonText>
															{_simpleCardItem.subheading && (
																<ZIonText className='block text-[13px]'>
																	{_simpleCardItem.subheading}
																</ZIonText>
															)}
														</ZIonCol>

														{/*  */}
														<ZIonCol size='12'>
															<ZIonList lines='none' className='py-0'>
																{_simpleCardItem.listItems?.map((el, index) => (
																	<div
																		key={index}
																		className='flex gap-1 py-1 ion-align-items-center ion-item-start-no-padding'
																	>
																		<ZIonIcon icon={el.icon} />
																		<ZIonText className='text-[14px]'>
																			{el.text}
																		</ZIonText>
																	</div>
																))}
															</ZIonList>
														</ZIonCol>
													</ZIonRow>
												</>
											);
										})}
									</ZIonCol>
								)}

								{/*  */}
								{item.type === PageInfoCardItemTypeEnum.infoMessage && (
									<>
										<ZIonCol size='12' className='p-0 m-0'>
											<ZIonRow className='ion-align-items-center'>
												<ZIonCol
													size='max-content'
													className='flex ion-align-items-center'
												>
													<ZIonIcon
														icon={alertCircle}
														color='primary'
														className='w-6 h-6'
													/>
												</ZIonCol>
												{/*  */}
												<ZIonCol>
													<ZIonText className='text-[13px]'>
														<p
															dangerouslySetInnerHTML={{
																__html: item.htmlContent ?? '',
															}}
														></p>
													</ZIonText>
												</ZIonCol>
											</ZIonRow>
										</ZIonCol>
									</>
								)}
							</>
						))}
				</ZIonRow>
			</ZIonGrid>
		</ZIonContent>
	);
};

export default ZWorkspaceConnectPagesCardInfoPopover;
