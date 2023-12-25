import { reloadBlockingRStateAtom } from '@/ZaionsStore/AppRStates';
import { shouldBlockReload } from '@/utils/helpers';
import React, { useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { useRecoilValue } from 'recoil';

interface IReloadBlockingHOC {
  children: React.ReactNode;
}

const ReloadBlockingHOC: React.FC<IReloadBlockingHOC> = ({ children }) => {
  const reloadBlockingRState = useRecoilValue(reloadBlockingRStateAtom);

  //
  const _pageUrl = useMemo(
    () => reloadBlockingRState.pageUrl ?? '',
    [reloadBlockingRState.pageUrl]
  );
  //
  const isSamePage = useRouteMatch(_pageUrl)?.isExact;
  console.log({ c: reloadBlockingRState.isBlock });
  useEffect(() => {
    shouldBlockReload(reloadBlockingRState?.isBlock);
  }, [isSamePage, reloadBlockingRState.isBlock]);

  return <>{children}</>;
};

export default ReloadBlockingHOC;
