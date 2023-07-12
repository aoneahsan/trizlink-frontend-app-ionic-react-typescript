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
import { useRecoilState, useRecoilValue } from 'recoil';
import { ZProjectBoardsRStateAtom } from '@/ZaionsStore/UserDashboard/Project/index.recoil';
import classNames from 'classnames';
import { createRedirectRoute } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

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

const ZProjectBoardsPopover: React.FC<{ projectId: string }> = ({
	projectId,
}) => {
	// Recoil state to store current project boards
	const [zProjectBoardsStateAtom, setZProjectBoardsStateAtom] = useRecoilState(
		ZProjectBoardsRStateAtom
	);

	const { zNavigatePushRoute } = useZNavigate();

	return (
		<ZIonList
			lines='full'
			className='py-2 border rounded-md border-[rgba(234,236,238,1)]'
		>
			{zProjectBoardsStateAtom?.allBoards?.length &&
				zProjectBoardsStateAtom?.allBoards?.map((el, index) => {
					return (
						<ZIonItem
							className='cursor-pointer ion-activatable'
							key={index}
							onClick={() => {
								setZProjectBoardsStateAtom((oldValues) => ({
									...oldValues,
									currentBoard: {
										id: el.id,
										title: el.title,
									},
								}));
							}}
						>
							<ZIonText
								className={classNames({
									'font-bold':
										el.id === zProjectBoardsStateAtom.currentBoard.id,
								})}
							>
								{el.title}
							</ZIonText>
							<ZIonIcon
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
