'use strict'
const User = use('App/Models/User')

class UserController {
  async register({ request, response }) {

    let user = await User.create(request.only(['email', 'password', 'username']))
    return response.created({
      data: user.toJSON(),
      message: "Successfully register"
    }, 201)
  }
  async login({ request, response, auth }) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      await auth.attempt(email, password)
      let user = await User.findBy('email', email)
      let accessTokeen = await auth.generate(user)
      return response.ok({
        data: user,
        accessTokeen: accessTokeen
      })
    } catch (error) {
      return response.unauthorized({
        message: "Invalid email or password"
      })
    }
  }

  async currentUser({ response, auth }) {
    try {
      return response.ok({
        data: await auth.current.user,
        message: "Current user"
      })
    } catch (error) {
      return response.unauthorized({
        message: "Missing or invalid jwt token"
      })
    }

  }
  async getUsers({ response }) {
    const data = await User.query().with('todos').fetch()
    return response.ok({
      results: data
    })

  }
  async logout({ response, auth }) {
    try {
      let user = await auth.getUser()
      let token = auth.getAuthHeader()
      let process = await auth.revokeTokensForUser(user, token, true)
      return response.ok({
        process: process,
        message: "Logout"
      })
    } catch (error) {
      return response.unauthorized({
        message: "Missing or invalid jwt token"
      })
    }

  }
}
module.exports = UserController
