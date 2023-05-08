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
import { ZTimezoneSelector } from '@/components/CustomComponents/ZTimezone';

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
						</ZIonCol>

						{/* <ZIonCol size='12'>
							<ZIonItem>
								<ZTimezoneSelector />
							</ZIonItem>
						</ZIonCol> */}
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default TestingIonComponents;
