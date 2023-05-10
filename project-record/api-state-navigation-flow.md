# how to send api request and then how to handle it's response

- show ionic loader
- use try catch
- in try
  - send api request (using asixs) and use axios inside useQuery/useMutation (will change the login/register/logout/delete request as well, or tonight)
  - get resonse
    - check if "success" is try in response and have proper data in response
      - if don't have proper data then throw a "ZCustomError"
    - now when setting data in app follow this flow
      - first set data in localstorage (using STORAGE helper method)
      - now set data in recoil state (respective recoil state)
      - now resetForm if needed
      - now dismiss the ionic loader
      - now show a success message using "react tositify (using it's helper function "showNotification")"
      - now navigation if needed
  - if get a error then follow this flow
    - check if error was in API
      - then show error message from api (in form fields if it was a form request)
      - or show error using "react tositify (using it's helper function "showNotification")" if it was a general (like refresh data in a table request)
        - notification will be of type error

## API Success & Error Messages

- for Success
  - for both form based or other type of api request, show a side notification (type success)
    using "react tositify" "showSuccessNotification"
- for errors
  - for all types of error
    - show a alert using "ionic alert"
  - with addition to that, when it's a form request
    - also show errors on fields if the api or request failed due to invalid data.

## Third party api

- Third party api will not be call directly from frontend it will call from backend.
