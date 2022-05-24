import React from 'react'
import { useRouter } from 'next/router'

function useUser() {
  const router = useRouter()

  const login = async ({
    email,
    password,
  }: Omit<TLogin, 'type'>): Promise<{ email?: string; error?: string }> => {
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

  const logout = async () => {
    try {
      await fetch('/api/logout')
      return router.push('/login')
    } catch (err) {
      console.log('로그아웃 실패')
    }
  }

  const signUp = async (userData: Omit<TLogin, 'type'>) =>
    (
      await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
    ).json()

  const handleSubmit =
    ({ type, email, password }: TLogin) =>
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault()
        if (type === 'SignIn') {
          const data = await login({ email, password })
          if ('error' in data) {
            throw new Error('로그인 실패')
          }
          alert('로그인 성공')
          return router.push('/')
        }

        const data = await signUp({ email, password })
        if ('email' in data) {
          alert('회원가입 성공')
          return router.reload()
        }
        throw new Error('호원가입 실패')
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

export default useUser
