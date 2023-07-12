/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZProjectHeader from '@/components/ProjectComponents/Header';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonCheckbox,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonInput,
	ZIonRow,
	ZIonSelect,
	ZIonSelectOption,
	ZIonText,
	ZIonTextarea,
} from '@/components/ZIonComponents';
import classNames from 'classnames';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

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
 * About: (create or update project->board form page)
 * @type {*}
 * */

const ZProjectBoardFormPage: React.FC = () => {
	const { isXlScale, isSmScale, isLgScale } = useZMediaQueryScale();

	return (
		<ZaionsIonPage>
			{/* Header */}
			<ZProjectHeader />

			{/* Content */}
			<ZIonContent color='light'>
				{/* Grid */}
				<ZIonGrid
					className={classNames({
						'ion-no-margin ion-no-padding mx-auto sm:px-4 mt-4 mb-4': true,
						container: isXlScale,
						'px-2': !isSmScale,
					})}
				>
					{/* Row */}
					<ZIonRow className='gap-4 ion-no-margin ion-no-padding'>
						{/* Col-1 */}
						<ZIonCol
							className='bg-white shadow px-4 py-3 rounded-lg mb-8 lg:mb-8'
							sizeXl='5.9'
							sizeLg='5.9'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
						>
							<ZIonText className='font-semibold text-2xl block'>
								New feedback board
							</ZIonText>

							<ZIonText className='font-semibold text-lg block mt-4'>
								General
							</ZIonText>

							<div className='mt-4'>
								{/* Name */}
								<ZIonInput
									minHeight='45px'
									label='Name'
									placeholder='i.e. Feedback and ideas'
									labelPlacement='stacked'
									counter={true}
									maxlength={30}
								/>

								{/* Slug */}
								<ZIonInput
									className='mt-1'
									minHeight='45px'
									label='Slug'
									placeholder='feedback and ideas'
									labelPlacement='stacked'
									helperText='Use only a-z, 0-9 and "-"'
									counter={true}
									maxlength={20}
									counterFormatter={() => `https://mti.feedbear.com/boards/`}
								/>

								{/* Page heading */}
								<ZIonInput
									minHeight='45px'
									className='mt-5'
									label='Page heading'
									placeholder='i.e. Feedback and ideas'
									labelPlacement='stacked'
									counter={true}
									maxlength={100}
								/>

								{/*  */}
								<ZIonTextarea
									className='mt-3'
									fill='outline'
									label='Page description'
									labelPlacement='stacked'
									counter={true}
									maxlength={300}
									autoGrow
								/>

								{/*  */}
								<ZIonText className='mt-8 text-lg font-semibold block'>
									New idea form customization
								</ZIonText>

								{/* Intro heading */}
								<ZIonInput
									minHeight='45px'
									className='mt-4'
									label='Intro heading'
									value='Add your idea'
									labelPlacement='stacked'
									counter={true}
									maxlength={30}
								/>

								{/* Intro text */}
								<ZIonTextarea
									className='mt-2'
									fill='outline'
									label='Intro text'
									value='We value your feedback. You can vote for existing ideas, discuss them or add your own.'
									labelPlacement='stacked'
									counter={true}
									maxlength={300}
									autoGrow
								/>

								{/* Form title */}
								<ZIonInput
									minHeight='45px'
									className='mt-2'
									label='Form title'
									value='Title'
									labelPlacement='stacked'
									counter={true}
									maxlength={30}
								/>

								{/* Form title placeholder */}
								<ZIonInput
									minHeight='45px'
									className='mt-2'
									label='Form title placeholder'
									value='Something short'
									labelPlacement='stacked'
									counter={true}
									maxlength={30}
								/>

								{/* Form body */}
								<ZIonInput
									minHeight='45px'
									className='mt-2'
									label='Form body'
									value='Description'
									labelPlacement='stacked'
									counter={true}
									maxlength={30}
								/>

								{/* Form body placeholder */}
								<ZIonInput
									minHeight='45px'
									className='mt-2'
									label='Form body'
									value='Write about your idea in more detail here'
									labelPlacement='stacked'
									counter={true}
									maxlength={60}
								/>

								{/* Form footer text */}
								<ZIonTextarea
									className='mt-2'
									fill='outline'
									label='Form footer text'
									value=''
									labelPlacement='stacked'
									counter={true}
									maxlength={300}
									autoGrow
								/>

								{/* Form button text */}
								<ZIonInput
									minHeight='45px'
									className='mt-2'
									label='Form button text'
									value='Add idea'
									labelPlacement='stacked'
									counter={true}
									maxlength={60}
								/>

								<ZIonText className='mt-8 text-lg font-semibold block'>
									Default status for new ideas
								</ZIonText>
								<ZIonText>
									When new ideas are submitted, assign them this status
								</ZIonText>
								<ZIonSelect fill='outline' minHeight='45px' value='notSet'>
									<ZIonSelectOption value='needYourOpinion'>
										Need your opinion
									</ZIonSelectOption>
									<ZIonSelectOption value='planned'>Planned</ZIonSelectOption>
									<ZIonSelectOption value='inProgress'>
										In progress
									</ZIonSelectOption>
									<ZIonSelectOption value='done'>Done</ZIonSelectOption>
									<ZIonSelectOption value='notNow'>Not now</ZIonSelectOption>
									<ZIonSelectOption value='notSet'>Not set</ZIonSelectOption>
								</ZIonSelect>

								{/*  */}
								<div className='flex ion-align-items-start mt-8'>
									<div>
										<ZIonCheckbox className='mt-1' />
									</div>
									<div className='ml-4'>
										<ZIonText className='block font-bold'>
											Hide ideas with "Not Set" status from users
										</ZIonText>

										<ZIonText className='block'>
											Only admins will be able to see and filter ideas marked
											with the "Not Set" status.
										</ZIonText>
									</div>
								</div>

								{/* Voting settings */}
								<ZIonText className='mt-6 text-lg font-semibold block'>
									Voting settings
								</ZIonText>

								<div className='flex ion-align-items-start mt-8'>
									<div>
										<ZIonCheckbox className='mt-1' />
									</div>
									<div className='ml-4'>
										<ZIonText className='block font-bold'>
											Hide count of votes
										</ZIonText>

										<ZIonText className='block'>
											The number of votes on ideas will not be displayed to
											users
										</ZIonText>
									</div>
								</div>

								{/*  */}
								<div className='w-full mt-6 flex ion-align-items-center ion-justify-content-center'>
									<ZIonButton>Save board</ZIonButton>
								</div>
							</div>
						</ZIonCol>

						{/* Col-2 (LIVE PREVIEW - PANEL) */}
						<ZIonCol
							className={classNames({
								'ion-align-items-center ion-justify-content-center-start flex flex-col':
									isLgScale,
							})}
							sizeXl=''
							sizeLg=''
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
						>
							<div className='w-full max-w-sm text-left font-bold uppercase tracking-wider text-sm flex items-center leading-none'>
								<div className='w-2 h-2 rounded-full mr-2 zaions-ion-bg-color-danger'></div>
								<ZIonText>LIVE PREVIEW</ZIonText>
							</div>

							<div
								className={classNames({
									'bg-white rounded-lg shadow px-5 py-4 mt-2': true,
									'max-w-sm': isLgScale,
									'w-full': !isLgScale,
								})}
							>
								<ZIonText className='text-lg font-bold block'>
									Add your idea
								</ZIonText>

								<ZIonText className='block whitespace-pre-line mt-2'>
									We value your feedback. You can vote for existing ideas,
									discuss them or add your own.
								</ZIonText>

								<ZIonInput
									value=''
									placeholder='Something short'
									label='Title'
									labelPlacement='stacked'
									minHeight='42px'
									className='mt-5'
								/>

								<ZIonTextarea
									fill='outline'
									value=''
									placeholder='Something short'
									label='Description'
									labelPlacement='stacked'
									autoGrow
									className='mt-5'
								/>

								<ZIonButton className='mt-5' expand='block'>
									Add idea
								</ZIonButton>
							</div>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZProjectBoardFormPage;
