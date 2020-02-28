// Primitive Thunk type
export interface Thunk<T> {
    // whether the Thunk has been peviously evaluated
    evaluated: boolean
    // the string representation of this Thunk
    toString: () => string
    // return type of this Thunk
    type: string
    // the lambda that holds the logic for evaluation
    value: () => T
  }

/**
 * (NOT a primitive function in Lazy Source)
 * Makes a primitive value into a Thunk. Should not
 * be used on Thunks! Part of the abstraction for
 * Thunks, to be used in the interpreter. Note that
 * this function is only to be used for primitive
 * values, hence the "evaluated" property is set to
 * "true", and no attempt will be made to memoize
 * the inner value of the Thunk.
 * @param value The primitive value.
 */
export function makeThunk<T>(value: T): Thunk<T> {
    return {
      type: typeof value,
      value: () => value,
      toString: () => value + '',
      evaluated: false
    }
  }