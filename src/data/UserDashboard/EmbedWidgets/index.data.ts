import {
  EmbedWidgetsDisplayAtEnum,
  EmbedWidgetsPositionEnum,
  EmbedWidgetsType,
} from '@/types/AdminPanel/linksType';

export const EmbedWidgetsData: EmbedWidgetsType[] = [
  {
    id: '1',
    name: 'Default Widgets 1',
    HTMLCode: '<h1>Defalut Widgets No 1</h1>',
    jsCode: 'Just a script tag for Defalut Widgets No 1',
    displayAt: EmbedWidgetsDisplayAtEnum.Landing,
    position: EmbedWidgetsPositionEnum.CenterCenter,
    animation: true,
    closingOption: true,
  },
  {
    id: '2',
    name: 'Default Widgets 2',
    HTMLCode: '<h1>Defalut Widgets No 2</h1>',
    jsCode: 'Just a script tag Defalut Widgets No 2',
    displayAt: EmbedWidgetsDisplayAtEnum.Delay,
    delay: '60',
    position: EmbedWidgetsPositionEnum.TopStart,
    animation: false,
    closingOption: true,
  },
  {
    id: '3',
    name: 'Default Widgets 3',
    HTMLCode: '<h1>Defalut Widgets No 3</h1>',
    jsCode: 'Just a script tag Defalut Widgets No 3',
    displayAt: EmbedWidgetsDisplayAtEnum.Exit,
    position: EmbedWidgetsPositionEnum.BottomEnd,
    animation: true,
    closingOption: false,
  },
];
