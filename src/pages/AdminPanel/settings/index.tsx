// Core Imports
import React from 'react';

// Packages Import
import { useRouteMatch } from 'react-router';
import classNames from 'classnames';

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsCreateShortLinkUrlInput from '@/components/InPageComponents/ZaionsCreateShortLinkUrlInput';
import APSettingsPixels from '@/components/UserDashboard/SettingsSection/Pixels';
import APSettingsUtmTags from '@/components/UserDashboard/SettingsSection/UtmTemplates';
import APSettingsEmbedWidgets from '@/components/UserDashboard/SettingsSection/EmbedWidgets';
import APSettingsPrivacy from '@/components/UserDashboard/SettingsSection/Privacy';
import APSettingspassword from '@/components/UserDashboard/SettingsSection/Password';
import APSettingsApiKey from '@/components/UserDashboard/SettingsSection/Integrations';
import APSettingsCustomDomain from '@/components/UserDashboard/SettingsSection/CustomDomain';
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonItem,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonSplitPane,
  ZIonMenu,
  ZIonList
} from '@/components/ZIonComponents';

// Global Constants
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Images

// Recoil States

// Types

// Styles
import classes from './styles.module.css';
import { PAGE_MENU } from '@/utils/enums';

const ZaionsAdminPanelSettings: React.FC = () => {
  const customDomainSettingsPagePathMatch = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.Main + '/custom-domain'
  )?.isExact;
  const pixelsSettingsPagePathMatch = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.Main + '/pixels'
  )?.isExact;
  const utmTagsSettingsPagePathMatch = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.Main + '/utm-templates'
  )?.isExact;
  const embedWidgetsSettingsPagePathMatch = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.Main + '/scripts'
  )?.isExact;
  const privacySettingsPagePathMatch = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.Main + '/privacy'
  )?.isExact;
  const passwordSettingsPagePathMatch = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.Main + '/password-protect'
  )?.isExact;
  const integrationsSettingsPagePathMatch = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.Main + '/integrations'
  )?.isExact;

  return (
    <>
      <ZIonPage
        pageTitle='Admin Setting Page'
        menu={PAGE_MENU.DASHBOARD_PAGE_MENU}>
        <ZIonContent color='light'>
          <ZIonGrid className='px-4 zaions__bg_white ion-no-padding'>
            <ZIonSplitPane
              when='lg'
              contentId={CONSTANTS.DEFAULT_VALUES.ZAIONS_SETTING_SPLIT_PANEL}>
              <ZIonMenu
                contentId={CONSTANTS.DEFAULT_VALUES.ZAIONS_SETTING_SPLIT_PANEL}
                className={`${classes.menuWidth}`}>
                <ZIonContent className='ion-padding'>
                  <ZIonList
                    lines='none'
                    className='ps-3'>
                    <ZIonItem className='py-1'>
                      <ZIonRouterLink
                        routerLink={
                          ZaionsRoutes.AdminPanel.Setting.Main +
                          '/custom-domain'
                        }
                        className={classNames({
                          'text-primary font-bold':
                            customDomainSettingsPagePathMatch
                        })}
                        color={'dark'}>
                        💻 Custom domains
                      </ZIonRouterLink>
                    </ZIonItem>
                    <ZIonItem className='py-1'>
                      <ZIonRouterLink
                        routerLink={
                          ZaionsRoutes.AdminPanel.Setting.Main + '/pixels'
                        }
                        className={classNames({
                          'text-primary font-bold': pixelsSettingsPagePathMatch
                        })}
                        color={'dark'}>
                        🎯 Pixels
                      </ZIonRouterLink>
                    </ZIonItem>
                    <ZIonItem className='py-1'>
                      <ZIonRouterLink
                        routerLink={
                          ZaionsRoutes.AdminPanel.Setting.Main +
                          '/utm-templates'
                        }
                        className={classNames({
                          'text-primary font-bold': utmTagsSettingsPagePathMatch
                        })}
                        color={'dark'}>
                        🎫 UTMs tracking
                      </ZIonRouterLink>
                    </ZIonItem>
                    <ZIonItem className='py-1'>
                      <ZIonRouterLink
                        routerLink={
                          ZaionsRoutes.AdminPanel.Setting.Main + '/scripts'
                        }
                        className={classNames({
                          'text-primary font-bold':
                            embedWidgetsSettingsPagePathMatch
                        })}
                        color={'dark'}>
                        ⚡ Embed widgets
                      </ZIonRouterLink>
                    </ZIonItem>
                    <ZIonItem className='py-1'>
                      <ZIonRouterLink
                        routerLink={
                          ZaionsRoutes.AdminPanel.Setting.Main + '/privacy'
                        }
                        className={classNames({
                          'text-primary font-bold': privacySettingsPagePathMatch
                        })}
                        color={'dark'}>
                        📄 Privacy popup
                      </ZIonRouterLink>
                    </ZIonItem>
                    <ZIonItem className='py-1'>
                      <ZIonRouterLink
                        routerLink={
                          ZaionsRoutes.AdminPanel.Setting.Main +
                          '/password-protect'
                        }
                        className={classNames({
                          'text-primary font-bold':
                            passwordSettingsPagePathMatch
                        })}
                        color={'dark'}>
                        🔒 Password
                      </ZIonRouterLink>
                    </ZIonItem>
                    <ZIonItem className='py-1'>
                      <ZIonRouterLink
                        routerLink={
                          ZaionsRoutes.AdminPanel.Setting.Main + '/integrations'
                        }
                        className={classNames({
                          'text-primary font-bold':
                            integrationsSettingsPagePathMatch
                        })}
                        color={'dark'}>
                        🔑 API key
                      </ZIonRouterLink>
                    </ZIonItem>
                  </ZIonList>
                </ZIonContent>
              </ZIonMenu>
              <div
                className='overflow-y-scroll ion-page'
                id={CONSTANTS.DEFAULT_VALUES.ZAIONS_SETTING_SPLIT_PANEL}>
                <ZIonGrid className='w-full mt-2'>
                  <ZIonRow className='px-3 py-3 zaions__bg_white'>
                    <ZIonCol
                      sizeXl='7'
                      sizeLg='7'
                      sizeMd='6'
                      sizeSm='6'
                      sizeXs='12'>
                      <ZIonText className='p-0 mb-2'>
                        <h3>Settings</h3>
                      </ZIonText>
                      {customDomainSettingsPagePathMatch === true && (
                        <ZIonText>Set your own custom domain easily</ZIonText>
                      )}
                      {pixelsSettingsPagePathMatch === true && (
                        <ZIonText>Add & manage your Tracking Pixels</ZIonText>
                      )}
                      {utmTagsSettingsPagePathMatch === true && (
                        <ZIonText>
                          Add & manage your Tracking UTM Templates
                        </ZIonText>
                      )}
                      {embedWidgetsSettingsPagePathMatch === true && (
                        <ZIonText>
                          Add third-party widgets & embed scripts
                        </ZIonText>
                      )}
                      {privacySettingsPagePathMatch === true && (
                        <ZIonText>
                          Set-up your privacy Policy popup below
                        </ZIonText>
                      )}
                      {passwordSettingsPagePathMatch === true && (
                        <ZIonText>
                          Manage your links with password settings
                        </ZIonText>
                      )}
                      {integrationsSettingsPagePathMatch === true && (
                        <ZIonText>Manage your integrations & tokens</ZIonText>
                      )}
                    </ZIonCol>
                    <ZIonCol>
                      <ZaionsCreateShortLinkUrlInput />
                    </ZIonCol>
                  </ZIonRow>
                  {customDomainSettingsPagePathMatch === true && (
                    <APSettingsCustomDomain />
                  )}
                  {pixelsSettingsPagePathMatch === true && <APSettingsPixels />}
                  {utmTagsSettingsPagePathMatch === true && (
                    <APSettingsUtmTags />
                  )}
                  {embedWidgetsSettingsPagePathMatch === true && (
                    <APSettingsEmbedWidgets />
                  )}
                  {privacySettingsPagePathMatch === true && (
                    <APSettingsPrivacy />
                  )}
                  {passwordSettingsPagePathMatch === true && (
                    <APSettingspassword />
                  )}
                  {integrationsSettingsPagePathMatch === true && (
                    <APSettingsApiKey />
                  )}
                </ZIonGrid>
              </div>
            </ZIonSplitPane>
          </ZIonGrid>
        </ZIonContent>
      </ZIonPage>
    </>
  );
};

export default ZaionsAdminPanelSettings;
