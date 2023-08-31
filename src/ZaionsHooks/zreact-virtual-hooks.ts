import React from 'react';

import { reportCustomError } from '@/utils/customErrorType/index';
import { useVirtualizer } from '@tanstack/react-virtual';
import { number } from 'yup';

/** */
export const useZRVirtualizer = ({
	_count = 10000,
	_overscan = 5,
	_scrollMargin,
	_horizontal,
	_estimateSize = () => 35,
}: {
	_count?: number;
	_overscan?: number;
	_scrollMargin?: number;
	_horizontal?: boolean;
	_estimateSize?: (index: number) => number;
}) => {
	try {
		const parentRef = React.useRef(null);

		const rowVirtualizer = useVirtualizer({
			count: _count,
			getScrollElement: () => parentRef.current,
			estimateSize: _estimateSize,
			overscan: _overscan,
			scrollMargin: _scrollMargin,
			horizontal: _horizontal,
		});
	} catch (error) {
		reportCustomError(error);
	}
};
