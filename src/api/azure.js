import url from 'url'

export const signinRequestUrl = () => {
  const tenant = '575c5b98-c069-4475-99d9-cfb32e39d24e'
  const protocol = 'https'
  const host = `login.microsoftonline.com/${tenant}/oauth2/authorize`
  const query = {
    client_id: '123999c5-771d-4136-9d87-b5fc03f3266e',
    response_type: 'id_token',
    redirect_uri: 'http://localhost:3001/openid-complete',
    scope: 'openid',
    response_mode: 'query',
    nonce: '12345',
  }

  return url.format({
    protocol,
    host,
    query,
  })
}
