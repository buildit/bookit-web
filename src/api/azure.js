import url from 'url'

const currentHostname = () => window.location ? window.location.origin : 'http://localhost:3001'

// const builditclientId = '1be035ba-835c-498a-b1d3-786e4cfd77bc'
const peter_client_id = '9a8b8181-afb1-48f8-a839-a895d39f9db0'

const clientId = peter_client_id

export const signinRequestUrl = () => {
  const protocol = 'https'
  const host = 'login.microsoftonline.com/common/oauth2/v2.0/authorize'
  const query = {
    client_id: clientId,
    scope: 'openid offline_access profile https://graph.microsoft.com/calendars.read https://graph.microsoft.com/calendars.readwrite https://graph.microsoft.com/user.read',
    response_type: 'token',
    nonce: '12345',
    redirect_uri: `${currentHostname()}/openid-complete`,
  }

  return url.format({
    protocol,
    host,
    query,
  })
}
