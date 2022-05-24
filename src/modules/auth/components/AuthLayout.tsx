import AuthForm from './AuthForm'

export function AuthLayout({ children }: { children: React.ReactNode }) {
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
        {children}
      </div>
    </article>
  )
}
