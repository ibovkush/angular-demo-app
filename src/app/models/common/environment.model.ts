import { StageType } from '@e/stage-type.enum';

export interface EnvironmentModel {
  production: boolean;
  apiUrl: string;
  apiTimeoutMs: number;
  debounceTimeMS: number;
  stageType: StageType;
  dateFormat: string;
  pageSizes: ReadonlyArray<number>;
}
