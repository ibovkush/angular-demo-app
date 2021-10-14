import { StageType } from '@e/stage-type.enum';
import { EnvironmentModel } from '@m/common/environment.model';

export const environment: EnvironmentModel = {
  production: true,
  apiUrl: '[demo]',
  apiTimeoutMs: 0,
  debounceTimeMS: 600,
  dateFormat: 'MM/dd/yyyy',
  dateFormatMoment: 'MM/DD/yyyy',
  pageSizes: [10, 20, 50],
  stageType: StageType.stage,
};
