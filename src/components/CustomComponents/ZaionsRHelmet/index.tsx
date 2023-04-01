/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
// import { Helmet } from 'react-helmet';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type Imports go down
 * ? Like if you have a type for props it should be pleace Down
 * */
type ZaionsRHelmetProps = {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  viewport?: string;
  refresh?: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  ogDescription?: string;
  ogLocale?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  shortcutIcon?: string;
  contentSecurityPolicy?: string;
  XUACompatible?: string;
  copyRight?: string;
  roboto?: string;
};

/**
 * Functional Component
 * About: ( React helmet custom component )
 * @type {*}
 * */
const ZaionsRHelmet: React.FC<ZaionsRHelmetProps> = ({
  title = CONSTANTS.ZaionsRHelmetDefaults.title,
  description = CONSTANTS.ZaionsRHelmetDefaults.description,
  keywords = CONSTANTS.ZaionsRHelmetDefaults.keywords,
  author = CONSTANTS.ZaionsRHelmetDefaults.author,
  viewport = CONSTANTS.ZaionsRHelmetDefaults.viewport,
  ogTitle = CONSTANTS.ZaionsRHelmetDefaults.ogTitle,
  ogType = CONSTANTS.ZaionsRHelmetDefaults.ogType,
  ogUrl = CONSTANTS.ZaionsRHelmetDefaults.ogUrl,
  ogImage = CONSTANTS.ZaionsRHelmetDefaults.ogImage,
  ogDescription = CONSTANTS.ZaionsRHelmetDefaults.ogDescription,
  ogLocale = CONSTANTS.ZaionsRHelmetDefaults.ogLocale,
  ogSiteName = CONSTANTS.ZaionsRHelmetDefaults.ogSiteName,
  twitterCard = CONSTANTS.ZaionsRHelmetDefaults.twitterCard,
  twitterSite = CONSTANTS.ZaionsRHelmetDefaults.twitterSite,
  twitterCreator = CONSTANTS.ZaionsRHelmetDefaults.twitterCreator,
  twitterTitle = CONSTANTS.ZaionsRHelmetDefaults.twitterTitle,
  twitterDescription = CONSTANTS.ZaionsRHelmetDefaults.twitterDescription,
  twitterImage = CONSTANTS.ZaionsRHelmetDefaults.twitterImage,
  shortcutIcon = CONSTANTS.ZaionsRHelmetDefaults.shortcutIcon,

  // do not uncomment below onces
  // refresh = CONSTANTS.ZaionsRHelmetDefaults.refresh,
  // contentSecurityPolicy = CONSTANTS.ZaionsRHelmetDefaults.contentSecurityPolicy,
  // XUACompatible = CONSTANTS.ZaionsRHelmetDefaults.XUACompatible,
  // copyRight = CONSTANTS.ZaionsRHelmetDefaults.copyRight,
  // roboto = CONSTANTS.ZaionsRHelmetDefaults.roboto,
}) => {
  return (
    <>
      {/* <Helmet> */}
      {/* Common */}
      {/* <title>{title}</title>
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
				<meta name='author' content={author} />
				<meta name='viewport' content={viewport} />
				<meta name='og:title' content={ogTitle} />
				<meta name='og:type' content={ogType} />
				<meta name='og:url' content={ogUrl} />
				<meta name='og:image' content={ogImage} />
				<meta name='og:description' content={ogDescription} />
				<meta name='og:locale' content={ogLocale} />
				<meta name='og:site_name' content={ogSiteName} />
				<meta name='twitter:card' content={twitterCard} />
				<meta name='twitter:site' content={twitterSite} />
				<meta name='twitter:creator' content={twitterCreator} />
				<meta name='twitter:title' content={twitterTitle} />
				<meta name='twitter:description' content={twitterDescription} />
				<meta name='twitter:image' content={twitterImage} />
				<base href='/' />
				<link rel='shortcut icon' href={shortcutIcon} type='image/png' />
				<meta charSet='UTF-8' /> */}

      {/* do not uncomment these below - commented by ahsan */}
      {/* <meta
					http-equiv='content-security-policy'
					content={contentSecurityPolicy}
				/> */}
      {/* <meta http-equiv='x-ua-compatible' content={XUACompatible} />
				<meta name='copyright' content={copyRight} />
				<meta name='robots' content={roboto} /> */}
      {/* <meta http-equiv='refresh' content={refresh} /> */}
      {/* </Helmet> */}
    </>
  );
};

export default ZaionsRHelmet;
