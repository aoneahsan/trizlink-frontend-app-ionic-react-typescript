import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { STORAGE, zAxiosApiRequest } from '@/utils/helpers';
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import React, { ReactNode } from 'react';
import { useResetRecoilState } from 'recoil';

interface AuthenticateHOCPropsType {
	children: ReactNode;
}

const AuthenticateHOC: React.FC<AuthenticateHOCPropsType> = (props) => {
	// const
	// registering data
	const resetUserAccountState = useResetRecoilState(
		ZaionsUserAccountRStateAtom
	);

	React.useEffect(() => {
		void (() => {
			try {
				// Checking if there is some data in local storage, if there is some data then, run verifyAuthenticationStatus api to check it is valid or not.
				Promise.all([
					STORAGE.GET(LOCALSTORAGE_KEYS.AUTHTOKEN),
					STORAGE.GET(LOCALSTORAGE_KEYS.USERDATA),
				]).then(async ([authToken, userData]) => {
					if (authToken && userData) {
						// check api result
						await zAxiosApiRequest({
							_url: API_URL_ENUM.verifyAuthenticationStatus,
							_method: 'post',
						});
					} else {
						return null;
					}
				});
			} catch (error: any) {
				// Checking if Unauthorized.
				if (error.response && error.response.status === 401) {
					// Clear storage
					STORAGE.CLEAR(LOCALSTORAGE_KEYS.USERDATA);
					STORAGE.CLEAR(LOCALSTORAGE_KEYS.AUTHTOKEN);

					// Clear recoil state
					resetUserAccountState();
				}
			}
		})();
	}, []);
	return <>{props.children}</>;
};

export default AuthenticateHOC;
