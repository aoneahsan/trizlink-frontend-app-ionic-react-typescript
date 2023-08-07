// Core Imports
import React from 'react';

// Packages Import
import { laptopOutline } from 'ionicons/icons';
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

// Styles

const DomainName: React.FC<{ showSkeleton?: boolean }> = ({
	showSkeleton = false,
}) => {
	const DefaultDomains = useRecoilValue(DefaultDomainsState);
	const { values, handleChange, handleBlur, setFieldValue } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const { isSmScale } = useZMediaQueryScale();

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
					<ZaionsRSelect
						options={DefaultDomains?.map((el) => {
							return { value: el.id, label: el.name };
						})}
						name='shortUrl.domain'
						onChange={(_value) => {
							setFieldValue(
								'shortUrl.domain',
								(_value as ZaionsRSelectOptions)?.value,
								false
							);
						}}
						value={
							formatReactSelectOption(
								values?.shortUrl?.domain as string,
								DefaultDomains as ZGenericObject[],
								'id',
								'name'
							) || []
						}
					/>
				</ZIonCol>

				{/* Col-2 */}
				<ZIonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='6' sizeXs='12'>
					{/* Customize input */}
					<ZIonInput
						name='shortUrl.url'
						className='p-0'
						label='Customize'
						labelPlacement='stacked'
						onIonChange={handleChange}
						onIonBlur={handleBlur}
						value={values.shortUrl.url}
						fill='outline'
						minHeight='40px'
					/>
				</ZIonCol>
			</ZIonRow>
		</>
	);
};

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
