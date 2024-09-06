import { ColourVariant } from '../tailwind.config';

/**
 * Utility type for creating an array type of a given length.
 *
 * @typeParam L - The length of the array
 * @typeParam Acc - The accumulator. Should be left as default
 */
type Counter<
    L extends number,
    Acc extends null[] = [],
> = Acc['length'] extends L ? Acc : Counter<L, [...Acc, null]>;

/**
 * Subtract two literal numbers.
 *
 * @typeParam F - The number to subtract from
 * @typeParam V - The number to subtract by
 */
type Subtract<F extends number, V extends number> =
    Counter<F> extends [...infer U, ...Counter<V>] ? U['length'] : never;

/** The maximum number of variants that can be styled in a single configuration entry. */
type VariantStylingLimit = 10;

/**
 * Utility type that defines a type containing a given substring.
 *
 * @typeParam T - The substring to contain
 */
type Substring<T extends string> = `${string}${T}${string}`;

/**
 * Utility type that forces (potentially) space-separated substrings to all contain a string value.
 *
 * @typeParam T - The string contained in each space-separated substring
 * @typeParam Acc - The accumulator. Should be left as default
 */
type PropertiesContain<T extends string, Acc extends null[] = []> =
    Acc['length'] extends Subtract<VariantStylingLimit, 1>
        ? Substring<T>
        :
              | `${Substring<T>} ${PropertiesContain<T, [...Acc, null]>}`
              | Substring<T>;

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
export type VariantConfig = {
    [key in ColourVariant]: PropertiesContain<key>;
};
