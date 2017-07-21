import url from 'url'

export const signinRequestUrl = () => {
  const tenant = '37fcf0e4-ceb8-4866-8e26-293bab1e26a8'
  const protocol = 'https'
  const host = `login.microsoftonline.com/${tenant}/oauth2/authorize`
  const query = {
    client_id: '1be035ba-835c-498a-b1d3-786e4cfd77bc',
    response_type: 'id_token',
    redirect_uri: 'http://localhost:3001/openid-complete',
    scope: 'openid',
    response_mode: 'query',
    nonce: '12345',
    prompt: 'login',
  }

  return url.format({
    protocol,
    host,
    query,
  })
}
