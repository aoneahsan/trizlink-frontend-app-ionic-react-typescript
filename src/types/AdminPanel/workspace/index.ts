import { type UserAccountType } from '@/types/UserAccount/index.type';
import { type ReactNode } from 'react';
import { type ZTeamMemberInvitationEnum } from '../index.type';

// Enum's
export enum workspaceSettingsModalTabEnum {
  timetable = 'timetable',
  labels = 'labels',
  settings = 'settings',
  approvals = 'approvals'
}

export enum WorkspaceSharingTabEnum {
  invite = 'invite',
  members = 'members',
  permissions = 'permissions',
  notifications = 'notifications'
}

export enum workspaceFormTabEnum {
  workspaceDetailForm = 'workspaceDetailForm',
  inviteClients = 'inviteClients',
  connectPages = 'connectPages',
  Approval = 'Approval'
}

export enum WSRolesNameEnum {
  Administrator = 'Administrator',
  Manager = 'Manager',
  Contributor = 'Contributor',
  Writer = 'Writer',
  Approver = 'Approver',
  Commenter = 'Commenter',
  Guest = 'Guest'
}

export enum workspaceFormPermissionEnum {
  team = 'team',
  client = 'client'
}

export enum PageInfoCardItemTypeEnum {
  heading = 'heading',
  infoMessage = 'infoMessage',
  simpleCard = 'simpleCard',
  listCard = 'listCard'
}

export enum workspaceFormConnectPagesEnum {
  facebook = 'facebook',
  twitter = 'twitter',
  instagram = 'instagram',
  linkedin = 'linkedin',
  googleBusiness = 'googleBusiness',
  youtube = 'youtube',
  tiktok = 'tiktok',
  pinterest = 'pinterest',
  universalContent = 'universalContent'
}

export enum workspacePostDetailTabEnum {
  desktop = 'desktop',
  mobile = 'mobile'
}

export enum workspaceFormConnectPagesCardEnum {
  page = 'page', // page or profile
  group = 'group',
  mockup = 'mockup',
  businessPages = 'businessPages',
  companyPage = 'companyPage',
  channel = 'channel',
  account = 'account'
}

export enum workspaceApprovalCardEnum {
  none = 'none',
  optional = 'optional',
  required = 'required',
  multiLevel = 'multiLevel'
}

export enum contentStyleInterface {
  default = 'default',
  classic = 'classic',
  modern = 'modern',
  compact = 'compact'
}

export enum workspaceViewNotificationsEnum {
  approvalRequests = 'approvalRequests',
  updates = 'updates'
}

export enum workspaceFilterAccordionEnum {
  approvalStatus = 'approvalStatus',
  postStatus = 'postStatus',
  feedbackAndActivity = 'feedbackAndActivity',
  labels = 'labels',
  period = 'period',
  postType = 'postType',
  content = 'content',
  author = 'author'
}

export enum workspaceFilterAccordionContentEnum {
  checkbox = 'checkbox',
  radio = 'radio'
}

// WS -> workspace
export enum ZWSTeamListPageTableColumnsIds {
  id = '__z_short_link_id__',
  title = '__z_short_link_title__',
  description = '__z_short_link_description__',
  member = '__z_short_link_member__',
  isActive = '__z_short_link_isActive__',
  date = '__z_short_link_date__',
  actions = '__z_short_link_actions__'
}

// Sect means section
export enum WSSettingsPageSect {
  accountSetting = 'accountSetting', // Account settings
  workspaceSettings = 'workspaceSettings' // workspace settings
}

export enum WSSettingsPageSectTab {
  team = 'team',
  referralProgram = 'referralProgram',
  billing = 'billing',
  user = 'user'
}

// Interfaces
export interface workspaceInviteClientInterface {
  avatar?: string;
  email?: string;
  role: WSRolesNameEnum;
  permission: workspaceFormPermissionEnum;
}

export interface workspaceTeamInterface {
  id?: string;
  title: string;
  description: string;
  membersCount: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface WSTeamMembersInterface {
  id?: string;
  // username: string;
  email: string;
  accountStatus: string;
  invitedAt: string;

  inviteAcceptedAt: string;
  inviteRejectedAt?: string;
  accountStatusUpdaterRemarks: string;
  accountStatusLastUpdatedBy: string;
  resendAllowedAfter: string;
  isFavorite?: boolean;
  memberRole: {
    id?: string;
    name?: WSRolesNameEnum;
  };
  team: {
    id?: string;
    title: string;
  };
  workspace?: {
    id?: string;
    workspaceName?: string;
    workspaceTimezone?: string;
    // workspaceData;
    workspaceImage?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  shortUrlId?: string;
  sortOrderNo: string;
  isActive: boolean;
  createdAt?: string;
  formattedCreatedAt?: string;
  updatedAt?: string;
}

export interface workspaceInterface {
  id?: string;
  workspaceName?: string;
  isFavorite?: boolean | number;
  workspaceTimezone?: string;
  workspaceImage?: string;
  internalPost?: boolean;
  clients?: workspaceInviteClientInterface[];
  user: UserAccountType;
  createdAt?: string;
  updatedAt?: string;
}

export interface wsShareInterface extends workspaceInterface {
  workspaceId?: string;
  accountStatus?: ZTeamMemberInvitationEnum;
}

export interface ApprovalCardInterface {
  icon: string;
  title: ReactNode;
  subtitle: string;
  cardType: workspaceApprovalCardEnum;
}

// Pages info cards items types/enums
export interface WorkspacePageCardInfoPopoverItemType {
  type: PageInfoCardItemTypeEnum;
  text?: string;
  htmlContent?: string;
  items?: PageInfoCardSingleItemType[];
}
export interface PageInfoCardSingleItemType {
  icon: string;
  heading: string;
  subheading?: string;
  listItems?: Array<{
    icon: string;
    text: string;
  }>;
}

// Types
