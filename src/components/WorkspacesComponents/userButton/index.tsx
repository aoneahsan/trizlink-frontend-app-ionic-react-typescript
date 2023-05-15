// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';

// Custom Imports
import { ZIonButton, ZIonImg } from '@/components/ZIonComponents';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';

// Style
import classes from './styles.module.css';

// Component Type
interface ZUserAvatarInfoInterface {
	userAvatar?: string;
	className?: string;
	style?: {
		[key: string]: unknown;
	};
	onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLIonButtonElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLIonButtonElement>;
}

const ZUserAvatarInfo: React.FC<ZUserAvatarInfoInterface> = ({
	userAvatar,
	className,
	onClick,
	onMouseEnter,
	onMouseLeave,
	style,
}) => {
	return (
		<ZIonButton
			color='primary'
			fill='solid'
			className={classNames(
				classes['workspace-user-avatar-button'],
				className,
				{
					'position-relative w-[50px] h-[50px] z-40': true,
				}
			)}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={style}
		>
			{/* <ZIonBadge
				className='w-[10%] h-[10%] absolute rounded-circle end-0 top-0 z-50'
				color='success'
			>
				<ZIonIcon icon={ellipseOutline} color='success' />
			</ZIonBadge> */}
			<ZIonImg
				src={userAvatar || getUiAvatarApiUrl({})}
				className='w-100 h-100 zaions-object-fit-cover'
			/>
		</ZIonButton>
	);
};

export default ZUserAvatarInfo;
