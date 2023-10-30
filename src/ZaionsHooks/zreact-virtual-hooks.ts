import { reportCustomError } from '@/utils/customErrorType/index';

/** */
export const useZRVirtualizer = ({
  _count = 10000,
  _overscan = 5,
  _scrollMargin,
  _horizontal,
  _estimateSize = () => 35
}: {
  _count?: number;
  _overscan?: number;
  _scrollMargin?: number;
  _horizontal?: boolean;
  _estimateSize?: (index: number) => number;
}) => {
  try {
    // const parentRef = React.useRef(null);
    // const rowVirtualizer = useVirtualizer({
    //   count: _count,
    //   getScrollElement: () => parentRef.current,
    //   estimateSize: _estimateSize,
    //   overscan: _overscan,
    //   scrollMargin: _scrollMargin,
    //   horizontal: _horizontal
    // });
  } catch (error) {
    reportCustomError(error);
  }
};
