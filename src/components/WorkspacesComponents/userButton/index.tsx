// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';
import { ellipse } from 'ionicons/icons';

// Custom Imports
import {
	ZIonAvatar,
	ZIonIcon,
	ZIonImg,
	ZIonText,
} from '@/components/ZIonComponents';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import CONSTANTS from '@/utils/constants';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import { ZUIAvatarApiDefaultParamsInterface } from '@/types/ZaionsApis.type';

// Style

// Component Type
interface ZUserAvatarButtonInterface {
	style?: {
		[key: string]: unknown;
	};
	active?: boolean;
	userAvatar?: string;
	className?: string;
	showStatus?: boolean;
	id?: string;
	statusIcon?: string;
	statusIconPosition?: 'top' | 'bottom';
	statusIconColor?: ZIonColorType;
	userAvatarUi?: ZUIAvatarApiDefaultParamsInterface;
	onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLIonButtonElement>;
}

const ZUserAvatarButton: React.FC<ZUserAvatarButtonInterface> = ({
	active = false,
	userAvatar,
	userAvatarUi,
	className,
	showStatus = false,
	statusIcon,
	style,
	statusIconPosition = 'top',
	id,
	statusIconColor,
	onClick,
	onMouseEnter,
	onMouseLeave,
}) => {
	return (
		<>
			<ZIonAvatar
				className={classNames(className, {
					'relative cursor-pointer w-[50px] h-[50px]': true,
				})}
				id={id}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				style={style}
				data-tooltip-id={id}
				testingselector={
					CONSTANTS.testingSelectors.user.userProfilePopoverButton
				}
			>
				{showStatus && (
					<div
						className={classNames({
							'absolute w-[38%] h-[38%] flex ion-align-items-center ion-justify-content-center rounded-full zaions__secondary_bg':
								true,
							'top-[-11%] right-[4%]': statusIconPosition === 'top',
							'bottom-[-5%] right-[-1%]': statusIconPosition === 'bottom',
						})}
					>
						<ZIonIcon
							className='w-[60%] h-[70%]'
							icon={statusIcon || ellipse}
							color={
								statusIconColor ? statusIconColor : active ? 'success' : 'light'
							}
						/>
					</div>
				)}
				<ZIonImg
					src={userAvatar || getUiAvatarApiUrl({ ...userAvatarUi })}
					className='w-full h-full'
				/>
			</ZIonAvatar>

			{id === CONSTANTS.ZTooltipIds.ZUserAvatarButton_default_tooltip_id && (
				<ZRTooltip
					// anchorSelect='#z-workspace-ZUserAvatarButton-tooltip'
					id={CONSTANTS.ZTooltipIds.ZUserAvatarButton_default_tooltip_id}
					place='top'
				>
					<div className='flex ion-align-items-start'>
						<div className=''>
							<ZIonAvatar
								className={classNames(className, {
									'cursor-pointer w-[25px] h-[25px]': true,
								})}
							>
								<ZIonImg src={userAvatar || getUiAvatarApiUrl({})} />
							</ZIonAvatar>
						</div>
						<div className='ms-2'>
							<ZIonText className='block font-bold'>
								Muhammad talha Irshad (you)
							</ZIonText>

							<ZIonText className='block text-sm' color='medium'>
								Muhammad talha Irshad (you)
							</ZIonText>
						</div>
					</div>

					<div className=''></div>
				</ZRTooltip>
			)}
		</>
	);
};

export default ZUserAvatarButton;
