/**
 * This helper changes a property type to string,
 * keeping it optional if it is
 */
export type ChangeTypeToString<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: undefined extends T[P] ? string | undefined : string;
};
