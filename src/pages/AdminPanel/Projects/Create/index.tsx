/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import ReactDropzone from 'react-dropzone';
import classNames from 'classnames';
import { arrowForward } from 'ionicons/icons';
import { Formik, useFormikContext } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { PRODUCT_NAME } from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	ProjectCreatePageTabEnum,
	ZProjectInterface,
} from '@/types/AdminPanel/Project';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { ProductLogo } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProjectCreatePage: React.FC = () => {
	return (
		<ZaionsIonPage>
			<ZIonContent>
				<Formik
					initialValues={{
						currentTab: ProjectCreatePageTabEnum.detailForm,
						projectName: '',
						subDomain: '',
						image: '',
						featureRequests: '',
						completedRecently: '',
						inProgress: '',
						plannedNext: '',
					}}
					onSubmit={() => {}}
				>
					{({ values }) => {
						return (
							<ZIonRow>
								{/* Left (Form col) */}
								<ZIonCol className='relative z-10 flex flex-col-reverse justify-between w-full px-4 bg-white shadow-lg md:h-screen md:flex-row'>
									{/* dots */}
									<div className='flex flex-row justify-center my-4 md:flex-col md:my-0 md:mr-4'>
										<div
											className={classNames({
												'w-4 h-4 mx-2 rounded-full md:mx-0 md:my-2': true,
												zaions__warning_set:
													values.currentTab ===
													ProjectCreatePageTabEnum.detailForm,
												zaions__secondary_set:
													values.currentTab !==
													ProjectCreatePageTabEnum.detailForm,
											})}
										></div>
										<div
											className={classNames({
												'w-4 h-4 mx-2 rounded-full md:mx-0 md:my-2': true,
												zaions__warning_set:
													values.currentTab === ProjectCreatePageTabEnum.board,
												zaions__secondary_set:
													values.currentTab !== ProjectCreatePageTabEnum.board,
											})}
										></div>
										<div
											className={classNames({
												'w-4 h-4 mx-2 rounded-full md:mx-0 md:my-2': true,
												zaions__warning_set:
													values.currentTab === ProjectCreatePageTabEnum.ideas,
												zaions__secondary_set:
													values.currentTab !== ProjectCreatePageTabEnum.ideas,
											})}
										></div>
										<div
											className={classNames({
												'w-4 h-4 mx-2 rounded-full md:mx-0 md:my-2': true,
												zaions__warning_set:
													values.currentTab ===
													ProjectCreatePageTabEnum.roadMap,
												zaions__secondary_set:
													values.currentTab !==
													ProjectCreatePageTabEnum.roadMap,
											})}
										></div>
									</div>

									{/* main form div */}
									<div className='w-full max-w-lg mx-auto mt-8 md:mt-16'>
										<div className='w-full'>
											{/* Logo */}
											<div className='flex ion-align-items-center'>
												<ZIonImg
													src={ProductLogo}
													className='w-[2.5rem] me-3 h-auto rounded-xl overflow-hidden'
												/>
												<ZIonText
													className='text-2xl font-extrabold tracking-wider'
													color='dark'
												>
													{PRODUCT_NAME}
												</ZIonText>
											</div>

											{/*  */}
											<div className='pt-16'>
												{values.currentTab ===
												ProjectCreatePageTabEnum.detailForm ? (
													<ZDetailFormTab />
												) : values.currentTab ===
												  ProjectCreatePageTabEnum.board ? (
													<ZBoardTab />
												) : values.currentTab ===
												  ProjectCreatePageTabEnum.ideas ? (
													<ZIdeasTab />
												) : values.currentTab ===
												  ProjectCreatePageTabEnum.roadMap ? (
													<ZRoadMapTab />
												) : (
													''
												)}
											</div>
										</div>
									</div>
								</ZIonCol>

								{/* Right (Preview col) */}
								<ZIonCol className='flex zaions__bg_light_opacity_point5 ion-align-items-center ion-justify-content-center'>
									{/* Browser window */}
									<div
										className={classNames(classes['z-browser-window'], {
											'h-[21rem] w-full max-w-[32rem] bg-[#f7f4f2] rounded-[0.375rem] overflow-hidden':
												true,
										})}
									>
										{/* Window tab */}
										<div
											className={classNames({
												'flex w-full h-10 ion-align-items-end bg-[#cbcfd4]':
													true,
											})}
										>
											<span className='relative z-10 flex w-48 h-8 ion-align-items-center bg-[#eaecee] px-2 text-sm leading-5 text-[#2e4052] ms-2 rounded-t font-normal'>
												New Project Feedback
											</span>
										</div>

										{/* Window tab url */}
										<div className='relative z-0 flex w-full h-10 ion-align-items-center bg-[#eaecee]'>
											<span className='block w-full h-6 px-2 mx-2 text-sm leading-5 bg-white rounded-full'>
												<span className='text-[rgba(46,64,82,1)] font-normal'>
													https://
												</span>
												<span className='text-[rgba(46,64,82,1)] font-normal'>
													new-project
												</span>
												<span className='text-dblue-500'>.feedbear.com</span>
											</span>
										</div>

										{/* Window body */}
										<div className='px-3 pt-2'>
											{/* Project Name */}
											<div className='w-full'>
												<ZIonText className='text-[rgba(109,121,134,1)] font-bold'>
													New Project
												</ZIonText>
											</div>

											{/*  */}
											<div className='flex'>
												<div className='w-16 h-3 mt-2 mr-1 rounded-lg bg-[rgba(203,207,212,1)]'></div>
												<div className='w-20 h-3 mt-2 mr-1 rounded-lg bg-[rgba(203,207,212,1)]'></div>
											</div>

											{/*  */}
											<div className='flex mt-3 ion-align-items-start'>
												<div className='w-1/3 p-2 mr-1 bg-white rounded'>
													<div className='w-16 h-3 rounded bg-[rgba(234,236,238,1)]'></div>

													<div className='w-full h-24 mt-2 rounded bg-[rgba(234,236,238,1)]'></div>

													<div className='w-12 h-5 mx-auto mt-2 rounded bg-[rgba(234,236,238,1)]'></div>
												</div>

												<div className='w-2/3 p-2 ml-1 bg-white rounded'>
													<div className='flex flex-col h-[2.5rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-2 text-sm leading-5 bg-white rounded px-2'></div>

													<div className='flex flex-col h-[2.5rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-2 text-sm leading-5 bg-white rounded px-2'></div>

													<div className='flex flex-col h-[2.5rem] m-1 border-2 ion-justify-content-center border-[rgba(234,236,238,1)] mx-2 text-sm leading-5 bg-white rounded px-2'></div>
												</div>
											</div>
										</div>
									</div>
								</ZIonCol>
							</ZIonRow>
						);
					}}
				</Formik>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

const ZDetailFormTab: React.FC = () => {
	const { values, setFieldValue, handleBlur, handleChange } =
		useFormikContext<ZProjectInterface>();

	return (
		<>
			<ZIonText>
				<h1 className='block text-3xl font-bold'>Welcome to FeedBear</h1>
			</ZIonText>
			<ZIonText className='block mt-1 text-lg'>
				Start by creating your project.
			</ZIonText>

			<div className='mt-8'>
				{/* Project Name */}
				<ZIonInput
					name='projectName'
					label='Project name'
					labelPlacement='floating'
					value={values.projectName}
					onIonChange={(e) => {
						handleChange(e);

						//
						setFieldValue('subDomain', values.projectName.toLowerCase(), false);
					}}
					onIonBlur={handleBlur}
				/>

				{/* Sub domain */}
				<ZIonInput
					name='subDomain'
					label='Subdomain'
					labelPlacement='floating'
					className='mt-5'
					onIonChange={handleChange}
					onIonBlur={handleBlur}
					value={values.subDomain}
				/>

				{/* File */}
				<ReactDropzone
					multiple={false}
					accept={{ '*': ['.png', '.gif', '.jpeg', '.jpg'] }}
					autoFocus
					disabled={false}
					maxSize={1250000}
					minSize={10000}
					// noClick={false}
					maxFiles={10}
				>
					{({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => {
						// console.log({
						// 	message: 'acceptedFiles',
						// 	data: acceptedFiles[0].name,
						// });
						return (
							<div
								{...getRootProps()}
								className='mt-5 transition duration-150 ease-in cursor-pointer bg-dirty input'
							>
								<ZIonInput
									// disabled
									label={
										(acceptedFiles && acceptedFiles[0]?.name) ||
										'Select file... (Optional)'
									}
									readonly
								/>
								<input {...getInputProps()} />
							</div>
						);
					}}
				</ReactDropzone>

				{/* Continue Button */}
				<ZIonButton expand='block' className='mt-8' size='large'>
					Continue
					<ZIonIcon icon={arrowForward} className='w-5 h-5 ms-1' />
				</ZIonButton>
			</div>
		</>
	);
};

const ZBoardTab: React.FC = () => {
	return (
		<>
			<ZIonText>
				<h1 className='block text-3xl font-bold'>Your first board</h1>
			</ZIonText>
			<ZIonText className='block mt-1 text-lg'>
				Boards are used to separate different kinds of feedback like
				<em> Feature requests</em> and <em> Bug reports</em>
			</ZIonText>

			<div className='mt-8'>
				{/* Feature requests */}
				<ZIonInput
					name='featureRequests'
					label='Most people start with'
					labelPlacement='floating'
					value='Feature requests'
				/>

				{/* Continue Button */}
				<ZIonButton expand='block' className='mt-8' size='large'>
					Continue
					<ZIonIcon icon={arrowForward} className='w-5 h-5 ms-1' />
				</ZIonButton>
			</div>
		</>
	);
};

const ZIdeasTab: React.FC = () => {
	return (
		<>
			<ZIonText>
				<h1 className='block text-3xl font-bold'>Add a few ideas</h1>
			</ZIonText>
			<ZIonText className='block mt-1 text-lg'>
				In the future, your users will be adding these. To get the ball rolling,
				add a few ideas to
				<ZIonText className='font-bold'> Feature requests</ZIonText>.
			</ZIonText>

			<div className='mt-8'>
				{/* recentlyCompleted */}
				<ZIonInput
					name='recentlyCompleted'
					label='What have you completed recently?'
					labelPlacement='floating'
				/>

				{/* inProgress */}
				<ZIonInput
					name='inProgress'
					label="What's in progress right now?"
					labelPlacement='floating'
					className='mt-5'
				/>

				{/* plannedNext */}
				<ZIonInput
					name='plannedNext'
					label="What's planned next?"
					labelPlacement='floating'
					className='mt-5'
				/>

				{/* Continue Button */}
				<ZIonButton expand='block' className='mt-8' size='large'>
					Continue
					<ZIonIcon icon={arrowForward} className='w-5 h-5 ms-1' />
				</ZIonButton>
			</div>
		</>
	);
};

const ZRoadMapTab: React.FC = () => {
	return (
		<>
			<ZIonText>
				<h1 className='block text-3xl font-bold'>This is your Roadmap</h1>
			</ZIonText>
			<ZIonText className='block mt-1 text-lg'>
				It shows your progress based on the status of ideas automatically. The
				ideas you created are already there!
			</ZIonText>

			<ZIonText className='block mt-24 text-lg'>
				<strong>You're all set!</strong> Share a link to your project with your
				users to start getting new ideas right now.
			</ZIonText>

			{/* Continue Button */}
			<ZIonButton expand='block' className='mt-8' size='large'>
				Continue
				<ZIonIcon icon={arrowForward} className='w-5 h-5 ms-1' />
			</ZIonButton>
		</>
	);
};

export default ZProjectCreatePage;
