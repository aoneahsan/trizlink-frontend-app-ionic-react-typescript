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
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import CONSTANTS from '@/utils/constants';

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
	onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLIonButtonElement>;
}

const ZUserAvatarButton: React.FC<ZUserAvatarButtonInterface> = ({
	active = false,
	userAvatar,
	className,
	showStatus = false,
	statusIcon,
	style,
	id,
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
			>
				{showStatus && (
					<ZIonIcon
						className='absolute top-[-11%] right-[4%] w-[40%] h-[40%]'
						icon={statusIcon || ellipse}
						color={active ? 'success' : 'secondary'}
					/>
				)}
				<ZIonImg src={userAvatar || getUiAvatarApiUrl({})} />
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
							<ZIonText className='font-bold block'>
								Muhammad talha Irshad (you)
							</ZIonText>

							<ZIonText className='text-sm block' color='medium'>
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
