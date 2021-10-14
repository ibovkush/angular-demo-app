import 'zone.js/plugins/zone-error';

import { StageType } from '@e/stage-type.enum';
import { EnvironmentModel } from '@m/common/environment.model';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: EnvironmentModel = {
  production: false,
  apiUrl: '[demo]',
  apiTimeoutMs: 0,
  debounceTimeMS: 600,
  dateFormat: 'MM/dd/yyyy',
  dateFormatMoment: 'MM/DD/yyyy',
  pageSizes: [1, 10, 20, 50],
  stageType: StageType.local,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
