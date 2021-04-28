'use strict'

const User = use("App/Models/User")

class UserController {
    /**
     * @swagger
     * /users:
     *   post:
     *     tags:
     *       - Users
     *     summary: Creates a new user.
     *     parameters:
     *       - in: body
     *         name: user
     *         description: The user to create.
     *         schema:
     *           type: object
     *           required:
     *             - username
     *             - password
     *             - email
     *           properties:
     *             username:
     *               type: string
     *             password:
     *               type: string
     *             email:
     *               type: string
     *     responses:
     *       200:
     *         description: Returns the created user
     *         example:
     *           id: 1,
     *           username: EzequielPrimaz,
     *           email: primazezequiel@gmail.com
     *           created_at: 2021-04-27 19:56:00
     *           updated_at: 2021-04-27 19:56:00
     *           treasures: []
     */
    async create({ request }) {
        const data = request.only(["username", "email", "password"])

        const user = await User.create(data)

        return user
    }

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     tags:
     *       - Users
     *     summary: Get user details.
     *     parameters:
     *       - in: path
     *         name: id
     *         description: ID of the user.
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Returns user details.
     *         example:
     *           id: 1,
     *           username: EzequielPrimaz,
     *           email: primazezequiel@gmail.com
     *           created_at: 2021-04-27 19:56:00
     *           updated_at: 2021-04-27 19:56:00
     *           treasures: []
     */
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
