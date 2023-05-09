// Core Imports
import React from 'react';

// Packages Imports
import classNames from 'classnames';

// Custom Imports
import { ZIonButton, ZIonImg, ZIonText } from '@/components/ZIonComponents';

// Style
import classes from './styles.module.css';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { getUiAvatarApiUrl } from '@/utils/helpers/apiHelpers';

// Component Type
interface ZUserAvatarInfoInterface {
	userAvatar?: string;
	className?: string;
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
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<ZIonImg
				src={userAvatar || getUiAvatarApiUrl({})}
				className='w-100 h-100 zaions-object-fit-cover'
			/>
		</ZIonButton>
	);
};

export default ZUserAvatarInfo;
