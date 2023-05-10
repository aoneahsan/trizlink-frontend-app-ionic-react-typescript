# Talha TODOs after meeting

## 04-12-2022

- ION_LOADER_DEFAULTS (in constants file), add a enum for "spinner" with all it's values and use that
- Create a Generic Recoil State for app setting recoil state

## 24/01/2023

- useZRQUpdateRequest (create update delete), make "_queriesKeysToInvalidate" string[] and pass that directly for queries cancel and invalidate

## 06-02-2023

- for all recoil state, make sure to add undefined as a state value, and set the "default" value to undefined, so if we check whether the state value is set to something or not in a if condition it will give proper result, as a empty object, array or string can be a proper value
