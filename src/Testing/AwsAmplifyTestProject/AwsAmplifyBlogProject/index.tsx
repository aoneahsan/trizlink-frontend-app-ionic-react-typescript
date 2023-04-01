// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Core Imports
// import React, { useEffect } from 'react';

// Packages Imports
// import { Auth } from 'aws-amplify';

// Custom Files Imports
// import { AwsAmplifyBlogProjectAuthData } from './awsAmplifyBlogProject.type';
// import { useRecoilState } from 'recoil';
// import { AwsAmplifyBlogProjectAuthRState } from './awsAmplifyBlogProject.recoil';
// import AwsAmplifyBlogProjectAuthenticatedPage from './AwsAmplifyBlogProjectAuthenticatedPage';
// import AwsAmplifyBlogProjectGuestPage from './AwsAmplifyBlogProjectGuestPage';
// import AABPConstants from './awsAmplifyBlogProject.constants';
// import { useZIonAlert, useZIonLoading } from 'ZaionsHooks/zionic-hooks';

// const AwsAmplifyBlogProject: React.FC = () => {
// 	const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
// 	const { presentZIonAlert } = useZIonAlert()

// 	const [aabpAuthInfo, setAABPAuthInfo] =
// 		useRecoilState<AwsAmplifyBlogProjectAuthData | null>(
// 			AwsAmplifyBlogProjectAuthRState
// 		);

// 	useEffect(() => {
// 		if (!aabpAuthInfo?.id) {
// 			const fetchAndSetData = async () => {
// 				console.log({ message: 'fetchAndSetData called.' });
// 				let errorOccurred;
// 				try {
// 					await presentZIonLoader('Checking auth info...');
// 					const _authInfo =
// 						(await Auth.currentUserInfo()) as AwsAmplifyBlogProjectAuthData;

// 					console.log({
// 						message: 'AwsAmplifyBlogProject - fetchAndSetData - success',
// 						_authInfo,
// 					});

// 					if (_authInfo.attributes && _authInfo.attributes?.email) {
// 						await dismissZIonLoader();
// 						setAABPAuthInfo(_authInfo);
// 					}
// 				} catch (error) {
// 					errorOccurred = error as string;

// 					if (error === AABPConstants.MESSAGES.AMPLIFY_ERRORS.UNAUTHENTICATED) {
// 						setAABPAuthInfo(null);
// 					}
// 				}

// 				await dismissZIonLoader();

// 				if (errorOccurred) {
// 					await presentZIonAlert({
// 						header: 'Error Occured',
// 						subHeader: 'Error while checking auth data.',
// 						message: errorOccurred,
// 						buttons: [
// 							{
// 								text: 'Okay',
// 							},
// 						],
// 					});
// 				}
// 			};

// 			if (!aabpAuthInfo || !aabpAuthInfo.id) {
// 				fetchAndSetData()
// 					.then()
// 					.catch((err) => {
// 						console.error({
// 							message: 'AwsAmplifyBlogProject - fetchAndSetData - failed',
// 							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// 							err,
// 						});
// 					});
// 			}
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	return (
// 		<>
// 			{aabpAuthInfo ? (
// 				<AwsAmplifyBlogProjectAuthenticatedPage />
// 			) : (
// 				<AwsAmplifyBlogProjectGuestPage />
// 			)}
// 		</>
// 	);
// };

// export default AwsAmplifyBlogProject;
export {};
