export interface ISortFunctions<T> {
  [key: string]: (a: T, b: T) => number;
}

export const compareNumbers = (a: number, b: number) => a - b;

export const compareStrings = (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0);

export const compareDates = (a: Date, b: Date) => a.getTime() - b.getTime();
