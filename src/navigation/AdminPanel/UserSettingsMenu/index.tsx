/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonAccordion,
	ZIonAccordionGroup,
	ZIonButton,
	ZIonContent,
	ZIonHeader,
	ZIonIcon,
	ZIonItem,
	ZIonMenu,
	ZIonMenuToggle,
	ZIonReorder,
	ZIonReorderGroup,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { ShortLinksTableColumns } from '@/utils/constants';
import { Formik } from 'formik';
import { ItemReorderEventDetail } from '@ionic/react';
import {
	useZGetRQCacheData,
	useZRQCreateRequest,
	useZRQGetRequest,
	useZRQUpdateRequest,
	useZUpdateRQCacheData,
} from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { extractInnerData, zStringify } from '@/utils/helpers';
import {
	ZUserSettingInterface,
	ZUserSettingTypeEnum,
} from '@/types/AdminPanel/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { reportCustomError } from '@/utils/customErrorType';

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

const ZUserSettingsMenu: React.FC = () => {
	// #region compState.
	const [compState, setCompState] = useState<{
		shortLinkColumn?: {
			name: string;
			isVisible: boolean;
			orderNumber: number;
		}[];
	}>();
	// #endregion

	// #region custom hooks.
	const { getRQCDataHandler } = useZGetRQCacheData();
	const { updateRQCDataHandler } = useZUpdateRQCacheData();
	// #endregion

	// #region APIs.
	//
	const { mutateAsync: updateUserSettingsAsyncMutate } = useZRQUpdateRequest({
		_url: API_URL_ENUM.user_setting_delete_update,
	});

	const { mutateAsync: createUserSettingsAsyncMutate } = useZRQCreateRequest({
		_url: API_URL_ENUM.user_setting_list_create,
	});

	const { data: getUserSetting, isFetching: isUserSettingFetching } =
		useZRQGetRequest<ZUserSettingInterface>({
			_url: API_URL_ENUM.user_setting_delete_update,
			_key: [
				CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
				ZUserSettingTypeEnum.shortLinkListPageTable,
			],
			_itemsIds: [ZUserSettingTypeEnum.shortLinkListPageTable],
			_urlDynamicParts: [CONSTANTS.RouteParams.user.setting.type],
			_extractType: ZRQGetRequestExtractEnum.extractItem,
		});

	// #endregion

	useEffect(() => {
		try {
			if (getUserSetting?.type && getUserSetting?.settings?.shortLinkColumn) {
				setCompState((_oldValue) => ({
					..._oldValue,
					shortLinkColumn: getUserSetting?.settings?.shortLinkColumn,
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [getUserSetting]);

	// #region Functions.
	const handleCarouselCardReorder = (
		event: CustomEvent<ItemReorderEventDetail>
	) => {
		// The `from` and `to` properties contain the index of the item
		// when the drag started and ended, respectively

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		// eslint-disable-next-line
		event.detail.complete();
	};

	const FormikSubmitHandler = async (_data: string) => {
		try {
			if (_data) {
				let __response;

				if (
					getUserSetting?.type === ZUserSettingTypeEnum.shortLinkListPageTable
				) {
					__response = await updateUserSettingsAsyncMutate({
						itemIds: [ZUserSettingTypeEnum.shortLinkListPageTable],
						urlDynamicParts: [CONSTANTS.RouteParams.user.setting.type],
						requestData: _data,
					});
				} else {
					__response = await createUserSettingsAsyncMutate(_data);
				}

				if (__response) {
					// extract Data from _response.
					const __data = extractInnerData<ZUserSettingInterface>(
						__response,
						extractInnerDataOptionsEnum.createRequestResponseItem
					);

					// if we have data then show success message.
					if (__data && __data.id) {
						await updateRQCDataHandler<ZUserSettingInterface | undefined>({
							key: [
								CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.GET,
								ZUserSettingTypeEnum.shortLinkListPageTable,
							],
							data: __data,
							id: '',
							extractType: ZRQGetRequestExtractEnum.extractItem,
							updateHoleData: true,
						});
					}
				}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};
	// #endregion
	console.log(getUserSetting);
	return (
		<ZIonMenu
			contentId={CONSTANTS.MENU_IDS.ADMIN_PANEL_CONTENT_ID}
			side='end'
			menuId={CONSTANTS.MENU_IDS.USER_SETTINGS_MENU_ID}
			style={{
				'--width': '27%',
			}}
		>
			{/* Header */}
			<ZIonHeader className='flex px-3 border-b shadow-none ion-align-items-center ion-padding ion-justify-content-between'>
				<ZIonTitle className='block text-xl font-bold ion-no-padding'>
					Filter & sort
				</ZIonTitle>

				<ZIonMenuToggle>
					<ZIonIcon icon={closeOutline} className='w-6 h-6 cursor-pointer' />
				</ZIonMenuToggle>
			</ZIonHeader>

			{/* Content */}
			<ZIonContent className='ion-padding-top'>
				{/* Columns visibility accordion */}
				<Formik
					initialValues={{
						columns: compState?.shortLinkColumn || ShortLinksTableColumns,
					}}
					enableReinitialize={true}
					onSubmit={async (values) => {
						try {
							const zStringifyData = zStringify({
								type: ZUserSettingTypeEnum.shortLinkListPageTable,
								settings: zStringify({
									shortLinkColumn: values.columns,
								}),
							});

							await FormikSubmitHandler(zStringifyData);
						} catch (error) {
							reportCustomError(error);
						}
					}}
				>
					{({ values, setFieldValue, submitForm }) => {
						return (
							<>
								<ZIonAccordionGroup>
									<ZIonAccordion>
										<ZIonItem
											minHeight='40px'
											slot='header'
											lines='none'
											className='px-1 overflow-hidden rounded-lg cursor-pointer ion-activatable'
										>
											<ZIonText
												className='text-sm ion-no-margin'
												color='medium'
											>
												Columns visibility & reorder:
											</ZIonText>
										</ZIonItem>
										<div
											className='px-2 py-2 mx-1 zaions__light_bg'
											slot='content'
										>
											<ZIonReorderGroup
												onIonItemReorder={handleCarouselCardReorder}
												disabled={false}
											>
												{values.columns.map((el, index) => {
													return (
														<ZIonItem
															key={index}
															lines='full'
															minHeight='2rem'
															color='light'
															style={{
																'--padding-bottom': '.1rem',
																'--padding-top': '.1rem',
																'--padding-start': '2px',
															}}
														>
															<ZIonReorder
																slot='start'
																className='me-3'
															></ZIonReorder>
															<ZIonText className='text-sm font-bold'>
																{el.name}
															</ZIonText>

															<ZIonText slot='end'>
																<ZRCSwitch
																	checked={el.isVisible}
																	onChange={(_value) => {
																		setFieldValue(
																			`columns.${index}.isVisible`,
																			_value,
																			false
																		);
																	}}
																/>
															</ZIonText>
														</ZIonItem>
													);
												})}
											</ZIonReorderGroup>
										</div>
									</ZIonAccordion>
								</ZIonAccordionGroup>
								<ZIonButton
									onClick={() => {
										void submitForm();
									}}
								>
									Save
								</ZIonButton>
							</>
						);
					}}
				</Formik>
			</ZIonContent>
		</ZIonMenu>
	);
};

export default ZUserSettingsMenu;
