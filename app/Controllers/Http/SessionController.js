'use strict'

/**
 * @swagger
 * /sessions:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Get session token.
 *     parameters:
 *       - in: body
 *         name: user info
 *         description: User credentials to create token.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Returns a valid token.
 *         example:
 *           type: bearer
 *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxOTU2NDgwNn0RIL8MSoZkPwPo61YG8
 *           refreshToken: null
 */
class SessionController {
    async create({ request, auth }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)

        return token
    }
}

module.exports = SessionController
