import { ComparerFunctionType } from '@t/comparer-function.type';
import * as moment from 'moment';
import { Moment, unitOfTime } from 'moment';

export function getDateComparer<T>(
  getField: (o: T) => Moment | string,
  granularity: unitOfTime.StartOf = 'day'
): ComparerFunctionType<T> {
  return (a: T, b: T) => (moment(getField(a)).isBefore(moment(getField(b)), granularity) ? -1 : 1);
}

export function getDateComparerDesc<T>(
  getField: (o: T) => Moment | string,
  granularity: unitOfTime.StartOf = 'day'
): ComparerFunctionType<T> {
  return (a: T, b: T) => (moment(getField(a)).isSameOrAfter(moment(getField(b)), granularity) ? -1 : 1);
}
