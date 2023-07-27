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
import { useFormikContext } from 'formik';
import classNames from 'classnames';

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
	ZIonSkeletonText,
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import ZaionsAddUtmTags from '@/components/InPageComponents/ZaionsModals/AddUtmTags';

// Global Constants
import { formatReactSelectOption } from '@/utils/helpers';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

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
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';

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

	const { isSmScale } = useZMediaQueryScale();

	return (
		<>
			{/* Row-1 */}
			<ZIonRow className='pt-1 mt-4 border-bottom zaions__bg_white'>
				{/* Col-1 */}
				<ZIonCol className='flex px-3 py-2 ion-align-items-center'>
					{/* Icon */}
					<ZIonIcon icon={pricetagOutline} size='large' />

					{/* Text */}
					<ZIonText className='font-bold ms-2 ion-no-margin'>
						Add UTMs tags
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>

			{/* Row-2 */}
			<ZIonRow className='zaions__bg_white'>
				{/* Col-1 */}
				<ZIonCol>
					{/* List */}
					<ZIonList className='pb-0 zaions__bg_white'>
						{/* List -> Gird */}
						<ZIonGrid className='pt-0 pb-0'>
							{/* List -> Row */}
							<ZIonRow className='px-2 py-0 pb-0'>
								{/* List -> Row -> Col-1 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='pr-2 h-max'
								>
									{/* utm campaign input */}
									<ZIonInput
										label='UTM Campaign'
										labelPlacement='stacked'
										className='mt-3'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values.UTMTags.utmCampaign}
										name='UTMTags.utmCampaign'
										placeholder='Enter text'
										minHeight='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-2 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className={classNames({
										'h-max': true,
										'mt-2': !isSmScale,
									})}
								>
									{/* utm medium input */}
									<ZIonInput
										label='UTM Medium'
										labelPlacement='stacked'
										className='mt-3'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values.UTMTags.utmMedium}
										name='UTMTags.utmMedium'
										placeholder='Enter text'
										minHeight='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-3 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='pr-2 mt-2 h-max'
								>
									{/* utm source input */}
									<ZIonInput
										label='UTM Source'
										labelPlacement='stacked'
										className='mt-3'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values.UTMTags.utmSource}
										name='UTMTags.utmSource'
										placeholder='Enter text'
										minHeight='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-4 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='mt-2 h-max'
								>
									{/* utm term input */}
									<ZIonInput
										label='UTM Term'
										labelPlacement='stacked'
										className='mt-3'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values.UTMTags.utmTerm}
										name='UTMTags.utmTerm'
										placeholder='Enter text'
										minHeight='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-5 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='pr-2 mt-2 h-max'
								>
									{/* utm content input */}
									<ZIonInput
										label='UTM Content'
										labelPlacement='stacked'
										className='mt-3'
										onIonChange={handleChange}
										onIonBlur={handleBlur}
										value={values.UTMTags.utmContent}
										name='UTMTags.utmContent'
										placeholder='Enter text'
										minHeight='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-6 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='flex mt-2 ion-align-items-center ps-2'
								>
									{/* Add a template button */}
									<ZIonButton
										fill='clear'
										className='mt-5 text-md ion-text-capitalize ion-no-margin ion-no-padding'
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

					{/* select from templates. */}
					<ZaionsRSelect
						className={classNames({
							'pt-4 pb-3 pr-2 ps-4': true,
							'w-[50%]': isSmScale,
							'w-full': !isSmScale,
						})}
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

export const UTMTagTemplatesSkeleton: React.FC = React.memo(() => {
	const { isSmScale } = useZMediaQueryScale();
	return (
		<>
			{/* Row-1 */}
			<ZIonRow className='pt-1 mt-4 border-bottom zaions__bg_white'>
				{/* Col-1 */}
				<ZIonCol className='flex px-3 py-2 ion-align-items-center'>
					{/* Icon */}
					<ZIonIcon icon={pricetagOutline} size='large' />

					{/* Text */}
					<ZIonText className='font-bold ms-2 ion-no-margin'>
						Add UTMs tags
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</ZIonCol>
			</ZIonRow>

			{/* Row-2 */}
			<ZIonRow className='zaions__bg_white'>
				{/* Col-1 */}
				<ZIonCol>
					{/* List */}
					<ZIonList className='pb-0 zaions__bg_white'>
						{/* List -> Gird */}
						<ZIonGrid className='pt-0 pb-0'>
							{/* List -> Row */}
							<ZIonRow className='px-2 py-0 pb-0'>
								{/* List -> Row -> Col-1 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='pr-2 h-max'
								>
									{/* utm campaign input */}
									<ZIonSkeletonText
										animated={true}
										className='mt-3'
										width='100%'
										height='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-2 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='h-max'
								>
									{/* utm medium input */}
									<ZIonSkeletonText
										animated={true}
										className='mt-3'
										width='100%'
										height='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-3 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='pr-2 mt-2 h-max'
								>
									{/* utm source input */}
									<ZIonSkeletonText
										animated={true}
										className='mt-3'
										width='100%'
										height='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-4 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='mt-2 h-max'
								>
									{/* utm term input */}
									<ZIonSkeletonText
										animated={true}
										className='mt-3'
										width='100%'
										height='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-5 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='pr-2 mt-2 h-max'
								>
									{/* utm content input */}
									<ZIonSkeletonText
										animated={true}
										className='mt-3'
										width='100%'
										height='40px'
									/>
								</ZIonCol>

								{/* List -> Row -> Col-6 */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
									className='flex mt-2 ion-align-items-center ps-2'
								>
									{/* Add a template button */}
									<ZIonButton
										fill='clear'
										className='mt-5 text-md ion-text-capitalize ion-no-margin ion-no-padding'
										size='small'
									>
										<ZIonSkeletonText
											animated={true}
											className='mt-3'
											width='140px'
											height='17px'
										/>
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonGrid>
					</ZIonList>

					{/* select from templates. */}
					<ZIonText
						className={classNames({
							'pt-4 pb-3 pr-2 ps-4': true,
							'w-[50%]': isSmScale,
							'w-full': !isSmScale,
						})}
					>
						<ZIonSkeletonText animated={true} width='93%' height='40px' />
					</ZIonText>
				</ZIonCol>
			</ZIonRow>
		</>
	);
});

export default UTMTagTemplates;
