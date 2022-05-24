import React from 'react'

export type TAuth = {
  type: 'SignIn' | 'SignUp'
  email: string
  password: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  signUp: boolean
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

export type TLogin = Pick<TAuth, 'type' | 'email' | 'password'>
export type TLoginData = Omit<TLogin, 'type'>
export type TAuthForm = Omit<TAuth, 'type'>
