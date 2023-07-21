/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZProjectHeader from '@/components/ProjectComponents/Header';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import {
	addOutline,
	chevronDownOutline,
	chevronUpOutline,
	reorderFourOutline,
} from 'ionicons/icons';
import {
	ProjectHeaderActiveLinkEnum,
	ZBoardStatusInterface,
	ZProjectBoardIdeasInterface,
} from '@/types/AdminPanel/Project/index.type';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import ZProjectOrderPopover from '@/components/InPageComponents/ZaionsPopovers/Project/OrderPopover';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useParams } from 'react-router';

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

const ZProjectRoadmapPage: React.FC = () => {
	const { isXlScale, isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

	const { projectId, boardId } = useParams<{
		projectId: string;
		boardId: string;
	}>();

	// Order popover
	const { presentZIonPopover: presentZProjectOrderPopover } =
		useZIonPopover(ZProjectOrderPopover);

	// Getting project board boardIdeas from backend.
	const { data: ZBoardIdeasData } = useZRQGetRequest<
		ZProjectBoardIdeasInterface[]
	>({
		_url: API_URL_ENUM.boardIdea_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.MAIN,
			projectId,
			boardId,
		],
		_itemsIds: [boardId],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.board.boardId],
		_shouldFetchWhenIdPassed: !boardId ? true : false,
	});

	// Getting project boardStatuses from backend.
	const { data: ZCurrentBoardStatues } = useZRQGetRequest<
		ZBoardStatusInterface[]
	>({
		_url: API_URL_ENUM.boardStatus_create_list,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_STATUS.MAIN,
			projectId,
			boardId,
		],
		_itemsIds: [boardId],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.board.boardId],
		_shouldFetchWhenIdPassed: !boardId ? true : false,
	});

	return (
		<ZaionsIonPage>
			{/* Header */}
			<ZProjectHeader activeLink={ProjectHeaderActiveLinkEnum.roadmap} />

			{/* Content */}
			<ZIonContent color='light'>
				{/* Grid */}
				<ZIonGrid
					className={classNames({
						'mt-4': true,
						container: isXlScale,
						'px-2': !isSmScale,
					})}
				>
					{/* Row-1 */}
					<ZIonRow>
						{/* Col-1 */}
						<ZIonCol sizeXl='7' sizeLg='7' sizeMd='6' sizeSm='6' sizeXs='12'>
							{/* Order popover button */}
							<ZIonButton
								fill='outline'
								color='medium'
								style={{ '--border-width': '1px' }}
								expand={!isMdScale ? 'block' : undefined}
								size='default'
								height='30px'
								className='overflow-hidden bg-white'
								onClick={(event: unknown) => {
									presentZProjectOrderPopover({
										_event: event as Event,
										_cssClass: '',
										// _dismissOnSelect: false,
										// _onWillDismiss: ({ detail }) => {
										// 	detail.data !== undefined && setFieldValue();
										// },
									});
								}}
							>
								<ZIonIcon icon={reorderFourOutline} />
								<ZIonText
									className='text-[1rem] font-semibold ms-1'
									color='dark'
								>
									Order:
								</ZIonText>
								<ZIonText className='mx-1 text-[1rem] font-normal'>
									Trending
								</ZIonText>
								<ZIonIcon icon={chevronDownOutline} color='dark' />
							</ZIonButton>

							{/* Boards popover button */}
							<ZIonButton
								fill='outline'
								color='medium'
								style={{ '--border-width': '1px' }}
								expand={!isMdScale ? 'block' : undefined}
								size='default'
								height='30px'
								className={classNames({
									'overflow-hidden bg-white': true,
									'ms-2': isMdScale,
								})}
							>
								<ZIonText
									className='text-[1rem] font-semibold ms-1'
									color='dark'
								>
									Boards:
								</ZIonText>
								<ZIonText className='mx-1 text-[1rem] font-normal'>
									All
								</ZIonText>
								<ZIonIcon icon={chevronDownOutline} color='dark' />
							</ZIonButton>

							{/* Tags popover button */}
							<ZIonButton
								fill='outline'
								color='medium'
								style={{ '--border-width': '1px' }}
								expand={!isMdScale ? 'block' : undefined}
								size='default'
								height='30px'
								className={classNames({
									'overflow-hidden bg-white': true,
									'ms-2': isMdScale,
								})}
							>
								<ZIonIcon icon={reorderFourOutline} />
								<ZIonText
									className='text-[1rem] font-semibold ms-1'
									color='dark'
								>
									Tags:
								</ZIonText>
								<ZIonText className='mx-1 text-[1rem] font-normal'>
									Name
								</ZIonText>
								<ZIonIcon icon={chevronDownOutline} color='dark' />
							</ZIonButton>
						</ZIonCol>

						{/* Col-2 */}
						<ZIonCol
							sizeXl='5'
							sizeLg='5'
							sizeMd='6'
							sizeSm='6'
							sizeXs='12'
							className={classNames({
								'flex ion-align-items-center ion-justify-content-end':
									isMdScale,
							})}
						>
							{/* Edit Statuses */}
							<ZIonButton
								fill='outline'
								color='medium'
								style={{ '--border-width': '1px' }}
								expand={!isMdScale ? 'block' : undefined}
								size='default'
								height='30px'
								className='overflow-hidden bg-white'
							>
								<ZIonText color='dark' className='mt-[2px]'>
									Edit Statuses
								</ZIonText>
							</ZIonButton>

							{/* Edit Roadmap */}
							<ZIonButton
								fill='outline'
								color='medium'
								style={{ '--border-width': '1px' }}
								expand={!isMdScale ? 'block' : undefined}
								size='default'
								height='30px'
								className={classNames({
									'overflow-hidden bg-white': true,
									'ms-2': isMdScale,
								})}
							>
								<ZIonText color='dark' className='mt-[2px]'>
									Edit Roadmap
								</ZIonText>
							</ZIonButton>

							{/* Add new idea */}
							<ZIonButton
								color='secondary'
								style={{ '--border-width': '1px' }}
								expand={!isMdScale ? 'block' : undefined}
								size='default'
								height='30px'
								className={classNames({
									'overflow-hidden bg-white': true,
									'ms-2': isMdScale,
								})}
							>
								<ZIonIcon icon={addOutline} />
								Add new idea
							</ZIonButton>
						</ZIonCol>
					</ZIonRow>

					{/* Row-2 */}
					<ZIonRow
						className={classNames({
							'px-2': !isMdScale,
						})}
					>
						<Swiper
							spaceBetween={isMdScale ? 30 : 20}
							slidesPerView={isMdScale ? 3 : !isSmScale ? 1 : 2}
							onSlideChange={() => {}}
							onSwiper={(_) => {}}
							style={{ width: '100%' }}
							className='py-3'
							loop
						>
							{ZCurrentBoardStatues?.map((el) => {
								if (el?.isActive) {
									return (
										<SwiperSlide
											key={el.id}
											className={classNames({
												'bg-white rounded-lg shadow mr-8 h-[42rem]': true,
												'overflow-y-scroll zaions_pretty_scrollbar': false,
											})}
										>
											<div className='relative py-4 text-center capitalize'>
												<ZIonText>
													{el.title} (
													{
														ZBoardIdeasData?.filter(
															(_idea) => _idea.statusUniqueId === el.id
														)?.length
													}
													)
												</ZIonText>
											</div>

											<div
												className='h-[1px] w-full'
												style={{
													boxShadow: `${el.color} 0px 0px 2px 0px`,
													backgroundColor: el.color,
												}}
											></div>

											<div className=''>
												<ZIonList lines='none'>
													{ZBoardIdeasData?.filter(
														(_idea) => _idea.statusUniqueId === el.id
													)?.map((_singleIdea) => {
														return (
															<ZIonItem
																className='m-4 mb-5 break-words ion-no-padding'
																// color='medium'
																key={_singleIdea.id}
															>
																<ZIonButton
																	height='60px'
																	fill='clear'
																	color='medium'
																	style={{
																		'--padding-start': '11px',
																		'--padding-end': '11px',
																	}}
																	className='mr-2 ion-no-margin'
																>
																	<ZIonLabel color='light'>
																		<p className='m-[0px!important] z_ion_color_danger'>
																			<ZIonIcon
																				icon={chevronUpOutline}
																				className='w-5 h-5'
																			/>
																		</p>
																		<p className='m-[0px!important] font-bold z_ion_color_danger text-lg'>
																			1
																		</p>
																	</ZIonLabel>
																</ZIonButton>

																<ZIonLabel>
																	<ZIonText className='mb-1 text-lg font-bold transition duration-150 ease-in-out cursor-pointer z-hover-color-danger'>
																		{_singleIdea.title}
																	</ZIonText>
																	<p>talha-bin-irshad</p>
																</ZIonLabel>
															</ZIonItem>
														);
													})}
												</ZIonList>
											</div>
										</SwiperSlide>
									);
								}
							})}

							{/* <SwiperSlide
								key={1}
								className={classNames({
									'bg-white rounded-lg shadow mr-8 h-[42rem]': true,
									'overflow-y-scroll zaions_pretty_scrollbar': false,
								})}
							>
								<div className='relative py-4 text-center capitalize'>
									<ZIonText>In Progress (0)</ZIonText>
								</div>

								<div
									className='h-[1px] w-full'
									style={{
										boxShadow: 'rgb(90, 115, 193) 0px 0px 2px 0px',
										backgroundColor: 'rgb(90, 115, 193)',
									}}
								></div>

								<div className=''>
									<ZIonList lines='none'>
										{[1, 2].map((el) => {
											return (
												<ZIonItem
													className='m-4 mb-5 break-words ion-no-padding'
													// color='medium'
													key={el}
												>
													<ZIonButton
														height='60px'
														fill='clear'
														color='medium'
														style={{
															'--padding-start': '11px',
															'--padding-end': '11px',
														}}
														className='mr-2 ion-no-margin'
													>
														<ZIonLabel color='light'>
															<p className='m-[0px!important] z_ion_color_danger'>
																<ZIonIcon
																	icon={chevronUpOutline}
																	className='w-5 h-5'
																/>
															</p>
															<p className='m-[0px!important] font-bold z_ion_color_danger text-lg'>
																1
															</p>
														</ZIonLabel>
													</ZIonButton>

													<ZIonLabel>
														<ZIonText className='mb-1 text-lg font-bold transition duration-150 ease-in-out cursor-pointer z-hover-color-danger'>
															Talha
														</ZIonText>
														<p>talha-bin-irshad</p>
													</ZIonLabel>
												</ZIonItem>
											);
										})}
									</ZIonList>
								</div>
							</SwiperSlide>

							<SwiperSlide
								key={2}
								className={classNames({
									'bg-white rounded-lg shadow mr-8 h-[42rem]': true,
									'overflow-y-scroll zaions_pretty_scrollbar': false,
								})}
							>
								<div className='relative py-4 text-center capitalize'>
									<ZIonText>In Progress (0)</ZIonText>
								</div>

								<div
									className='h-[1px] w-full'
									style={{
										boxShadow: 'rgb(90, 115, 193) 0px 0px 2px 0px',
										backgroundColor: 'rgb(90, 115, 193)',
									}}
								></div>

								<div className=''>
									<ZIonList lines='none'>
										{[1, 2].map((el) => {
											return (
												<ZIonItem
													className='m-4 mb-5 break-words ion-no-padding'
													// color='medium'
													key={el}
												>
													<ZIonButton
														height='60px'
														fill='clear'
														color='medium'
														style={{
															'--padding-start': '11px',
															'--padding-end': '11px',
														}}
														className='mr-2 ion-no-margin'
													>
														<ZIonLabel color='light'>
															<p className='m-[0px!important] z_ion_color_danger'>
																<ZIonIcon
																	icon={chevronUpOutline}
																	className='w-5 h-5'
																/>
															</p>
															<p className='m-[0px!important] font-bold z_ion_color_danger text-lg'>
																1
															</p>
														</ZIonLabel>
													</ZIonButton>

													<ZIonLabel>
														<ZIonText className='mb-1 text-lg font-bold transition duration-150 ease-in-out cursor-pointer z-hover-color-danger'>
															Talha
														</ZIonText>
														<p>talha-bin-irshad</p>
													</ZIonLabel>
												</ZIonItem>
											);
										})}
									</ZIonList>
								</div>
							</SwiperSlide>

							<SwiperSlide
								key={3}
								className={classNames({
									'bg-white rounded-lg shadow mr-8 h-[42rem]': true,
									'overflow-y-scroll zaions_pretty_scrollbar': false,
								})}
							>
								<div className='relative py-4 text-center capitalize'>
									<ZIonText>In Progress (0)</ZIonText>
								</div>

								<div
									className='h-[1px] w-full'
									style={{
										boxShadow: 'rgb(90, 115, 193) 0px 0px 2px 0px',
										backgroundColor: 'rgb(90, 115, 193)',
									}}
								></div>

								<div className=''>
									<ZIonList lines='none'>
										{[1, 2].map((el) => {
											return (
												<ZIonItem
													className='m-4 mb-5 break-words ion-no-padding'
													// color='medium'
													key={el}
												>
													<ZIonButton
														height='60px'
														fill='clear'
														color='medium'
														style={{
															'--padding-start': '11px',
															'--padding-end': '11px',
														}}
														className='mr-2 ion-no-margin'
													>
														<ZIonLabel color='light'>
															<p className='m-[0px!important] z_ion_color_danger'>
																<ZIonIcon
																	icon={chevronUpOutline}
																	className='w-5 h-5'
																/>
															</p>
															<p className='m-[0px!important] font-bold z_ion_color_danger text-lg'>
																1
															</p>
														</ZIonLabel>
													</ZIonButton>

													<ZIonLabel>
														<ZIonText className='mb-1 text-lg font-bold transition duration-150 ease-in-out cursor-pointer z-hover-color-danger'>
															Talha
														</ZIonText>
														<p>talha-bin-irshad</p>
													</ZIonLabel>
												</ZIonItem>
											);
										})}
									</ZIonList>
								</div>
							</SwiperSlide> */}
						</Swiper>

						<ZIonCol size='12' className='my-4 ion-text-center'>
							<ZIonText color='medium'>
								Powered by
								<ZIonRouterLink className='ms-1 hover:underline'>
									{PRODUCT_NAME}
								</ZIonRouterLink>
							</ZIonText>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZProjectRoadmapPage;
