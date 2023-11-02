// Types
import { type ZaionsCardWithIconType } from '@/types/ZaionsCardWithIcon.type';

// Images
import { Checkmark } from '@/assets/images';
import { PRODUCT_NAME } from '@/utils/constants';

export const TrustAndSafetyResourcesData: ZaionsCardWithIconType[] = [
  {
    id: 1,
    icon: Checkmark,
    title: 'Privacy Policy',
    text: 'Understand our policies and procedures around your personal data.',
    btnText: 'View Our Privacy Policy →',
    routeLink: '/'
  },
  {
    id: 2,
    icon: Checkmark,
    title: 'Terms of Service',
    text: 'Our Terms of Service governs your access to, and use of, our platform.',
    btnText: 'View Our ToS →',
    routeLink: '/'
  },
  {
    id: 3,
    icon: Checkmark,
    title: 'Acceptable Use Policy',
    text: 'Our AUP establishes a code of conduct to help keep you safe from abuse.',
    btnText: 'View Our AUP →',
    routeLink: '/'
  },
  {
    id: 4,
    icon: Checkmark,
    title: 'Report Abuse',
    text: 'If you’ve encountered abusive behavior that violates our policies, please let us know.',
    btnText: 'File a Report →',
    routeLink: '/'
  },
  {
    id: 5,
    icon: Checkmark,
    title: 'Appeal a Decision',
    text: 'We do our best, but we’re not perfect. If you feel we’ve blocked a link in error, please let us know',
    btnText: 'File an Appeal →',
    routeLink: '/'
  },
  {
    id: 6,
    icon: Checkmark,
    title: 'Preview Links',
    text: `Do you want to see the destination of a link before you click? Just add a ‘+’ to your ${PRODUCT_NAME} link.`,
    btnText: 'Learn More →',
    routeLink: '/'
  }
];
