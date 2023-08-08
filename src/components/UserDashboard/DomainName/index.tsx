// Core Imports
import React, { useEffect } from 'react';

// Packages Import
import { checkmarkOutline, laptopOutline } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';
import { useFormikContext } from 'formik';
import classNames from 'classnames';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonInput,
	ZIonSkeletonText,
	ZIonButton,
	ZIonSelect,
	ZIonSelectOption,
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';

// Global Constants
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { formatReactSelectOption } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images

// Recoil States
import { DefaultDomainsState } from '@/ZaionsStore/UserDashboard/CustomDomainState';

// Types
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import { useParams } from 'react-router';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { reportCustomError } from '@/utils/customErrorType';
import { useZIonToast } from '@/ZaionsHooks/zionic-hooks';

// Styles

const DomainName: React.FC<{ showSkeleton?: boolean }> = ({
	showSkeleton = false,
}) => {
	const DefaultDomains = useRecoilValue(DefaultDomainsState);
	const { initialValues, values, touched, errors, handleChange, handleBlur } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const { isSmScale } = useZMediaQueryScale();
	const { presentZIonToast } = useZIonToast();

	// getting workspace ids from url with the help of useParams.
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	const {
		data: zIsPathAvailable,
		refetch: refetchZIsPathAvailable,
		error,
	} = useZRQGetRequest<{ isAvailable: boolean; message: string }>({
		_url: API_URL_ENUM.shortLinks_is_path_available,
		_key: [
			CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHORT_LINKS.IS_PATH_AVAILABLE,
			workspaceId,
		],
		_shouldFetchWhenIdPassed:
			values?.shortUrlPath &&
			values?.shortUrlPath?.trim()?.length > 0 &&
			initialValues?.shortUrlPath !== values?.shortUrlPath
				? false
				: true,
		_itemsIds: [workspaceId, values?.shortUrlPath || ''],
		_urlDynamicParts: [
			CONSTANTS.RouteParams.workspace.workspaceId,
			CONSTANTS.RouteParams.shortLink.path,
		],
		_extractType: ZRQGetRequestExtractEnum.extractItem,
		_showLoader: false,
	});

	console.log({ error });

	if (showSkeleton) {
		return <DomainNameSkeleton />;
	}

	return (
		<>
			{/* Row-1 */}
			<ZIonRow className='pt-2 mt-4 border-bottom zaions__bg_white'>
				{/* Col-1 */}
				<ZIonCol className='flex px-3 py-1 ion-align-items-center'>
					{/* Icon */}
					<ZIonIcon icon={laptopOutline} size='large' />

					{/* Text */}
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Choose domain name
						<ZIonRouterLink
							routerLink={ZaionsRoutes.HomeRoute}
							className='ms-1'
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>

			{/* Row-2 */}
			<ZIonRow className='px-3 pt-2 pb-3 zaions__bg_white'>
				{/* Col-1 */}
				<ZIonCol
					className={classNames({
						'pr-2': isSmScale,
						'mb-4': !isSmScale,
					})}
					sizeXl='6'
					sizeLg='6'
					sizeMd='6'
					sizeSm='6'
					sizeXs='12'
				>
					{/* Select */}
					{/* <ZaionsRSelect
						options={DefaultDomains?.map((el) => {
							return { value: el.id, label: el.name };
						})}
						name='shortUrlDomain'
						onChange={(_value) => {
							setFieldValue(
								'shortUrlDomain',
								(_value as ZaionsRSelectOptions)?.value,
								false
							);
						}}
						value={
							formatReactSelectOption(
								values?.shortUrlDomain as string,
								DefaultDomains as ZGenericObject[],
								'id',
								'name'
							) || []
						}
					/> */}
					<ZIonSelect
						name='shortUrlDomain'
						label='Customize'
						labelPlacement='stacked'
						fill='outline'
						minHeight='2.3rem'
						interface='popover'
						onIonChange={handleChange}
						onIonBlur={handleBlur}
						value={values?.shortUrlDomain}
					>
						{DefaultDomains?.map((el, index) => {
							return (
								<ZIonSelectOption key={index} value={el.id}>
									{el.name}
								</ZIonSelectOption>
							);
						})}
					</ZIonSelect>
				</ZIonCol>

				{/* Col-2 */}
				<ZIonCol
					sizeXl='6'
					sizeLg='6'
					sizeMd='6'
					sizeSm='6'
					sizeXs='12'
					className='flex'
				>
					{/* Customize input */}
					<ZIonInput
						name='shortUrlPath'
						label='Customize'
						labelPlacement='stacked'
						fill='outline'
						minHeight='2.3rem'
						onIonBlur={handleBlur}
						value={values?.shortUrlPath}
						counter={true}
						maxlength={6}
						onIonChange={handleChange}
						errorText={touched?.shortUrlPath ? errors?.shortUrlPath : undefined}
						className={classNames({
							'p-0': true,
							'ion-touched': touched?.shortUrlPath,
							'ion-valid':
								touched?.shortUrlPath &&
								values.shortUrlPath &&
								values.shortUrlPath?.trim().length > 0 &&
								!errors?.shortUrlPath,
							'ion-invalid': touched?.shortUrlPath && errors?.shortUrlPath,
						})}
					/>

					{values?.shortUrlPath &&
						values?.shortUrlPath?.trim()?.length > 0 &&
						initialValues?.shortUrlPath !== values?.shortUrlPath && (
							<ZIonButton
								className='ion-no-margin ms-1'
								height='2.2rem'
								id='z-shortlink-check-domain-url-path-available-tooltip'
								disabled={errors?.shortUrlPath?.trim() ? true : false}
								onClick={async () => {
									try {
										if (
											values?.shortUrlPath &&
											values?.shortUrlPath?.trim()?.length > 0 &&
											initialValues?.shortUrlPath !== values?.shortUrlPath
										) {
											await refetchZIsPathAvailable();

											presentZIonToast(zIsPathAvailable?.message, 'warning');
										}
									} catch (error) {
										reportCustomError(error);
									}
								}}
							>
								<ZIonIcon icon={checkmarkOutline} />
							</ZIonButton>
						)}

					<ZRTooltip
						anchorSelect='#z-shortlink-check-domain-url-path-available-tooltip'
						place='top'
						content='Check'
					/>
				</ZIonCol>
			</ZIonRow>
		</>
	);
};

// Skeleton
export const DomainNameSkeleton: React.FC = React.memo(() => {
	return (
		<>
			{/* Row-1 */}
			<ZIonRow className='pt-2 mt-4 border-bottom zaions__bg_white'>
				{/* Col-1 */}
				<ZIonCol className='flex px-3 py-1 ion-align-items-center'>
					{/* Icon */}
					<ZIonIcon icon={laptopOutline} size='large' />

					{/* Text */}
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Choose domain name
						<ZIonRouterLink
							routerLink={ZaionsRoutes.HomeRoute}
							className='ms-1'
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>

			{/* Row-2 */}
			<ZIonRow className='px-3 pt-2 pb-3 zaions__bg_white'>
				{/* Col-1 */}
				<ZIonCol className='pr-2'>
					{/* Select */}
					<ZIonSkeletonText className='mt-3' width='100%' height='40px' />
				</ZIonCol>

				{/* Col-2 */}
				<ZIonCol>
					{/* Customize input */}
					<ZIonSkeletonText
						className='mt-3'
						width='100%'
						height='40px'
						animated={true}
					/>
				</ZIonCol>
			</ZIonRow>
		</>
	);
});

export default DomainName;
