import { ReactNode } from 'react';

/**
 *  Interfaces
 */
// Zaions custom React select type
export interface ZaionsRSelectOptions {
  readonly value?: string;
  readonly label?: ReactNode | string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
  readonly className?: string;
}
