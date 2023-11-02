import { type IFrbRemoteConfigRStateAtom } from '@/types/firebaseTypes/index.type';
import { frbRemoteConfigSetting } from '@/utils/constants/firebaseConstants';
import { ENVS } from '@/utils/envKeys';
import { getRemoteConfigKeysData } from '@/utils/helpers/firebaseHelpers';
import { type FirebaseApp } from 'firebase/app';
import {
  fetchAndActivate,
  isSupported,
  getRemoteConfig,
  setLogLevel
} from 'firebase/remote-config';
import { type SetterOrUpdater } from 'recoil';

export const fetchAndSetupFrbRemoteConfigKeys = async (
  _firebaseApp: FirebaseApp,
  setFrbRemoteConfigRState: SetterOrUpdater<IFrbRemoteConfigRStateAtom>
): Promise<void> => {
  const checkRemoteConfigIsSupported = await isSupported();
  if (checkRemoteConfigIsSupported) {
    const remoteConfig = getRemoteConfig(_firebaseApp);
    setLogLevel(remoteConfig, ENVS.isProduction ? 'silent' : 'error');

    // set the refetch/stale time for remote config keys
    remoteConfig.settings.minimumFetchIntervalMillis =
      frbRemoteConfigSetting.staleTimeInMilliseconds;

    await fetchAndActivate(remoteConfig);

    const result = getRemoteConfigKeysData(remoteConfig);

    setFrbRemoteConfigRState(oldState => ({
      ...oldState,
      isInitialized: true,
      lastFetchedAt: new Date().toString(),
      keys: result
    }));
  }
};
