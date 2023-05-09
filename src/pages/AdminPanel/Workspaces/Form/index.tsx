/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonFooter,
	ZIonGrid,
	ZIonIcon,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZWorkspaceFormConnectPagesTab from '@/pages/AdminPanel/Workspaces/Form/ConnectPagesTab';
import ZaionsIonPage from '@/components/ZaionsIonPage';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { validateField } from '@/utils/helpers';
import { VALIDATION_RULE } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormModalTabEnum,
	workspaceFormPermissionEnum,
	workspaceFormRoleEnum,
} from '@/types/AdminPanel/workspace';
import { arrowForward } from 'ionicons/icons';
import ZWorkspaceFormInviteClientsTab from './InviteClientsTab';
import ZWorkspaceFormDetailTab from './DetailTab';
import classNames from 'classnames';

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

const ZWorkspaceForm: React.FC = () => {
	return (
		<ZaionsIonPage pageTitle='Zaions Workspace Form Page'>
			<Formik
				initialValues={{
					workspaceName: 'MTI',
					workspaceTimezone: '',
					CurrentTab: workspaceFormModalTabEnum.workspaceDetailForm,
					clients: [
						{
							email: 'test@zaions.com',
							role: workspaceFormRoleEnum.Approver,
							permission: workspaceFormPermissionEnum.team,
						},
					],
				}}
				validate={(values) => {
					const errors: {
						workspaceName?: string;
					} = {};

					validateField(
						'workspaceName',
						values,
						errors,
						VALIDATION_RULE.string
					);

					return errors;
				}}
				onSubmit={() => {}}
			>
				{({ values, isValid, setFieldValue }) => {
					return (
						<>
							<ZIonContent>
								<ZIonGrid className='pb-2 mx-0'>
									{/*  */}
									<ZIonRow className='ion-justify-content-center pt-5'>
										<ZIonCol className='ion-text-center' size='11'>
											{/* Tab Title */}
											<ZIonText className='text-4xl d-block'>
												{values.CurrentTab ===
												workspaceFormModalTabEnum.workspaceDetailForm
													? 'Create a workspace'
													: values.CurrentTab ===
													  workspaceFormModalTabEnum.inviteClients
													? 'Invite your clients'
													: values.CurrentTab ===
													  workspaceFormModalTabEnum.connectPages
													? `Connect ${values.workspaceName}'s pages`
													: ''}
											</ZIonText>

											{/* Tab sub title */}
											<ZIonText className='text-muted d-block mt-3'>
												{values.CurrentTab ===
												workspaceFormModalTabEnum.workspaceDetailForm
													? 'A workspace is a group of channels and collaborators, a place where you can organize your campaigns, workflows and assets.'
													: values.CurrentTab ===
													  workspaceFormModalTabEnum.inviteClients
													? 'Working with a client? Invite them in the workspace so they can approve and leave feedback on content.'
													: values.CurrentTab ===
													  workspaceFormModalTabEnum.connectPages
													? 'Add all your brands’ content channels. You can always add more later.'
													: ''}
											</ZIonText>
										</ZIonCol>

										{/* tab's content */}
										{values.CurrentTab ===
										workspaceFormModalTabEnum.workspaceDetailForm ? (
											<ZWorkspaceFormDetailTab />
										) : values.CurrentTab ===
										  workspaceFormModalTabEnum.inviteClients ? (
											<ZWorkspaceFormInviteClientsTab />
										) : values.CurrentTab ===
										  workspaceFormModalTabEnum.connectPages ? (
											<ZWorkspaceFormConnectPagesTab />
										) : (
											''
										)}
									</ZIonRow>
								</ZIonGrid>
							</ZIonContent>

							{/*  */}
							<ZIonFooter
								className='flex align-items-center py-3'
								collapse='fade'
							>
								<div className='w-4/12 mx-auto'>
									<ZIonRow
										className={classNames({
											'ion-justify-content-center':
												values.CurrentTab ===
												workspaceFormModalTabEnum.workspaceDetailForm,
										})}
									>
										{values.CurrentTab ===
										workspaceFormModalTabEnum.workspaceDetailForm ? (
											<ZIonCol size='6'>
												{/* Next button */}
												<ZIonButton
													expand='block'
													className='text-transform-initial'
													disabled={!isValid}
													onClick={() => {
														setFieldValue(
															'CurrentTab',
															workspaceFormModalTabEnum.inviteClients,
															false
														);
													}}
												>
													Next <ZIonIcon className='ms-2' icon={arrowForward} />
												</ZIonButton>
											</ZIonCol>
										) : values.CurrentTab ===
												workspaceFormModalTabEnum.inviteClients ||
										  values.CurrentTab ===
												workspaceFormModalTabEnum.connectPages ? (
											<>
												{/* Go Back button */}
												<ZIonCol size='6'>
													<ZIonButton
														expand='block'
														fill='outline'
														className='text-transform-initial'
														onClick={() => {
															switch (values.CurrentTab) {
																case workspaceFormModalTabEnum.inviteClients:
																	setFieldValue(
																		'CurrentTab',
																		workspaceFormModalTabEnum.workspaceDetailForm,
																		false
																	);
																	break;

																case workspaceFormModalTabEnum.connectPages:
																	setFieldValue(
																		'CurrentTab',
																		workspaceFormModalTabEnum.inviteClients,
																		false
																	);
																	break;
															}
														}}
													>
														Go Back
													</ZIonButton>
												</ZIonCol>

												{/* Invite/Connect Later button */}
												<ZIonCol size='6'>
													<ZIonButton
														expand='block'
														className='text-transform-initial'
														onClick={() => {
															switch (values.CurrentTab) {
																case workspaceFormModalTabEnum.inviteClients:
																	setFieldValue(
																		'CurrentTab',
																		workspaceFormModalTabEnum.connectPages,
																		false
																	);
																	break;

																// case workspaceFormModalTabEnum.connectPages:
																// 	setFieldValue(
																// 		'CurrentTab',
																// 		workspaceFormModalTabEnum.inviteClients,
																// 		false
																// 	);
																// 	break;
															}
														}}
													>
														{values.CurrentTab ===
														workspaceFormModalTabEnum.inviteClients
															? 'Invite'
															: values.CurrentTab ===
															  workspaceFormModalTabEnum.connectPages
															? 'Connect'
															: ''}{' '}
														Later
													</ZIonButton>
												</ZIonCol>
											</>
										) : (
											''
										)}
									</ZIonRow>
								</div>
							</ZIonFooter>
						</>
					);
				}}
			</Formik>
		</ZaionsIonPage>
	);
};

export default ZWorkspaceForm;
