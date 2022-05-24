import useAuth from '../hooks/useAuth'
import { TAuthForm } from '../types/Auth'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

export function AuthForm({
  signUp,
  setSignUp,
  email,
  setEmail,
  password,
  setPassword,
}: TAuthForm) {
  const { handleSubmit } = useAuth()

  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if ('email' in router.query) {
      setEmail(router.query.email as string)
      setPassword('')
      setSignUp(false)
      passwordRef.current?.focus()
    } else {
      emailRef.current?.focus()
    }
  }, [router])

  return (
    <section className="w-2/5">
      <form
        onSubmit={handleSubmit({
          type: signUp ? 'SignUp' : 'SignIn',
          email: email,
          password,
        })}
      >
        <div className="flex flex-col justify-center items-center p-10 rounded-md bg-white">
          <input
            ref={emailRef}
            type="email"
            className="w-full py-3 pl-4 rounded-md border-2 border-pacebook-disabled bg-pacebook-disabled outline-0 focus:bg-white focus:border-pacebook"
            placeholder="Enter your email."
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <input
            ref={passwordRef}
            type="password"
            className="mt-3 w-full py-3 pl-4 rounded-md border-2 border-pacebook-disabled bg-pacebook-disabled outline-0 focus:bg-white focus:border-pacebook"
            placeholder="Enter your password."
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
          <button
            type="submit"
            className="mt-5 py-3 w-full rounded-md bg-pacebook2 text-white hover:opacity-90"
          >
            {signUp ? 'Sign Up' : 'Sign In'}
          </button>
          <div className="mt-5 py-2 w-full border-t-[1px] border-t-gray-300">
            <button
              type="button"
              className="mt-5 py-3 w-full rounded-md bg-pacebook-green text-white hover:opacity-90"
              onClick={() => setSignUp((prevState) => !prevState)}
            >
              {signUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
