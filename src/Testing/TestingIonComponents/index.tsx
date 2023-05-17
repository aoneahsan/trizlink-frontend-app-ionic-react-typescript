/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import { ZIonContent, ZIonGrid, ZIonRow } from '@/components/ZIonComponents';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
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
 * About: (Info of component here...)
 * @type {*}
 * */

const TestingIonComponents: React.FC = () => {
	// const [segmentButtons, setSegmentButtons] = useState([
	// 	'Button 1',
	// 	'Button 2',
	// 	'Button 3',
	// ]);

	// function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
	// 	// The `from` and `to` properties contain the index of the item
	// 	// when the drag started and ended, respectively
	// 	console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

	// 	// Finish the reorder and position the item in the DOM based on
	// 	// where the gesture ended. This method can also be called directly
	// 	// by the reorder group
	// 	event.detail.complete();
	// }

	return (
		<ZaionsIonPage>
			<ZIonContent>
				<ZIonGrid>
					<ZIonRow>
						{/* <ZIonCol>
							<h1>IonSelect</h1>
						</ZIonCol>
						<ZIonCol size='12'>
							<Formik
								initialValues={{ select: '' }}
								onSubmit={(values) => {
									console.log(values);
								}}
							>
								{({ values, handleChange, submitForm }) => {
									return (
										<>
											<ZIonItem>
												<ZTimezoneSelector
													name='select'
													onIonChange={handleChange}
													value={values.select}
													label='testing ion select'
													labelPlacement='floating'
												/>
											</ZIonItem>

											<ZIonButton
												type='submit'
												onClick={() => {
													submitForm();
												}}
											>
												Submit
											</ZIonButton>
										</>
									);
								}}
							</Formik>
						</ZIonCol> */}

						{/* <ZIonCol size='12'>
							<ZIonItem>
								<ZTimezoneSelector />
							</ZIonItem>
						</ZIonCol> */}

						{/* <ZIonCol>
							<ZIonSegment>
								<ZIonReorderGroup
									disabled={false}
									onIonItemReorder={handleReorder}
									className='flex'
								>
									{[1, 2, 3, 4, 5, 6, 7].map((el, index) => (
										<ZIonSegmentButton key={index} value={String(el)}>
											<div className='flex ion-align-items-center'>
												<ZIonReorder />
												<ZIonLabel>{el}</ZIonLabel>
											</div>
										</ZIonSegmentButton>
									))}
								</ZIonReorderGroup>
							</ZIonSegment>
						</ZIonCol> */}
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default TestingIonComponents;
