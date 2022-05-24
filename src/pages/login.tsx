import { authMiddleWare } from '../common/utils/middleWares'
import { useState } from 'react'
import { AuthLayout, AuthForm } from '../modules/auth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUp, setSignUp] = useState(false)

  return (
    <AuthLayout>
      <AuthForm
        {...{ email, setEmail, password, setPassword, signUp, setSignUp }}
      />
    </AuthLayout>
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
