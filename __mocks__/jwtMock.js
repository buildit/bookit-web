import jwt from 'jsonwebtoken'

// Creates a valid JWT that will expire 1 hour from now
export const makeValidToken = () => jwt.sign(
  {
    data: 'foo',
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  },
  'secret'
)

// Creates a valid JWT that expired 1 hour ago
export const makeExpiredToken = () => jwt.sign(
  {
    data: 'foo',
    exp: Math.floor(Date.now() / 1000) - (60 * 60),
  },
  'secret'
)
