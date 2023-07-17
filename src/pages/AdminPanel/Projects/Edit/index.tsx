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

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZProjectHeader from '@/components/ProjectComponents/Header';
import {
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonItem,
	ZIonList,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { Formik } from 'formik';
import {
	cardOutline,
	cloudOutline,
	extensionPuzzleOutline,
	linkOutline,
	lockClosedOutline,
	menuOutline,
	peopleOutline,
	settingsOutline,
} from 'ionicons/icons';

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
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProjectEditPage: React.FC = () => {
	const { isXlScale, isSmScale } = useZMediaQueryScale();

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
					<Formik initialValues={{}} onSubmit={() => {}}>
						{() => {
							return (
								<ZIonRow className='gap-6 mt-4'>
									<ZIonCol size='3.2'>
										<ZIonList
											lines='none'
											color='light'
											className='bg-transparent'
										>
											{/* General settings */}
											<ZIonItem minHeight='40px' className='rounded-lg'>
												<ZIonIcon
													icon={settingsOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>
													General settings
												</ZIonText>
											</ZIonItem>

											{/* Billing */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className='mt-2 rounded-lg'
											>
												<ZIonIcon
													icon={cardOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Billing</ZIonText>
											</ZIonItem>

											{/* Team */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className='mt-2 rounded-lg'
											>
												<ZIonIcon
													icon={peopleOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Team</ZIonText>
											</ZIonItem>

											{/* Integration */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className='mt-2 rounded-lg'
											>
												<ZIonIcon
													icon={extensionPuzzleOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Integration</ZIonText>
											</ZIonItem>

											{/* Single Sign-On */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className='mt-2 rounded-lg'
											>
												<ZIonIcon
													icon={cloudOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>
													Single Sign-On
												</ZIonText>
											</ZIonItem>

											{/* Custom domain */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className='mt-2 rounded-lg'
											>
												<ZIonIcon
													icon={linkOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Custom domain</ZIonText>
											</ZIonItem>

											{/* Private */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className='mt-2 rounded-lg'
											>
												<ZIonIcon
													icon={lockClosedOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Private</ZIonText>
											</ZIonItem>

											{/* Menu */}
											<ZIonItem
												minHeight='40px'
												color='light'
												className='mt-2 rounded-lg'
											>
												<ZIonIcon
													icon={menuOutline}
													className='font-bold me-2'
													color='dark'
												/>
												<ZIonText className='font-bold'>Menu</ZIonText>
											</ZIonItem>
										</ZIonList>
									</ZIonCol>

									<ZIonCol className='bg-white rounded-lg shadow mb-4 px-10 py-5'>
										3
									</ZIonCol>
								</ZIonRow>
							);
						}}
					</Formik>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZProjectEditPage;
