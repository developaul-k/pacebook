import React from 'react'
import { useRouter } from 'next/router'

function useUser() {
  const router = useRouter()

  const login = async ({
    email,
    password,
  }: TLogin): Promise<{ email?: string; error?: string }> => {
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
      await fetch('/api/logout');
      return router.push('/login');
    } catch (err) {
      console.log('로그아웃 실패')
    }
  }

  const handleSubmit =
    ({ email, password }: TLogin) =>
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        const data = await login({ email, password })
        if ('error' in data) {
          throw new Error('로그인 실패')
        }
        alert('로그인 성공')
        return router.push('/')
      } catch (err) {
        alert('로그인 실패')
      }
    }

  return {
    handleSubmit,
    logout,
  }
}

type TLogin = {
  email: string
  password: string
}

export default useUser
