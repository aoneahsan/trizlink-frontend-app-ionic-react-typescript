import CONSTANTS from '@/utils/constants';

const GENERAL = {
	FILE: {
		FILE_DELETED_SUCCESS_MESSAGE: 'File deleted successfully.',
	},
	SHORT_LINKS: {
		NEW_SHORT_LINK_CREATED_SUCCEED_MESSAGE: 'Short link created successfully.',
		SHORT_LINK_UPDATED_SUCCEED_MESSAGE: 'Short link updated successfully.',
		SHORT_LINK_DELTE_SUCCESSD_MESSAGE: 'Short link deleted successfully.',
	},
	PIXEL_ACCOUNT: {
		NEW_PIXEL_ACCOUNT_CREATED_SUCCEED_MESSAGE:
			'Pixel account created successfully.',
		PIXEL_ACCOUNT_UPDATED_SUCCEED_MESSAGE:
			'Pixel account updated successfully.',
		PIXEL_ACCOUNT_DELETED_SUCCEED_MESSAGE:
			'Pixel account deleted successfully.',
	},
	UTM_TAGS_TEMPLATE: {
		NEW_UTM_TAGS_TEMPLATE_CREATED_SUCCEED_MESSAGE:
			'UTM Tag created successfully.',
		UTM_TAGS_TEMPLATE_UPDATED_SUCCEED_MESSAGE: 'UTM Tag updated successfully.',
		UTM_TAGS_TEMPLATE_DELETED_SUCCEED_MESSAGE: 'UTM Tag deleted successfully.',
	},
	FOLDER: {
		NEW_FOLDER_CREATED_SUCCEED_MESSAGE: 'Folder created successfully.',
		FOLDER_UPDATED_SUCCEED_MESSAGE: 'Folder updated successfully.',
		FOLDER_DELETED_SUCCEED_MESSAGE: 'Folder deleted successfully.',
	},
	EMBED_WIDGET: {
		NEW_EMBED_WIDGET_CREATED_SUCCEED_MESSAGE:
			'Embed widget created successfully.',
		EMBED_WIDGET_UPDATED_SUCCEED_MESSAGE: 'Embed widget updated successfully.',
		EMBED_WIDGET_DELETED_SUCCEED_MESSAGE: 'Embed widget deleted successfully.',
	},
	INVALID_REQUEST: 'invalid request.',
	LOADING: 'Please wait a minute, Loading...',
	SUCCESS: 'Request completed.',
	SUCCESS_SUBHEADING: 'Request completed Successfully.',
	SUCCESS_MESSAGE: 'Your Request completed Successfully!',
	REGISTER_USER_SUCCESSED: 'Registered successfully.',
	LOGIN_SUCCESSFULLY: 'Login successfully.',
	LOGOUT_SUCCESSFULLY: 'Logout successfully.',
	REGISTER_USER_FAILD: 'Something went wrong! 😐.',
	FAILED: 'Request Failed.',
	FAILED_SUBHEADING: 'Something went wrong :(',
	FAILED_MESSAGE: 'Error Occurred, request failed, please try again.',
	NOT_FOUND: 'Item not found!',
	FORM: {
		INVALID: 'Form is Invalid, Please fill all required form fields first.',
		FIELDS_INVALID: {
			NAME: 'Please enter a Name it is required.',
			Email: 'Please enter a email it is required.',
			NOT_VALID_Email: 'Email not valid! Please enter a valid email address.',
		},
		API_KEY_REQUIRED: 'API name is required',
		PASSWORD_NOT_MATCH: 'Password does not match. please try again!',
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
		DELETING: 'Deleting the record...',
	},
	PROCESSING_LOGIN: 'Processing login request...',
	UNAUTHENTICATED: 'Unauthenticated, Please login to continue.',

	// This message we will use in public, private routes component suspense.
	ROUTE_FALLBACK_SUSPENSE_MESSAGE: 'Loading...',
};

// All Forms Related Validation Messages
const FORM_VALIDATIONS = {
	// Pixel Accounts Validation Messages
	PIXEL_ACCOUNTS: {
		PLATFORM_REQUIRED: 'Platform is required.',
		TITLE_REQUIRED: 'Title is required.',
		PIXEL_ID_REQUIRED: 'Pixel Account ID is required.',
		FACEBOOK: {
			WORD_COUNT: `Please Enter Correct Facebook Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.FACEBOOK.WORD_COUNT} Digits.`,
		},
		GOOGLE_ANALYTICS: {
			WORD_COUNT: `Please Enter Correct Google Analytics Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS.WORD_COUNT} Digits.`,
			SHOULD_INCLUDE: `Please Enter Correct Google Analytics Pixel ID - Should Include "${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS.SHOULD_INCLUDE.toUpperCase()}".`,
		},
		LINKEDINANDBING: {
			WORD_COUNT: `Please Enter Correct Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.LINKEDINANDBING.WORD_COUNT} Digits.`,
		},
		TWITTER: {
			WORD_COUNT: `Please Enter Correct Twitter Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.TWITTER.WORD_COUNT} Digits.`,
		},
		GOOGLE_ADS: {
			WORD_COUNT: `Please Enter Correct Google Ads Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ADS.WORD_COUNT} Digits.`,
		},
		GOOGLE_TAG_MANAGER: {
			WORD_COUNT: `Please Enter Correct Google Tag Manager Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER.WORD_COUNT} Digits.`,
			SHOULD_INCLUDE: `Please Enter Correct Google Tag Manager Pixel ID - Should Start With "${CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER.SHOULD_INCLUDE.toUpperCase()}".`,
		},
		QUORA: {
			WORD_COUNT: `Please Enter Correct Quora Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.QUORA.WORD_COUNT} Digits.`,
		},
		SNAPCHAT: {
			WORD_COUNT: `Please Enter Correct Snapchat Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.SNAPCHAT.WORD_COUNT} Digits.`,
		},
		PINTEREST: {
			WORD_COUNT: `Please Enter Correct Pinterest Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.PINTEREST.WORD_COUNT} Digits.`,
		},
		TIKTOK: {
			WORD_COUNT: `Please Enter Correct Tiktok Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.TIKTOK.WORD_COUNT} Digits.`,
		},
		VK: {
			WORD_COUNT: `Please Enter Correct Vk Pixel ID - ${CONSTANTS.PIXEL_ACCOUNTS.VK.WORD_COUNT} Digits.`,
			SHOULD_INCLUDE: `Please Enter Correct VK Pixel ID - Should Start With "${CONSTANTS.PIXEL_ACCOUNTS.VK.SHOULD_INCLUDE.toUpperCase()}".`,
		},
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
			REQUIRED_MESSAGE: 'Short link target message is required.',
		},
		REQUIRED_PASSWORD: 'Short link password is required.',
		REQUIRED_FOLDER: 'Short link folder is required.',
		ROTATOR_AB_TESTING: {
			REQUIRED_REDIRECTION_LINK: 'Rotator redirection link is required.',
			INVALID_REDIRECTION_LINK:
				'Please enter a valid redirection link like (https://yourredirectionlink.com) or (http://yourredirectionlink.com).',
			REQUIRED_PERCENTAGE: 'Rotator percentage is required.',
		},
		GEOLOCATION: {
			REQUIRED_REDIRECTION_LINK: 'Geo Location redirection link is required.',
			INVALID_REDIRECTION_LINK:
				'Please enter a valid redirection link like (https://yourgeolocationlink.com) or (http://yourgeolocationlink.com).',
			REQUIRED_COUNTRY: 'Geo location country is required.',
		},
	},

	// Link Expiration Error Message
	LINK_EXPIRATION_INFO: {
		redirectionLink: 'Link Expiration redirection link is require',
	},
};

const MODALS = {
	EMBED_WIDGETS_MODAL: {
		CUSTOM_HTML: 'Please enter a Custom HTML code it is required.',
		CUSTOM_Javascript: 'Please enter a Custom Javascript code it is required.',
		DELAY: 'Please enter a delay seconds it is required.',
	},
};

// Add Constants Above this one, and then include them in this object
const MESSAGES = {
	GENERAL,
	FORM_VALIDATIONS,
	MODALS,
};

export default MESSAGES;
