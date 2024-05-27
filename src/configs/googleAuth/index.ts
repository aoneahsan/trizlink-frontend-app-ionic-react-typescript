import {
    GoogleAuth
} from '@codetrix-studio/capacitor-google-auth';
import { ENVS } from '@/utils/envKeys';
import { isPlatform } from '@ionic/core';
import { googleAuthConfig } from '../socialAuth';
import { reportCustomError } from '@/utils/customErrorType';



const isWeb = !isPlatform('capacitor');

/**
 * Initializes the Google authentication is platform is web
 * */
if (isWeb) {
    try {

        GoogleAuth.initialize({
            clientId: ENVS.googleClientId,
            /** 
             * Set if your application needs to refresh access tokens when the user is not present at the browser.
             * In response use serverAuthCode key
            */
            grantOfflineAccess: googleAuthConfig.grantOfflineAccess,

            /** 
             * Specifies the scopes required for accessing Google APIs The default is defined in the configuration.
            */
            scopes: googleAuthConfig.scopes
        });
    } catch (error) {
        reportCustomError(error);
    }
}