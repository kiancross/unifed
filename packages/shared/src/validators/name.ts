/*
 * CS3099 Group A3
 */

export function validateName(name: string): boolean {
  return /^.{1,64}$/.test(name);
}
