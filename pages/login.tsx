import { authMiddleWare } from '../utils/middleWares'
import useUser from '../hooks/useUser/useUser'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

function Login() {
  const router = useRouter()
  const { handleSubmit } = useUser()

  const passwordRef = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUp, setSignUp] = useState(false)

  useEffect(() => {
    if ('email' in router.query) {
      setEmail(router.query.email as string)
      setPassword('')
      setSignUp(false)
      passwordRef.current?.focus()
    }
  }, [router])

  return (
    <article className="absolute inset-0 flex justify-center items-center bg-login">
      <div className="flex justify-center w-[58.25rem] h-[37.25rem]">
        <section className="w-3/5">
          <div className="p-10">
            <h1 className="w-20 h-6 text-pacebook font-bold text-3xl">
              pacebook
            </h1>
            <h2 className="mt-6 text-2xl">Recent Logins</h2>
            <p className="mt-0 text-g">
              Recent Logins Click your picture or add an account.
            </p>
          </div>
        </section>
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
                type="email"
                className="w-full py-3 pl-4 rounded-md bg-pacebook-disabled"
                placeholder="Enter your email."
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
              <input
                ref={passwordRef}
                type="password"
                className="w-full mt-3 py-3 pl-4 rounded-md bg-pacebook-disabled"
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
      </div>
    </article>
  )
}

export const getServerSideProps = authMiddleWare((ctx, isValid) => {
  if (isValid) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return { props: {} }
})

export default Login
