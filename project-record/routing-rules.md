# UNAuthenticated routes (user can not visit after login/register)

## in these pages add a "useEffect" in that useeffect check for "ZaionsUserAccountEmail" recoil state value, if this have user email means user is logged in, so navigate user to "AUTHENTICATED_USER_REDIRECT" constant route

- login
- signup

## Authenticated Routes (user can not visit before login/register)

- dashboard
- all other dashboard related routes

## Generic Routes (user can visit in all cases)

- main home page
- privacy policy
- terms & conditions
- many more

### We need to persist/save user state (UI state), on refresh, by storing current visible UI component info/identifier in route as query params, serach params, or url parts

- ask ahsan if you can not understand, how a route should be structured, or should it be a search/quer params or url part.
