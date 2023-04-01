import { FormikErrors, FormikState } from 'formik';

export type FormikHandleChangeEventType = {
  (e: React.ChangeEvent<unknown>): void;
  <T = string | React.ChangeEvent<unknown>>(
    field: T
  ): T extends React.ChangeEvent<unknown>
    ? void
    : (e: string | React.ChangeEvent<unknown>) => void;
};

export type FormikHandleBlurEventType = {
  (e: React.FocusEvent<unknown, Element>): void;
  <T = unknown>(fieldOrEvent: T): T extends string
    ? (e: unknown) => void
    : void;
};

export type FormikSetFieldValueEventType = {
  (field: string, value: unknown, shouldValidate?: boolean | undefined): void;
};

export type FormikSetFieldTouchedEventType = {
  (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ): void;
};

export type resetFormType = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextState?: Partial<FormikState<any>> | undefined
) => void;

export type FormikSetErrorsType = (errors: FormikErrors<unknown>) => void;
