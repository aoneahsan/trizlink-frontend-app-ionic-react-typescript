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
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

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

	const { isMdScale, isSmScale } = useZMediaQueryScale();

	return (
		<>
			<ZIonCol
				sizeXl='5.9'
				sizeLg='5.9'
				sizeMd='5.9'
				sizeSm='12'
				sizeXs='12'
				className='py-2 border zaions__bg_white'
			>
				<div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
					<ZIonIcon icon={gitPullRequestOutline} size='large' />
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Rotator - AB Testing
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</div>
				<div className='block px-2 mt-3'>
					<ZIonRow className='gap-2 pb-1'>
						<ZIonCol
							sizeXl='5.6'
							sizeLg='5.6'
							sizeMd='5.6'
							sizeSm='12'
							sizeXs='12'
						>
							<ZIonInput
								disabled
								className='ion-no-padding'
								label='Redirection Links*'
								labelPlacement='stacked'
								minHeight='40px'
							/>
						</ZIonCol>
						<ZIonCol
							sizeXl='5.6'
							sizeLg='5.6'
							sizeMd='5.6'
							sizeSm='12'
							sizeXs='12'
						>
							<ZIonInput
								type='number'
								label='Percentage'
								value={FULL_PERCENTAGE}
								disabled
								labelPlacement='stacked'
								minHeight='40px'
							/>
						</ZIonCol>
					</ZIonRow>

					{/*  */}
					<FieldArray name='rotatorABTesting'>
						{({ remove, push }) => (
							<div>
								{values.rotatorABTesting.length > 0 &&
									values.rotatorABTesting.map((_rotatorAbTestingEl, _index) => (
										<ZIonRow
											key={_index}
											className={classNames({
												'gap-2 ion-align-items-top': true,
												'mt-3': isSmScale,
												'pt-4 mt-2 border-t':
													(!isMdScale && isSmScale) || !isSmScale,
											})}
										>
											<ZIonCol
												sizeXl='5.6'
												sizeLg='5.6'
												sizeMd='5.6'
												sizeSm='12'
												sizeXs='12'
											>
												<ZIonInput
													label='Redirection Links*'
													labelPlacement='stacked'
													onIonChange={handleChange}
													onIonBlur={handleBlur}
													minHeight='40px'
													value={
														values.rotatorABTesting[_index].redirectionLink
													}
													name={`rotatorABTesting.${_index}.redirectionLink`}
													errorText={
														errors.rotatorABTesting?.length
															? ((
																	errors.rotatorABTesting[
																		_index
																	] as RotatorABTestingErrorType
															  )?.redirectionLink as string)
															: undefined
													}
													className={classNames({
														'ion-touched':
															touched.rotatorABTesting &&
															touched.rotatorABTesting[_index]?.redirectionLink,
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
													})}
												/>
											</ZIonCol>

											{/*  */}
											<ZIonCol
												sizeXl='5.6'
												sizeLg='5.6'
												sizeMd='5.6'
												sizeSm='11'
												sizeXs='11'
											>
												<ZIonInput
													type='number'
													label='Percentage*'
													labelPlacement='stacked'
													minHeight='40px'
													onIonChange={handleChange}
													onIonBlur={handleBlur}
													value={values.rotatorABTesting[_index].percentage}
													name={`rotatorABTesting.${_index}.percentage`}
													errorText={
														errors.rotatorABTesting?.length
															? ((
																	errors.rotatorABTesting[
																		_index
																	] as RotatorABTestingErrorType
															  )?.percentage as string)
															: undefined
													}
													className={classNames({
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
													})}
												/>
											</ZIonCol>

											<ZIonCol className='ion-padding-top'>
												<ZIonIcon
													icon={trashBin}
													onClick={() => {
														remove(_index);
													}}
													color='danger'
													className='w-[21px] h-[21px] zaions__nav_item'
												/>
											</ZIonCol>
										</ZIonRow>
									))}

								{values.geoLocation.length ? (
									<ZIonButton
										disabled
										color='dark'
										className='mt-3 ion-text-capitalize ion-no-padding'
										fill='clear'
									>
										You can't add a redirection if Geolocation is activated
									</ZIonButton>
								) : (
									<ZIonButton
										fill='clear'
										className='mt-2 ion-text-capitalize ion-no-padding ps-1'
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
