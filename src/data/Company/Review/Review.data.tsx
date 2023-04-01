// Type
import { ZaionsReviewType } from 'types/Company/ReviewsPage/Review.type';

// Images
import { MustafaA, DrReneeM, PaulaC, starsQuoteWidget } from 'assets/images';
import { PRODUCT_NAME } from 'utils/constants';

export const ZaionsReviewData: ZaionsReviewType[] = [
  {
    id: '1',
    userLink: 'https://www.g2.com/users/4bee22f7-fb7e-43fa-8edc-c0724f9f867e',
    userAvater: MustafaA,
    userName: 'Mustafa A.',
    title: 'A good tool for creating a short URL.',
    reviewStars: starsQuoteWidget,
    date: '10/09/2022',
    userMessage: `I like the way ${PRODUCT_NAME} shortens the link which is very useful when you have to post that link on Social Media platform. I would suggest people use this tool. Very helpful.`,
    fullReviewLink: '/',
  },
  {
    id: '2',
    userLink: 'https://www.g2.com/users/8834ff44-dfdc-4619-9e88-63ca9c8b487f',
    userAvater: DrReneeM,
    userName: 'Dr. Reneé M..',
    userAbout: 'Content Creator, Host, Author, Doctor, Media Expert',
    title: `Been using ${PRODUCT_NAME} for YEARS!!`,
    reviewStars: starsQuoteWidget,
    date: '05/03/2022',
    userMessage: `I love that custom url! Most people don't realize I am using ${PRODUCT_NAME} because of my custom url`,
    fullReviewLink: '/',
  },
  {
    id: '3',
    userName: 'Verified User in Marketing and Advertising',
    title: 'Essential for Social Media!',
    reviewStars: starsQuoteWidget,
    date: '10/12/2022',
    userMessage: `When our team needs to post on our social media channels, ${PRODUCT_NAME} is so essential! Sometimes, we need to include links in our posts. However, social media channels don't allow us to hyperlink links, so with ${PRODUCT_NAME}, we are able to shorten URLs and include them within our posts`,
    fullReviewLink: '/',
  },
  {
    id: '4',
    userLink: '/',
    userAvater: PaulaC,
    userName: 'Paula C.',
    title: 'Great functionality, use all the time.',
    reviewStars: starsQuoteWidget,
    date: '05/27/2022',
    userMessage: `We upload our long URLs and create shortened custom ${PRODUCT_NAME} links. We also generate QR codes. it works well. It's straightforward and flexible. I haven't had to try other tools - this meets our needs!`,
    fullReviewLink: '/',
  },
];
