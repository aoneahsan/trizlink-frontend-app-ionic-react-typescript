// Core Imports
import React from 'react';

// Packages Imports
import { createOutline, ellipseOutline, happyOutline } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonButton,
	ZIonCol,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/UserButton';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

const ZWorkspaceSingleComment: React.FC<{
	avatarWidth?: string;
	avatarHeight?: string;
}> = ({ avatarHeight, avatarWidth }) => {
	const { isLgScale } = useZMediaQueryScale();

	const _avatarWidth = avatarWidth?.trim().length && avatarWidth;
	const _avatarHeight = avatarHeight?.trim().length && avatarHeight;

	return (
		<ZIonRow className='border rounded border-transparent hover:border-slate-200'>
			<ZIonCol size='12' className='flex ion-align-items-center py-0'>
				<div
					className={classNames({
						'flex ion-align-items-center': true,
						'w-max': isLgScale,
						'w-[50%]': !isLgScale,
					})}
				>
					<ZUserAvatarButton
						className={classNames(_avatarWidth, _avatarHeight, {
							'w-[24px!important]': !avatarWidth?.trim().length,
							'h-[24px!important]': !avatarHeight?.trim().length,
						})}
					/>
					<div className='ms-2'>
						<ZIonText className='fo nt-bold text-sm'>You</ZIonText>
						<ZIonText className='text-sm ms-2' color='medium'>
							. May 16
						</ZIonText>
					</div>
				</div>

				<div
					className={classNames({
						'w-[70%] flex ion-justify-content-end': true,
						'w-[70%]': isLgScale,
						'w-[50%]': !isLgScale,
					})}
				>
					{/* Edit Comments */}
					<ZIonButton
						size='small'
						className='mx-1 ion-no-padding'
						fill='clear'
						color='dark'
						id='edit-comments-mode'
					>
						<ZIonIcon icon={createOutline} />
					</ZIonButton>
					<ZRTooltip
						anchorSelect='#edit-comments-mode'
						place='left'
						content='Edit mode'
					/>

					{/* Add Reaction */}
					<ZIonButton
						size='small'
						className='mx-1 ion-no-padding'
						fill='clear'
						color='dark'
						id='add-reaction-mode'
					>
						<ZIonIcon icon={happyOutline} />
					</ZIonButton>
					<ZRTooltip
						anchorSelect='#add-reaction-mode'
						place='top'
						content='Add reaction'
					/>

					{/* Resolve Mode */}
					<ZIonButton
						size='small'
						className='mx-1 ion-no-padding'
						fill='clear'
						color='dark'
						id='resolve-mode'
					>
						<ZIonIcon icon={ellipseOutline} />
					</ZIonButton>
					<ZRTooltip
						anchorSelect='#resolve-mode'
						place='right'
						content='Resolve'
					/>
				</div>
			</ZIonCol>

			<ZIonCol size='11' className='ms-auto text-sm leading-6 py-0'>
				<ZIonText>
					Hey there! I just wanted to say that I really enjoyed your post. Your
					perspective on the topic was really insightful and I learned a lot
					from reading it. I also appreciate the way you presented your ideas in
					a clear and concise manner. It's always refreshing to see someone who
					can communicate complex ideas in a way that is easy to understand.
					Keep up the great work and I look forward to reading more of your
					posts in the future!
				</ZIonText>

				<div className='mt-4'>
					<ZIonButton
						fill='clear'
						className='ion-no-padding ion-no-margin text-transform-initial text-xs'
						color='medium'
						size='small'
					>
						Replay
					</ZIonButton>
				</div>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspaceSingleComment;
