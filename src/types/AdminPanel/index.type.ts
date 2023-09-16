import { IonReorderGroupCustomEvent } from '@ionic/core';
import { LinkFolderType, TimeFilterEnum } from './linksType/index';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ItemReorderEventDetail } from '@ionic/react';

// Enum's
export enum FormMode {
  ADD = 'add',
  EDIT = 'edit'
}

export enum folderState {
  shortlink = 'shortlink',
  linkInBio = 'linkInBio'
}

export enum messengerPlatformsBlockEnum {
  email = 'email',
  link = 'link',
  whatsapp = 'whatsapp',
  messenger = 'messenger',
  call = 'call',
  sms = 'sms',
  telegram = 'telegram',
  skype = 'skype',
  wechat = 'wechat',
  line = 'line',
  viber = 'viber',
  default = 'default'
}

export enum AdminPanelSidebarMenuPageEnum {
  shortLink = 'shortLink',
  linkInBio = 'linkInBio',
  integration = 'integration',
  helpCenter = 'helpCenter',
  settings = 'settings',
  workspaces = 'workspaces'
}

export enum daysEnum {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
  weekday = 'weekday',
  weekends = 'weekends',
  allDays = 'allDays'
}

export enum ZUserSettingTypeEnum {
  shortLinkListPageTable = 'shortLinkListPageTable',
  pixelListPageTable = 'pixelListPageTable',
  UTMTagListPageTable = 'UTMTagListPageTable'
}

export enum ZNotificationEnum {
  newDeviceLogin = 'newDeviceLogin',
  lastLogout = 'lastLogout',
  wsTeamMemberInvitation = 'wsTeamMemberInvitation'
}

export enum ZTeamMemberInvitationEnum {
  pending = 'pending',
  resend = 'resend',
  active = 'active',
  suspended = 'suspended',
  blocked = 'blocked',
  accepted = 'accepted',
  rejected = 'rejected'
}

export enum EZGeoLocationCondition {
  equalTo = 'equalTo',
  within = 'within',
  notEqualTo = 'notEqualTo',
  notWithin = 'notWithin'
}

export enum ZPixelsListPageTableColumnsIds {
  id = '__z_pixels_id__',
  title = '__z_pixels_title__',
  createAt = '__z_pixels_create_at__',
  formattedCreateAt = '__z_pixels_formatted_create_at__',
  pixelId = '__z_pixels_pixel_id__',
  platform = '__z_pixels_platform__',
  actions = '__z_pixels_actions__'
}

export enum ZUTMTagsListPageTableColumnsIds {
  id = '__z_utm_tags_id__',
  templateName = '__z_utm_tags_title_name__',
  campaign = '__z_utm_tags_campaign__',
  medium = '__z_utm_tags_medium__',
  content = '__z_utm_tags_content__',
  source = '__z_utm_tags_source__',
  term = '__z_utm_tags_term__',
  formattedCreateAt = '__z_utm_tags_formatted_create_at__',
  actions = '__z_utm_tags_actions__'
}

// Interfaces
export interface UTMTagInfoInterface {
  templateId?: string;
  utmCampaign?: string;
  utmMedium?: string;
  utmSource?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface IFilterOptions {
  timeFilter: {
    daysToSubtract: TimeFilterEnum;
    startedAt?: string;
    endAt?: string;
  };
  searchQuery?: string | null;
  platform?: string;
}
export interface IZNotification {
  id?: string;
  ZLInviteeId?: string;
  zlNotificationType?: ZNotificationEnum;
  read_at?: string | null;
  createdAt?: string;
  updatedAt?: string;
  data: {
    item: {
      userId: string;
      message: string;
      inviter: string;
      inviterUserId: string;
      teamId: string;
      teamName: string;
      wsTeamMemberInviteId: string;
    };
  };
}

export interface ShortUrlInterface {
  domain?: string;
  url?: string;
}

export interface TimeSlotInterface {
  id?: string;
  time: string;
  day: daysEnum;
  color: string;
  isActive?: boolean;
}

export interface LabelInterface {
  id?: string;
  title?: string;
  postsCount?: string;
  color: string;
  isActive?: boolean;

  editMode?: boolean; // just for frontend.
}

export interface ABTestingRotatorInterface {
  id?: string;
  redirectionLink?: string;
  percentage?: number;
}

export interface GeoLocationRotatorInterface {
  id?: string;
  redirectionLink?: string;
  country?: string | string[];
  condition?: EZGeoLocationCondition;
}

export interface LinkExpirationInfoInterface {
  expirationDate?: string;
  timezone?: string;
  redirectionLink?: string;
  enabled?: boolean;
}

export interface PasswordInterface {
  value?: string;
  password?: string;
  enabled?: boolean;
}

export interface ZDashboardFolderMenuInterface {
  type: AdminPanelSidebarMenuPageEnum;
  foldersData: LinkFolderType[];
  showFoldersSaveReorderButton?: boolean;
  handleFoldersReorder?: (
    event: IonReorderGroupCustomEvent<ItemReorderEventDetail>
  ) => void;
  addNewFolderButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  foldersSaveReorderButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  folderActionsButtonOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  showSkeleton?: boolean;
}

export interface ZUserSettingInterface {
  id?: string;
  type?: ZUserSettingTypeEnum;
  workspaceUniqueId?: string;
  settings: {
    columns: {
      id?: string;
      name: string;
      isVisible: boolean;
      orderNumber: number;
    }[];
    columnOrderIds: string[];
    filters: {
      time: TimeFilterEnum;
      startDate: string;
      endDate: string;
    };
  };
}

// Types
export type genericZaionsRSelectOptions = ZaionsRSelectOptions[] | undefined;
