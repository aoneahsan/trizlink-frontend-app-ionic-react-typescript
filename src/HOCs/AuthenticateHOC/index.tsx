import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { STORAGE, zAxiosApiRequest } from '@/utils/helpers';
import { ZaionsUserAccountRState } from '@/ZaionsStore/UserAccount/index.recoil';
import React, { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';

interface AuthenticateHOCPropsType {
	children: ReactNode;
}

const AuthenticateHOC: React.FC<AuthenticateHOCPropsType> = (props) => {
	// const
	// registering data

	const setUserAccountState = useSetRecoilState(ZaionsUserAccountRState);

	React.useEffect(() => {
		void (async () => {
			try {
				// check api result
				const ___response = await zAxiosApiRequest({
					_url: API_URL_ENUM.verifyAuthenticationStatus,
					_method: 'post',
				});
			} catch (error: any) {
				// Checking if Unauthorized.
				if (error.response && error.response.status === 401) {
					// Clear storage
					STORAGE.CLEAR(LOCALSTORAGE_KEYS.USERDATA);
					STORAGE.CLEAR(LOCALSTORAGE_KEYS.AUTHTOKEN);

					// Clear recoil state
					setUserAccountState(null);
				}
			}
		})();
	}, []);
	return <>{props.children}</>;
};

export default AuthenticateHOC;
