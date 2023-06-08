// Core Imports
import React from 'react';

// Packages Import
import { laptopOutline } from 'ionicons/icons';
import { useRecoilValue } from 'recoil';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonInput,
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States
import { DefaultDomainsState } from '@/ZaionsStore/UserDashboard/CustomDomainState';

// Types
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import { useFormikContext } from 'formik';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import { formatReactSelectOption } from '@/utils/helpers';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles

const DomainName: React.FC = () => {
	const DefaultDomains = useRecoilValue(DefaultDomainsState);
	const { values, handleChange, handleBlur, setFieldValue } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	return (
		<>
			<ZIonRow className='pt-2 mt-4 border-bottom zaions__bg_white'>
				<ZIonCol className='flex px-3 py-3 ion-align-items-center '>
					<ZIonIcon icon={laptopOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Choose domain name
							<ZIonRouterLink
								routerLink={ZaionsRoutes.HomeRoute}
								className='ms-1'
							>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>
			<ZIonRow className='px-3 pt-3 pb-3 zaions__bg_white'>
				<ZIonCol>
					<ZaionsRSelect
						className='mt-1 ion-padding-top'
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
				<ZIonCol>
					{/* <ZIonInputField
						inputFieldProps={{
							className: 'p-0',
							label: 'Customize',
							labelPlacement: 'floating',
							onIonChange: handleChange,
							onIonBlur: handleBlur,
							value: values.shortUrl.url,
						}}
					/> */}
					<ZIonInput
						name='shortUrl.url'
						className='p-0'
						label='Customize'
						labelPlacement='floating'
						onIonChange={handleChange}
						onIonBlur={handleBlur}
						value={values.shortUrl.url}
						fill='outline'
					/>
				</ZIonCol>
			</ZIonRow>
		</>
	);
};

export default DomainName;
