// Core Imports
import React from 'react';

// Packages Imports
import { FieldArray, useFormikContext } from 'formik';
import { gitPullRequestOutline, trashBin } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonInput,
} from '@/components/ZIonComponents';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Global constant
import { getRandomKey } from '@/utils/helpers';

// Types
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import { ZIonButton } from '@/components/ZIonComponents';
import { ABTestingRotatorInterface } from '@/types/AdminPanel/index.type';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

const FULL_PERCENTAGE = 100;

type RotatorABTestingErrorType = {
	redirectionLink?: string;
	percentage?: string;
};

const getNewRotatorABTestingEmptyObj: () => ABTestingRotatorInterface = () => {
	return {
		id: getRandomKey(),
		redirectionLink: '',
		percentage: 0,
	};
};

const RotatorABTesting: React.FC = () => {
	const { values, errors, touched, handleChange, handleBlur } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	return (
		<>
			<ZIonCol
				sizeXl='5.7'
				sizeLg='5.6'
				sizeMd='5.6'
				sizeSm='12'
				sizeXs='12'
				className='py-3 border zaions__bg_white'
			>
				<div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
					<ZIonIcon icon={gitPullRequestOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Rotator - AB Testing{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
				</div>
				<div className='block px-2 mt-3 mb-4'>
					<ZIonRow className='gap-1'>
						<ZIonCol size='5.6'>
							<ZIonInput
								disabled
								className='ion-no-padding'
								label='Redirection Links*'
								labelPlacement='floating'
							/>
						</ZIonCol>
						<ZIonCol size='5.5'>
							<ZIonInput
								type='number'
								label='Percentage'
								labelPlacement='floating'
								value={FULL_PERCENTAGE}
								disabled
							/>
						</ZIonCol>
					</ZIonRow>
					<FieldArray name='rotatorABTesting'>
						{({ remove, push }) => (
							<div>
								{values.rotatorABTesting.length > 0 &&
									values.rotatorABTesting.map((_rotatorAbTestingEl, _index) => (
										<ZIonRow key={_index} className='mt-3 ion-align-items-top'>
											<ZIonCol size='5.6'>
												<ZIonInputField
													inputFieldProps={{
														label: 'Redirection Links*',
														labelPlacement: 'floating',
														onIonChange: handleChange,
														onIonBlur: handleBlur,
														value:
															values.rotatorABTesting[_index].redirectionLink,
														name: `rotatorABTesting.${_index}.redirectionLink`,
														errorText: errors.rotatorABTesting?.length
															? ((
																	errors.rotatorABTesting[
																		_index
																	] as RotatorABTestingErrorType
															  )?.redirectionLink as string)
															: undefined,
														className: `${classNames({
															'ion-touched':
																touched.rotatorABTesting &&
																touched.rotatorABTesting[_index]
																	?.redirectionLink,
															'ion-invalid':
																touched.rotatorABTesting &&
																errors.rotatorABTesting &&
																touched.rotatorABTesting[_index]
																	?.redirectionLink &&
																(
																	errors.rotatorABTesting[
																		_index
																	] as RotatorABTestingErrorType
																)?.redirectionLink,

															'ion-valid':
																touched.rotatorABTesting &&
																errors.rotatorABTesting &&
																touched.rotatorABTesting[_index]
																	?.redirectionLink &&
																!(
																	errors.rotatorABTesting[
																		_index
																	] as RotatorABTestingErrorType
																)?.redirectionLink,
														})}`,
													}}
												/>
											</ZIonCol>
											<ZIonCol size='5.6'>
												<ZIonInputField
													inputFieldProps={{
														type: 'number',
														label: 'Percentage*',
														labelPlacement: 'floating',
														onIonChange: handleChange,
														onIonBlur: handleBlur,
														value: values.rotatorABTesting[_index].percentage,
														name: `rotatorABTesting.${_index}.percentage`,
														errorText: errors.rotatorABTesting?.length
															? ((
																	errors.rotatorABTesting[
																		_index
																	] as RotatorABTestingErrorType
															  )?.percentage as string)
															: undefined,
														className: `${classNames({
															'ion-touched':
																touched.rotatorABTesting &&
																touched.rotatorABTesting[_index]?.percentage,
															'ion-invalid':
																touched.rotatorABTesting &&
																errors.rotatorABTesting &&
																touched.rotatorABTesting[_index]?.percentage &&
																(
																	errors.rotatorABTesting[
																		_index
																	] as RotatorABTestingErrorType
																)?.percentage,

															'ion-valid':
																touched.rotatorABTesting &&
																errors.rotatorABTesting &&
																touched.rotatorABTesting[_index]?.percentage &&
																!(
																	errors.rotatorABTesting[
																		_index
																	] as RotatorABTestingErrorType
																)?.percentage,
														})}`,
													}}
												/>
											</ZIonCol>
											<ZIonCol className='mt-4 ion-padding-top'>
												<ZIonIcon
													icon={trashBin}
													onClick={() => {
														remove(_index);
													}}
													color='danger'
													className='zaions__nav_item'
													style={{
														width: '21px',
														height: '21px',
													}}
												/>
											</ZIonCol>
										</ZIonRow>
									))}

								{values.geoLocation.length ? (
									<ZIonButton
										disabled
										color={'dark'}
										className='mt-3 ion-text-capitalize'
										fill='clear'
									>
										You can't add a redirection if Geolocation is activated
									</ZIonButton>
								) : (
									<ZIonButton
										fill='clear'
										className='mt-3 ion-text-capitalize'
										size='small'
										onClick={() =>
											push({
												id: getRandomKey(),
												redirectionLink: '',
												percentage: 0,
											})
										}
									>
										Add a destination
									</ZIonButton>
								)}
							</div>
						)}
					</FieldArray>
				</div>
			</ZIonCol>
		</>
	);
};

export default RotatorABTesting;
