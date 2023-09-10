# Cases of invite-link (invitation) & set-password page

## Invite link cases and implements

- When invite link is open in a window where user is logged in with some other email. (not the email that invite has).
  - In this cases I have show 'Access Forbidden' view in the validate invitation page.

- When invite link is open in a new tab or window.
  - In this cases I am checking the validation of link and redirecting it to set-password.
  - In validation I am checking if token is valid, if not then show bad request view with error modal of message invalid token. if the token is valid then redirecting the user to set-password page and storing token,email in local storage key INVITEE_USER_DATA.

- When invite link is open in a window where the email that invite has, is logged in.
  - Then just redirecting the user to workspaces page.

## set-password page cases and implements

- When invite link is valid and user redirect to set-password page.
  - In this casas I am checking if in local-storage I have token and email then showing the set-password view.

- When the set password is directly visited by url.
  - In this cases I am checking if in local-storage I have user data and it is valid data then show this message `You have already set a password for your account. If you'd like to update it, please use the 'Forgot Password' option.`
  - If the user data is undefined in local-storage then show asses forbidden view. page.
