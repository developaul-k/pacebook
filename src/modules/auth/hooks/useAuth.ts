import React from 'react'
import { useRouter } from 'next/router'
import { TLogin, TLoginData } from '../types/Auth'
import { signIn, signUp, logout } from '../api/AuthAPI'

function useAuth() {
  const router = useRouter()

  const handleSignIn = async (loginData: TLoginData) => {
    const data = await signIn(loginData)
    if ('error' in data) {
      throw new Error('로그인 실패')
    }
    alert('로그인 성공')
    return router.push('/')
  }

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

  const handleLogout = async () => {
    try {
      await logout()
      return router.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return {
    handleSubmit,
    handleLogout,
  }
}

export default useAuth
