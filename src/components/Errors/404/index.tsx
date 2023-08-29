/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonCol,
	ZIonContent,
	ZIonImg,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { STORAGE } from '@/utils/helpers';

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
import { Z404Svg } from '@/assets/images';
import { reportCustomError } from '@/utils/customErrorType';
import { errorCodes } from '@/utils/constants/apiConstants';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */
const Z404View: React.FC = () => {
	const [compState, setCompState] = useState<{
		message: string;
	}>({
		message: 'Not found',
	});

	useEffect(() => {
		void (async () => {
			try {
				const _errorData = (await STORAGE.GET(
					LOCALSTORAGE_KEYS.ERROR_DATA
				)) as { message: string; status: number } | null;

				if (_errorData && _errorData.status === errorCodes?.notFound) {
					setCompState((oldValue) => ({
						...oldValue,
						message: _errorData?.message,
					}));
				}
			} catch (error) {
				reportCustomError(error);
			}
		})();
	}, []);

	return (
		<ZIonContent>
			<ZIonRow className='w-full h-full ion-align-items-center ion-justify-content-center'>
				<ZIonCol
					sizeXl='6'
					sizeLg='5'
					sizeMd='6'
					sizeSm='8'
					sizeXs='11'
					className='flex flex-col ion-align-items-center ion-justify-content-center'
				>
					<ZIonImg src={Z404Svg} className='w-[70%] h-[70%]' />

					<ZIonTitle className='mb-4 md:text-5xl'>
						{compState.message}
					</ZIonTitle>
					<ZIonText className='md:text-lg ion-text-center'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, at
						illo natus, quasi maxime delectus nisi, consequuntur suscipit
						inventore accusantium sunt ex. Eius ipsum eum distinctio explicabo
						illo delectus beatae.
					</ZIonText>
				</ZIonCol>
			</ZIonRow>
		</ZIonContent>
	);
};

export default Z404View;
