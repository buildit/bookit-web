import queryString from 'query-string'

export const parseOauthFragment = (qs, ...keys) => {
  let result
  try {
    const fragment = queryString.parse(qs)
    if (keys.length) {
      result = keys.reduce((out, key) => ({ ...out, [key]: fragment[key] }), {})
    }
  } catch(error) {
    console.log('parseOauthFragment error:', error)
  }

  if (keys.length === 1) {
    return result[keys[0]]
  }

  return result
}
//   const { access_token: accessToken } = queryString.parse(query)
//   return yield accessToken
// }
