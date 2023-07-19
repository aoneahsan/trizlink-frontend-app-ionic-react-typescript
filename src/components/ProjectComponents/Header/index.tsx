/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { chevronDownOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZUserProfileButton from '@/components/AdminPanelComponents/UserProfileButton';
import {
	ZIonCol,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonImg,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
	ZIonTitle,
	ZIonToolbar,
} from '@/components/ZIonComponents';
import ZIonSearchbar from '@/components/ZIonComponents/ZIonSearchbar';
import ZProjectBoardsPopover from '@/components/InPageComponents/ZaionsPopovers/Project/BoardPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import {
	ProjectHeaderActiveLinkEnum,
	ZProjectBoardInterface,
	ZProjectInterface,
} from '@/types/AdminPanel/Project/index.type';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS, { ProjectBoardDefaultData } from '@/utils/constants';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ZProjectBoardsRStateAtom } from '@/ZaionsStore/UserDashboard/Project/index.recoil';
import { reportCustomError } from '@/utils/customErrorType';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { createRedirectRoute } from '@/utils/helpers';

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

const ZProjectHeader: React.FC<{
	activeLink?: ProjectHeaderActiveLinkEnum;
}> = ({ activeLink = ProjectHeaderActiveLinkEnum.boards }) => {
	const { isXlScale, isLgScale, isSmScale, isMdScale } = useZMediaQueryScale();

	//
	const { zNavigatePushRoute } = useZNavigate();

	const { projectId, boardId } = useParams<{
		projectId: string;
		boardId: string;
	}>();

	// Status popover
	const { presentZIonPopover: presentZProjectBoardsPopover } = useZIonPopover(
		ZProjectBoardsPopover,
		{
			projectId,
		}
	);

	// Recoil state to store current project boards
	const [zProjectBoardsStateAtom, setZProjectBoardsStateAtom] = useRecoilState(
		ZProjectBoardsRStateAtom
	);

	// Getting current project data from backend.
	const { data: ZCurrentProjectData } = useZRQGetRequest<ZProjectInterface>({
		_url: API_URL_ENUM.project_update_delete,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.GET, projectId],
		_itemsIds: [projectId],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
		_extractType: ZRQGetRequestExtractEnum.extractItem,
	});

	// Getting boards of project from backend.
	const { data: BoardsData } = useZRQGetRequest<ZProjectBoardInterface[]>({
		_url: API_URL_ENUM.board_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD.MAIN, projectId],
		_itemsIds: [projectId],
		_urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
	});

	// Getting project board from backend.
	const { data: ZCurrentBoardData, error: ZBoardError } =
		useZRQGetRequest<ZProjectBoardInterface>({
			_url: API_URL_ENUM.board_update_delete,
			_key: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD.GET,
				projectId,
				boardId,
			],
			_itemsIds: [projectId, boardId],
			_urlDynamicParts: [
				CONSTANTS.RouteParams.project.projectId,
				CONSTANTS.RouteParams.project.board.boardId,
			],
			_extractType: ZRQGetRequestExtractEnum.extractItem,
			_shouldFetchWhenIdPassed: !boardId ? true : false,
		});

	// After getting boards storing it to recoil.
	useEffect(() => {
		try {
			if (BoardsData && BoardsData?.length > 0) {
				setZProjectBoardsStateAtom((_) => ({
					currentBoard: ZCurrentBoardData || ProjectBoardDefaultData,
					allBoards: BoardsData,
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [BoardsData]);

	return (
		<ZIonHeader>
			{/* Tooltip */}
			<ZIonToolbar
				className={classNames({
					'flex flex-wrap px-0 mx-auto ion-align-items-center ion-justify-content-between sm:px-4':
						true,
					container: isXlScale,
					'px-2': !isSmScale,
				})}
			>
				{/* Grid */}
				<ZIonGrid className='ion-no-margin ion-no-padding'>
					{/* Row */}
					<ZIonRow className='ion-no-margin ion-no-padding ion-align-items-center'>
						{/* Col-1 */}
						<ZIonCol
							className={classNames({
								'ion-no-margin ion-no-padding ion-align-items-center lg:h-auto':
									true,
								'flex h-12': isMdScale,
							})}
							sizeXl='8.8'
							sizeLg='7.8'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
						>
							<div className='max-w-[9rem] h-full py-3 w-max lg:mr-6 md:mr-3'>
								<ZIonRouterLink
									routerLink={ZaionsRoutes.AdminPanel.Projects.Board.Main}
									color='dark'
								>
									{ZCurrentProjectData &&
										ZCurrentProjectData?.image?.fileUrl !== null && (
											<ZIonImg
												className='h-6 sm:h-8'
												src={ZCurrentProjectData?.image?.fileUrl}
											/>
										)}

									{ZCurrentProjectData &&
										ZCurrentProjectData?.image?.fileUrl === null && (
											<ZIonTitle className='block text-base font-medium truncate transition duration-150 ease-in-out ion-no-padding hover:no-underline md:text-lg lg:text-xl sm:text-md lg:mt-1'>
												{ZCurrentProjectData.projectName}
											</ZIonTitle>
										)}
								</ZIonRouterLink>
							</div>

							{/*  */}
							<div
								className={classNames({
									'flex h-full ion-align-items-center': true,
									'ion-justify-content-center pb-[2px]': isMdScale,
									'w-full': !isMdScale,
								})}
							>
								{/*  */}
								<ZIonText
									className={classNames({
										'flex h-full px-1 py-2 mr-3 font-semibold border-b-2 border-transparent cursor-pointer lg:mt-1 ion-align-items-center ion-justify-content-center':
											true,
										'z-ion-border-color-danger_opacity_point7':
											activeLink === ProjectHeaderActiveLinkEnum.boards,
									})}
								>
									<ZIonText className='tracking-wide ms-1 md:text-md lg:text-[.9rem] sm:text-sm'>
										{zProjectBoardsStateAtom?.currentBoard?.title || 'Boards'}
									</ZIonText>
									<ZIonText
										className=''
										onClick={(event: unknown) => {
											presentZProjectBoardsPopover({
												_event: event as Event,
												_cssClass: '',
												// _dismissOnSelect: false,
												// _onWillDismiss: ({ detail }) => {
												// 	detail.data !== undefined && setFieldValue();
												// },
											});
										}}
									>
										<ZIonIcon
											icon={chevronDownOutline}
											className={classNames({
												'w-5 h-5 pt-[2px] ms-1 mt-1 z-hover-color-danger': true,
											})}
										/>
									</ZIonText>
								</ZIonText>

								{/*  */}
								<ZIonText
									className={classNames({
										'px-1 mr-3 border-b-2 border-transparent cursor-pointer py-[0.90rem] h-full sm:flex hover:no-underline lg:mt-1 ms-1 md:text-md lg:text-[.9rem] sm:text-sm z-hover-color-danger':
											true,
										'z-ion-border-color-danger_opacity_point7 z_ion_color_danger':
											activeLink === ProjectHeaderActiveLinkEnum.roadmap,
									})}
									onClick={() => {
										if (projectId) {
											zNavigatePushRoute(
												createRedirectRoute({
													url: ZaionsRoutes.AdminPanel.Projects.Roadmap,
													params: [CONSTANTS.RouteParams.project.projectId],
													values: [projectId],
												})
											);
										}
									}}
								>
									Roadmap
								</ZIonText>

								{/*  */}
								<ZIonText
									className={classNames({
										'px-1 py-[0.90rem] mr-3 border-b-2 border-transparent cursor-pointer sm:flex hover:no-underline lg:mt-1 ms-1 md:text-md lg:text-[.9rem] sm:text-sm z-hover-color-danger':
											true,
										'z-ion-border-color-danger_opacity_point7 z_ion_color_danger':
											activeLink === ProjectHeaderActiveLinkEnum.changelog,
									})}
								>
									Changelog
								</ZIonText>
							</div>
						</ZIonCol>

						{/* Col-1 */}
						<ZIonCol
							sizeXl=''
							sizeLg=''
							sizeMd='10.5'
							sizeSm='10.5'
							sizeXs='10.5'
							className='flex h-full ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center'
						>
							<ZIonSearchbar
								animated={true}
								placeholder='Search ideas...'
								className={classNames({
									'pb-[0px!important]': true,
									'px-[0px!important]': !isLgScale,
								})}
								mode='ios'
							></ZIonSearchbar>
						</ZIonCol>

						{/* Col-3 */}
						<ZIonCol
							sizeXl='max-content'
							sizeLg='max-content'
							sizeMd='1.4'
							sizeSm='1.4'
							sizeXs='1.4'
							className={classNames({
								'flex ion-align-items-center ion-justify-content-end':
									!isLgScale,
							})}
						>
							{/*  */}
							<ZUserProfileButton
								className={classNames({
									'w-[50px!important] h-[50px!important]': isLgScale,
									'w-[40px!important] h-[40px!important]': !isLgScale,
								})}
							/>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonToolbar>
		</ZIonHeader>
	);
};

export default ZProjectHeader;
