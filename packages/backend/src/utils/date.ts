/*
 * CS3099 Group Project
 */

export function dateToUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}
