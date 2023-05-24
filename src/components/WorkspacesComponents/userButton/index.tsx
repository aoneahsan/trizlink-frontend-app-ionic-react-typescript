// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';

// Custom Imports
import {
	ZIonAvatar,
	ZIonButton,
	ZIonIcon,
	ZIonImg,
} from '@/components/ZIonComponents';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';

// Style
import classes from './styles.module.css';
import { ellipse } from 'ionicons/icons';
import { avatar } from '@/assets/images';

// Component Type
interface ZUserAvatarButtonInterface {
	style?: {
		[key: string]: unknown;
	};
	active?: boolean;
	userAvatar?: string;
	className?: string;
	showStatus?: boolean;
	onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLIonButtonElement>;
}

// const ZUserAvatarButton: React.FC<ZUserAvatarButtonInterface> = ({
// 	userAvatar,
// 	className,
// 	onClick,
// 	onMouseEnter,
// 	onMouseLeave,
// 	style,
// }) => {
// 	return (
// 		<ZIonButton
// 			color='primary'
// 			fill='solid'
// 			className={classNames(
// 				classes['workspace-user-avatar-button'],
// 				className,
// 				{
// 					'relative w-[50px] h-[50px] z-40': true,
// 				}
// 			)}
// 			onClick={onClick}
// 			onMouseEnter={onMouseEnter}
// 			onMouseLeave={onMouseLeave}
// 			style={style}
// 		>
// 			{/* <ZIonBadge
// 				className='w-[10%] h-[10%] absolute rounded-full end-0 top-0 z-50'
// 				color='success'
// 			>
// 				<ZIonIcon icon={ellipseOutline} color='success' />
// 			</ZIonBadge> */}
// 			<ZIonImg
// 				src={userAvatar || getUiAvatarApiUrl({})}
// 				className='w-full h-full zaions-object-fit-cover'
// 			/>
// 		</ZIonButton>
// 	);
// };

const ZUserAvatarButton: React.FC<ZUserAvatarButtonInterface> = ({
	active = false,
	userAvatar,
	className,
	showStatus = false,
	style,
	onClick,
	onMouseEnter,
	onMouseLeave,
}) => {
	return (
		<ZIonAvatar
			className={classNames(className, {
				'relative cursor-pointer w-[50px] h-[50px]': true,
			})}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={style}
		>
			{showStatus && (
				<ZIonIcon
					className='absolute top-[-11%] right-[4%] w-[40%] h-[40%]'
					icon={ellipse}
					color={active ? 'success' : 'secondary'}
				/>
			)}
			<ZIonImg src={userAvatar || getUiAvatarApiUrl({})} />
		</ZIonAvatar>
	);
};

export default ZUserAvatarButton;
