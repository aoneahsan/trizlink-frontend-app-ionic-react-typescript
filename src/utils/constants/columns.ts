import {
  ZMembersListPageTableColumnsIds,
  ZPixelsListPageTableColumnsIds,
  ZUTMTagsListPageTableColumnsIds
} from '@/types/AdminPanel/index.type';
import { ZLIBListPageTableColumnsIds } from '@/types/AdminPanel/linkInBioType';
import {
  ZShortLinkListPageTableColumnsEnum,
  ZShortLinkListPageTableColumnsIds
} from '@/types/AdminPanel/linksType';

export const ShortLinksTableColumns = [
  {
    id: ZShortLinkListPageTableColumnsIds.title,
    name: ZShortLinkListPageTableColumnsEnum.title,
    isVisible: true
  },
  // {
  // id: ZShortLinkListPageTableColumnsIds.click,
  // name: ZShortLinkListPageTableColumnsEnum.clicks,
  // isVisible: true,
  // },
  {
    id: ZShortLinkListPageTableColumnsIds.date,
    name: ZShortLinkListPageTableColumnsEnum.date,
    isVisible: true
  },
  {
    id: ZShortLinkListPageTableColumnsIds.status,
    name: ZShortLinkListPageTableColumnsEnum.status,
    isVisible: true
  },
  {
    id: ZShortLinkListPageTableColumnsIds.pixel,
    name: ZShortLinkListPageTableColumnsEnum.pixels,
    isVisible: true
  },
  {
    id: ZShortLinkListPageTableColumnsIds.notes,
    name: ZShortLinkListPageTableColumnsEnum.notes,
    isVisible: true
  },
  {
    id: ZShortLinkListPageTableColumnsIds.url,
    name: ZShortLinkListPageTableColumnsEnum.url,
    isVisible: true
  },
  {
    id: ZShortLinkListPageTableColumnsIds.linkToShare,
    name: ZShortLinkListPageTableColumnsEnum.linkToShare,
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
    id: ZPixelsListPageTableColumnsIds.formattedCreateAt,
    name: 'Create at',
    isVisible: true
  }
];

export const UtmTagTableColumns = [
  {
    id: ZUTMTagsListPageTableColumnsIds.templateName,
    name: 'Template name',
    isVisible: true
  },
  {
    id: ZUTMTagsListPageTableColumnsIds.campaign,
    name: 'Campaign',
    isVisible: true
  },
  {
    id: ZUTMTagsListPageTableColumnsIds.medium,
    name: 'Medium',
    isVisible: true
  },
  {
    id: ZUTMTagsListPageTableColumnsIds.content,
    name: 'Content',
    isVisible: true
  },
  {
    id: ZUTMTagsListPageTableColumnsIds.source,
    name: 'Source',
    isVisible: true
  },
  {
    id: ZUTMTagsListPageTableColumnsIds.term,
    name: 'Term',
    isVisible: true
  },
  {
    id: ZUTMTagsListPageTableColumnsIds.formattedCreateAt,
    name: 'Create at',
    isVisible: true
  }
];

export const MemberTableColumns = [
  {
    id: ZMembersListPageTableColumnsIds.email,
    name: 'Email',
    isVisible: true
  },
  {
    id: ZMembersListPageTableColumnsIds.role,
    name: 'Role',
    isVisible: true
  },
  {
    id: ZMembersListPageTableColumnsIds.status,
    name: 'Status',
    isVisible: true
  },
  {
    id: ZMembersListPageTableColumnsIds.invitedAt,
    name: 'Invited at',
    isVisible: true
  },
  {
    id: ZMembersListPageTableColumnsIds.invitedAcceptedAt,
    name: 'Invited accepted at',
    isVisible: true
  }
];

export const LinkInBioTableColumns = [
  {
    id: ZLIBListPageTableColumnsIds.title,
    name: ZLIBListPageTableColumnsIds.title,
    isVisible: true
  },
  {
    id: ZLIBListPageTableColumnsIds.date,
    name: ZLIBListPageTableColumnsIds.date,
    isVisible: true
  },
  {
    id: ZLIBListPageTableColumnsIds.pixel,
    name: ZLIBListPageTableColumnsIds.pixel,
    isVisible: true
  },
  {
    id: ZLIBListPageTableColumnsIds.linkToShare,
    name: ZLIBListPageTableColumnsIds.linkToShare,
    isVisible: true
  },
  {
    id: ZLIBListPageTableColumnsIds.actions,
    name: ZLIBListPageTableColumnsIds.actions,
    isVisible: true
  }
];
