// Core Imports
import React from 'react';

// Packages Imports
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import classNames from 'classnames';

// Custom Imports

// Recoil State
import { useRecoilState } from 'recoil';
import { ZaionsUsersFeedBackCarouselState } from '@/ZaionsStore/InpageComponents/ZaionsUsersFeedBack.recoil';

// Global Content
import { showZCapErrorDialogAlert } from '@/utils/helpers';

// Style
import classes from './styles.module.css';
import { ZIonButton, ZIonIcon } from '@/components/ZIonComponents';

const CAROUSEL_ITEM_CHANGE_TYPE = {
	ARROW: 'arrow',
	INDICATORS: 'indicators',
};

const CAROUSEL_ITEM_ACTIONS = {
	PREVIOUS: 'previous',
	NEXT: 'next',
};

const ZaionsCarouselActions: React.FC = () => {
	const [usersFeedBackCarouselState, setUsersFeedBackCarouselState] =
		useRecoilState(ZaionsUsersFeedBackCarouselState);

	const onCarouselItemChange = async (
		type: string,
		itemIndex: string | number
	): Promise<void> => {
		if (!usersFeedBackCarouselState.lastItemIndex) return;

		if (
			typeof itemIndex === 'string' &&
			type === CAROUSEL_ITEM_CHANGE_TYPE.ARROW
		) {
			if (itemIndex === CAROUSEL_ITEM_ACTIONS.PREVIOUS) {
				if (usersFeedBackCarouselState.activeIndex === 0) {
					// this will go to the last item in array (last feedback)
					setUsersFeedBackCarouselState((oldVal) => ({
						...oldVal,
						activeIndex: oldVal.lastItemIndex,
					}));
				} else if (usersFeedBackCarouselState.activeIndex > 0) {
					setUsersFeedBackCarouselState((oldVal) => ({
						...oldVal,
						activeIndex: oldVal.activeIndex - 1,
					}));
				} else {
					await showZCapErrorDialogAlert();
				}
			} else if (itemIndex === CAROUSEL_ITEM_ACTIONS.NEXT) {
				if (
					usersFeedBackCarouselState.activeIndex ===
					usersFeedBackCarouselState.lastItemIndex
				) {
					// this will go to the first item in array (first feedback)
					setUsersFeedBackCarouselState((oldVal) => ({
						...oldVal,
						activeIndex: 0,
					}));
				} else if (
					usersFeedBackCarouselState.activeIndex <
					usersFeedBackCarouselState.lastItemIndex
				) {
					setUsersFeedBackCarouselState((oldVal) => ({
						...oldVal,
						activeIndex: oldVal.activeIndex + 1,
					}));
				} else {
					await showZCapErrorDialogAlert();
				}
			} else {
				await showZCapErrorDialogAlert();
			}
		} else if (
			typeof itemIndex === 'number' &&
			type === CAROUSEL_ITEM_CHANGE_TYPE.INDICATORS
		) {
			if (
				itemIndex >= 0 &&
				itemIndex <= usersFeedBackCarouselState.lastItemIndex
			) {
				setUsersFeedBackCarouselState((oldVal) => ({
					...oldVal,
					activeIndex: +itemIndex,
				}));
			} else {
				await showZCapErrorDialogAlert();
			}
		} else {
			await showZCapErrorDialogAlert();
		}
	};

	return (
		<>
			<div className='mt-4 mb-3 pb-1 flex ion-justify-content-center ion-align-items-center'>
				<ZIonButton
					fill='clear'
					color='dark'
					className={`${classNames(classes.carosusel__action_btn, {
						'me-2': true,
					})}`}
					onClick={() =>
						void onCarouselItemChange(
							CAROUSEL_ITEM_CHANGE_TYPE.ARROW,
							CAROUSEL_ITEM_ACTIONS.PREVIOUS
						)
					}
				>
					<ZIonIcon icon={chevronBackOutline} />
				</ZIonButton>
				{Array.from(
					Array(usersFeedBackCarouselState.totalItemCount).keys()
				).map((el) => (
					<div
						className={`${classNames({
							'mx-2': true,
							[classes.zaions__point]: true,
							[classes.zaions__point_active]:
								+el === usersFeedBackCarouselState.activeIndex,
						})}`}
						key={el}
						onClick={() =>
							void onCarouselItemChange(
								CAROUSEL_ITEM_CHANGE_TYPE.INDICATORS,
								+el
							)
						}
					></div>
				))}
				{/* <div className={`${classes.zaions__point} mx-2`}></div> */}
				<ZIonButton
					fill='clear'
					// color='dark'
					className={`${classNames(classes.carosusel__action_btn, {
						'mx-2': true,
					})}`}
					onClick={() =>
						void onCarouselItemChange(
							CAROUSEL_ITEM_CHANGE_TYPE.ARROW,
							CAROUSEL_ITEM_ACTIONS.NEXT
						)
					}
				>
					<ZIonIcon icon={chevronForwardOutline}></ZIonIcon>
				</ZIonButton>
			</div>
		</>
	);
};

export default ZaionsCarouselActions;
