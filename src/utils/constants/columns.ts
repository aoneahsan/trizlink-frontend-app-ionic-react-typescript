import { ZPixelsListPageTableColumnsIds } from '@/types/AdminPanel/index.type';
import { ZShortLinkListPageTableColumnsIds } from '@/types/AdminPanel/linksType';

export const ShortLinksTableColumns = [
  {
    id: ZShortLinkListPageTableColumnsIds.title,
    name: 'Title',
    isVisible: true
  },
  // {
  // 	id: ZShortLinkListPageTableColumnsIds.click,
  // 	name: ZShortLinkListPageTableColumnsEnum.clicks,
  // 	isVisible: true,
  // },
  {
    id: ZShortLinkListPageTableColumnsIds.date,
    name: 'Date',
    isVisible: true
  },
  {
    id: ZShortLinkListPageTableColumnsIds.pixel,
    name: 'Pixel',
    isVisible: true
  },
  {
    id: ZShortLinkListPageTableColumnsIds.notes,
    name: 'Notes',
    isVisible: true
  },
  {
    id: ZShortLinkListPageTableColumnsIds.url,
    name: 'URL',
    isVisible: true
  },
  {
    id: ZShortLinkListPageTableColumnsIds.linkToShare,
    name: 'Link to share',
    isVisible: true
  }
];

export const PixelTableColumns = [
  {
    id: ZPixelsListPageTableColumnsIds.title,
    name: 'Title',
    isVisible: true
  },
  {
    id: ZPixelsListPageTableColumnsIds.pixelId,
    name: 'Pixel id',
    isVisible: true
  },
  {
    id: ZPixelsListPageTableColumnsIds.platform,
    name: 'Platform',
    isVisible: true
  },
  {
    id: ZPixelsListPageTableColumnsIds.createAt,
    name: 'Create at',
    isVisible: true
  }
];
