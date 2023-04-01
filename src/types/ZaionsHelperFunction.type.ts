export type ZCapDialogPropsType = {
  title?: string;
  message?: string;
  type?: 'alert' | 'confirm' | 'prompt';
  buttonTitle?: string;
  okButtonTitle?: string;
  cancelButtonTitle?: string;
  inputText?: string;
  inputPlaceholder?: string;
};
export type ZConsolePropsType = {
  message?: string;
  type?: 'log' | 'info' | 'warning' | 'error' | 'count';
  data?: unknown;
  err?: unknown;
};
