import { GetServerSidePropsContext } from 'next'
import { cookieParser } from './util'

export const authMiddleWare =
  (cb: (ctx: GetServerSidePropsContext, isValid: boolean) => object) =>
  async (ctx: GetServerSidePropsContext) => {
    const cookies = cookieParser<{ email?: string }>(ctx.req.headers?.cookie)
    // const cookies = cookieParser<{ userId?: string; userName?: string; }>("userId=1; userName=youngju;");
    // const cookies: any = cookieParser(undefined)

    console.log('cookies: ', cookies)
    console.log('cookies2: ', ctx.req.headers?.cookie)
    console.log('req.header: ', ctx.req.headers)

    if ('email' in cookies) {
      return cb(ctx, true)
    } else {
      return cb(ctx, false)
    }
  }
