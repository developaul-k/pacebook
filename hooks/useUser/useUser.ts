import React from 'react'
import { useRouter } from 'next/router'

function useUser() {
  const router = useRouter()

  const signIn = async ({
    email,
    password,
  }: TLoginData): Promise<{ email?: string; error?: string }> => {
    return await (
      await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
    ).json()
  }

  const handleSignIn = async (loginData: TLoginData) => {
    const data = await signIn(loginData)
    if ('error' in data) {
      throw new Error('로그인 실패')
    }
    alert('로그인 성공')
    return router.push('/')
  }

  const logout = async () => {
    try {
      await fetch('/api/logout')
      return router.push('/login')
    } catch (err) {
      console.log('로그아웃 실패')
    }
  }

  const signUp = async (loginData: TLoginData) =>
    (
      await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
    ).json()

  const handleSignUp = async (loginData: TLoginData) => {
    const data = await signUp(loginData)
    if ('email' in data) {
      alert('회원가입 성공')
      return router.push({
        pathname: '/login',
        query: { email: data.email },
      })
    }
    throw new Error('회원가입 실패')
  }

  const handleSubmit =
    ({ type, ...loginData }: TLogin) =>
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault()
        if (type === 'SignIn') {
          return handleSignIn(loginData)
        }
        return handleSignUp(loginData)
      } catch (err) {
        alert(type === 'SignIn' ? '로그인 실패' : '회원가입 실패')
      }
    }

  return {
    handleSubmit,
    logout,
  }
}

type TLogin = {
  type: 'SignIn' | 'SignUp'
  email: string
  password: string
}

type TLoginData = Omit<TLogin, 'type'>

export default useUser
