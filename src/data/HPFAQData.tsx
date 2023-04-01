// Core Imports

// Packages Imports

// Custom Imports
import { ZaionsHPFAQType } from '@/types/ZionsHPFAQType';
import { PRODUCT_DOMAIN, PRODUCT_NAME } from '@/utils/constants';

export const HPFAQData: ZaionsHPFAQType[] = [
  {
    id: '1',
    title: 'What is a URL shortener?',
    content: `A URL shortener, also known as a link shortener, seems like a simple tool, but it is a service that can have a dramatic impact on your marketing efforts.

    Link shorteners work by transforming any long URL into a shorter, more readable link. When a user clicks the shortened version, they’re automatically forwarded to the destination URL.
    
    Think of a short URL as a more descriptive and memorable nickname for your long webpage address. You can, for example, use a short URL like ${PRODUCT_DOMAIN}/Celebrate${PRODUCT_NAME} so people will have a good idea about where your link will lead before they click it.
    
    If you’re contributing content to the online world, you need a URL shortener.
    
    Make your URLs stand out with our easy to use free link shortener above.`,
  },
  {
    id: '2',
    title: 'Benefits of a short URL',
    content: `How many people can even remember a long web address, especially if it has tons of characters and symbols? A short URL can make your link more memorable. Not only does it allow people to easily recall and share your link with others, it can also dramatically improve traffic to your content.

    On a more practical side, a short URL is also easier to incorporate into your collateral – whether you’re looking to engage with your customers offline or online.
    
    ${PRODUCT_NAME} is the best URL shortener for everyone, from influencers to small brands to large enterprises, who are looking for a simple way to create, track and manage their links.`,
    button: 'Find a plan that works for you',
  },
];
