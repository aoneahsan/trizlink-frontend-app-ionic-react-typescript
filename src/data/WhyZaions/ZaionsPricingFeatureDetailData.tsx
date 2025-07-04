import CONSTANTS, { PRODUCT_DOMAIN, PRODUCT_NAME } from '@/utils/constants';
import { type ZaionsPricingFeatureDetailType } from '@/types/WhyZaions/PricingPage';

export const ZaionsPricingFeatureDetailData: ZaionsPricingFeatureDetailType[] =
  [
    {
      id: '1',
      section_heading: 'Link Management',
      features: [
        {
          feature_id: '1',
          feature_title: 'Short Links',
          plan1: '50/mo',
          plan2: '200/mo',
          plan3: '1,500/mo',
          plan4: '3,000/mo',
          plan5: '10,000/mo',
          destil: 'Total number of URLs you can shorten on a monthly basis',
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'Branded Links',
          // plan1: '',
          // plan2: '',
          plan3: true,
          plan4: true,
          plan5: true,
          destil: `Links are created with a custom domain. Instead of ${PRODUCT_DOMAIN}/2m75BWD, yourbrnd.co/2m75BWD`,
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'Branded Link Redirects',
          // plan1: '',
          // plan2: '',
          plan3: '10/mo',
          plan4: '50/mo',
          plan5: '10,000+',
          destil: 'Change the destination page for branded links',
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: `${PRODUCT_DOMAIN} Link Redirects`,
          // plan1: '',
          plan2: '30/mo',
          plan3: '5/mo',
          plan4: '10/mo',
          plan5: '40/mo',
          destil: `Change the destination page for ${PRODUCT_DOMAIN} links`,
          type: 'feature'
        },
        {
          feature_id: '5',
          feature_title: 'Auto-Branded Links',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          // plan4: '',
          plan5: '10+ domains',
          destil: `Links created by others on ${PRODUCT_NAME}’s website are branded with your custom domain`,
          type: 'feature'
        },
        {
          feature_id: '6',
          feature_title: 'Custom Back-Halves',
          plan1: '50/mo',
          plan2: '200/mo',
          plan3: '1,500/mo',
          plan4: '3000/mo',
          plan5: '10,000/mo',
          destil: `Insert your own words at the end of a link. Eg: change ${PRODUCT_DOMAIN}U/2ZonlUz to ${PRODUCT_DOMAIN}U/MyOnlinePage`,
          type: 'feature'
        },
        {
          feature_id: '7',
          feature_title: 'Link Clicks',
          plan1: 'Unlimited',
          plan2: 'Unlimited',
          plan3: 'Unlimited',
          plan4: 'Unlimited',
          plan5: 'Unlimited',
          destil: `Insert your own words at the end of a link. Eg: change ${PRODUCT_DOMAIN}U/2ZonlUz to ${PRODUCT_DOMAIN}U/MyOnlinePage`,
          type: 'feature'
        },
        {
          feature_id: '8',
          feature_title: 'Mobile Deep Links',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          plan4: true,
          plan5: true,
          destil: 'Point links to your mobile app and track their performance',
          type: 'feature'
        },
        {
          feature_id: '9',
          feature_title: 'Bulk Shortening',
          // plan1: '',
          // plan2: '',
          plan3: '100 links/csv',
          plan4: '3,000 links/csv',
          plan5: '10,000+ links/csv',
          destil: 'Create multiple links with a single CSV upload',
          type: 'feature'
        },
        {
          feature_id: '10',
          feature_title: 'Link Export',
          // plan1: '',
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Download a CSV file with your short links',
          type: 'feature'
        }
      ]
    },
    {
      id: '2',
      section_heading: 'QR Codes',
      features: [
        {
          feature_id: '1',
          feature_title: 'Branding',
          plan1: `${PRODUCT_NAME} Branded`,
          plan2: `${PRODUCT_NAME} Branded`,
          plan3: 'Enhanced',
          plan4: 'Enhanced',
          plan5: 'Enhanced',
          destil: `Download a QR Code for any link with or without a ${PRODUCT_NAME} logo`,
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'Custom Logo',
          // plan1: '',
          // plan2: '',
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Customize your QR Code with your own logo',
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'Colors',
          // plan1: '',
          // plan2: '',
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Change the color of the QR Code',
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: 'Download Format',
          plan1: 'PNG',
          plan2: 'PNG',
          plan3: 'PNG',
          plan4: 'Multiple Formats',
          plan5: 'Multiple Formats',
          destil: 'Download the QR code in PNG or SVG format',
          type: 'feature'
        },
        {
          feature_id: '5',
          feature_title: 'Advanced Performance Dashboard',
          // plan1: '50/mo',
          // plan2: '30/mo',
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'View detailed performance data and metrics',
          type: 'feature'
        },
        {
          feature_id: '6',
          type: 'info',
          info: {
            text: 'For more advanced QR Code capabilities, check out our recent acquisition:',
            link: {
              text: 'QR Code Generator →',
              url: CONSTANTS.ProductExternalURL.GenericExternalURL
            }
          }
        }
      ]
    },
    {
      id: '3',
      section_heading: 'Link-in-bio',
      new: true,
      features: [
        {
          feature_id: '1',
          feature_title: 'Branding',
          plan1: `${PRODUCT_NAME} Branded`,
          plan2: 'Enhanced',
          plan3: 'Enhanced',
          plan4: 'Enhanced',
          plan5: 'Enhanced',
          destil: `Create a Link-in-bio with or without a ${PRODUCT_NAME} logo`,
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'Pre-Designed Themes',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Select from beautifull layouts and color schemes',
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'Custom Background Colors ',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Choose color that rainforce your brand',
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: 'Button & Font Styles',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Choose font and button style that represent your brand',
          type: 'feature'
        },
        {
          feature_id: '5',
          feature_title: 'Profile & Background Image Upload',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Customize your page with your own visuals',
          type: 'feature'
        },
        {
          feature_id: '6',
          feature_title: 'Link-in-bio Social Icons',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Link your top social media platforms through social icons',
          type: 'feature'
        },
        {
          feature_id: '7',
          feature_title: 'Link-in-bio QR Code',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Create a QR Code that directs people to your Link-in-bio',
          type: 'feature'
        },
        {
          feature_id: '8',
          feature_title: 'Advanced Performance Dashboard',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'View detailed performance data and metrics',
          type: 'feature'
        }
      ]
    },
    {
      id: '4',
      section_heading: 'Custom Domain Essentials',
      features: [
        {
          feature_id: '1',
          feature_title: 'Complimentary Custom Domain*',
          // plan1: '',
          // plan2: '',
          plan3: true,
          plan4: true,
          plan5: true,
          destil: `Only ${PRODUCT_NAME} gives you a dedicated custom domain as part of a complete link management solution for your brand`,
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'Domain Finder',
          // plan1: '',
          // plan2: '',
          plan3: true,
          plan4: true,
          plan5: true,
          destil:
            'Select, for free, the perfect custom domain to build your brand',
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'Domain 1-Step Setup',
          // plan1: '',
          // plan2: '',
          plan3: true,
          plan4: true,
          plan5: true,
          destil:
            'Built-in safeguards protect your privacy so you can focus on growing your brand',
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: 'Domain Guard ',
          // plan1: '',
          // plan2: '',
          plan3: true,
          plan4: true,
          plan5: true,
          destil:
            'Built-in safeguards protect your privacy so you can focus on growing your brand',
          type: 'feature'
        },
        {
          feature_id: '5',
          feature_title: 'Domain Root Router',
          // plan1: '',
          // plan2: '',
          plan3: true,
          plan4: true,
          plan5: true,
          destil:
            'Redirect visitors to a web page you designate when they enter your custom domain with nothing after the slash “/”',
          type: 'feature'
        },
        {
          feature_id: '6',
          feature_title: 'Domain 404 Error Fixer',
          // plan1: '',
          // plan2: '',
          plan3: true,
          plan4: true,
          plan5: true,
          destil:
            'Prevent 404 dead-ends by pointing visitors to a designated web page if your branded short link contains an error or typo after the slash “/”',
          type: 'feature'
        }
      ]
    },
    {
      id: '5',
      section_heading: 'Campaign Management',
      features: [
        {
          feature_id: '1',
          feature_title: 'Campaigns',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          plan4: true,
          plan5: true,
          destil: 'Group and manage link in bulk',
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'UTM Builder',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: `Add UTM parameters to your links through ${PRODUCT_NAME}`,
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'Bulk Import to Campaigns',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          plan4: true,
          plan5: true,
          destil: 'Add multiple links to a campaign via CSV',
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: 'Export of Campaign Data',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          plan4: true,
          plan5: true,
          destil: 'Export your campaign data to a CSV file',
          type: 'feature'
        },
        {
          feature_id: '5',
          feature_title: 'Social Posting',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: `Connect your account to Twitter to post a link right from ${PRODUCT_NAME}`,
          type: 'feature'
        },
        {
          feature_id: '6',
          feature_title: 'Parameter Passing',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          // plan4: '',
          plan5: 'Available for Purchase',
          destil:
            'Keep your link parameters intact when you shorten links containing URL codes',
          type: 'feature'
        }
      ]
    },
    {
      id: '6',
      section_heading: 'Data and Analytics',
      features: [
        {
          feature_id: '1',
          feature_title: 'Link History',
          // plan1: '',
          plan2: '30 Days',
          plan3: '30 Days',
          plan4: '1 Year',
          plan5: '2 Years',
          destil: 'View the performance of your links over time',
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'Link Reporting',
          // plan1: '',
          plan2: '30 Days',
          plan3: '30 Days',
          plan4: '60 Days',
          plan5: '90 Days',
          destil:
            'View detailed performance metrics for each link over 30 or 90 days',
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'Advanced Performance Dashboard',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          plan4: '60 Days',
          plan5: '90 Days',
          destil: 'View a dashboard with aggregated metrics for all your links',
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: 'Data Export',
          // plan1: '',
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: `Export data out of ${PRODUCT_NAME}`,
          type: 'feature'
        },
        {
          feature_id: '5',
          feature_title: 'City-Level Data',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          plan4: true,
          plan5: true,
          destil: 'Access city-level tracking for every link you create',
          type: 'feature'
        },
        {
          feature_id: '6',
          feature_title: 'Device-Type Tracking',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          plan4: true,
          plan5: true,
          destil:
            'Get a breakdown of clicks by device types for each of your links',
          type: 'feature'
        },
        {
          feature_id: '7',
          feature_title: 'Mobile Deep Link Reporting',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          plan4: true,
          plan5: true,
          destil:
            'Reporting on mobile deep links i.e. app installs and performance of mobile deep links',
          type: 'feature'
        }
      ]
    },
    {
      id: '7',
      section_heading: 'Data Delivery',
      features: [
        {
          feature_id: '1',
          feature_title: 'API Rate Limit',
          plan1: 'Standard',
          plan2: 'Standard',
          plan3: 'Standard',
          plan4: 'Standard',
          plan5: 'Higher Limits Available',
          destil: `Share data between ${PRODUCT_NAME} and your other apps through our open API`,
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'Webhooks',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          // plan4: '',
          plan5: true,
          destil:
            'Capture and send notification in real-time on any click, enabling near-limitless workflows options',
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'Integrations',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: `Connect ${PRODUCT_NAME} to your marketing tools to create links directly from other platforms`,
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: 'SLA Uptime',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          // plan4: '',
          plan5: '99.9%',
          destil:
            'A service level agreement that guarantees top service and performance quality',
          type: 'feature'
        }
      ]
    },
    {
      id: '8',
      section_heading: 'Platform Access',
      features: [
        {
          feature_id: '1',
          feature_title: 'Web Browser Extensions',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil:
            'Shorten links right from Chrome, Firefox, or Edge with our browser extensions',
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'Mobile App',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil:
            'Shorten links and view metrics in our mobile apps for Android and iOS',
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'API v4',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil:
            '4th-generation API reduces complexity and streamlines integration with 3rd-party apps and solutions',
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: 'Device-Specific Web Access',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: `Securely access the ${PRODUCT_NAME} platform, optimized by device, using any web browser`,
          type: 'feature'
        }
      ]
    },
    {
      id: '9',
      section_heading: 'Admin Features',
      features: [
        {
          feature_id: '1',
          feature_title: 'Group Permissions',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          // plan4: '',
          plan5: true,
          destil: 'Place campaigns, users, or departments into distinct groups',
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'User Management',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          // plan4: '',
          plan5: true,
          destil: 'Control which groups and links your users have access to',
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'SSO Self-Service Setup',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          // plan4: '',
          plan5: true,
          destil: `Access ${PRODUCT_NAME} through your SSO provider in four simple steps done within minutes`,
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: '2-Factor Authentication (2FA)',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil:
            'Add a layer of protection by sending a security code to your mobile device upon login',
          type: 'feature'
        }
      ]
    },
    {
      id: '10',
      section_heading: 'Customer Success',
      features: [
        {
          feature_id: '1',
          feature_title: 'Help Center',
          plan1: true,
          plan2: true,
          plan3: true,
          plan4: true,
          plan5: true,
          destil: 'Find answers in our help articles',
          type: 'feature'
        },
        {
          feature_id: '2',
          feature_title: 'Support',
          // plan1: '',
          plan2: 'Basic',
          plan3: 'Basic',
          plan4: 'Basic',
          plan5: 'Priority',
          destil: 'Connect with our dedicated support team for assistance',
          type: 'feature'
        },
        {
          feature_id: '3',
          feature_title: 'Account Management',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          // plan4: '',
          plan5: 'Assigned',
          destil: `Unlock the most value from ${PRODUCT_NAME} with expert account manager support`,
          type: 'feature'
        },
        {
          feature_id: '4',
          feature_title: 'Onboarding & Setup',
          // plan1: '',
          // plan2: '',
          // plan3: '',
          // plan4: '',
          plan5: 'Personalized',
          destil: `Get your team up and running with help from our ${PRODUCT_NAME} experts`,
          type: 'feature'
        }
      ]
    }
  ];
