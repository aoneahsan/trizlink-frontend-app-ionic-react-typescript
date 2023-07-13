/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	add,
	alertCircle,
	attachOutline,
	chatbubblesOutline,
	chevronDownOutline,
	chevronUpOutline,
	ellipse,
	enter,
	exit,
	pencil,
	reorderFourOutline,
} from 'ionicons/icons';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import { AxiosError } from 'axios';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonCheckbox,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonItem,
	ZIonLabel,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
	ZIonTextarea,
} from '@/components/ZIonComponents';
import ZProjectHeader from '@/components/ProjectComponents/Header';
import ZProjectStatusPopover from '@/components/InPageComponents/ZaionsPopovers/Project/StatusPopover';
import ZProjectOrderPopover from '@/components/InPageComponents/ZaionsPopovers/Project/OrderPopover';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonPopover } from '@/ZaionsHooks/zionic-hooks';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	ZProjectBoardInterface,
	ZProjectInterface,
} from '@/types/AdminPanel/Project/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZProjectBoardsRStateAtom } from '@/ZaionsStore/UserDashboard/Project/index.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { ProductLogo, zEmptyPosts } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProjectViewPage: React.FC = () => {
	const { isXlScale, isMdScale, isSmScale } = useZMediaQueryScale();

	const { projectId, boardId } = useParams<{
		projectId: string;
		boardId: string;
	}>();

	// Recoil state to store current project boards
	const [zProjectBoardsStateAtom, setZProjectBoardsStateAtom] = useRecoilState(
		ZProjectBoardsRStateAtom
	);

	// Order popover
	const { presentZIonPopover: presentZProjectOrderPopover } =
		useZIonPopover(ZProjectOrderPopover);

	// Status popover
	const { presentZIonPopover: presentZProjectStatusPopover } = useZIonPopover(
		ZProjectStatusPopover
	);

	// Getting project from backend.
	const { data: ZCurrentProjectData, error: ZProjectError } =
		useZRQGetRequest<ZProjectInterface>({
			_url: API_URL_ENUM.project_update_delete,
			_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.GET, projectId],
			_itemsIds: [projectId],
			_urlDynamicParts: [CONSTANTS.RouteParams.project.projectId],
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});

	// Getting project from backend.
	const { data: ZCurrentBoardData, error: ZBoardError } =
		useZRQGetRequest<ZProjectBoardInterface>({
			_url: API_URL_ENUM.boardIdea_update_delete,
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
		});

	// if we don't have project with ProjectId show no project found UI.
	if (
		Object.keys(
			((ZProjectError as AxiosError)?.response?.data as { errors: {} })
				?.errors || {}
		)?.length > 0
	) {
		return <ZProjectNotFound />;
	}

	// if we don't have board with boardId show no board found UI.
	if (
		Object.keys(
			((ZBoardError as AxiosError)?.response?.data as { errors: {} })?.errors ||
				{}
		)?.length > 0
	) {
		return <ZProjectBoardNotFound />;
	}

	return (
		<ZaionsIonPage>
			{/* Header */}
			<ZProjectHeader />

			{/* Content */}
			<ZIonContent color='light'>
				{/* Grid */}
				<ZIonGrid
					className={classNames({
						'ion-no-margin ion-no-padding mx-auto sm:px-4 mt-6 mb-4': true,
						container: isXlScale,
						'px-2': !isSmScale,
					})}
				>
					{/* Row */}
					<ZIonRow className='gap-6 ion-no-margin ion-no-padding'>
						{/* Col-1 */}
						<ZIonCol
							className='ion-no-margin ion-no-padding'
							sizeXl='3.3'
							sizeLg='3.3'
							sizeMd='4'
							sizeSm='12'
							sizeXs='12'
						>
							{/* new idea form div */}
							<div className='px-5 py-4 bg-white rounded-lg shadow'>
								<ZIonText className='block text-lg font-bold'>
									{ZCurrentBoardData?.formCustomization?.intoHeading}
								</ZIonText>

								<ZIonText className='block mt-2 whitespace-pre-line'>
									{ZCurrentBoardData?.formCustomization?.intoText}
								</ZIonText>

								<div className='mt-4'>
									{/* Author Name */}
									<ZIonInput label='Author Name' labelPlacement='floating' />

									{/* Title */}
									<ZIonInput
										label={ZCurrentBoardData?.formCustomization?.title}
										labelPlacement='floating'
										placeholder={
											ZCurrentBoardData?.formCustomization?.titlePlaceholder
										}
										className='mt-4'
									/>

									{/* Description */}
									<ZIonTextarea
										fill='outline'
										label={ZCurrentBoardData?.formCustomization?.body}
										labelPlacement='floating'
										placeholder={
											ZCurrentBoardData?.formCustomization?.bodyPlaceholder
										}
										className='mt-4'
										autoGrow
										rows={3}
									/>

									{/* Attach/Replace image button */}
									<div className='mt-4'>
										<div className='w-20 h-20 mb-2 mr-2 border rounded-md shadow-lg border-neutral-200'>
											<ZIonImg
												className='w-full h-full'
												src='http://localhost:8000/storage/uploaded-files/fNsHPbYOTDiJ99Io0l9JnWJnSvnj8eqXb4AcxJUE.jpg'
											/>
										</div>
										<ZIonButton
											className='ion-no-padding ion-no-margin'
											size='small'
											fill='default'
										>
											<ZIonIcon icon={attachOutline} className='mr-1' />
											<ZIonText className='text-[.9rem]'>
												Attach images
											</ZIonText>
										</ZIonButton>
									</div>

									{/* add idea button */}
									<ZIonButton className='mt-4' expand='block'>
										{ZCurrentBoardData?.formCustomization?.buttonText}
									</ZIonButton>
								</div>
							</div>

							{/*  */}
							<div className='mt-5'>
								<ZIonText className='block font-medium' color='medium'>
									Admin tools
								</ZIonText>

								{/* Board settings */}
								<ZIonItem
									lines='none'
									minHeight='38px'
									className={classNames(classes['z-admin-tools-bg'], {
										'mt-2 rounded cursor-pointer ion-activatable': true,
									})}
								>
									<ZIonIcon icon={pencil} color='dark' className='mr-2' />
									<ZIonText color='dark'>Board settings</ZIonText>
								</ZIonItem>

								{/* Export ideas */}
								<ZIonItem
									lines='none'
									minHeight='38px'
									className={classNames(classes['z-admin-tools-bg'], {
										'mt-2 rounded cursor-pointer ion-activatable': true,
									})}
								>
									<ZIonIcon icon={exit} color='dark' className='mr-2' />
									<ZIonText color='dark'>Export ideas</ZIonText>
								</ZIonItem>

								{/* Import ideas */}
								<ZIonItem
									lines='none'
									minHeight='38px'
									className={classNames(classes['z-admin-tools-bg'], {
										'mt-2 rounded cursor-pointer ion-activatable': true,
									})}
								>
									<ZIonIcon icon={enter} color='dark' className='mr-2' />
									<ZIonText color='dark'>Import ideas</ZIonText>
								</ZIonItem>

								{/* New board */}
								<ZIonItem
									lines='none'
									minHeight='38px'
									className={classNames(classes['z-admin-tools-bg'], {
										'mt-2 rounded cursor-pointer ion-activatable': true,
									})}
								>
									<ZIonIcon icon={add} color='dark' className='mr-2' />
									<ZIonText color='dark'>New board</ZIonText>
								</ZIonItem>

								<ZIonText className='block w-full my-4 text-sm text-center ion-text-center'>
									Powered by
									<ZIonRouterLink
										color='dark'
										className='underline ms-1 text-md'
									>
										FeedBear
									</ZIonRouterLink>
								</ZIonText>
							</div>
						</ZIonCol>

						{/* Col-2 */}
						<ZIonCol className='ion-no-margin ion-no-padding'>
							{/*  */}
							<div className='bg-white rounded-lg shadow '>
								{/* Top bar */}
								<div className='px-4 py-4 border-b rounded-t-lg z-ion-border-color-light_opacity_point8'>
									<ZIonRow className='ion-no-padding ion-no-margin'>
										<ZIonCol
											className='ion-no-padding ion-no-margin'
											sizeXl='9'
											sizeLg='9'
											sizeMd='9'
											sizeSm='12'
											sizeXs='12'
										>
											{/* Order popover button */}
											<ZIonButton
												fill='outline'
												color='medium'
												style={{ '--border-width': '1px' }}
												expand={!isMdScale ? 'block' : undefined}
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

											{/* Status popover button */}
											<ZIonButton
												color='medium'
												fill='outline'
												style={{ '--border-width': '1px' }}
												className={classNames({
													'ms-2': isMdScale,
													'mt-2': !isMdScale,
												})}
												expand={!isMdScale ? 'block' : undefined}
												onClick={(event: unknown) => {
													presentZProjectStatusPopover({
														_event: event as Event,
														_cssClass: '',
														// _dismissOnSelect: false,
														// _onWillDismiss: ({ detail }) => {
														// 	detail.data !== undefined && setFieldValue();
														// },
													});
												}}
											>
												<ZIonIcon icon={ellipse} className='w-3 h-3' />
												<ZIonText
													className='text-[1rem] font-semibold ms-1'
													color='dark'
												>
													Status:
												</ZIonText>
												<ZIonText className='mx-1 text-[1rem] font-normal'>
													Not done
												</ZIonText>
												<ZIonIcon icon={chevronDownOutline} color='dark' />
											</ZIonButton>
										</ZIonCol>

										{/* my ideas checkbox */}
										<ZIonCol
											className={classNames({
												'flex ion-no-padding ion-no-margin ion-align-items-center':
													true,
												'ion-justify-content-end': isMdScale,
												'ion-justify-content-start mt-2': !isMdScale,
											})}
										>
											<ZIonCheckbox className='pr-1 mr-1' color='danger' />
											<ZIonText>My ideas</ZIonText>
										</ZIonCol>
									</ZIonRow>
								</div>

								{/*  */}
								{/* <ZProjectEmptyPostState /> */}
								<ZProjectPostsState />
							</div>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

// Empty posts state UI
const ZProjectEmptyPostState: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center p-10'>
			<ZIonImg className='max-w-full' src={zEmptyPosts} />
			<ZIonText className='mt-2'>Let's add some ideas to get started!</ZIonText>
		</div>
	);
};

// Posts list UI
const ZProjectPostsState: React.FC = () => {
	const { isMdScale } = useZMediaQueryScale();

	return (
		<ZIonGrid>
			<ZIonRow
				className={classNames({
					'ion-align-items-center': true,
					'px-4': isMdScale,
					'px-2': isMdScale,
				})}
			>
				<ZIonCol className='mr-4 ps-2' size='max-content'>
					<ZIonButton height='50px' fill='clear' color='medium'>
						<ZIonLabel color='light'>
							<p className='m-[0px!important] z_ion_color_danger'>
								<ZIonIcon icon={chevronUpOutline} className='w-5 h-5' />
							</p>
							<p className='m-[0px!important] font-bold z_ion_color_danger text-lg'>
								1
							</p>
						</ZIonLabel>
					</ZIonButton>
				</ZIonCol>

				<ZIonCol>
					<ZIonRouterLink
						routerLink={ZaionsRoutes.AdminPanel.Projects.BoardIdea.Main}
						color='dark'
					>
						<ZIonText
							className={classNames({
								'block font-semibold': true,
								'text-lg': isMdScale,
								'text-md': !isMdScale,
							})}
						>
							Make it
						</ZIonText>
					</ZIonRouterLink>

					<ZIonText
						className={classNames({
							'block mt-1 break-words force-break-words': true,
							'text-sm': !isMdScale,
						})}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
						dolor dolores laudantium sint vitae repellendus esse totam quasi
						molestias nulla modi culpa quisquam in, explicabo consequatur
						voluptas ducimus quae dolorem.
					</ZIonText>

					<div className='flex flex-wrap mt-1 text-sm'>
						<ZIonIcon
							icon={chatbubblesOutline}
							color='medium'
							className='mt-[2px] mr-2'
						/>
						<ZIonText
							color='medium'
							className={classNames({
								'text-sm': !isMdScale,
							})}
						>
							2 comments
						</ZIonText>
					</div>
				</ZIonCol>
			</ZIonRow>
		</ZIonGrid>
	);
};

// Project not found UI
const ZProjectNotFound: React.FC = () => {
	return (
		<ZIonContent color='light'>
			<ZIonGrid>
				<ZIonRow className='pt-32'>
					<ZIonCol
						className='flex mb-16 ion-align-items-center ion-justify-content-center'
						size='12'
					>
						{/* Logo */}
						<div className='flex ion-align-items-center'>
							<ZIonImg
								src={ProductLogo}
								className='w-[2.5rem] me-3 h-auto rounded-xl overflow-hidden'
							/>
							<ZIonText
								className='text-2xl font-extrabold tracking-wider'
								color='dark'
							>
								{PRODUCT_NAME}
							</ZIonText>
						</div>
					</ZIonCol>

					{/*  */}
					<ZIonCol
						size='12'
						className='flex ion-justify-content-center ion-align-items-center'
					>
						<div className='flex flex-col py-16 pl-16 pr-16 bg-white rounded-lg shadow-lg child-div ion-justify-content-center ion-align-items-center'>
							<ZIonIcon
								icon={alertCircle}
								className='w-[8rem] h-[8rem]'
								color='medium'
							/>

							<ZIonText
								className='block mt-4 text-3xl font-bold leading-9 tracking-normal text-center'
								color='medium'
							>
								Project not found
							</ZIonText>

							<ZIonText className='block mt-2 text-sm font-normal leading-5 tracking-normal text-center'>
								The project you are looking for doesn't exist anymore
							</ZIonText>

							<ZIonButton
								className='mt-4 text-lg font-bold'
								routerLink={ZaionsRoutes.AdminPanel.Projects.Main}
							>
								Go to {PRODUCT_NAME}
							</ZIonButton>
						</div>
					</ZIonCol>
				</ZIonRow>
			</ZIonGrid>
		</ZIonContent>
	);
};

const ZProjectBoardNotFound: React.FC = () => {
	return (
		<ZIonContent color='light'>
			<ZIonGrid>
				<ZIonRow className='pt-32'>
					<ZIonCol
						className='flex mb-16 ion-align-items-center ion-justify-content-center'
						size='12'
					>
						{/* Logo */}
						<div className='flex ion-align-items-center'>
							<ZIonImg
								src={ProductLogo}
								className='w-[2.5rem] me-3 h-auto rounded-xl overflow-hidden'
							/>
							<ZIonText
								className='text-2xl font-extrabold tracking-wider'
								color='dark'
							>
								{PRODUCT_NAME}
							</ZIonText>
						</div>
					</ZIonCol>

					{/*  */}
					<ZIonCol
						size='12'
						className='flex ion-justify-content-center ion-align-items-center'
					>
						<div className='flex flex-col py-16 pl-16 pr-16 bg-white rounded-lg shadow-lg child-div ion-justify-content-center ion-align-items-center'>
							<ZIonIcon
								icon={alertCircle}
								className='w-[8rem] h-[8rem]'
								color='medium'
							/>

							<ZIonText
								className='block mt-4 text-3xl font-bold leading-9 tracking-normal text-center'
								color='medium'
							>
								Board not found
							</ZIonText>

							<ZIonText className='block mt-2 text-sm font-normal leading-5 tracking-normal text-center'>
								The Board you are looking for doesn't exist anymore
							</ZIonText>

							<ZIonButton
								className='mt-4 text-lg font-bold'
								routerLink={ZaionsRoutes.AdminPanel.Projects.Main}
							>
								Go to {PRODUCT_NAME}
							</ZIonButton>
						</div>
					</ZIonCol>
				</ZIonRow>
			</ZIonGrid>
		</ZIonContent>
	);
};

export default ZProjectViewPage;
