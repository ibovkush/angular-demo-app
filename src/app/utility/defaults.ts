import { MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { CurrencyMaskInputMode } from 'ngx-currency';

export const defaultRoute = '/admin/example';
export const resetPasswordRoute = '/auth/reset-password';
export const loginRoute = '/auth/login';
export const logoutRoute = '/auth/logout';

export const formsTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 400,
  hideDelay: 100,
  touchendHideDelay: 1000,
  position: 'above',
};

export const fdCurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: false,
  decimal: '.',
  precision: 2,
  prefix: '$ ',
  suffix: '',
  thousands: ',',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.NATURAL,
};
