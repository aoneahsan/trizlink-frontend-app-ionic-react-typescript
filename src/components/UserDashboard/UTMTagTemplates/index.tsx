// Core Imports
import React from 'react';

// Packages Import
import {
	documentTextOutline,
	laptopOutline,
	locationOutline,
	megaphoneOutline,
	optionsOutline,
	pricetagOutline,
} from 'ionicons/icons';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonItem,
	ZIonInput,
	ZIonRow,
	ZIonList,
	ZIonGrid,
} from '@/components/ZIonComponents';

// Global Constants
import { formatReactSelectOption } from '@/utils/helpers';

// Images

// Recoil States

// Types
import { ZIonButton } from '@/components/ZIonComponents';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import {
	UTMTagTemplateType,
	ZaionsShortUrlOptionFieldsValuesInterface,
} from '@/types/AdminPanel/linksType';
import { useFormikContext } from 'formik';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsAddUtmTags from '@/components/InPageComponents/ZaionsModals/AddUtmTags';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Styles

const UTMTagTemplates: React.FC = () => {
	const { data: _UTMTagsData } = useZRQGetRequest<UTMTagTemplateType[]>({
		_url: API_URL_ENUM.userAccountUtmTags_create_list,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.UTM_TAGS.MAIN],
	});

	const { presentZIonModal: presentUtmTagsModal } =
		useZIonModal(ZaionsAddUtmTags);

	const { values, setFieldValue, handleBlur, handleChange } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const selectFromTemplate = (_selectedTemplateId: string) => {
		const __selectedTemp =
			_UTMTagsData &&
			_UTMTagsData.length &&
			_UTMTagsData.find(({ id }) => id === _selectedTemplateId);

		if (__selectedTemp) {
			const __selectedUtmTagInfo = {
				templateId: __selectedTemp.id,
				utmCampaign: __selectedTemp.utmCampaign,
				utmContent: __selectedTemp.utmContent,
				utmMedium: __selectedTemp.utmMedium,
				utmSource: __selectedTemp.utmSource,
				utmTerm: __selectedTemp.utmTerm,
			};
			setFieldValue('UTMTags', __selectedUtmTagInfo, true);
		}
	};

	return (
		<>
			<ZIonRow className='border-bottom zaions__bg_white mt-4'>
				<ZIonCol className='px-3 py-3 flex ion-align-items-center'>
					<ZIonIcon icon={pricetagOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Add UTMs tags{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>

			<ZIonRow className='zaions__bg_white'>
				<ZIonCol>
					<ZIonList className='zaions__bg_white pb-0'>
						<ZIonGrid className='pb-0'>
							<ZIonRow className='pb-0'>
								<ZIonCol size='6'>
									<ZIonInputField
										inputFieldProps={{
											label: 'UTM Campaign',
											labelPlacement: 'floating',
											className: 'mt-3',
											onIonChange: handleChange,
											onIonBlur: handleBlur,
											value: values.UTMTags.utmCampaign,
											name: 'UTMTags.utmCampaign',
											placeholder: 'Enter text',
											color: 'dark',
										}}
									/>
								</ZIonCol>

								<ZIonCol size='6'>
									<ZIonInputField
										inputFieldProps={{
											label: 'UTM Medium',
											labelPlacement: 'floating',
											className: 'mt-3',
											onIonChange: handleChange,
											onIonBlur: handleBlur,
											value: values.UTMTags.utmMedium,
											name: 'UTMTags.utmMedium',
											placeholder: 'Enter text',
											color: 'dark',
										}}
									/>
								</ZIonCol>

								<ZIonCol size='6'>
									<ZIonInputField
										inputFieldProps={{
											label: 'UTM Source',
											labelPlacement: 'floating',
											className: 'mt-3',
											onIonChange: handleChange,
											onIonBlur: handleBlur,
											value: values.UTMTags.utmSource,
											name: 'UTMTags.utmSource',
											placeholder: 'Enter text',
											color: 'dark',
										}}
									/>
								</ZIonCol>

								<ZIonCol size='6'>
									<ZIonInputField
										inputFieldProps={{
											label: 'UTM Term',
											labelPlacement: 'floating',
											className: 'mt-3',
											onIonChange: handleChange,
											onIonBlur: handleBlur,
											value: values.UTMTags.utmTerm,
											name: 'UTMTags.utmTerm',
											placeholder: 'Enter text',
											color: 'dark',
										}}
									/>
								</ZIonCol>

								<ZIonCol size='6'>
									<ZIonInputField
										inputFieldProps={{
											label: 'UTM Content',
											labelPlacement: 'floating',
											className: 'mt-3',
											onIonChange: handleChange,
											onIonBlur: handleBlur,
											value: values.UTMTags.utmContent,
											name: 'UTMTags.utmContent',
											placeholder: 'Enter text',
											color: 'dark',
										}}
									/>
								</ZIonCol>

								<ZIonCol size='6' className='flex ion-align-items-center'>
									<ZIonButton
										fill='clear'
										className='ion-text-capitalize ion-no-margin ion-margin-start mt-5'
										size='small'
										onClick={() => {
											presentUtmTagsModal({
												_cssClass: 'utm-tags-modal-size',
											});
										}}
									>
										Add a new template
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonGrid>
					</ZIonList>
					<ZaionsRSelect
						className='pt-4 pb-3 zaions__w50 ps-2'
						options={
							_UTMTagsData?.map((el) => {
								return { value: el.id, label: el.templateName };
							}) as ZaionsRSelectOptions[]
						}
						name='UTMTags.templateId'
						onChange={(_value) => {
							if (_value as ZaionsRSelectOptions) {
								selectFromTemplate(
									(_value as ZaionsRSelectOptions)?.value as string
								);
							}
						}}
						value={
							formatReactSelectOption(
								values?.UTMTags?.templateId as string,
								_UTMTagsData as ZGenericObject[],
								'id',
								'templateName'
							) || []
						}
					/>
				</ZIonCol>
			</ZIonRow>
		</>
	);
};

export default UTMTagTemplates;
