/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import dayjs from 'dayjs';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Formik } from 'formik';
import { filterOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
	ZIonButton,
	ZIonCheckbox,
	ZIonChip,
	ZIonDatetimeButton,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonText,
} from '@/components/ZIonComponents';
import ZRScrollbars from '@/components/CustomComponents/ZRScrollBar';
import ZRCheckbox from '@/components/CustomComponents/ZRCheckbox';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { TimeFilterEnum } from '@/types/AdminPanel/linksType';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
	ShortLinksFieldsDataRStateSelector,
	ShortLinksFilterOptionsRStateAtom,
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkState.recoil';

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
 * About: (Contains all the short link filters popovers.)
 * @type {*}
 * */

/**
 * Functional Component
 * About: (Time filter popover of shortlink)
 * @type {*}
 * */
export const ShortLinksTimeRangeFilterPopover: React.FC = () => {
	const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
		ShortLinksFilterOptionsRStateAtom
	);

	const timeRangeFilterSubmission = (
		_value: TimeFilterEnum,
		_startedAt?: string,
		_endAt?: string
	) => {
		try {
			setShortLinksFilterOptions((oldValues) => ({
				...oldValues,
				timeFilter: {
					...oldValues.timeFilter,
					daysToSubtract: _value,
					startedAt: _startedAt ? _startedAt : oldValues.timeFilter.startedAt,
					endAt: _endAt ? _endAt : oldValues.timeFilter.startedAt,
				},
			}));
		} catch (error) {
			reportCustomError(error);
		}
	};

	return (
		<div className='flex w-full h-full overflow-hidden'>
			<ZCustomScrollable
				scrollY={true}
				scrollX={true}
				className='flex w-full h-full'
			>
				<div className='ion-padding-horizontal mx-auto'>
					<ZIonButton
						color='secondary'
						expand='block'
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.allTime)}
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.allTime
								? 'solid'
								: 'outline'
						}
					>
						All Time
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.today)}
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.today
								? 'solid'
								: 'outline'
						}
					>
						Today
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						className='mx-2 my-3'
						onClick={() =>
							timeRangeFilterSubmission(TimeFilterEnum.lastSevenDays)
						}
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.lastSevenDays
								? 'solid'
								: 'outline'
						}
					>
						Last 7 days
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.last30days
								? 'solid'
								: 'outline'
						}
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.last30days)}
					>
						Last 30 days
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.thisMonth
								? 'solid'
								: 'outline'
						}
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.thisMonth)}
					>
						This month
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.lastMonth
								? 'solid'
								: 'outline'
						}
						className='mx-2 my-3'
						onClick={() => timeRangeFilterSubmission(TimeFilterEnum.lastMonth)}
					>
						Last month
					</ZIonButton>

					<ZIonButton
						color={'secondary'}
						expand='block'
						fill={
							shortLinksFilterOptions.timeFilter.daysToSubtract ===
							TimeFilterEnum.customRange
								? 'solid'
								: 'outline'
						}
						className='mx-2 my-3'
						onClick={() =>
							timeRangeFilterSubmission(TimeFilterEnum.customRange)
						}
					>
						Custom Range
					</ZIonButton>
				</div>

				{shortLinksFilterOptions.timeFilter.daysToSubtract ===
					TimeFilterEnum.customRange && (
					<div className='mt-2'>
						<div className='me-2'>
							<ZIonLabel className='font-bold ms-2'>Start at:</ZIonLabel>
							<ZIonDatetimeButton
								className='mx-2 my-3 mt-2 ion-justify-content-start'
								onIonChange={({ target }) => {
									if (target.value) {
										timeRangeFilterSubmission(
											TimeFilterEnum.customRange,
											target.value as string
										);
									}
								}}
								value={dayjs(
									shortLinksFilterOptions.timeFilter.startedAt as string
								).format(CONSTANTS.DateTime.iso8601DateTime)}
								id='all-time-filter-custom-date-start-time'
								preferWheel={false}
							/>
						</div>

						<div className='mt-4 me-2'>
							<ZIonLabel className='font-bold ms-2'>End at:</ZIonLabel>
							<ZIonDatetimeButton
								className='mx-2 my-3 mt-2 ion-justify-content-start'
								onIonChange={({ target }) => {
									if (target.value) {
										timeRangeFilterSubmission(
											TimeFilterEnum.customRange,
											undefined,
											target.value as string
										);
									}
								}}
								value={dayjs(
									shortLinksFilterOptions.timeFilter.endAt as string
								).format(CONSTANTS.DateTime.iso8601DateTime)}
								id='all-time-filter-custom-date-end-time'
								preferWheel={false}
							/>
						</div>
					</div>
				)}
			</ZCustomScrollable>
		</div>
	);
};

/**
 * Functional Component
 * About: (Tags filter popover of shortlink)
 * @type {*}
 * */
export const ShortLinksTagsFiltersPopover: React.FC = () => {
	// For getting all tags data
	const { tags: _shortLinksFieldsDataTagsSelector } = useRecoilValue(
		ShortLinksFieldsDataRStateSelector
	);

	// For getting filter.
	const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
		ShortLinksFilterOptionsRStateAtom
	);

	// function for generating initialValue for formik below.
	const generateInitialValueOfTagsFormik = (
		allTags: string[],
		filteredTags: string[] = []
	): {
		_filteredTags?: {
			[key: string]: boolean;
		};
		_allTags?: boolean;
	} => {
		try {
			const _filteredTags: {
				[key: string]: boolean;
			} = {};
			let _allTags = true;
			if (allTags.length) {
				allTags.forEach((tag, i) => {
					if (filteredTags.includes(tag)) {
						_filteredTags[tag] = true;
					} else {
						_filteredTags[tag] = false;
						_allTags = false;
					}
				});
			}
			return { _filteredTags, _allTags };
		} catch (error) {
			reportCustomError(error);
			return {};
		}
	};

	return (
		<ZRScrollbars style={{ width: 300, height: 300 }}>
			<Formik
				initialValues={generateInitialValueOfTagsFormik(
					_shortLinksFieldsDataTagsSelector,
					shortLinksFilterOptions.tags as string[]
				)}
				onSubmit={(values) => {
					try {
						if (values._filteredTags) {
							const _tags: string[] = [];
							for (const [key, value] of Object.entries(values._filteredTags)) {
								if (value === true) {
									_tags.push(key);
								}
							}

							setShortLinksFilterOptions((oldVales) => ({
								...oldVales,
								tags: [..._tags],
							}));
						}
					} catch (error) {
						reportCustomError(error);
					}
				}}
				enableReinitialize
			>
				{({ values, submitForm, handleBlur, setFieldValue }) => {
					return (
						<>
							<ZIonButton
								expand='block'
								className='m-0 ion-text-capitalize'
								onClick={() => void submitForm()}
							>
								<ZIonIcon icon={filterOutline} className='me-1' />
								<ZIonText>filter</ZIonText>
							</ZIonButton>
							<ZIonItem className='ion-no-padding'>
								<ZIonText className='font-bold ms-3 text-[14px]'>
									All Tags
								</ZIonText>
								{/* <ZIonCheckbox
									slot='end'
									checked={values._allTags}
									onIonChange={({ target }) => {
										setFieldValue('_allTags', target.checked, false);
										_shortLinksFieldsDataTagsSelector.forEach((el) => {
											setFieldValue(
												`_filteredTags.${el}`,
												target.checked,
												false
											);
										});
									}}
									onIonBlur={handleBlur}
								/> */}
								<ZRCheckbox
									checkedValue={values._allTags}
									handleChange={(checked) => {
										setFieldValue('_allTags', checked, false);
										_shortLinksFieldsDataTagsSelector.forEach((el) => {
											setFieldValue(`_filteredTags.${el}`, checked, false);
										});
									}}
									className='ms-auto'
								/>
							</ZIonItem>
							<ZIonList lines='none'>
								{_shortLinksFieldsDataTagsSelector.map((el, i) => {
									return (
										<ZIonItem key={i}>
											<ZIonChip className='m-0 text-[14px]'>{el}</ZIonChip>
											<ZIonCheckbox
												slot='end'
												checked={
													values._filteredTags && values._filteredTags[el]
												}
												name={el}
												onIonChange={({ target }) => {
													if (!target.checked && values._allTags) {
														setFieldValue('_allTags', false, false);
													}
													setFieldValue(
														`_filteredTags.${el}`,
														target.checked,
														false
													);
												}}
												onIonBlur={handleBlur}
											/>
										</ZIonItem>
									);
								})}
							</ZIonList>
						</>
					);
				}}
			</Formik>
		</ZRScrollbars>
	);
};

/**
 * Functional Component
 * About: (Domain filter popover of shortlink)
 * @type {*}
 * */
export const ShortLinksDomainsFiltersPopover: React.FC = () => {
	// For getting all domains data
	const { domains: _shortLinksFieldsDataDomainsSelector } = useRecoilValue(
		ShortLinksFieldsDataRStateSelector
	);

	// For getting filter.
	const [shortLinksFilterOptions, setShortLinksFilterOptions] = useRecoilState(
		ShortLinksFilterOptionsRStateAtom
	);

	// function for generating initialValue for formik below.
	const generateInitialValueOfDomainsFormik = (
		allDomains: string[],
		filteredDomains: string[] = []
	): {
		_filteredDomains?: {
			[key: string]: boolean;
		};
		_allDomains?: boolean;
	} => {
		try {
			const _filteredDomains: {
				[key: string]: boolean;
			} = {};
			let _allDomains = true;
			if (allDomains.length) {
				allDomains.forEach((domain, i) => {
					const _domain = domain.replace('.', '_');
					if (filteredDomains.includes(_domain)) {
						_filteredDomains[_domain] = true;
					} else {
						_filteredDomains[_domain] = false;
						_allDomains = false;
					}
				});
			}
			return { _filteredDomains, _allDomains };
		} catch (error) {
			reportCustomError(error);
			return {};
		}
	};

	return (
		<ZRScrollbars style={{ width: 300, height: 300 }}>
			<Formik
				initialValues={generateInitialValueOfDomainsFormik(
					_shortLinksFieldsDataDomainsSelector,
					shortLinksFilterOptions.domains as string[]
				)}
				onSubmit={(values) => {
					try {
						if (values._filteredDomains) {
							const _domains: string[] = [];
							for (const [key, value] of Object.entries(
								values._filteredDomains
							)) {
								if (value === true) {
									const _key = key.replace('_', '.');
									_domains.push(_key);
								}
							}

							setShortLinksFilterOptions((oldVales) => ({
								...oldVales,
								domains: [..._domains],
							}));
						}
					} catch (error) {
						reportCustomError(error);
					}
				}}
				enableReinitialize
			>
				{({ values, submitForm, handleBlur, setFieldValue }) => (
					<>
						<ZIonButton
							expand='block'
							className='m-0 ion-text-capitalize'
							onClick={() => void submitForm()}
						>
							<ZIonIcon icon={filterOutline} className='me-1' />
							<ZIonText>filter</ZIonText>
						</ZIonButton>
						<ZIonItem className='ion-no-padding'>
							<ZIonText className='font-bold ms-3 text-[14px]'>
								All Domains
							</ZIonText>
							{/* <ZIonCheckbox
								slot='end'
								checked={values._allDomains}
								onIonChange={({ target }) => {
									setFieldValue('_allDomains', target.checked, false);
								}}
								onIonBlur={handleBlur}
							/> */}
							<ZRCheckbox
								checkedValue={values._allDomains}
								handleChange={(checked) => {
									setFieldValue('_allDomains', checked, false);
									_shortLinksFieldsDataDomainsSelector.forEach((el) => {
										const domain = el.replace('.', '_');
										setFieldValue(`_filteredDomains.${domain}`, checked, false);
									});
								}}
								className='ms-auto'
							/>
						</ZIonItem>
						<ZIonList lines='none'>
							{_shortLinksFieldsDataDomainsSelector.map((_domain, i) => {
								const domain = _domain.replace('.', '_');
								return (
									<ZIonItem key={i}>
										<ZIonChip className='m-0 text-[14px]'>{_domain}</ZIonChip>
										<ZIonCheckbox
											slot='end'
											checked={
												values._filteredDomains &&
												values._filteredDomains[domain]
											}
											name={domain}
											onIonChange={({ target }) => {
												if (!target.checked && values._allDomains) {
													setFieldValue('_allDomains', false, false);
												}
												setFieldValue(
													`_filteredDomains.${domain}`,
													target.checked,
													false
												);
											}}
											onIonBlur={handleBlur}
										/>
									</ZIonItem>
								);
							})}
						</ZIonList>
					</>
				)}
			</Formik>
		</ZRScrollbars>
	);
};
