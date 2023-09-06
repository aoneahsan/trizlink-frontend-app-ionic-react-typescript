/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	chevronDownOutline,
	closeOutline,
	helpCircleOutline,
	linkOutline,
	sendOutline,
} from 'ionicons/icons';
import classNames from 'classnames';
import { Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZWorkspaceFormRoleSelectorPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/RoleSelectorPopover';
import {
	ZIonAvatar,
	ZIonBadge,
	ZIonButton,
	ZIonCol,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonInput,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonPopover, useZIonToast } from '@/ZaionsHooks/zionic-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormRoleEnum,
	WSTeamMembersInterface,
} from '@/types/AdminPanel/workspace';

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
import { ProductLogo } from '@/assets/images';
import {
	extractInnerData,
	formatApiRequestErrorForFormikFormField,
	validateField,
	zStringify,
} from '@/utils/helpers';
import {
	API_URL_ENUM,
	extractInnerDataOptionsEnum,
	VALIDATION_RULE,
} from '@/utils/enums';
import {
	useZGetRQCacheData,
	useZRQCreateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import { FormikSetErrorsType } from '@/types/ZaionsFormik.type';
import { AxiosError } from 'axios';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZInviteTab: React.FC<{
	workspaceId: string;
	teamId: string;
	dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ workspaceId, teamId, dismissZIonModal }) => {
	const [compState, setCompState] = useState<{
		_role?: workspaceFormRoleEnum;
	}>();

	// #region Custom hooks
	const { isLgScale } = useZMediaQueryScale();
	const { presentZIonToast } = useZIonToast();
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	// #endregion

	// #region APIS.
	const { mutateAsync: inviteTeamMemberAsyncMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.ws_team_member_invite_list,
		_itemsIds: [workspaceId, teamId],
		_urlDynamicParts: [
			CONSTANTS.RouteParams.workspace.workspaceId,
			CONSTANTS.RouteParams.workspace.teamId,
		],
	});
	// #endregion

	// #region modal & popover.
	const { presentZIonPopover: presentZWorkspaceFormRoleSelectorPopover } =
		useZIonPopover(ZWorkspaceFormRoleSelectorPopover, {
			selectedRole: compState?._role,
		});
	// #endregion

	// #region Functions.
	const formikSubmitHandler = async (
		_data: string,
		setErrors: FormikSetErrorsType
	) => {
		try {
			if (_data) {
				const __response = await inviteTeamMemberAsyncMutate(_data);

				if (
					(__response as ZLinkMutateApiType<WSTeamMembersInterface>).success
				) {
					const __data = extractInnerData<WSTeamMembersInterface>(
						__response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					if (__data && __data?.id) {
						const __wsTeamMembersRQData = getRQCDataHandler({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
								workspaceId,
								teamId,
							],
						});

						if (__wsTeamMembersRQData) {
							const _oldTeamsMemberData =
								extractInnerData<WSTeamMembersInterface[]>(
									__wsTeamMembersRQData,
									extractInnerDataOptionsEnum.createRequestResponseItems
								) || [];

							const __updatedMembersData = [..._oldTeamsMemberData, __data];

							await updateRQCDataHandler({
								key: [
									CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
									workspaceId,
									teamId,
								],
								data: __updatedMembersData,
								id: '',
								updateHoleData: true,
								extractType: ZRQGetRequestExtractEnum.extractItems,
							});
						}

						showSuccessNotification(MESSAGES.GENERAL.MEMBER.INVITE_SEND);

						dismissZIonModal();
					}
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const __apiErrors = (error.response?.data as { errors: ZGenericObject })
					?.errors;
				const __errors = formatApiRequestErrorForFormikFormField(
					['email', 'role'],
					['email', 'role'],
					__apiErrors
				);

				setErrors(__errors);
			}
			reportCustomError(error);
		}
	};
	// #endregion

	return (
		<Formik
			initialValues={{
				role: workspaceFormRoleEnum.Approver,
				email: '',
			}}
			validate={(values) => {
				const errors: { email?: string } = {};

				validateField('email', values, errors, VALIDATION_RULE.email);

				return errors;
			}}
			onSubmit={async (values, { setErrors }) => {
				const _zStringifyData = zStringify({
					email: values.email,
					role: values.role,
				});

				await formikSubmitHandler(_zStringifyData, setErrors);
			}}
		>
			{({
				values,
				touched,
				errors,
				isValid,
				setFieldValue,
				handleChange,
				handleBlur,
				submitForm,
			}) => {
				return (
					<>
						<ZIonGrid
							className={classNames({
								'mt-1': true,
								'px-3': isLgScale,
								'px-1': !isLgScale,
							})}
						>
							<ZIonRow className='mb-1'>
								<ZIonCol>
									<ZIonTitle
										className={classNames({
											'block font-normal ion-no-padding': true,
										})}
									>
										<ZIonText
											className={classNames({
												'text-lg': isLgScale,
												'text-sm': !isLgScale,
											})}
										>
											Assign role:
										</ZIonText>
										<ZIonText
											className={classNames({
												'ms-2': true,
												'text-xl': isLgScale,
												'text-lg': !isLgScale,
											})}
										>
											{values.role}
										</ZIonText>
									</ZIonTitle>
								</ZIonCol>
							</ZIonRow>

							{/* Fields */}
							<ZIonRow>
								{/* Email fields */}
								<ZIonCol
									sizeXl='6'
									size='6'
									sizeMd='12'
									sizeSm='12'
									sizeXs='12'
								>
									<ZIonInput
										name='email'
										aria-label='type email'
										// labelPlacement='floating'
										// errorText={errors.pageName}
										placeholder='Type email'
										type='email'
										minHeight='2.3rem'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values.email}
										errorText={touched.email ? errors.email : undefined}
										className={classNames({
											'ion-touched': touched.email,
											'ion-invalid': touched.email && errors.email,
											'ion-valid': touched.email && !errors.email,
										})}
									/>
								</ZIonCol>

								{/* <ZIonCol
										sizeXl='6'
										size='6'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<ZIonInput
											// name='pageName'
											label=''
											// labelPlacement='floating'
											// errorText={errors.pageName}
											placeholder='Name (Optional)'
											// onIonChange={handleChange}
											// onIonBlur={handleBlur}
											// value={values.pageName}
											// className={classNames({
											// 	'ion-touched ion-invalid': touched.pageName && errors.pageName,
											// 	'ion-touched ion-valid': touched.pageName && !errors.pageName,
											// })}
											className=''
											style={{
												minHeight: '30px',
												'--padding-start': '7px',
												'--padding-end': '7px',
											}}
										/>
									</ZIonCol> */}

								{/* role fields */}
								<ZIonCol
									sizeXl='6'
									size='6'
									sizeMd='12'
									sizeSm='12'
									sizeXs='12'
								>
									<ZIonButton
										fill='outline'
										size='small'
										color='medium'
										height='2.3rem'
										className={classNames({
											'm-0 flex h-full normal-case ion-align-items-start': true,
										})}
										style={{
											'--border-width': '1px',
										}}
										onClick={(event: unknown) => {
											presentZWorkspaceFormRoleSelectorPopover({
												_event: event as Event,
												_cssClass: 'workspace_form_role_popover_size',
												_dismissOnSelect: false,
												_onDidDismiss: ({ detail }) => {
													if (detail.data) {
														setCompState((oldValues) => ({
															...oldValues,
															_role: detail.data as workspaceFormRoleEnum,
														}));
														setFieldValue(
															'role',
															workspaceFormRoleEnum[
																detail.data as workspaceFormRoleEnum
															] !== undefined
																? workspaceFormRoleEnum[
																		detail.data as workspaceFormRoleEnum
																  ]
																: values.role,
															false
														);
													}
												},
											});
										}}
									>
										<ZIonText className='flex me-auto'>{values.role}</ZIonText>
										<ZIonIcon
											icon={chevronDownOutline}
											className='flex ms-auto'
										/>
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>

							<ZIonRow className='pt-2'>
								{/* Send invite btn */}
								<ZIonCol
									sizeXl='6'
									size='6'
									sizeMd='12'
									sizeSm='12'
									sizeXs='12'
								>
									<ZIonButton
										size='small'
										color='primary'
										fill='solid'
										id='role-popover-index'
										height='2.3rem'
										disabled={!isValid}
										onClick={() => {
											void submitForm();
										}}
										className={classNames({
											'm-0 flex h-full normal-case ion-align-items-start': true,
										})}
										style={{
											'--border-width': '1px',
										}}
									>
										<ZIonIcon icon={sendOutline} className='me-2' />
										Send invite
									</ZIonButton>
								</ZIonCol>

								{/* Create invite link btn */}
								<ZIonCol
									sizeXl='6'
									size='6'
									sizeMd='12'
									sizeSm='12'
									sizeXs='12'
								>
									<ZIonButton
										fill='outline'
										id='role-popover-index'
										size='small'
										color='medium'
										height='2.3rem'
										className={classNames({
											'm-0 flex h-full normal-case ion-align-items-start': true,
										})}
										style={{
											'--border-width': '1px',
										}}
									>
										<ZIonIcon icon={linkOutline} className='me-2' />
										Create invite link
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonGrid>

						<ZIonRow
							className={classNames({
								'mt-3 px-3': true,
								'ion-align-items-center': isLgScale,
								'ion-align-items-start': !isLgScale,
							})}
						>
							{/*  */}
							<ZIonCol
								size='12'
								className='flex my-1 ion-align-items-center ion-justify-content-center'
							>
								<ZIonText className='me-2'>Invite links</ZIonText>
								<ZIonIcon
									icon={helpCircleOutline}
									id='wss-tsm-invite-link-help-btn-tt'
									className='w-5 h-5 cursor-pointer'
								/>
								<ZRTooltip
									anchorSelect='#wss-tsm-invite-link-help-btn-tt'
									place='bottom'
									variant='info'
									className='z-10'
								>
									<div className=''>
										<ZIonText className='block text-lg font-bold'>
											Invite collaborators via link
										</ZIonText>
										<ZIonText className='block mt-3 '>
											User will be able to join the company <br /> by creating
											account and will be assigned <br /> selected permissions
											and membership
										</ZIonText>
									</div>
								</ZRTooltip>
							</ZIonCol>
						</ZIonRow>

						{/* Invitation links */}
						{[1].map((el) => (
							<ZIonRow className='mx-2 ion-align-items-center' key={el}>
								{/* Copy Invite link button */}
								<ZIonCol size='max-content'>
									<ZIonButton
										size='small'
										height='2.3rem'
										className='m-0 w-[2.3rem] overflow-hidden rounded-full ion-no-padding'
										id={`wss-tsm-copy-invite-link-tt-${el}`}
										onClick={() => {
											navigator.clipboard.writeText('https://linkhere.com');

											presentZIonToast('✨ Copied', 'tertiary');
										}}
									>
										<ZIonIcon icon={linkOutline} className='w-6 h-6' />
									</ZIonButton>

									{/* wss-tsm -> workspace-settings-team-settings-modal */}
									<ZRTooltip
										anchorSelect={`#wss-tsm-copy-invite-link-tt-${el}`}
										place='top'
										content='copy invite link'
										variant='info'
									/>
								</ZIonCol>

								{/* Invite link */}
								<ZIonCol
									sizeXl='11'
									sizeLg='11'
									sizeMd='11'
									sizeSm='11'
									sizeXs='11'
									className={classNames({
										'border rounded ps-2 pe-0 h-[2.3rem] overflow-hidden': true,
										'flex ion-align-items-center': isLgScale,
									})}
								>
									<ZIonText className='pt-1 text-sm'>
										http://plnbl.io/ws/Yxugg59eLfj5
									</ZIonText>

									<div className='flex gap-2 ms-auto ion-align-items-center'>
										<ZIonBadge className='text-sm' color='medium'>
											Contributor
										</ZIonBadge>
										{/* <ZIonBadge className='text-sm'>Team</ZIonBadge> */}
									</div>

									<ZIonButton
										fill='clear'
										expand='full'
										height='100%'
										id={`wss-tsm-delete-invite-link-tt-${el}`}
										className='overflow-hidden rounded-r shadow-none ion-no-margin zaions__danger_bg ms-2'
									>
										<ZIonIcon color='light' icon={closeOutline} />
									</ZIonButton>

									{/* wss-tsm -> workspace-settings-team-settings-modal */}
									<ZRTooltip
										anchorSelect={`#wss-tsm-delete-invite-link-tt-${el}`}
										place='top'
										content='delete invite link'
										variant='info'
									/>
								</ZIonCol>
							</ZIonRow>
						))}
					</>
				);
			}}
		</Formik>
	);
};

export default ZInviteTab;
