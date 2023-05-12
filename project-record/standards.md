# Please add standards points here

## Like

## Coding Rules

- use constants for strings used in more than one place
- use recoil state properly throught the whole project, so when i add data in one file that should get reflected in other pages where it is meant to.
  - like:
  - when i create a "Short Link" on create link page, it should show in "List Links" page.
- Forms will only make using formik, validation "yup"
  - for some simple validations we will use "validate"
- state, used in more than 1 component (mean in two components), use recoil state for that
- Alerts in project
  - use useIonAlert() when need to show a alert in component, and use "Dialog.alert" <@capacitor/dialog> when need to show a alert in any ts file, like in helpers.ts file or outside a react component.
  - use useIonToast() to show a "toast message" inside react components.
- Loaders in project
  - use "useIonLoading()" when to show loading alert inside react component, like while fetching data, or submitting a form, use this to show user that something is happening.
- do not use "any" type for your own written code, unless it is absolutely needed,
  - any can be used when it's a package (which you are testing) and you don't know the type, but once you use it actually to write code you need to use proper type for it as well, "any" type is not allowed in whole code base.
- write proper name for params, functions, constants, etc.
  - please do not use "const selectFromTemplate = (e: string) => {...}" or anything of the sort in the whole project
  - for params, you can follow these roles,
    - global constant "all capitals", "GOOGLE" (defined outside the react component function)
    - any function inside the react component, it's parameters should start with, "\_", like `const someFun = (_userInfo: type) => {...}`
    - any constant/var/function, defined inside a function, inside a react component, will have "**" before it's name, like:
      `const someFun = (\_userInfo: type) => {
      const **constantName = "it's value";
      }`
- for simple validation checks please use "validator" package.
- value for any select option can not be capitalize, it should be all lower case
- anything we want to store in db should be case in-sensitive
- never throw a error in top level "catch (from try catch) block", as it will show that error in app to user or the app will simply crash
  - for all main/top-level "catch blocks" report their error using "reportCustomError" helper function
- wrape in {}, for any function body, if condition body or loop body content, please wrap that in {}
- No Relative import in project, go with absolute imports as that makes the refactoring easy.
- async tasks takes time, so for any dynamic component (or any normal page), make sure to perform all required tasks before navigation or reload, as it will cause issues otherwise
  - e.g:
    - if you dismiss a modal first and then after that try to navigate that will cause issues (called the dismiss function first and then the navigate function)
    - same if you reset some state first which will cause a navigate from smoe other part of app and other that you try to set some state, that will also cause issues.

- ### FORM

  - every field should be handled using formik
  - set field value using formik as well (unless i say otherwise for some field),
    - Why? = Becuase when we will use that form for editing purpose it will help to pre-populate that form values with the values from DB
  - validation of formik form fields (or any field) should be handled by helper function "validateFields" or "validateField"
  - form submit logic should be handled/writen in a saperate function which should get called in "onSubmit" property of formik component

- ### Components

  - Make a custom Component of packages components and pas the required props as custom props. In this way if we wanna change the current component in our all project so we just need to update the custom component.

  - example present in (component/ZIonComponents/ZIonButton.tsx)

  - components which does not have any content or child inside them should be "Self-Closing-Component", like:
    - BAD Way: <input></input>
    - Good Way: <input />

## File/Folder/Variable Naming Rule

- TypeScript Files/Folders (In generic any "ts" file)

  - Includes: types files, recoil state files, util file, data files, assets files
  - Rules:
    - files: type file name should be like this "zaionsAppSetting.type.ts" - Camel case (<https://www.techtarget.com/whatis/definition/CamelCase>)
    - folders: same like files, should be Camel case

- React Files (Component/Pages/ETC) - which inculdes any JSX/TSX code

  - should be "Pascal case" - like: "ZaionsHome.tsx" | "ZaionsDashboard"
  - more info on pascal case (<https://www.theserverside.com/definition/Pascal-case>)

- Variables/Constants/Functions:
  - Global constants: "Snake-case & All Capitals", like: "SOME_GLOBAL_CONSTANT"
    - more info on snake case (<https://www.theserverside.com/definition/Snake-case>)
  - component variables/constant/function-name
    - should be "Camel-Case", like: "userDataInfo"
    - more info on camel case (<https://www.techtarget.com/whatis/definition/CamelCase>)
  - function parameters
    - should start with "\_" (single underscore), like: "const someFunction = (\_param1, \_param2, ...) => {...}
    - after "\_" (single underscore) follow "camel-case" pattern
  - Variable/constants inside function
    - should start with "**" (double underscore), like: "const someFunction = (\_param1, \_param2, ...) => {**someVar = "value"; }
    - after "\_\_" (double underscore) follow "camel-case" pattern

# Lazy Loading

- Lazy Loading in project
  - for components (main pages which we show using "Route" component and weadd that import in "AppRoutes.tsx" file) we will use "React.lazy" (i have already shown how to use it, just duplicate that for new routes)
  - for any inpage component we will use "React.lazy", i have shown the useage in "src\pages\Home\index.tsx" component.
  - for all images in our project use "<ZIonImg />" tag, as this does the lazy loading automatically.
    - NOTE: Please do provide "alt" text for all images (mostly it will be the heading of same section where you have shown the image, but if still needed ask me).

#### Known Errors Alert

- "trying to access property of undefined."
  - 2 slaps for this error if occured,
  - this happens when we write this code "obj1.obj2.obj3.obj4.keyName"
  - if any of obj is null or undefined then it will throw that error
  - to avoid this error write above code like this
    - "obj1.obj2.obj3.obj4.keyName" => "obj1?.obj2?.obj3?.obj4?.keyName"
