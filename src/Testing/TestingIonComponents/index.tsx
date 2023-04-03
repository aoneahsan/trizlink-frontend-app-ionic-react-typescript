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
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonItem,
	ZIonRow,
} from '@/components/ZIonComponents';
import { IonSelect, IonSelectOption } from '@ionic/react';
import { Form, Formik } from 'formik';

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
	return (
		<ZaionsIonPage>
			<ZIonContent>
				<ZIonGrid>
					<ZIonRow>
						<ZIonCol>
							<h1>IonSelect</h1>
						</ZIonCol>
						<ZIonCol size='12'>
							<Formik
								initialValues={{ select: ['two', 'three'] }}
								onSubmit={(values) => {
									console.log(values);
								}}
							>
								{({ values, handleChange, submitForm }) => {
									return (
										<>
											<ZIonItem>
												<IonSelect
													name='select'
													onIonChange={handleChange}
													value={values.select}
													multiple
													label='testing ion select'
													labelPlacement='floating'
												>
													<IonSelectOption value='one'>1</IonSelectOption>
													<IonSelectOption value='two'>2</IonSelectOption>
													<IonSelectOption value='three'>3</IonSelectOption>
													<IonSelectOption value='four'>4</IonSelectOption>
													<IonSelectOption value='five'>5</IonSelectOption>
													<IonSelectOption value='six'>6</IonSelectOption>
													<IonSelectOption value='seven'>7</IonSelectOption>
													<IonSelectOption value='eight'>8</IonSelectOption>
													<IonSelectOption value='nine'>9</IonSelectOption>
													<IonSelectOption value='ten'>10</IonSelectOption>
												</IonSelect>
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
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default TestingIonComponents;
