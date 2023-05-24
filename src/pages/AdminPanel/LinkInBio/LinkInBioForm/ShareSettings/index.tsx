/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import VALIDATOR from 'validator';
import { settingsOutline } from 'ionicons/icons';
import { Formik } from 'formik';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import AddNotes from '@/components/UserDashboard/AddNotes';
import Tags from '@/components/UserDashboard/Tags';
import RotatorABTesting from '@/components/UserDashboard/RotatorABTesting';
import GeoLocation from '@/components/UserDashboard/GeoLocation';
import LinkExpiration from '@/components/UserDashboard/LinkExpiration';
import LinkPassword from '@/components/UserDashboard/Password';
import LinkFavIcon from '@/components/UserDashboard/Favicon';
import GDPRPopup from '@/components/UserDashboard/GDPRPopup';
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonFooter,
} from '@/components/ZIonComponents';
import { ZIonButton } from '@/components/ZIonComponents';
import ZaionsCustomYourLink from '@/components/UserDashboard/shortUrlCustomYourLink';
import LinksPixelsAccount from '@/components/UserDashboard/LinksPixelsAccount';
import UTMTagTemplates from '@/components/UserDashboard/UTMTagTemplates';
import DomainName from '@/components/UserDashboard/DomainName';
import { useZRQUpdateRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZValidateRequestResponse } from '@/ZaionsHooks/zapi-hooks';
import LinkInBioFoldersHOC from '@/components/UserDashboard/LinkInBioFoldersHOC';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import MESSAGES from '@/utils/messages';
import { validateField, zJsonParse, zStringify } from '@/utils/helpers';
import { API_URL_ENUM, VALIDATION_RULE } from '@/utils/enums';
import CONSTANTS, { BRACKPOINT_LG, BRACKPOINT_MD } from '@/utils/constants';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { NewLinkInBioFormState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioFormState.recoil';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	UTMTagInfoInterface,
	ShortUrlInterface,
	ABTestingRotatorInterface,
	GeoLocationRotatorInterface,
	LinkExpirationInfoInterface,
	PasswordInterface,
} from '@/types/AdminPanel/index.type';
import { reportCustomError } from '@/utils/customErrorType';

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

const LinkInBioShareSettings: React.FC = () => {
	const { editLinkInBioId } = useParams<{ editLinkInBioId: string }>();

	const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);

	// validate the request. this hook will show success notification if the request->success is true and show error notification if request->success is false.
	const { validateRequestResponse } = useZValidateRequestResponse();

	// Recoil state link-in-bio form state (for editing or creating link-in-bio)
	const linkInBioFormState = useRecoilValue(NewLinkInBioFormState);

	// Update Link-in-bio API
	const { mutateAsync: UpdateLinkInBio } = useZRQUpdateRequest({
		_url: API_URL_ENUM.linkInBio_update_delete,
		_queriesKeysToInvalidate: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.LINK_IN_BIO.GET,
		],
	});

	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});

	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	const FormikSubmissionHandler = async (reqDataStr: string) => {
		try {
			if (reqDataStr) {
				// The update api...
				const _result = await UpdateLinkInBio({
					itemIds: [editLinkInBioId],
					urlDynamicParts: [':linkInBioId'],
					requestData: reqDataStr,
				});

				// if _result of the updateLinkInBio api is success this showing success notification else not success then error notification.
				await validateRequestResponse({
					resultObj: _result,
				});
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<Formik
			// ( Initial Values Start  ) //
			initialValues={{
				title: linkInBioFormState.title || '',
				linkDescription: linkInBioFormState.description || '',
				featureImg: linkInBioFormState.featureImg || '',
				password: {
					value:
						(
							zJsonParse(
								String(linkInBioFormState.password)
							) as PasswordInterface
						)?.value || '',
					enabled:
						(
							zJsonParse(
								String(linkInBioFormState.password)
							) as PasswordInterface
						)?.enabled || false,
				},
				folderId:
					linkInBioFormState.folderId ||
					CONSTANTS.DEFAULT_VALUES.DEFAULT_FOLDER,
				linkNote: linkInBioFormState.notes || '',
				tags: (zJsonParse(String(linkInBioFormState.tags)) as string[]) || [],
				linkExpiration: {
					enabled:
						(
							zJsonParse(
								String(linkInBioFormState.linkExpirationInfo)
							) as LinkExpirationInfoInterface
						)?.enabled || false,
					expirationDate:
						(
							zJsonParse(
								String(linkInBioFormState.linkExpirationInfo)
							) as LinkExpirationInfoInterface
						)?.expirationDate || '',
					timezone:
						(
							zJsonParse(
								String(linkInBioFormState.linkExpirationInfo)
							) as LinkExpirationInfoInterface
						)?.timezone || '',
					redirectionLink:
						(
							zJsonParse(
								String(linkInBioFormState.linkExpirationInfo)
							) as LinkExpirationInfoInterface
						)?.redirectionLink || '',
				},
				rotatorABTesting:
					(zJsonParse(
						String(linkInBioFormState.abTestingRotatorLinks)
					) as ABTestingRotatorInterface[]) || [],
				geoLocation:
					(zJsonParse(
						String(linkInBioFormState.geoLocationRotatorLinks)
					) as GeoLocationRotatorInterface[]) || [],
				shortUrl: {
					domain:
						(linkInBioFormState.shortUrl as ShortUrlInterface)?.domain || '',
					url: (linkInBioFormState.shortUrl as ShortUrlInterface)?.url || '',
				},
				linkPixelsAccount:
					(zJsonParse(String(linkInBioFormState.pixelIds)) as string[]) || [],
				UTMTags: {
					templateId:
						(
							zJsonParse(
								String(linkInBioFormState.utmTagInfo)
							) as UTMTagInfoInterface
						)?.templateId || '',
					utmCampaign:
						(
							zJsonParse(
								String(linkInBioFormState.utmTagInfo)
							) as UTMTagInfoInterface
						)?.utmCampaign || '',
					utmMedium:
						(
							zJsonParse(
								String(linkInBioFormState.utmTagInfo)
							) as UTMTagInfoInterface
						)?.utmMedium || '',
					utmSource:
						(
							zJsonParse(
								String(linkInBioFormState.utmTagInfo)
							) as UTMTagInfoInterface
						)?.utmSource || '',
					utmTerm:
						(
							zJsonParse(
								String(linkInBioFormState.utmTagInfo)
							) as UTMTagInfoInterface
						)?.utmTerm || '',
					utmContent:
						(
							zJsonParse(
								String(linkInBioFormState.utmTagInfo)
							) as UTMTagInfoInterface
						)?.utmContent || '',
				},
				favicon: linkInBioFormState.favicon || '',

				// complete page fields here
			}}
			enableReinitialize={true}
			// ( Initial Values End  ) //
			// ( Handling Validation & Errors Start  ) //
			validate={(values) => {
				const errors: {
					target: {
						url?: string;
						phoneNumber?: string;
						username?: string;
						email?: string;
						accountId?: string;
						subject?: string;
						message?: string;
					};
					title?: string;
					password: {
						value?: string;
					};
					linkExpiration: {
						redirectionLink?: string;
					};
					rotatorABTesting: {
						redirectionLink?: string;
						percentage?: string;
					}[];
					geoLocation: {
						redirectionLink?: string;
						country?: string;
					}[];
				} = {
					target: {},
					linkExpiration: {},
					rotatorABTesting: [],
					geoLocation: [],
					password: {},
				};

				// Link Title Validation Starts
				validateField('title', values, errors, VALIDATION_RULE.linkTitle);
				// Link Title Validation End

				// Password Validation Start
				if (values.password.enabled) {
					validateField(
						'value',
						values?.password,
						errors?.password,
						VALIDATION_RULE.password
					);
				}
				// Password Validation End

				// Link Expiration Validation Start
				if (values.linkExpiration.enabled) {
					validateField(
						'redirectionLink',
						values?.linkExpiration,
						errors?.linkExpiration,
						VALIDATION_RULE.url
					);
				}
				// Link Expiration Validation End

				// Rotator AB Testing Field Validation Start
				if (values.rotatorABTesting.length) {
					errors.rotatorABTesting = values.rotatorABTesting.map((el) => ({}));
					values.rotatorABTesting.forEach(
						(el: ABTestingRotatorInterface, index) => {
							if (!el.redirectionLink?.trim()) {
								errors.rotatorABTesting[index].redirectionLink =
									MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.REQUIRED_REDIRECTION_LINK;
							} else if (!VALIDATOR.isURL(el.redirectionLink)) {
								errors.rotatorABTesting[index].redirectionLink =
									MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.INVALID_REDIRECTION_LINK;
							}
							if (!el.percentage || isNaN(el.percentage)) {
								errors.rotatorABTesting[index].percentage =
									MESSAGES.FORM_VALIDATIONS.LINK.ROTATOR_AB_TESTING.REQUIRED_PERCENTAGE;
							}
						}
					);
				}
				// Rotator AB Testing Field Validation End

				// Rotator Geo Location Field Validation Start
				if (values.geoLocation.length) {
					errors.geoLocation = values.geoLocation.map((el) => ({}));
					values.geoLocation.forEach(
						(el: GeoLocationRotatorInterface, index) => {
							if (!el.redirectionLink?.trim()) {
								errors.geoLocation[index].redirectionLink =
									MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_REDIRECTION_LINK;
							} else if (!VALIDATOR.isURL(el.redirectionLink)) {
								errors.geoLocation[index].redirectionLink =
									MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.INVALID_REDIRECTION_LINK;
							}
							if (!el.country) {
								errors.geoLocation[index].country =
									MESSAGES.FORM_VALIDATIONS.LINK.GEOLOCATION.REQUIRED_COUNTRY;
							}
						}
					);
				}
				// Rotator Geo Location Field Validation End

				// check for errors if there are any return errors object otherwise return []
				if (
					errors.target?.url?.trim() ||
					errors.target?.accountId?.trim() ||
					errors.target?.email?.trim() ||
					errors.target?.message?.trim() ||
					errors.target?.username?.trim() ||
					errors.target?.phoneNumber?.trim() ||
					errors.target?.subject?.trim() ||
					errors.linkExpiration?.redirectionLink?.trim() ||
					errors.title?.trim() ||
					errors.password?.value?.trim()
					// || Object.keys(errors.geoLocation).length ||
					// Object.keys(errors.rotatorABTesting).length
				) {
					return errors;
				} else {
					return [];
				}
			}}
			// ( Handling Validation & Errors End  ) //
			onSubmit={async (values, { resetForm }) => {
				await FormikSubmissionHandler(
					zStringify({
						...linkInBioFormState,
						theme: zStringify(linkInBioFormState.theme),
						settings: zStringify(linkInBioFormState.settings),
						title: values.title,
						featureImg: values.featureImg,
						password: zStringify({
							value: values.password.value,
							enabled: values.password.enabled,
						}),
						linkExpirationInfo: zStringify({
							redirectionLink: values.linkExpiration.redirectionLink,
							expirationDate: values.linkExpiration.expirationDate,
							timezone: values.linkExpiration.timezone,
							enabled: values.linkExpiration.enabled,
						}),
						abTestingRotatorLinks: zStringify(values.rotatorABTesting),
						geoLocationRotatorLinks: zStringify(values.geoLocation),
						description: values.linkDescription,
						folderId: values.folderId,
						notes: values.linkNote,
						pixelIds: zStringify(values.linkPixelsAccount),
						tags: zStringify(values.tags),
						utmTagInfo: zStringify(values.UTMTags),
						createdAt: Date.now().toString(),
						shortUrl: zStringify(values.shortUrl),
						favicon: values.favicon,
					})
				);
			}}
		>
			{({ isSubmitting, isValid, dirty, submitForm }) => {
				return (
					<>
						<ZIonContent color='light'>
							<div className={`zaions_h100 w-full`}>
								{/* Custom your link Grid */}
								<ZIonGrid
									className={classNames({
										'my-5': true,
										'ms-3': isMdScale,
										'mx-2': !isMdScale,
									})}
								>
									<ZIonRow
										className={classNames({
											'gap-4': isLgScale,
											'gap-0': !isLgScale,
										})}
									>
										{/* Custom Your Link */}
										<ZaionsCustomYourLink />

										{/* Pixel Account, Utm Tags, Custom Domain */}
										<ZIonCol
											sizeXl='5.9'
											sizeLg='5.8'
											sizeMd='5.9'
											sizeSm='12'
											sizeXs='12'
										>
											{/* Pixels */}
											<LinksPixelsAccount />

											{/* UTMTags */}
											<UTMTagTemplates />

											{/* Choose Domain Name */}
											<DomainName />
										</ZIonCol>
									</ZIonRow>
								</ZIonGrid>

								{/* Advance Options */}
								<ZIonGrid className='ms-3 me-1'>
									<ZIonRow>
										<ZIonCol>
											<ZIonButton
												onClick={() =>
													setShowAdvanceOptions((oldVal) => !oldVal)
												}
												expand='block'
												size='large'
												className='ion-text-capitalize'
											>
												<ZIonText>
													<h4 className='ion-no-margin flex ion-align-items-center ion-padding-top ion-padding-bottom'>
														Advance Options
													</h4>
												</ZIonText>
												<ZIonIcon
													slot='end'
													icon={settingsOutline}
													className='ion-margin-end ms-auto'
												></ZIonIcon>
											</ZIonButton>
											{showAdvanceOptions && (
												<ZIonRow className='gap-5 ion-margin-top'>
													{/* Folder */}
													<LinkInBioFoldersHOC />

													{/* Add Notes */}
													<AddNotes />

													{/* Tags */}
													<Tags />

													{/* Rotator - AB Testing */}
													<RotatorABTesting />

													{/* Geo Location */}
													<GeoLocation />

													{/* Link Expiration */}
													<LinkExpiration />

													{/* Link Password */}
													<LinkPassword />

													{/* Link Favicon */}
													<LinkFavIcon />

													{/* GDPR Popup */}
													<GDPRPopup />
												</ZIonRow>
											)}
										</ZIonCol>
									</ZIonRow>
								</ZIonGrid>
							</div>
						</ZIonContent>
						<ZIonFooter>
							<ZIonGrid className='mx-4 mt-3'>
								<ZIonRow>
									<ZIonCol>
										<ZIonButton
											expand='full'
											onClick={() => void submitForm()}
											disabled={isSubmitting || !isValid || !dirty}
										>
											Save Changes
										</ZIonButton>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonFooter>
					</>
				);
			}}
		</Formik>
	);
};

export default LinkInBioShareSettings;
