import url from 'url'
import { v4 as uuid } from 'uuid'

let W = global.window
if (!W) W = { location: { origin: 'http://localhost:3001' } }

const currentHostname = () => W.location.origin

export const authenticationRedirectUrl = () => `${currentHostname()}/openid-complete`

// Required Parameters (Static)

const tenant = 'common'  // can be 'common', 'organizations', 'consumers' or an actual tenantId
const client_id = '9a8b8181-afb1-48f8-a839-a895d39f9db0'
const response_type = 'token'  // 'id_token token'
const scope = [
  'openid',
  'profile',
  'offline_access',
  'https://graph.microsoft.com/calendars.read',
  'https://graph.microsoft.com/calendars.readwrite',
  'https://graph.microsoft.com/user.read',
].join(' ')
const nonce = uuid()

// Recommended Parameters

const redirect_uri = authenticationRedirectUrl()
const response_mode = 'fragment'
// const state = uuid()  // must be unique per-request

// Optional Parameters

// const prompt = 'login'
// const login_hint = 'someguy@somedomain.com'
// const domain_hint = 'consumers'  // can be either 'consumers' or 'organizations'

const protocol = 'https'
const host = `login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`

export const signinRequestUrl = (prompt = 'login', login_hint, domain_hint) => {
  const state = uuid()

  let query = {
    client_id,
    scope,
    response_type,
    nonce,
    redirect_uri,
    response_mode,
    state,
    prompt,
  }

  if (login_hint) query = { ...query, login_hint }
  if (domain_hint) query = { ...query, domain_hint }

  return url.format({ protocol, host, query })
}

export const refreshRequestUrl = (login_hint, domain_hint) => {
  return signinRequestUrl('none', login_hint, domain_hint)
}

