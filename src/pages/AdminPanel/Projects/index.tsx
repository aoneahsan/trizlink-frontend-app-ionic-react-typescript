/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline, settingsOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonIcon,
	ZIonImg,
	ZIonItem,
	ZIonList,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM } from '@/utils/enums';
import { createRedirectRoute } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZProjectInterface } from '@/types/AdminPanel/Project/index.type';

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
import { ProductLogo } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProjects: React.FC = () => {
	// Get projects data from backend.
	const { data: ProjectsData } = useZRQGetRequest<ZProjectInterface[]>({
		_url: API_URL_ENUM.project_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.MAIN],
	});

	const { zNavigatePushRoute } = useZNavigate();

	return (
		<ZaionsIonPage>
			<ZIonContent>
				{/* bg-[#f7f4f2] */}
				<ZIonRow>
					{/* Logo */}
					<ZIonCol
						size='12'
						className='flex mt-24 ion-align-item-center ion-justify-content-center'
					>
						<div className='flex ion-align-items-center ion-justify-content-center'>
							<ZIonImg
								src={ProductLogo}
								className='w-[3rem] me-3 h-auto rounded-xl overflow-hidden'
							/>
							<ZIonText
								className='text-3xl font-extrabold tracking-wider'
								color='dark'
							>
								{PRODUCT_NAME}
							</ZIonText>
						</div>
					</ZIonCol>

					{/* Projects box */}
					<ZIonCol
						size='12'
						className='flex flex-col mt-16 ion-align-items-center ion-justify-content-center'
					>
						<div className='w-full ion-text-center'>
							<ZIonText
								className='mt-16 text-2xl font-bold text-center'
								color='dark'
							>
								Your projects
							</ZIonText>
						</div>
						<div className='flex flex-col max-w-md px-2 py-2 mx-auto mt-4 mb-8 bg-white rounded-lg shadow-md w-[28rem]'>
							{ProjectsData && ProjectsData?.length > 0 && (
								<ZIonList lines='none' className='my-2'>
									{ProjectsData?.map((el, index) => {
										return (
											<ZIonItem
												className='flex w-full mt-2 rounded cursor-pointer ms-2 ion-activatable'
												style={{ '--inner-padding-end': '0px' }}
												minHeight='40px'
												key={index}
											>
												<div
													className='w-full font-bold'
													onClick={() => {
														if (el.id && el.firstBoardId) {
															zNavigatePushRoute(
																createRedirectRoute({
																	url: ZaionsRoutes.AdminPanel.Projects.Board
																		.Main,
																	params: [
																		CONSTANTS.RouteParams.project.projectId,
																		CONSTANTS.RouteParams.project.board.boardId,
																	],
																	values: [el.id, el.firstBoardId],
																})
															);
														}
													}}
												>
													{el.projectName}
												</div>
												<ZIonButton
													className='pe-3'
													fill='clear'
													slot='end'
													color='dark'
												>
													<ZIonIcon
														icon={settingsOutline}
														className='w-5 h-5'
													/>
												</ZIonButton>
											</ZIonItem>
										);
									})}
								</ZIonList>
							)}

							{/*  */}
							{ProjectsData?.length === 0 && (
								<ZIonText className='mt-2 mb-2 text-center'>
									You don’t have any projects yet
								</ZIonText>
							)}

							{/* border */}
							<div className='my-2 border-b border-dblue-100'></div>

							{/* add new project */}
							<ZIonRouterLink
								routerLink={ZaionsRoutes.AdminPanel.Projects.Create}
								color='dark'
							>
								<div className='flex items-center justify-start flex-1 px-2 py-2 transition duration-150 ease-in-out rounded'>
									<ZIonIcon
										icon={addOutline}
										className='w-6 h-6 mb-[1px] me-1'
									/>
									<ZIonText>New project</ZIonText>
								</div>
							</ZIonRouterLink>
						</div>
					</ZIonCol>
				</ZIonRow>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZProjects;
