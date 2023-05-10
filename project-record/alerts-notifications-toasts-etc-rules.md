# Rules for Notifications, Alerts, Toasts, Prompts, Confirms etc

## for all of these i should only find one import from package to create a custom helper function or custom hook then in whole project use that hook or helper function so when we need to refactor it will be easy

## Notifications

- when i say show "side-notification" | or just "notification"
- for any success notification - (or in general when i (ahsan) says show a "side-notification")
  - for example
    - API request completed
  - must use "react-toastify" custom function
- we must show a "side-notification" on form success action, or if user clicks some "reload" data button then show "success notification" on request complete

## Alerts

- when i (ahsan) says show alert/prompt/confirm
- to show Alerts
  - when i (ahsan) says show alert/prompt/confirm
  - must use "useZIonAlert" in components files - simply speaking in react component - to show alert/prompt/confirm
  - else where where we can not use hooks "as hooks only works inside a react component.
    - for these cases use "capacitor/dialog" plugin custom helper functions to show alert/prompt/confirm
- we must show a error alert, if any API request fails.

## Toasts

- when i say show "Toast"
- use "useZIonToast" in react components to show toasts
- and same like i have explained above, that's a hook so when you need to show a toast outside a react component use "capacitor/toast" plugin (create a helper function for that and use that) - (one example with be "src/index.tsx" file as that is outside the scope of react.)
