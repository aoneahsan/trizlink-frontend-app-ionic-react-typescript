// Core Imports
import React, { useState } from 'react';

// Packages Imports
import { addOutline, notificationsOutline, star } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonIcon,
	ZIonItem,
	ZIonRow,
	ZIonText,
	ZIonTextarea,
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

const ZWorkspaceCommentBox: React.FC<{
	className?: string;
	style?: {
		[key: string]: unknown;
	};
}> = ({ className, style }) => {
	const [showCommentBox, setShowCommentBox] = useState(false);

	return (
		<ZIonRow
			className={classNames(className, {
				'rounded px-2 py-1 bg-white': true,
			})}
			style={style}
		>
			{/* absolute w-full bottom-0 start-0 */}
			{!showCommentBox && (
				<ZIonCol
					size='12'
					className='flex ion-align-items-center py-0'
					onClick={() => {
						setShowCommentBox(true);
					}}
				>
					<div className='w-max flex ion-align-items-center'>
						<ZUserAvatarButton className='w-[24px!important] h-[24px!important]' />

						<div className='ms-2'>
							<ZIonText className='text-sm' color='medium'>
								Comments...
							</ZIonText>
						</div>
					</div>

					<div className='w-[70%] flex ion-justify-content-end'></div>
				</ZIonCol>
			)}

			{showCommentBox && (
				<ZIonCol size='12' className='ms-auto text-sm leading-6 py-0'>
					<div className='w-full flex ion-align-items-center'>
						<ZUserAvatarButton className='w-[24px!important] h-[24px!important]' />

						<div className='ms-auto flex'>
							<ZIonText className='text-sm flex ion-align-items-center'>
								Internal note
								<ZIonIcon
									icon={star}
									color='secondary'
									className='ms-2 me-3 pb-[2px]'
								/>
							</ZIonText>

							{/*  */}
							<ZRCSwitch id='z-workspace-post-comments-visibility' />
							<ZRTooltip
								anchorSelect='#z-workspace-post-comments-visibility'
								place='top'
								content='Everyone can see this comments'
							/>
						</div>
					</div>

					<div className='w-full mt-2'>
						<ZIonItem lines='full' color='light' className='rounded'>
							<ZIonTextarea
								label='Comments...'
								labelPlacement='floating'
								autoGrow={true}
								color='medium'
							/>
						</ZIonItem>
					</div>

					<div className='w-full mt-2 flex ion-justify-content-between'>
						<div className='flex ion-align-items-center'>
							<ZIonText className='flex ion-align-items-center'>
								<ZIonIcon icon={notificationsOutline} className='me-1' />
								Notify 0 users
							</ZIonText>

							<ZIonButton fill='default' className='ion-no-padding ms-2'>
								<ZIonIcon icon={addOutline} />
							</ZIonButton>
						</div>

						<ZIonButtons>
							<ZIonButton
								className='text-transform-initial'
								onClick={() => {
									setShowCommentBox(false);
								}}
							>
								Cancel
							</ZIonButton>
							<ZIonButton
								className='text-transform-initial'
								fill='outline'
								color='medium'
								id='z-workspace-post-comments-save'
							>
								Post
							</ZIonButton>
							<ZRTooltip
								anchorSelect='#z-workspace-post-comments-save'
								place='top'
								content='Ctrl + Enter'
							/>
						</ZIonButtons>
					</div>
				</ZIonCol>
			)}
		</ZIonRow>
	);
};

export default ZWorkspaceCommentBox;
