import {
  call,
  callOutline,
  chatbubbleEllipsesOutline,
  chatbubbleOutline,
  chatbubblesOutline,
  link,
  logoSkype,
  logoWechat,
  logoWhatsapp,
  mailOutline,
  sendOutline,
} from 'ionicons/icons';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';
import { ShortUrlLinkOptionType } from '@/types/AdminPanel/linksType';

export const LinkTypeOptionsData: ShortUrlLinkOptionType[] = [
  {
    id: '1',
    icon: {
      iconName: link,
      // iconType:
    },
    text: 'Link',
    type: messengerPlatformsBlockEnum.link,
  },
  {
    id: '2',
    icon: { iconName: logoWhatsapp },
    text: 'Whatsapp',
    type: messengerPlatformsBlockEnum.whatsapp,
  },
  {
    id: '3',
    icon: { iconName: call },
    text: 'Call',
    type: messengerPlatformsBlockEnum.call,
  },
  {
    id: '4',
    icon: { iconName: sendOutline },
    text: 'Telegram',
    type: messengerPlatformsBlockEnum.telegram,
  },
  {
    id: '5',
    icon: { iconName: logoWechat },
    text: 'Wechat',
    type: messengerPlatformsBlockEnum.wechat,
  },
  {
    id: '6',
    icon: { iconName: callOutline },
    text: 'Viber',
    type: messengerPlatformsBlockEnum.viber,
  },
  {
    id: '7',
    icon: { iconName: mailOutline },
    text: 'Email',
    type: messengerPlatformsBlockEnum.email,
  },
  {
    id: '8',
    icon: { iconName: chatbubbleEllipsesOutline },
    text: 'Messenger',
    type: messengerPlatformsBlockEnum.messenger,
  },
  {
    id: '9',
    icon: { iconName: chatbubblesOutline },
    text: 'Sms',
    type: messengerPlatformsBlockEnum.sms,
  },
  {
    id: '10',
    icon: { iconName: logoSkype },
    text: 'Skype',
    type: messengerPlatformsBlockEnum.skype,
  },
  {
    id: '11',
    icon: { iconName: chatbubbleOutline },
    text: 'Line',
    type: messengerPlatformsBlockEnum.line,
  },
];
