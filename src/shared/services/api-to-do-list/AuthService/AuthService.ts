import { Api } from '../config/config'

export default new (class AuthService {
  public async login(email: string, password: string): Promise<string | Error> {
    try {
      const { data } = await Api.post('/login', { email, password })

      if (data) {
        return data.token
      }

      return new Error('An error occurred during login')
    } catch (error) {
      return new Error(
        (error as { message: string }).message ||
          'An error occurred during login'
      )
    }
  }

  public async logout(): Promise<void | Error> {
    try {
      await Api.get('/logout')
    } catch (error) {
      return new Error(
        (error as { message: string }).message ||
          'An error occurred while logging out'
      )
    }
  }

  public async register(
    email: string,
    password: string
  ): Promise<number | Error> {
    try {
      const { data } = await Api.post('/users', { email, password })
      if (data) return data
      return new Error('An error occurred while registering')
    } catch (error) {
      return new Error(
        (error as { message: string }).message ||
          'An error occurred while registering'
      )
    }
  }
})()
