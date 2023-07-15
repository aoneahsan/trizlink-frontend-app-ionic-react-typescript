/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { addOutline, createOutline } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonIcon,
	ZIonItem,
	ZIonList,
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
import { createRedirectRoute } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS, { ProjectBoardDefaultData } from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZProjectBoardsRStateAtom } from '@/ZaionsStore/UserDashboard/Project/index.recoil';

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

const ZProjectBoardsPopover: React.FC<{
	projectId: string;
	zNavigatePushRoute: (_url: string) => void;
}> = ({ projectId, zNavigatePushRoute }) => {
	// Recoil state to store current project boards
	const [zProjectBoardsStateAtom, setZProjectBoardsStateAtom] = useRecoilState(
		ZProjectBoardsRStateAtom
	);

	return (
		<ZIonList
			lines='full'
			className='py-2 border rounded-md border-[rgba(234,236,238,1)]'
		>
			{zProjectBoardsStateAtom?.allBoards?.length &&
				zProjectBoardsStateAtom?.allBoards?.map((el, index) => {
					return (
						<ZIonItem className='cursor-pointer ion-activatable' key={index}>
							<div
								className='w-full'
								onClick={() => {
									if (el.id) {
										setZProjectBoardsStateAtom((oldValues) => ({
											...oldValues,
											currentBoard: {
												id: el.id,
												title: el.title,
												slug: el.slug,
												pageHeading: el.pageHeading,
												pageDescription: el.pageDescription,
												formCustomization: {
													intoHeading: el.formCustomization.intoHeading,
													intoText: el.formCustomization.intoText,
													title: el.formCustomization.title,
													titlePlaceholder:
														el.formCustomization.titlePlaceholder,
													body: el.formCustomization.body,
													bodyPlaceholder: el.formCustomization.bodyPlaceholder,
													footerText: el.formCustomization.footerText,
													buttonText: el.formCustomization.buttonText,
												},
												defaultStatus: {
													state: el.defaultStatus.state,
													hideIdeaWithNoSet: el.defaultStatus.hideIdeaWithNoSet,
												},
												votingSetting: {
													hideVotingCount: el.votingSetting.hideVotingCount,
												},
											},
										}));

										zNavigatePushRoute(
											createRedirectRoute({
												url: ZaionsRoutes.AdminPanel.Projects.Board.Main,
												params: [
													CONSTANTS.RouteParams.project.projectId,
													CONSTANTS.RouteParams.project.board.boardId,
												],
												values: [projectId, el.id],
											})
										);
									}
								}}
							>
								<ZIonText
									className={classNames({
										'font-bold w-full':
											el.id === zProjectBoardsStateAtom.currentBoard.id,
									})}
								>
									{el.title}
								</ZIonText>
							</div>
							<ZIonIcon
								onClick={() => {
									if (el.id) {
										zNavigatePushRoute(
											createRedirectRoute({
												url: ZaionsRoutes.AdminPanel.Projects.Board.Edit,
												params: [
													CONSTANTS.RouteParams.project.projectId,
													CONSTANTS.RouteParams.project.board.boardId,
												],
												values: [projectId, el.id],
											})
										);
									}
								}}
								className='cursor-pointer'
								slot='end'
								icon={createOutline}
							/>
						</ZIonItem>
					);
				})}

			<ZIonItem
				className='cursor-pointer ion-activatable'
				lines='none'
				onClick={() => {
					setZProjectBoardsStateAtom((oldValues) => ({
						...oldValues,
						currentBoard: {
							id: '',
							title: '',
							slug: '',
							pageHeading: '',
							pageDescription: '',
							formCustomization: {
								intoHeading:
									ProjectBoardDefaultData.formCustomization.intoHeading,
								intoText: ProjectBoardDefaultData.formCustomization.intoText,
								title: ProjectBoardDefaultData.formCustomization.title,
								titlePlaceholder:
									ProjectBoardDefaultData.formCustomization.titlePlaceholder,
								body: ProjectBoardDefaultData.formCustomization.body,
								bodyPlaceholder:
									ProjectBoardDefaultData.formCustomization.bodyPlaceholder,
								footerText: '',
								buttonText:
									ProjectBoardDefaultData.formCustomization.buttonText,
							},
							defaultStatus: {
								state: ProjectBoardDefaultData.defaultStatus.state,
								hideIdeaWithNoSet:
									ProjectBoardDefaultData.defaultStatus.hideIdeaWithNoSet,
							},
							votingSetting: {
								hideVotingCount:
									ProjectBoardDefaultData.votingSetting.hideVotingCount,
							},
						},
					}));

					zNavigatePushRoute(
						createRedirectRoute({
							url: ZaionsRoutes.AdminPanel.Projects.Board.Create,
							params: [CONSTANTS.RouteParams.project.projectId],
							values: [projectId],
						})
					);
				}}
			>
				<ZIonIcon className='cursor-pointer mb-[2px] pe-1' icon={addOutline} />
				<ZIonText>New board</ZIonText>
			</ZIonItem>
		</ZIonList>
	);
};

export default ZProjectBoardsPopover;
