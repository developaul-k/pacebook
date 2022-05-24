import { GetServerSidePropsContext } from 'next'
import { cookieParser } from './util'

export const authMiddleWare =
  (cb: (ctx: GetServerSidePropsContext, isValid: boolean) => object) =>
  async (ctx: GetServerSidePropsContext) => {
    const cookies = cookieParser<{ email?: string }>(ctx.req.headers?.cookie)
    return cb(ctx, 'email' in cookies)
  }
