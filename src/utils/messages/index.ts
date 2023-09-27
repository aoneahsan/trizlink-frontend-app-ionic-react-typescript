import CONSTANTS from '@/utils/constants';

const GENERAL = {
  FILE: {
    UPLOADED: 'Mission accomplished! Your file is securely in place.',
    FILE_DELETED_SUCCESS_MESSAGE: 'File deleted successfully.'
  },
  OTP: {
    SEND_SUCCESSFULLY:
      'Drumroll, please! Your OTP has just embarked on its journey to your inbox.',
    CONFIRMED:
      'Your OTP just passed the final test! Your email is now officially confirmed.'
  },
  FOLDER: {
    NEW_FOLDER_CREATED_SUCCEED_MESSAGE:
      "Ta-da! You've just welcomed a new folder to the digital family! It's ready to organize like a pro!",
    FOLDER_UPDATED_SUCCEED_MESSAGE:
      'Update complete! Your folder is updated successfully.',
    FOLDER_DELETED_SUCCEED_MESSAGE:
      'Farewell, dear folder! It served us well in the grand scheme of organization! Onward to new digital categorizing adventures!'
  },
  EMBED_WIDGET: {
    NEW_EMBED_WIDGET_CREATED_SUCCEED_MESSAGE:
      'Embed widget created successfully.',
    EMBED_WIDGET_UPDATED_SUCCEED_MESSAGE: 'Embed widget updated successfully.',
    EMBED_WIDGET_DELETED_SUCCEED_MESSAGE: 'Embed widget deleted successfully.'
  },
  INVALID_REQUEST: 'invalid request.',
  LOADING: 'Please wait a minute, Loading...',
  SUCCESS: 'Request completed.',
  SUCCESS_SUBHEADING: 'Request completed Successfully.',
  SUCCESS_MESSAGE: 'Your Request completed Successfully!',
  REGISTER_USER_SUCCESSED:
    "Congratulations! You've officially joined the digital squad! Welcome aboard!",
  LOGIN_SUCCESSFULLY:
    "Welcome back, digital explorer! You're now officially logged in and ready for new adventures!",
  LOGOUT_SUCCESSFULLY:
    "Farewell for now, digital adventurer! You've successfully logged out. Until our next journey together!",
  SOMETHING_WENT_WRONG:
    "Houston, we have a problem! Something didn't quite go as planned.",
  FAILED: 'Request Failed.',
  FAILED_SUBHEADING: 'Something went wrong :(',
  FAILED_MESSAGE: 'Error Occurred, request failed, please try again.',
  NOT_FOUND: 'Item not found!',
  FORM: {
    INVALID: 'Form is Invalid, Please fill all required form fields first.',
    FIELDS_INVALID: {
      NAME: 'Please enter a Name it is required.',
      Email: 'Please enter a email it is required.',
      NOT_VALID_Email: 'Email not valid! Please enter a valid email address.'
    },
    API_KEY_REQUIRED: 'API name is required',
    PASSWORD_NOT_MATCH: 'Password does not match. please try again!'
  },
  DELETE_USER_ACCOUNT_CONFIRM: 'Please type the phrase exactly as it appears.',
  DELETE_USER_ACCOUNT_REASON: 'Please specify reason!',
  INVALID_USERDATA: 'Invalid user data found!',
  DELETING_ACCOUNT: 'Deleting your account...',
  USER_ACCOUNT_SUCCESS_DELETE_MESSAGE: 'Account deleted Successfully.',
  INVALID_AUTH_TOKEN:
    'Invalid or no auth token found, please try again or login again.',
  API_REQUEST: {
    FETCHING: 'Fetching up-to-date data...',
    FETCHING_SINGLE_DATA: 'Fetching data...',
    CREATING: 'Creating a new record...',
    UPDATING: 'Updating the record data...',
    DELETING: 'Deleting the record...'
  },
  PROCESSING_LOGIN: 'Processing login request...',
  UNAUTHENTICATED: 'Unauthenticated, Please login to continue.',

  // This message we will use in public, private routes component suspense.
  ROUTE_FALLBACK_SUSPENSE_MESSAGE: 'Loading...'
};

// All login messages
const Login = {
  // #region Login expired messages
  // "Looks like your login credentials took an extended vacation! Please log in again for a fresh start."
  // "Time flies when you're logged in! Your session has gracefully retired. Kindly sign in anew!"
  // "Oops! It seems like your login pass has decided to take a coffee break. Please reauthenticate."
  // "Your login magic has fizzled out. No worries, just a quick login pit stop required!"
  // "Your login passport needs a little refreshment. Let's get you checked in once more!"
  // #endregion
  loginExpiredMessage:
    'Oops! It seems like your login pass has decided to take a coffee break. Please reauthenticate.'
};

// All Forms Related Validation Messages
const FORM_VALIDATIONS = {
  // Pixel Accounts Validation Messages
  PIXEL_ACCOUNTS: {
    PLATFORM_REQUIRED: 'Platform is required.',
    TITLE_REQUIRED: 'Title is required.',
    PIXEL_ID_REQUIRED: 'Pixel Account ID is required.',
    FACEBOOK: {
      WORD_COUNT: `Please Enter Correct Facebook Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.FACEBOOK.WORD_COUNT} Digits.`
    },
    GOOGLE_ANALYTICS: {
      WORD_COUNT: `Please Enter Correct Google Analytics Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS.WORD_COUNT} Digits.`,
      SHOULD_INCLUDE: `Please Enter Correct Google Analytics Pixel ID - Should Include "${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS.SHOULD_INCLUDE.toUpperCase()}".`
    },
    LINKEDINANDBING: {
      WORD_COUNT: `Please Enter Correct Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.LINKEDINANDBING.WORD_COUNT} Digits.`
    },
    TWITTER: {
      WORD_COUNT: `Please Enter Correct Twitter Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.TWITTER.WORD_COUNT} Digits.`
    },
    GOOGLE_ADS: {
      WORD_COUNT: `Please Enter Correct Google Ads Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ADS.WORD_COUNT} Digits.`
    },
    GOOGLE_TAG_MANAGER: {
      WORD_COUNT: `Please Enter Correct Google Tag Manager Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER.WORD_COUNT} Digits.`,
      SHOULD_INCLUDE: `Please Enter Correct Google Tag Manager Pixel ID - Should Start With "${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER.SHOULD_INCLUDE.toUpperCase()}".`
    },
    QUORA: {
      WORD_COUNT: `Please Enter Correct Quora Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.QUORA.WORD_COUNT} Digits.`
    },
    SNAPCHAT: {
      WORD_COUNT: `Please Enter Correct Snapchat Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.SNAPCHAT.WORD_COUNT} Digits.`
    },
    PINTEREST: {
      WORD_COUNT: `Please Enter Correct Pinterest Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.PINTEREST.WORD_COUNT} Digits.`
    },
    TIKTOK: {
      WORD_COUNT: `Please Enter Correct Tiktok Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.TIKTOK.WORD_COUNT} Digits.`
    },
    VK: {
      WORD_COUNT: `Please Enter Correct Vk Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.VK.WORD_COUNT} Digits.`,
      SHOULD_INCLUDE: `Please Enter Correct VK Pixel ID - Should Start With "${CONSTANTS.PIXEL_ACCOUNTS.VK.SHOULD_INCLUDE.toUpperCase()}".`
    }
  },

  // Short Link Error Message
  LINK: {
    TITLE: 'Short link title is required.',
    TARGET: {
      URL_INVALID: 'Short link target url is not valid.',
      URL_INCORRECT_FORMATE:
        'Please enter a valid URL! like (https://yourlink.com) or (http://yourlink.com).',
      URL_REQUIRED: 'URL is required.',
      PHONE_NUMBER_REQUIRED: 'Short link target phone number is require.',
      INVALID_PHONE_NUMBER: 'Short link target phone number is require.',
      USERNAME_REQUIRED: 'Short link target username is require.',
      EMAIL_REQUIRED: 'Short link target email is require.',
      INVALID_EMAIL: 'Please Add a valid email address.',
      REQUIRED_ACCOUNT_ID: 'Short link target account id is required.',
      REQUIRED_SUBJECT: 'Short link target subject is required.',
      REQUIRED_MESSAGE: 'Short link target message is required.'
    },
    REQUIRED_PASSWORD: 'Short link password is required.',
    REQUIRED_FOLDER: 'Short link folder is required.',
    ROTATOR_AB_TESTING: {
      REQUIRED_REDIRECTION_LINK: 'Rotator redirection link is required.',
      INVALID_REDIRECTION_LINK:
        'Please enter a valid redirection link like (https://yourredirectionlink.com) or (http://yourredirectionlink.com).',
      REQUIRED_PERCENTAGE: 'Rotator percentage is required.'
    },
    GEOLOCATION: {
      REQUIRED_REDIRECTION_LINK: 'Geo Location redirection link is required.',
      INVALID_REDIRECTION_LINK:
        'Please enter a valid redirection link like (https://yourgeolocationlink.com) or (http://yourgeolocationlink.com).',
      REQUIRED_COUNTRY: 'Geo location country is required.'
    }
  },

  // Link Expiration Error Message
  LINK_EXPIRATION_INFO: {
    redirectionLink: 'Link Expiration redirection link is require'
  }
};

const USER = {
  ADD_EMAIL:
    'Congratulations on taking the first step! A verification code has been sent to your new email.',
  CONFIRMED_OTP: 'Boom! Your email just leveled up to verified status.',
  RESEND_OTP: 'Resent! Look out for the fresh verification code in your email.',
  RESEND_OTP_API: 'Resend OTP (One-time-password)',
  CONFIRM_OTP_API: 'Confirming OTP (One-time-password)',
  DELETED: 'The email has left the building!',
  MAKE_EMAIL_PRIMARY_API_LOADER: 'Making email primary...',
  EMAIL_PRIMARY_SUCCESS:
    "Congratulations! You've just promoted an email to 'Chief of Communication'!",

  DELETE_ALERT: {
    HEADER: 'Final Check: Deleting email',
    SUB_HEADER: 'Confirm Your Move!',
    MESSAGES:
      "Deleting this email means it's gone forever. Are you certain this is what you want?"
  }
};

const MODALS = {
  EMBED_WIDGETS_MODAL: {
    CUSTOM_HTML: 'Please enter a Custom HTML code it is required.',
    CUSTOM_Javascript: 'Please enter a Custom Javascript code it is required.',
    DELAY: 'Please enter a delay seconds it is required.'
  }
};

const SHORT_LINKS = {
  CREATED:
    'Short, sweet, and ready to meet the world! Your link is good to go!',
  UPDATED: 'Update complete! Your short link is now rocking a whole new look!',
  DELETE: 'The link has left the building! Elvis would be proud!',
  FILTERING:
    'Hold on while we sift through the short link. Our short link detectives are on the case! 🕵️‍♂️',

  DELETE_ALERT: {
    HEADER: 'Final Check: Deleting Short link',
    SUB_HEADER: 'Confirm Your Move!',
    MESSAGES:
      "Deleting this short link means it's gone forever. Are you certain this is what you want?"
  }
};

const LINK_IN_BIO = {
  CREATED:
    "Bingo! Your link-in-bio has sprouted wings and is now ready for some customization magic! Let's get creative!",
  UPDATED: 'Update complete! Your link-in-bio is now rocking a whole new look!',
  DELETE:
    'Adios, little link-in-bio! It served us well! Farewell, dear friend!',
  FILTERING:
    'Hold on while we sift through the link-in-bios. Our link-in-bio detectives are on the case! 🕵️‍♂️',

  DELETE_ALERT: {
    HEADER: 'Final Check: Deleting Link-in-bio',
    SUB_HEADER: 'Confirm Your Move!',
    MESSAGES:
      "Deleting this link-in-bio means it's gone forever. Are you certain this is what you want?"
  }
};

const MEMBER = {
  INVITE_SEND:
    'Message in a bottle (or an email)! Your invitation is on its way.',
  INVITE_RESEND:
    "Resend-o-rama! Your invitation is taking another lap around the digital track! Let's roll!",
  CANCELED:
    'Cancellation complete! The invitation is officially off the guest list. ',
  DELETED: 'Adios, little invitation! It served us well!',
  FILTERING:
    'Hold on while we sift through the members. Our member detectives are on the case! 🕵️‍♂️',

  ROLE_UPDATED:
    'Update alert! Your invited member role has successfully change.',

  CANCEL_ALERT: {
    HEADER: 'Cancel Invitation?',
    SUB_HEADER: "Let's Confirm This!",
    MESSAGES:
      'Just making sure you really want to cancel this invitation. Are you sure?'
  },

  DELETE_ALERT: {
    HEADER: 'Final Check: Deleting invitation',
    SUB_HEADER: 'Confirm Your Move!',
    MESSAGES:
      "Deleting this invitation means it's gone forever. Are you certain this is what you want?"
  }
};

const WORKSPACE = {
  CREATED:
    "Ta-da! You've just brought a new workspace into existence! Watch it grow and thrive!",
  UPDATED:
    "Update complete! Your workspace just leveled up! It's now even more awesome!",
  DELETED:
    'Farewell, dear workspace! It served us well! Off to the digital sunset!',
  ADD_TO_IS_FAVORITE:
    "Workspace just leveled up to 'Favorite' status! It's like getting a gold star!",
  REMOVE_TO_IS_FAVORITE:
    'Oops! Looks like this workspace just lost its VIP pass. Farewell, former favorite! ',

  DELETE_ALERT: {
    HEADER: 'Final Check: Deleting workspace',
    SUB_HEADER: 'Confirm Your Move!',
    MESSAGES:
      "Deleting this workspace means it's gone forever. Are you certain this is what you want?"
  }
};

const PIXEL_ACCOUNT = {
  CREATED:
    "Boom! You've just added a pixel account to your digital family! It's ready to light up the world! ",
  UPDATED:
    "Update complete! Your pixel just leveled up! It's now even more awesome!",
  DELETED:
    'Farewell, dear pixel account! It served us well in the pixelated universe! Onward to new pixel adventures!',
  FILTERING:
    'Hold on while we sift through the pixels. Our pixel detectives are on the case! 🕵️‍♂️',

  DELETE_ALERT: {
    HEADER: 'Final Check: Deleting pixel',
    SUB_HEADER: 'Confirm Your Move!',
    MESSAGES:
      "Deleting this pixel means it's gone forever. Are you certain this is what you want?"
  }
};

const UTM_TAGS_TEMPLATE = {
  CREATED:
    "You've just successfully created a UTM tag! It's like a little digital superstar in the making!",
  FILTERING:
    'Hold on while we sift through the UTM tags. Our UTM tag detectives are on the case! 🕵️‍♂️',
  UPDATED:
    "Update complete! Your UTM tag just leveled up! It's now even more awesome!",
  DELETED:
    'Farewell, dear UTM tag! It served us well in the tracking adventure! Onward to new tracking territories!',

  DELETE_ALERT: {
    HEADER: 'Final Check: Deleting UTM tag',
    SUB_HEADER: 'Confirm Your Move!',
    MESSAGES:
      "Deleting this UTM tag means it's gone forever. Are you certain this is what you want?"
  }
};

const TIME_SLOT = {
  CREATED:
    "Voilà! You've just created a time slot! It's like adding a pinch of magic to your schedule!",
  UPDATED: 'Update complete! Your time slot is updated successfully.',
  DELETED:
    'Farewell, dear time slot! It served us well in the grand scheme of things! Onward to new scheduling adventures!',

  DELETE_ALERT: {
    HEADER: 'Final Check: Deleting time slot',
    SUB_HEADER: 'Confirm Your Move!',
    MESSAGES:
      "Deleting this time slot means it's gone forever. Are you certain this is what you want?"
  }
};

const LABEL = {
  CREATED:
    "Successfully created a label! It's like adding a sprinkle of magic to your organization! ",
  UPDATED: 'Update complete! Your label is updated successfully.',
  DELETED:
    'Farewell, dear label! It served us well in the grand scheme of organization! Onward to new categorizing adventures!',

  DELETE_ALERT: {
    HEADER: 'Final Check: Deleting label',
    SUB_HEADER: 'Confirm Your Move!',
    MESSAGES:
      "Deleting this label means it's gone forever. Are you certain this is what you want?"
  }
};

// Add Constants Above this one, and then include them in this object
const MESSAGES = {
  GENERAL,
  Login,
  LABEL,
  USER,
  PIXEL_ACCOUNT,
  TIME_SLOT,
  MEMBER,
  UTM_TAGS_TEMPLATE,
  SHORT_LINKS,
  WORKSPACE,
  LINK_IN_BIO,
  FORM_VALIDATIONS,
  MODALS
};

export default MESSAGES;
