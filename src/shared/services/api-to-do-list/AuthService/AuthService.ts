import { Api } from '../config/config'

export default new (class AuthService {
  public async login(email: string, password: string): Promise<string | Error> {
    try {
      const { data } = await Api.post('/login', { email, password })

      if (data) {
        return data.token
      }

      return new Error('Error durante o login')
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Error durante o login'
      )
    }
  }

  public async logout(): Promise<void | Error> {
    try {
      await Api.get('/logout')
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Error ao realizar o logout'
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
      return new Error('Ocorreu um erro durante o registro')
    } catch (error) {
      return new Error(
        (error as { message: string }).message ||
          'Ocorreu um erro durante o registro'
      )
    }
  }
})()
