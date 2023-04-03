// Core Imports
import React from 'react';

// Packages Imports
import { FieldArray } from 'formik';
import { gitPullRequestOutline, trashBin } from 'ionicons/icons';
import { FormikHandleChangeEventType } from '@/types/ZaionsFormik.type';
import { ZIonButton, ZIonIcon } from '@/components/ZIonComponents';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonRouterLink,
	ZIonItem,
	ZIonRow,
	ZIonInput,
} from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Global constant

const FULL_PERCENTAGE = 100;

const ZaionsTextPage: React.FC<{
	testValue: {
		redirectionLink?: string;
		percentage?: string;
	}[];
	handleChange: FormikHandleChangeEventType;
}> = ({ testValue, handleChange }) => {
	return (
		<>
			<ZIonCol
				sizeXl='5.7'
				sizeLg='5.6'
				sizeMd='5.6'
				sizeSm='12'
				sizeXs='12'
				className='border py-3 zaions__bg_white'
			>
				<div className='d-flex align-items-center border-bottom ion-padding-start pb-2'>
					<ZIonIcon icon={gitPullRequestOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='fw-bold ion-no-margin ion-padding-start'>
							Rotator - AB Testing{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
				</div>
				<div className='d-block px-2 mt-3 mb-4'>
					<ZIonRow className='gap-1'>
						<ZIonCol size='5.6'>
							<ZIonItem>
								<ZIonInput
									// name={'rotatorABTesting.redirectionLink'}
									disabled
									label='Redirection Links'
									labelPlacement='floating'
									className='ion-no-padding'
								></ZIonInput>
							</ZIonItem>
						</ZIonCol>
						<ZIonCol size='5.6'>
							<ZIonItem>
								<ZIonInput
									label='Percentage'
									labelPlacement='floating'
									type='number'
									value={FULL_PERCENTAGE}
									disabled
								></ZIonInput>
							</ZIonItem>
						</ZIonCol>
					</ZIonRow>
					<FieldArray name='rotatorABTesting'>
						{({ remove, push }) => (
							<div>
								{testValue.length > 0 &&
									testValue.map((friend, index) => (
										<ZIonRow key={index} className='mt-3'>
											<ZIonCol size='5.6'>
												<ZIonItem>
													<ZIonInput
														label='Redirection Links*'
														labelPlacement='floating'
														name={`rotatorABTesting.${index}.redirectionLink`}
														onIonChange={handleChange}
														className='ion-no-padding'
													></ZIonInput>
												</ZIonItem>
											</ZIonCol>
											<ZIonCol size='5.6'>
												<ZIonItem>
													<ZIonInput
														type='number'
														label='Percentage*'
														labelPlacement='floating'
														name={`rotatorABTesting.${index}.percentage`}
														onIonChange={handleChange}
													></ZIonInput>
												</ZIonItem>
											</ZIonCol>
											<ZIonCol className='d-flex ion-align-items-end'>
												<ZIonIcon
													icon={trashBin}
													onClick={() => remove(index)}
													color='danger'
													className='zaions__nav_item'
												/>
											</ZIonCol>
										</ZIonRow>
									))}

								<ZIonButton
									fill='clear'
									className='ion-text-capitalize mt-3'
									size='small'
									onClick={() => push({ redirectionLink: '', percentage: '' })}
								>
									Add a destination
								</ZIonButton>
							</div>
						)}
					</FieldArray>
				</div>
			</ZIonCol>
		</>
	);
};

export default ZaionsTextPage;
