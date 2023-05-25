/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { Formik } from 'formik';
import {
	checkmark,
	ellipsisHorizontalOutline,
	gridOutline,
	menuOutline,
	openOutline,
	pencil,
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZWorkspacePostDetailModal from '@/components/InPageComponents/ZaionsModals/Workspace/PostDetail';
import ZWorkspacePostActionsPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/PostActionsPopover';
import {
	ZIonBadge,
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZIonModal, useZIonPopover } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { getPlatformIcon } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormConnectPagesEnum,
	workspacePostDetailTabEnum,
} from '@/types/AdminPanel/workspace';

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
import {
	gifIcon,
	imageIcon,
	mediaIcon,
	ProductLogo,
	thumbnailIcon,
} from '@/assets/images';
import ZWorkspaceSingleComment from '@/components/WorkspacesComponents/SingleComment';
import ZWorkspaceCommentBox from '@/components/WorkspacesComponents/CommentBox';
import ZWorkspaceSinglePost from '../SinglePost';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspacePostsLayout: React.FC<{
	pageType?: workspaceFormConnectPagesEnum;
}> = ({ pageType }) => {
	const { presentZIonPopover: presentWorkspacePostActionsPopover } =
		useZIonPopover(ZWorkspacePostActionsPopover);

	const { presentZIonModal: presentWorkspacePostDetailModal } = useZIonModal(
		ZWorkspacePostDetailModal
	);

	return (
		<ZIonGrid>
			<Formik
				initialValues={{
					showCommentBox: false,
				}}
				onSubmit={() => {}}
			>
				{({ values, setFieldValue }) => {
					return (
						<>
							<ZIonRow className='mt-2'>
								{/* Approved (Checkmark) button & Published (Platform) button */}
								<ZIonCol size='max-content' className='flex flex-col'>
									<ZIonButton
										fill='clear'
										className='rounded-full overflow-hidden ion-no-padding w-[40px] h-[40px] zaions__bg_white'
										size='small'
										style={{
											boxShadow:
												'0 2px 4px rgba(0,0,0,.08), 0 0 1px rgba(50,79,58,.1)',
										}}
									>
										<ZIonIcon
											icon={checkmark}
											color='dark'
											className='w-6 h-6'
										/>
									</ZIonButton>

									<ZIonButton
										fill='clear'
										className='rounded-full overflow-hidden ion-no-padding w-[40px] h-[40px] zaions__bg_white mt-2'
										size='small'
										style={{
											boxShadow:
												'0 2px 4px rgba(0,0,0,.08), 0 0 1px rgba(50,79,58,.1)',
										}}
									>
										<ZIonIcon
											icon={
												(pageType && getPlatformIcon(pageType)) || gridOutline
											}
											color='dark'
											className='w-6 h-6'
										/>
									</ZIonButton>
								</ZIonCol>

								{/* Posts col */}
								<ZIonCol
									size='6'
									className={classNames({
										'zaions__bg_white rounded ': true,

										// Checking if the pageType is one of this type blow then show border in post. px-2 py-1
										border:
											pageType &&
											[
												workspaceFormConnectPagesEnum.facebook,
												workspaceFormConnectPagesEnum.linkedin,
												workspaceFormConnectPagesEnum.pinterest,
												workspaceFormConnectPagesEnum.youtube,
												workspaceFormConnectPagesEnum.twitter,
												workspaceFormConnectPagesEnum.googleBusiness,
												workspaceFormConnectPagesEnum.universalContent,
											].includes(pageType),

										// Checking if the pageType is instagram then show border-top in post.
										'border-b-[1px]':
											pageType === workspaceFormConnectPagesEnum.instagram,

										// Checking if the pageType is tiktok then show border in bottom of post.
										'border-t-[1px] pt-3':
											pageType === workspaceFormConnectPagesEnum.tiktok,
									})}
								>
									<ZWorkspaceSinglePost
										className='shadow-none m-0'
										type={workspacePostDetailTabEnum.desktop}
										pageType={pageType}
									/>
								</ZIonCol>

								{/* Comments col */}
								<ZIonCol
									size='5.2'
									className='zaions__bg_white rounded border ion-no-padding ms-auto zaions_comment_box relative max-h-[412px] h-auto min-h-[150px]'
								>
									<div className='h-full relative'>
										{/* comment box pointer */}
										<div className='absolute bg-white h-[10px] left-[-5px] top-[16px] w-[10px] rotate-45'></div>

										<div className='overflow-y-scroll h-full  px-2 py-1 zaions_pretty_scrollbar'>
											{/* Single comment */}
											{[1].map((el) => (
												<ZWorkspaceSingleComment key={el} />
											))}

											{/* Comment box */}
											<ZWorkspaceCommentBox className='border-t rounded px-2 py-2 sticky mt-2 bottom-0' />
										</div>
									</div>
								</ZIonCol>
							</ZIonRow>

							{/* end col */}
							<ZIonRow>
								<ZIonCol className='ion-text-center py-14'>
									<ZIonText color='medium' className='text-sm'>
										No more posts.
									</ZIonText>
								</ZIonCol>
							</ZIonRow>
						</>
					);
				}}
			</Formik>
		</ZIonGrid>
	);
};

export default ZWorkspacePostsLayout;
