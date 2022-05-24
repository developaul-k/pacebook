import { TLoginData } from '../types/Auth'

export const signIn = async ({
  email,
  password,
}: TLoginData): Promise<{ email?: string; error?: string }> =>
  (
    await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
  ).json()

export const logout = async () => fetch('/api/logout')

export const signUp = async (loginData: TLoginData) =>
  (
    await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
  ).json()
