export const decodeJWT = (jwt) => {
  try {
    return JSON.parse(new Buffer(jwt.split('.')[1], 'base64').toString('ascii'))
  } catch (error) {
    console.error(error)
  }
  return null
}
