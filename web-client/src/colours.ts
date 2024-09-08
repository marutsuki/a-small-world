import { ColourVariant } from '../tailwind.config';

type Split<
    T extends string,
    S extends string,
> = T extends `${infer P1}${S}${infer P2}` ? [P1, ...Split<P2, S>] : [T];

/**
 * Utility type that defines a type containing a given substring.
 *
 * @typeParam T - The substring to contain
 */
type Substring<T extends string> = `${string}${T}${string}`;

/** The maximum number of variants that can be styled in a single configuration entry. */
type VariantStylingLimit = 10;

type PropertyArrayContains<
    T extends string[],
    V extends string,
    Acc extends null[] = [],
> = T['length'] extends VariantStylingLimit
    ? []
    : T extends [infer H, ...infer T extends string[]]
      ? H extends Substring<V>
          ? PropertyArrayContains<T, V, [...Acc, null]>
          : never
      : [];

/**
 * Utility type that forces (potentially) space-separated substrings to all contain a string value.
 *
 * @typeParam T - The string contained in each space-separated substring
 * @typeParam Acc - The accumulator. Should be left as default
 */
type PropertiesContain<T extends string, V extends string> =
    Split<T, ' '> extends infer P extends string[]
        ? PropertyArrayContains<P, V> extends infer U
            ? U extends never
                ? never
                : T
            : never
        : never;

/**
 * The configuration object for a set of variants on a UI component. (Unvalidated)
 */
export type VariantConfigMap = {
    [key in ColourVariant]?: string;
};

/**
 * The configuration object for a set of variants on a UI component.
 *
 * @example
 * Example usage:
 * ```
 * export const ButtonVariants: VariantConfig = Object.freeze({
 *   primary: "bg-primary-base text-primary-content",
 *   secondary: "bg-secondary-base text-secondary-content",
 *   error: "bg-error-base text-error-content",
 * });
 * ```
 */
type VariantConfig<T extends Record<K, V>, K extends string, V extends string> =
    // Check that the config is not empty.
    keyof T extends never
        ? never
        : {
              [key in keyof T]: key extends string
                  ? PropertiesContain<T[key], key>
                  : never;
          };

/**
 * Creates a variant configuration object.
 *
 * Restrictions:
 * - For every key defined in the object, each space-separated substring of the equivalent value must contain the key.
 * - The object must contain at least one key-value pair.
 * @param config
 * @returns
 */
export const createVariants = <
    T extends Record<K, V>,
    K extends ColourVariant,
    V extends string,
>(
    config: T extends VariantConfig<T, K, V> ? T : never
) => config;
