/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { ZIonButton, ZIonIcon, ZIonLabel } from '@/components/ZIonComponents';
import {
	ZBoardIdeaVoteInterface,
	ZProjectBoardIdeasInterface,
} from '@/types/AdminPanel/Project/index.type';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { extractInnerData } from '@/utils/helpers';
import MESSAGES from '@/utils/messages';
import { showErrorNotification } from '@/utils/notification';
import {
	useZRQCreateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import classNames from 'classnames';
import { chevronUpOutline } from 'ionicons/icons';
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

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

const ZProjectBoardIdeaVoteButton: React.FC<{
	boarIdea: ZProjectBoardIdeasInterface;
	projectId: string;
	boardId: string;
	buttonHeight?: string;
	buttonFill?: 'clear' | 'default' | 'outline' | 'solid';
	buttonStyle?: {
		[key: string]: unknown;
	};
	buttonClassName?: string;
}> = ({
	boarIdea,
	boardId,
	projectId,
	buttonHeight,
	buttonFill,
	buttonStyle,
	buttonClassName,
}) => {
	const [compState, setCompState] = useState<{ _voteWasAdded: boolean }>({
		_voteWasAdded: false,
	});
	const { updateRQCDataHandler } = useZUpdateRQCacheData();

	// Add/Remove vote from idea.
	const { mutateAsync: updateBoardIdeaVoteAsyncMutate } =
		useZRQCreateRequest<ZBoardIdeaVoteInterface>({
			_url: API_URL_ENUM.boardIdeaVote_create_delete,
			_queriesKeysToInvalidate: [],
			_urlDynamicParts: [
				CONSTANTS.RouteParams.project.projectId,
				CONSTANTS.RouteParams.project.board.boardId,
				CONSTANTS.RouteParams.project.boardIdea.boardIdeaId,
			],
			_itemsIds: [projectId, boardId, boarIdea.id || ''],
			_showLoader: false,
		});

	const addOrRemoveVote = async () => {
		try {
			if (boarIdea?.id && boarIdea?.id?.trim()?.length > 0) {
				const _response = await updateBoardIdeaVoteAsyncMutate(null);

				if (_response) {
					const _item = extractInnerData<ZBoardIdeaVoteInterface>(
						_response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (_item && _item.success) {
						await updateRQCDataHandler<ZProjectBoardIdeasInterface | undefined>(
							{
								key: [
									CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.MAIN,
									projectId,
									boardId,
								],
								data: {
									...boarIdea,
									votesCount: _item.totalVotes,
								} as ZProjectBoardIdeasInterface,
								id: boarIdea?.id,
							}
						);

						await updateRQCDataHandler<ZProjectBoardIdeasInterface | undefined>(
							{
								key: [
									CONSTANTS.REACT_QUERY.QUERIES_KEYS.PROJECT.BOARD_IDEA.GET,
									projectId,
									boardId,
									boarIdea.id,
								],
								data: {
									...boarIdea,
									votesCount: _item.totalVotes,
								} as ZProjectBoardIdeasInterface,
								id: boarIdea?.id,
								updateHoleData: true,
							}
						);

						setCompState((oldValues) => ({
							...oldValues,
							_voteWasAdded: _item.voteWasAdded,
						}));
					} else {
						showErrorNotification(MESSAGES.GENERAL.SOMETHING_WENT_WRONG);
					}
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<ZIonButton
			height={buttonHeight || '50px'}
			fill={buttonFill || 'clear'}
			color='medium'
			onClick={async () => {
				if (boarIdea.id) {
					await addOrRemoveVote();
				}
			}}
			style={buttonStyle}
			className={buttonClassName}
		>
			<ZIonLabel color='light'>
				<p
					className={classNames({
						'm-[0px!important]': true,
						// z_ion_color_danger: compState._voteWasAdded,
					})}
				>
					<ZIonIcon icon={chevronUpOutline} className='w-5 h-5' />
				</p>
				<p
					className={classNames({
						'm-[0px!important] font-bold text-lg': true,
						// z_ion_color_danger: compState._voteWasAdded,
					})}
				>
					{boarIdea?.votesCount}
				</p>
			</ZIonLabel>
		</ZIonButton>
	);
};

export default ZProjectBoardIdeaVoteButton;
