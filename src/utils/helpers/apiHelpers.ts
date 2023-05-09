import { API_URL_ENUM } from '@/utils/enums'
import { getApiUrl } from '@/utils/helpers'
import {
  API_DYNAMIC_PARTS,
  uiAvatarApiDefaultParams
} from '@/utils/constants/apiConstants'

export const getUiAvatarApiUrl = ({
  name = uiAvatarApiDefaultParams.name,
  background = uiAvatarApiDefaultParams.background,
  bold = uiAvatarApiDefaultParams.bold,
  color = uiAvatarApiDefaultParams.color,
  fontSize = uiAvatarApiDefaultParams.fontSize,
  length = uiAvatarApiDefaultParams.length,
  rounded = uiAvatarApiDefaultParams.rounded,
  size = uiAvatarApiDefaultParams.size
}) => {
  const _uiAvatar = API_DYNAMIC_PARTS.externalAPIs.uiAvatarAPI
  return getApiUrl(
    API_URL_ENUM.uiAvatarAPI,
    [name, background, bold, color, fontSize, length, rounded, size],
    [
      _uiAvatar.name,
      _uiAvatar.background,
      _uiAvatar.bold,
      _uiAvatar.color,
      _uiAvatar.fontSize,
      _uiAvatar.length,
      _uiAvatar.rounded,
      _uiAvatar.size
    ],
    false,
    true
  )
}
