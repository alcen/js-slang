import { evaluate } from '../interpreter'
import { Context, Value } from '../types'

// Primitive Thunk type
export interface Thunk {
  // whether the Thunk has been peviously evaluated
  evaluated: boolean
  // the string representation of this Thunk
  toString: () => string
  // return type of this Thunk
  type: string
  // the lambda that holds the logic for evaluation
  value: Value
  // the context in which the thunk is constructed
  context: Context
}

export function makeThunk(value: Value, context: Context) {
  return {
    type: 'Thunk',
    value,
    toString: () => value + '',
    evaluated: false,
    context
  }
}

/**
 * Primitive function in Lazy Source.
 * Forces an expression to be evaluated until
 * a result is obtained.
 * @param expression The expression to be evaluated.
 */
export function force(thunk: Value) {
  // console.log('THIS DOWN HERE IS THE ARG OF FORCE()!:\n')
  // console.log(thunk)
  // Check if thunk type object
  if (thunk.type === 'Thunk') {
    // console.log('FORCING A THUNK!!!')
    return actualValue(thunk.value, thunk.context)
  }
  // console.log('WHY DID I GET HERE???')
  return thunk
}

export function actualValue(expression: Value, context: Context) {
  const iterator = evaluate(expression, context)
  let result = iterator.next()
  while (!result.done) {
    result = iterator.next()
  }
  return result.value
}
