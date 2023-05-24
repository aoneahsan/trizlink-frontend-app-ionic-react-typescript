// Packages Imports
import { atom } from 'recoil';

// Custom Imports
// Data

// Types
import { ZaionsUserFeedBackCarouselType } from '@/types/InPageComponentTypes/ZaionsUserFeedBack.type';

export const ZaionsUsersFeedBackCarouselState =
	atom<ZaionsUserFeedBackCarouselType>({
		key: 'ZaionsUsersFeedBackCarouselState_key',
		default: {
			activeIndex: 0,
			controls: false,
			fade: false,
			indicators: false,
			interval: 5000,
			pause: false,
			touch: true,
			totalItemCount: 0,
			lastItemIndex: 0,
		},
	});
