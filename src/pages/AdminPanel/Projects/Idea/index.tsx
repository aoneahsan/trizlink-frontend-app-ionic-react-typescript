/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	addOutline,
	arrowRedoOutline,
	arrowUndoOutline,
	attachOutline,
	chevronUpOutline,
	closeCircle,
	closeOutline,
	cloudUploadOutline,
	documentsOutline,
	informationCircleOutline,
	optionsOutline,
	pencilOutline,
	pinOutline,
	trashBinOutline,
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZProjectHeader from '@/components/ProjectComponents/Header';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonChip,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonItem,
	ZIonLabel,
	ZIonRouterLink,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { PRODUCT_NAME } from '@/utils/constants';
import { useParams } from 'react-router';

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

const ZProjectSingleIdea: React.FC = () => {
	const { isXlScale, isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

	return (
		<ZaionsIonPage>
			{/* Header */}
			<ZProjectHeader />

			{/* Content */}
			<ZIonContent color='light'>
				{/* Grid */}
				<ZIonGrid
					className={classNames({
						'mt-4': true,
						container: isXlScale,
						'px-2': !isSmScale,
					})}
				>
					{/* Row */}
					<ZIonRow
						className={classNames({
							'mb-8 lg:gap-6': true,
							'w-[80%] mx-auto': !isLgScale && isMdScale,
							'w-[90%] mx-auto': !isMdScale && isSmScale,
							'w-full mx-auto': !isSmScale,
						})}
					>
						{/* Col-1 */}
						<ZIonCol
							className='mb-6 lg:mb-0'
							sizeXl='8.5'
							sizeLg='8.5'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
						>
							<div className='w-full px-6 py-5 bg-white rounded-lg shadow'>
								<div className='flex ion-align-items-start'>
									<ZIonButton
										height='65px'
										fill='outline'
										color='medium'
										style={{ '--border-width': '1px' }}
										className='mr-4'
									>
										<ZIonLabel color='light'>
											<p className='m-[0px!important] z_ion_color_danger'>
												<ZIonIcon
													icon={chevronUpOutline}
													className='w-5 h-5 font-extrabold'
												/>
											</p>
											<p
												className='m-[0px!important] font-extrabold z_ion_color_danger'
												style={{ fontSize: '1.1rem!important' }}
											>
												1
											</p>
										</ZIonLabel>
									</ZIonButton>

									<ZIonText className='text-lg font-semibold leading-tight md:text-2xl'>
										Make it
									</ZIonText>
								</div>

								<ZIonText className='block mt-4 break-words whitespace-pre-wrap'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Veritatis, ab! Placeat quibusdam porro, nulla harum quo
									nesciunt sapiente excepturi totam, minus dolorem labore,
									asperiores natus temporibus sunt voluptatum sed corrupti.
								</ZIonText>

								<ZIonText
									className='block mt-5 text-lg font-medium'
									color='medium'
								>
									Attached images
								</ZIonText>

								<ZIonImg
									className='w-20 h-20 mr-2 transition duration-150 ease-in-out transform border rounded-md shadow-lg hover:scale-105 hover:shadow-xl'
									src='http://localhost:8000/storage/uploaded-files/YIGuxpwOpUnVnrCTMWIOLJhaYTdRVfFCODGdZtNl.jpg'
								/>

								<div className='flex flex-wrap mt-6 ion-align-items-center ion-justify-content-start'>
									<ZIonImg
										src='http://localhost:8000/storage/uploaded-files/699N97z3ta22YCNfRpKC7P9AvwIVI00iwRN38pfd.png'
										className='w-[28px] h-[28px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
									/>

									<ZIonText className='pr-1 font-semibold cursor-pointer'>
										Talha Bin Irshad
									</ZIonText>

									<ZIonText
										className='pr-1 font-light cursor-pointer text-md'
										color='medium'
									>
										posted 2 days ago
									</ZIonText>
								</div>
							</div>

							{/*  */}
							<div className='mt-5'>
								<ZIonText
									className='block text-sm font-semibold tracking-wider uppercase'
									color='medium'
								>
									Internal Notes
								</ZIonText>

								<div className='px-5 py-4 mb-4 bg-white mt-[8px] shadow rounded-xl'>
									<ZIonInput
										placeholder='Add a note for your team...'
										minHeight='45px'
									/>
								</div>
							</div>

							{/*  */}
							<div className='relative flex flex-col justify-between gap-4 p-4 pt-6 mt-4 mb-4 bg-white border-2 rounded-lg lg:flex-row xl:justify-around items-justify lg:items-center md:p-6 lg:p-4 xl:px-12'>
								<div className='flex flex-col gap-1 xl:-ml-8 2xl:-ml-36 max-w-[32rem]'>
									<ZIonText className='text-xl font-bold'>
										FeedBear can help you reply!
									</ZIonText>
									<ZIonText className='' color='medium'>
										Use FeedBear's AI tools to generate replies for new ideas.
										Demonstrate to your users that you are listening to their
										feedback.
									</ZIonText>
								</div>

								<ZIonButton
									className='flex px-2 text-lg rounded-lg text-md whitespace-nowrap xl:px-14 2xl:-mr-36'
									size='large'
								>
									Try it now!
								</ZIonButton>

								<ZIonButton
									className='absolute top-0 right-0 ion-no-padding'
									size='small'
									fill='default'
								>
									<ZIonIcon icon={closeOutline} className='w-6 h-6' />
								</ZIonButton>
							</div>

							<div className='mt-5'>
								<ZIonText
									className='text-sm font-semibold tracking-wider uppercase'
									color='medium'
								>
									DISCUSSION
								</ZIonText>

								{/* Comments box */}
								<div className='px-5 py-5 mt-2 mb-8 bg-white rounded-lg shadow'>
									{/* Comment form */}
									<div className='p-4 rounded-lg bg-neutral-100 comment-input-container'>
										<div className='flex ion-align-items-center'>
											<ZIonImg
												src='http://localhost:8000/storage/uploaded-files/699N97z3ta22YCNfRpKC7P9AvwIVI00iwRN38pfd.png'
												className='w-[36px] h-[36px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
											/>
											<ZIonInput
												placeholder='What do you think?'
												minHeight='45px'
											/>
										</div>

										<div className='flex gap-1 mt-2 ion-align-items-start ion-justify-content-between comment_button md:mt-4'>
											<ZIonButton
												className='ion-no-padding'
												fill='clear'
												color='dark'
											>
												<ZIonIcon icon={attachOutline} className='mr-1' />
												<ZIonText className='text-md'>Attach image</ZIonText>
											</ZIonButton>

											<div className=''>
												<ZIonButton className='' color='tertiary'>
													<ZIonText className='text-md'>Comment</ZIonText>
												</ZIonButton>
											</div>
										</div>
									</div>

									{/* Comments */}
									<div className=''>
										{/* single comment */}
										<div className=''>
											<ZProjectSingleComment />
											<div className='ml-6 border-l-4 border-neutral-200'>
												<ZProjectSingleComment />
											</div>
										</div>
									</div>
								</div>
							</div>
						</ZIonCol>

						{/* Col-2 */}
						<ZIonCol>
							{/* Post status */}

							<ZIonText className='block font-semibold'>Status</ZIonText>

							<div className='flex mt-4'>
								<ZIonSelect
									minHeight='45px'
									fill='outline'
									value='notSet'
									interface='popover'
									style={{ '--background': '#fff' }}
								>
									<ZIonSelectOption value='notSet'>Not Set</ZIonSelectOption>
									<ZIonSelectOption value='needYourOpinion'>
										Need Your Opinion
									</ZIonSelectOption>
									<ZIonSelectOption value='planned'>Planned</ZIonSelectOption>
									<ZIonSelectOption value='inProgress'>
										In progress
									</ZIonSelectOption>
									<ZIonSelectOption value='done'>Done</ZIonSelectOption>
									<ZIonSelectOption value='notNow'>Not Now</ZIonSelectOption>
									<ZIonSelectOption value='notSet'>Not set</ZIonSelectOption>
								</ZIonSelect>

								<ZIonButton
									height='41px'
									className='ion-no-margin ms-2'
									color='medium'
								>
									Save
								</ZIonButton>
							</div>

							{/* Edit status */}
							<ZIonItem
								className='mt-2 mb-8 rounded cursor-pointer'
								lines='none'
								minHeight='41px'
							>
								<ZIonIcon icon={optionsOutline} className='mr-2' />
								<ZIonText>Edit Statuses</ZIonText>
							</ZIonItem>

							{/* Actions */}
							<ZIonText className='block font-semibold'>Actions</ZIonText>

							{/* Edit */}
							<ZIonItem
								className='mt-2 rounded cursor-pointer'
								lines='none'
								minHeight='41px'
							>
								<ZIonIcon icon={pencilOutline} className='mr-2' />
								<ZIonText>Edit</ZIonText>
							</ZIonItem>

							{/* Move to another board */}
							<ZIonItem
								className='mt-2 rounded cursor-pointer'
								lines='none'
								minHeight='41px'
							>
								<ZIonIcon icon={arrowRedoOutline} className='mr-2' />
								<ZIonText>Move to another board</ZIonText>
							</ZIonItem>

							{/* Merge into another idea */}
							<ZIonItem
								className='mt-2 rounded cursor-pointer'
								lines='none'
								minHeight='41px'
							>
								<ZIonIcon icon={documentsOutline} className='mr-2' />
								<ZIonText>Merge into another idea</ZIonText>
							</ZIonItem>

							{/* Delete */}
							<ZIonItem
								className='mt-2 mb-8 rounded cursor-pointer'
								lines='none'
								minHeight='41px'
							>
								<ZIonIcon icon={trashBinOutline} className='mr-2' />
								<ZIonText>Delete</ZIonText>
							</ZIonItem>

							{/* Tags */}
							<ZIonText className='block font-semibold'>Tags</ZIonText>

							<div className='flex px-3 py-3 mt-2 rounded-md ion-align-items-center ion-justify-content-start zaions__warning_bg_opacity_point_5'>
								<ZIonIcon
									icon={informationCircleOutline}
									className='w-6 h-6 mr-1'
								/>
								<ZIonText className='text-sm'>
									Tags are visible only to project admins.
									<ZIonRouterLink
										routerLink=''
										className='hover:underline ms-1'
										color='dark'
									>
										Learn more
									</ZIonRouterLink>
									.
								</ZIonText>
								<ZIonIcon icon={closeCircle} className='w-6 h-6 ms-1' />
							</div>

							<div className='flex flex-wrap mt-2 mb-8 ion-align-items-center ion-justify-content-start'>
								{[1, 2, 3, 4, 5].map((el) => (
									<ZIonChip
										className='zaions__warning_bg_opacity_point_5'
										key={el}
									>
										<ZIonLabel>Avatar Chip</ZIonLabel>
										<ZIonIcon icon={closeCircle} />
									</ZIonChip>
								))}

								{/* <ZIonInput
									minHeight='42px'
									className='mt-2'
									placeholder='Try to search or add new...'
								/> */}

								<ZIonChip className='bg-transparent'>
									<ZIonIcon icon={addOutline} />
									<ZIonLabel>Add tag</ZIonLabel>
								</ZIonChip>
							</div>

							{/* Voters */}
							<div className='flex ion-align-items-center ion-justify-content-between'>
								<ZIonText className='block font-semibold'>Voters</ZIonText>

								<ZIonIcon icon={cloudUploadOutline} className='w-5 h-5' />
							</div>

							<div className='flex flex-row items-center mt-2'>
								<ZIonImg
									src='http://localhost:8000/storage/uploaded-files/699N97z3ta22YCNfRpKC7P9AvwIVI00iwRN38pfd.png'
									className='w-[32px] h-[32px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
								/>

								<ZIonText className='pr-1 font-semibold cursor-pointer'>
									Talha Bin Irshad
								</ZIonText>
							</div>

							<div className='mt-4 mb-8'>
								<ZIonInput minHeight='42px' placeholder='Name required' />
								<ZIonButton
									className='mt-2'
									expand='block'
									height='42px'
									color='medium'
								>
									Add Vote
								</ZIonButton>
							</div>

							<ZIonText className='block w-full ion-text-center' color='medium'>
								Powered by
								<ZIonRouterLink color='medium'> {PRODUCT_NAME}</ZIonRouterLink>
							</ZIonText>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

const ZProjectSingleComment: React.FC = () => {
	return (
		<div className='mt-4 md:pl-4 pt-2 pb-2 pl-2.5'>
			<div className='flex ion-align-items-center'>
				<ZIonImg
					src='http://localhost:8000/storage/uploaded-files/699N97z3ta22YCNfRpKC7P9AvwIVI00iwRN38pfd.png'
					className='w-[36px] h-[36px] shadow-md mr-2 rounded-[.7rem!important] cursor-pointer overflow-hidden'
				/>

				<div className='ms-2'>
					<ZIonText className='block text-sm font-semibold leading-snug cursor-pointer'>
						Talha Bin Irshad
					</ZIonText>
					<ZIonText className='block text-sm leading-snug' color='medium'>
						1 day ago
					</ZIonText>
				</div>
			</div>

			{/* Comment message */}
			<ZIonText
				className='block mt-3 break-words whitespace-pre-wrap offset'
				style={{ marginLeft: 'calc(36px + 1rem)' }}
			>
				Use FeedBear's AI tools to generate replies for new ideas. Demonstrate
				to your users that you are listening to their feedback.
			</ZIonText>

			{/* Action buttons */}
			<div
				className='flex mt-3 offset'
				style={{ marginLeft: 'calc(27px + 1rem)' }}
			>
				{/* Replay */}
				<ZIonButton
					color='medium'
					fill='clear'
					className='mr-3 ion-no-padding ion-no-margin'
				>
					<ZIonIcon icon={arrowUndoOutline} className='mr-1 font-extrabold' />
					<ZIonText className='font-bold'>REPLAY</ZIonText>
				</ZIonButton>

				{/* Delete */}
				<ZIonButton
					color='medium'
					fill='clear'
					className='mr-3 ion-no-padding ion-no-margin'
				>
					<ZIonIcon icon={trashBinOutline} className='mr-1 font-extrabold' />
					<ZIonText className='font-bold'>DELETE</ZIonText>
				</ZIonButton>

				{/* Edit */}
				<ZIonButton
					color='medium'
					fill='clear'
					className='mr-3 ion-no-padding ion-no-margin'
				>
					<ZIonIcon icon={pencilOutline} className='mr-1 font-extrabold' />
					<ZIonText className='font-bold'>EDIT</ZIonText>
				</ZIonButton>

				{/* Pin */}
				<ZIonButton
					color='medium'
					fill='clear'
					className='mr-3 ion-no-padding ion-no-margin'
				>
					<ZIonIcon icon={pinOutline} className='mr-1 font-extrabold' />
					<ZIonText className='font-bold'>PIN TO TOP</ZIonText>
				</ZIonButton>
			</div>
		</div>
	);
};

export default ZProjectSingleIdea;
