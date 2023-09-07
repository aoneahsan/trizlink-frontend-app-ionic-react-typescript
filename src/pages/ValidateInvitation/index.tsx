/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useState, useEffect } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import routeQueryString from 'qs';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import { useZRQUpdateRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { extractInnerData, STORAGE, zStringify } from '@/utils/helpers';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import { WSTeamMembersInterface } from '@/types/AdminPanel/workspace';
import { AxiosError } from 'axios';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import { ZIonContent, ZIonTitle } from '@/components/ZIonComponents';
import Z401View from '@/components/Errors/401';
import Z400View from '@/components/Errors/400';
import Z500View from '@/components/Errors/500';
import { reportCustomError } from '@/utils/customErrorType';
import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import {
	SignUpTypeEnum,
	UserAccountType,
} from '@/types/UserAccount/index.type';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
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

const ZValidateInvitationPage: React.FC = () => {
	const [compState, setCompState] = useState<{
		shouldFetch: boolean;
		isProcessing: boolean;
		errorCode?: number;
		errorOccurred: boolean;
	}>({
		shouldFetch: false,
		isProcessing: true,
		errorOccurred: false,
	});

	// getting search param from url with the help of 'qs' package.
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	const _token = (routeQSearchParams as { token: string }).token;

	const { mutateAsync: validateAndUpdateInvitation } = useZRQUpdateRequest({
		_url: API_URL_ENUM.validate_invitation_status,
		_showAlertOnError: false,
		_showLoader: false,
		authenticated: false,
	});

	const validator = useCallback(async () => {
		try {
			// const userData = (await STORAGE.GET(
			// 	LOCALSTORAGE_KEYS.USERDATA
			// )) as UserAccountType | null;
			// console.log(userData);

			const __data = zStringify({
				// email: userData?.email,
				token: _token,
			});

			const _response = await validateAndUpdateInvitation({
				requestData: __data,
				itemIds: [],
				urlDynamicParts: [],
			});

			if ((_response as ZLinkMutateApiType<WSTeamMembersInterface>).success) {
				const _data = extractInnerData<{
					user: {
						email: string;
						signupType: string;
					};
				}>(_response, extractInnerDataOptionsEnum.createRequestResponseItem);

				if (_data && _data?.user?.email) {
					setCompState((oldValues) => ({
						...oldValues,
						isProcessing: false,
					}));

					const inviteeData = {
						email: _data?.user?.email,
						token: _token,
						signupType: _data?.user?.signupType,
					};
					void STORAGE.SET(LOCALSTORAGE_KEYS.INVITEE_USER_DATA, inviteeData);

					if (_data?.user?.signupType === SignUpTypeEnum.normal) {
						window.location.replace(ZaionsRoutes.LoginRoute);
					} else if (_data?.user?.signupType === SignUpTypeEnum.invite) {
						window.location.replace(ZaionsRoutes.SetPassword);
					}
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const __apiErrors = error.response;

				setCompState((oldValues) => ({
					...oldValues,
					isProcessing: false,
					errorCode: __apiErrors?.status,
					errorOccurred: true,
				}));
			}
		}
	}, []);

	useEffect(() => {
		if (_token && _token?.trim()?.length > 0) {
			void validator();
		} else {
			setCompState((oldState) => ({
				...oldState,
				errorOccurred: true,
				isProcessing: false,
			}));
		}
	}, [_token]);

	if (compState.isProcessing) {
		return <ZFallbackIonSpinner />;
	} else if (
		_token &&
		compState.errorOccurred &&
		compState.errorCode === 401 &&
		!compState.isProcessing
	) {
		return (
			<ZIonPage>
				<Z401View />
			</ZIonPage>
		);
	} else if (
		_token &&
		compState.errorOccurred &&
		compState.errorCode === 400 &&
		!compState.isProcessing
	) {
		return (
			<ZIonPage>
				<Z400View />
			</ZIonPage>
		);
	} else if (_token && !compState.errorOccurred && !compState.isProcessing) {
		return <ZFallbackIonSpinner />;
	} else {
		return (
			<ZIonPage>
				<Z500View />
			</ZIonPage>
		);
	}
};

export default ZValidateInvitationPage;
