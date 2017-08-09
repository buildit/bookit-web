import url from 'url'

// const currentHostname = () => window.location ? window.location.origin : 'http://localhost:3001'

export const signinRequestUrl = () => {
  const protocol = 'https'
  const host = 'login.microsoftonline.com/common/oauth2/v2.0/authorize'
  const query = {
    client_id: '9a8b8181-afb1-48f8-a839-a895d39f9db0',
    scope: 'openid offline_access profile https://graph.windows.net/calendars.read',
    response_type: 'id_token',
    nonce: '12345',
    //   // redirect_uri: `${currentHostname()}/openid-complete`,
  }

  return url.format({
    protocol,
    host,
    query,
  })
}
