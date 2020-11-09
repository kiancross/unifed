/*
 * CS3099 Group Project
 */

export function dateToUnixTimeStamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}
