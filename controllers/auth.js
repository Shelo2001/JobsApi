const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const asyncHandler = require('express-async-handler')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ token })
}

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(401).json({ error: 'Invalid email or password' })
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(401).json({ error: 'invalid credentials' })
  }
  const isPasswordValid = await user.comparePassword(password)

  if (!isPasswordValid) {
    return res.status(404).json({ error: 'invalid credentials' })
  }

  const token = user.createJWT()

  res.status(200).json({ user: { name: user.name }, token })
})

module.exports = { register, login }
