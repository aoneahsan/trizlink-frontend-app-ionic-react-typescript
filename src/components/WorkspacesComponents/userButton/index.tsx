// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';

// Custom Imports
import { ZIonButton, ZIonImg, ZIonText } from '@/components/ZIonComponents';

// Style
import classes from './styles.module.css';

// Component Type
interface ZUserAvatarInfo {
	onClick?: React.MouseEventHandler<HTMLIonButtonElement>;
	userAvatar?: string;
	className?: string;
}

const ZUserAvatarInfo: React.FC<ZUserAvatarInfo> = ({
	onClick,
	userAvatar,
	className,
}) => {
	return (
		<ZIonButton
			color='primary'
			fill='solid'
			className={classNames(
				classes['workspace-user-avatar-button'],
				className,
				{
					'position-relative zaions__h50px zaions__w50px': true,
				}
			)}
			onClick={onClick}
		>
			{userAvatar && (
				<ZIonImg
					src={userAvatar}
					className='w-100 h-100 zaions-object-fit-cover'
				/>
			)}
			{!userAvatar && (
				<ZIonText color='light' className='fs-5'>
					{/* {userName.charAt(0)} */}
					MT
				</ZIonText>
			)}
		</ZIonButton>
	);
};

export default ZUserAvatarInfo;
