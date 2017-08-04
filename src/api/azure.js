import url from 'url'

const currentHostname = () => window.location ? window.location.origin : 'http://localhost:3001'

export const signinRequestUrl = () => {
  // const tenant = '37fcf0e4-ceb8-4866-8e26-293bab1e26a8'
  const tenant = 'common'
  const protocol = 'https'
  const host = `login.microsoftonline.com/${tenant}/oauth2/authorize`
  const query = {
    client_id: '5171c8f0-4216-4bbc-9d75-af4c81bbc812',
    // client_id: '1be035ba-835c-498a-b1d3-786e4cfd77bc',
    response_type: 'id_token',
    redirect_uri: `${currentHostname()}/openid-complete`,
    scope: 'openid,email,profile,https://graph.microsoft.com/Calendar.Read,https://graph.microsoft.com/Calendar.Write',
    response_mode: 'query',
    nonce: '12345',
    prompt: 'consent',
  }

  return url.format({
    protocol,
    host,
    query,
  })
}
