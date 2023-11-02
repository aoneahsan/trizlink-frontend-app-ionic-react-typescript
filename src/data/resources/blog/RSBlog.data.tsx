import {
  benefitsOfSmsMarketing,
  blogAdWeelHero,
  blogHero,
  blogMobileApp,
  blogNewUIHero,
  heroImageDesktop,
  heroQ3Features,
  Q22022ProductFeaturesBlog,
  QRCodeIndexBlogLarge,
  trustSafety
} from '@/assets/images';
import { type Zaions4By4GridSysType } from '@/types/InPageComponentTypes/Zaions4By4GridSys.type';
import { PRODUCT_NAME } from '@/utils/constants';

export const RSBlogData: Zaions4By4GridSysType[] = [
  {
    id: 1,
    title: `Advertising Week: How ${PRODUCT_NAME} QR Codes Boosted Marvel’s Marketing`,
    label: 'Webinar',
    text: 'Marvel brought fans a bit closer online and offline to their superheroes with QR Codes.',
    image: blogAdWeelHero,
    link: '/',
    size: '4'
  },
  {
    id: 2,
    title: '2022 Q3 Product Features: Quarterly Blog',
    label: `${PRODUCT_NAME} News`,
    text: `Find out about all the latest happenings at ${PRODUCT_NAME}.`,
    image: heroQ3Features,
    link: '/',
    size: '4'
  },
  {
    id: 3,
    title: 'More Great Features for Free? Yes, Please!',
    label: `${PRODUCT_NAME} News`,
    text: 'As summer in many areas of the world starts to wind down and kids make their way back to...',
    image: heroImageDesktop,
    link: '/',
    size: '4'
  },
  {
    id: 4,
    title: `The ${PRODUCT_NAME} Connections Platform Gets a Makeover`,
    label: `${PRODUCT_NAME} News`,
    text: 'A year ago, we embarked on a journey to create a first-of-its-kind platform that would seamlessly combine all of...',
    image: blogNewUIHero,
    link: '/',
    size: '4'
  },
  {
    id: 5,
    title: '11 Proven Benefits of SMS Marketing',
    label: 'Mobile',
    text: 'SMS marketers know the power of this uniquely personal channel. Two-thirds of them reported that it “significantly” or “overwhelmingly”...',
    image: benefitsOfSmsMarketing,
    link: '/',
    size: '4'
  },
  {
    id: 6,
    title: 'Meet the Trust & Safety Team: Mavreen Smiel',
    label: `${PRODUCT_NAME} News`,
    text: `This post is the second in a series highlighting ${PRODUCT_NAME}’s Trust & Safety (T&S) efforts. In our previous post,...`,
    image: trustSafety,
    link: '/',
    size: '4'
  },
  {
    id: 7,
    title: '2022 Q2 Mobile App Updates',
    label: 'Mobile',
    text: 'Mobile phones have gone from modern luxury to the ultimate necessity for today’s consumer. Whether you’re a small business,...',
    image: blogMobileApp,
    link: '/',
    size: '4'
  },
  {
    id: 8,
    title: `“${PRODUCT_NAME} ❤️’s Interns”: Happy National Intern Day! Get To Know the ${PRODUCT_NAME} Interns`,
    label: `${PRODUCT_NAME} News`,
    text: `At ${PRODUCT_NAME}, Interns are valued and integral members of the team. ${PRODUCT_NAME} Interns bring a fresh perspective, innovative ideas,...`,
    image: blogHero,
    link: '/',
    size: '4'
  },
  {
    id: 9,
    title: `New! ${PRODUCT_NAME} QR Code Index H1 2022`,
    label: `${PRODUCT_NAME} News`,
    text: 'Discover the key trends and behaviors that are driving QR code creation and use cases during the first two...',
    image: QRCodeIndexBlogLarge,
    link: '/',
    size: '4'
  },
  {
    id: 10,
    title: '2022 Q2 Product Features: Quarterly Blog',
    label: `${PRODUCT_NAME} News`,
    text: `Another quarter has passed and ${PRODUCT_NAME} has continued to deliver features that solve our customers’ most pressing pain points–we...`,
    image: Q22022ProductFeaturesBlog,
    link: '/',
    size: '4'
  }
];
