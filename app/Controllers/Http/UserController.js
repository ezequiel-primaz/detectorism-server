'use strict'

const User = use("App/Models/User")

class UserController {
    async create({ request }) {
        const data = request.only(["username", "email", "password"])

        const user = await User.create(data)

        return user
    }

    async show({ params }) {
        const user = await User.findOrFail(params.id)

        const treasures = await user
            .treasures()
            .with('user', (builder) => {
                builder.select('id', 'username', 'email')
            })
            .with('images')
            .fetch()

        user.treasures = treasures

        return user
    }
}

module.exports = UserController
