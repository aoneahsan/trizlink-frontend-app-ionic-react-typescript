import { type FormikErrors, type FormikState } from 'formik';

export interface FormikHandleChangeEventType {
  (e: React.ChangeEvent<unknown>): void;
  <T = string | React.ChangeEvent<unknown>>(
    field: T
  ): T extends React.ChangeEvent<unknown>
    ? unknown
    : (e: string | React.ChangeEvent<unknown>) => void;
}

export interface FormikHandleBlurEventType {
  (e: React.FocusEvent<any, Element>): void;
  <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : unknown;
}

export type FormikSetFieldValueEventVoidType = (
  field: string,
  value: unknown,
  shouldValidate?: boolean | undefined
) => void;

export type FormikSetFieldValueEventPromiseVoidType = (
  field: string,
  value: unknown,
  shouldValidate?: boolean | undefined
) => Promise<void>;

export type FormikSetFieldTouchedEventType = (
  field: string,
  isTouched?: boolean | undefined,
  shouldValidate?: boolean | undefined
) => void;

export type resetFormType = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextState?: Partial<FormikState<any>> | undefined
) => void;

export type FormikSetErrorsType = (errors: FormikErrors<unknown>) => void;

//
