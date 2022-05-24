import {
  identity,
  map,
  pipe,
  reduce,
  split,
  takeWhile,
  toArray,
} from '@fxts/core'

export const cookieParser = <T>(cookie: string | undefined): T | {} =>
  cookie
    ? pipe(
        cookie.replace(/\s/g, ''),
        split(';'),
        takeWhile(identity),
        map((str) => pipe(str, split('='), toArray)),
        Object.fromEntries
      )
    : {}
