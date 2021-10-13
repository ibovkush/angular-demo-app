import { MatTooltipDefaultOptions } from '@angular/material/tooltip';

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
