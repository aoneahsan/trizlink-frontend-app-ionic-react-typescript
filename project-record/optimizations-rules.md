# General React Optimization rules

- add react memo if the component is accepting some params
  - if it's not excepting any params and it does not get re-rendered when the parent component gets re-rendered then do not add react.memo to it
  - never add react memo to main pages (which gets loaded from url)
- for any and all functions which we create inside react components, try to use "useCallback" for them, if you don't use it for some function add a comment with reason why it was not used.
  - when using "useCallback" make sure that you pass only the required keys in it's dependency array and not every constant/variable you use inside that function.
